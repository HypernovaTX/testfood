import { FlatList, StyleSheet, Text, View } from "react-native";
import { Business } from "../types/BusinessDTO";

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
});

type Props = {
  title: string;
  results: Business[];
};

export default function ResultsList(props: Props) {
  /**
   * Output
   */
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <FlatList
        horizontal
        data={props.results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Text>{item.name}</Text>}
      />
    </View>
  );
}
