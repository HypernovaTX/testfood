import { useCallback, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

import ResultsList from "../components/ResultsList";
import SearchBar from "../components/SearchBar";
import useYelpSearch from "../hooks/useYelpSearch";
import { YelpPriceRanges } from "../types/GeneralDTO";

const styles = StyleSheet.create({
  error: { color: "#F44" },
  text: { marginHorizontal: 16 },
});

const API_CONFIG = {
  defaultTerm: "meat",
  location: "75080",
};

export default function SearchScreen() {
  /**
   * State
   */
  const [term, setTerm] = useState("");
  const [lastTerm, setLastTerm] = useState(
    API_CONFIG.defaultTerm.toLowerCase()
  );

  /**
   * Custom hook
   */
  const {
    error,
    loading,
    query: doSearch,
    result: businesses,
  } = useYelpSearch(API_CONFIG);

  /**
   * Callbacks
   */
  const filterResultByPrice = useCallback(
    (p: YelpPriceRanges) => businesses.filter(({ price }) => price === p),
    [businesses]
  );
  const handleSubmit = () => {
    const newTerm = term.toLowerCase();
    if (!newTerm || newTerm === lastTerm) {
      return;
    }
    setLastTerm(newTerm);
    doSearch(term);
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
