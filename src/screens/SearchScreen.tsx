import { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ResultsList from "../components/ResultsList";
import SearchBar from "../components/SearchBar";
import useYelpAPI from "../hooks/useYelpAPI";
import { BusinessSearch } from "../types/BusinessSearchDTO";
import { YelpPriceRanges } from "../types/GeneralDTO";
import { colors } from "../util/colorPalette";

const styles = StyleSheet.create({
  error: { color: colors.light.error },
  text: { marginHorizontal: 16 },
});

type APISearchParam = { term: string; location: string; limit: number };

const API_CONFIG = {
  defaultTerm: "steak",
  location: "75080",
  limit: 50,
};

export default function SearchScreen() {
  /**
   * State
   */
  const [term, setTerm] = useState(API_CONFIG.defaultTerm);
  const [lastTerm, setLastTerm] = useState(
    API_CONFIG.defaultTerm.toLowerCase()
  );
  const params = {
    term,
    location: API_CONFIG.location,
    limit: API_CONFIG.limit,
  };

  /**
   * Custom hook
   */
  const { error, loading, query, result } = useYelpAPI<
    APISearchParam,
    BusinessSearch
  >({ params, uri: "/search" });

  /**
   * Callbacks
   */
  const filterResultByPrice = useCallback(
    (p: YelpPriceRanges) =>
      result?.businesses.filter(({ price }) => price === p) ?? [],
    [result?.businesses]
  );
  const handleSubmit = () => {
    const newTerm = term.toLowerCase();
    if (!newTerm || newTerm === lastTerm) {
      return;
    }
    setLastTerm(newTerm);
    query(params);
  };

  /**
   * Render
   */
  return (
    <>
      <SearchBar value={term} onChange={setTerm} onSubmit={handleSubmit} />
      {error && <Text style={styles.error}>API failed!</Text>}
      <ScrollView>
        <ResultsList
          title="Cheap and Affordable"
          loading={loading}
          results={filterResultByPrice("$")}
        />
        <ResultsList
          title="A Bit Pricier"
          loading={loading}
          results={filterResultByPrice("$$")}
        />
        <ResultsList
          title="Pretty Penny"
          loading={loading}
          results={filterResultByPrice("$$$")}
        />
        <ResultsList
          title="For the Top 1 Percent"
          loading={loading}
          results={filterResultByPrice("$$$$")}
        />
      </ScrollView>
    </>
  );
}
