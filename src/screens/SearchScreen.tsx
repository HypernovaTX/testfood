import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import ResultsList from "../components/ResultsList";
import SearchBar from "../components/SearchBar";
import useYelpSearch from "../hooks/useYelpSearch";
import { YelpPriceRanges } from "../types/BusinessDTO";

const styles = StyleSheet.create({
  body: { backgroundColor: "#FFF", width: "100%", height: "100%" },
  error: { color: "#F44" },
  text: {},
});

export default function SearchScreen() {
  /**
   * State
   */
  const [term, setTerm] = useState("");

  /**
   * Custom hook
   */
  const { error, query: doSearch, result: businesses } = useYelpSearch();

  function filterResultByPrice(price: YelpPriceRanges) {
    return businesses.filter((item) => item.price === price);
  }

  /**
   * Render
   */
  return (
    <View style={styles.body}>
      <SearchBar
        value={term}
        onChange={setTerm}
        onSubmit={() => doSearch(term)}
      />
      {!!error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.text}>{businesses.length} results found.</Text>
      <ResultsList title="Cost Effective" results={filterResultByPrice("$")} />
      <ResultsList title="Bit Pricier" results={filterResultByPrice("$$")} />
      <ResultsList title="Big Spender" results={filterResultByPrice("$$$")} />
      <ResultsList title="Fine Dining" results={filterResultByPrice("$$$$")} />
    </View>
  );
}
