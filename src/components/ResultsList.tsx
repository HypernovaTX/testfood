import React, { useMemo } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { withNavigation } from "react-navigation";
import { Business } from "../types/BusinessSearchDTO";
import { AppScreenProps } from "../types/navigation";
import { placeholderBusinessArray } from "../util/placeholder";
import ConditionalWrapper from "./ConditionalWrapper";
import ResultsDetails from "./ResultDetails";

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    minHeight: 185,
  },
  title: {
    marginHorizontal: 16,
    fontWeight: "bold",
    fontSize: 24,
  },
});

type Props = {
  title: string;
  loading?: boolean;
  results: Business[];
} & Partial<AppScreenProps<"Search">>;

function ResultsList({ loading, navigation, results, title }: Props) {
  /**
   * Memo
   */
  const placeholder = useMemo(() => placeholderBusinessArray(), []);

  /**
   * Output
   */
  if (!results.length) {
    return null;
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={loading ? placeholder : results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ConditionalWrapper
            condition={!loading}
            wrapper={(children) => (
              <TouchableOpacity
                onPress={() => navigation?.navigate("Details", { id: item.id })}
                children={children}
              />
            )}
            children={<ResultsDetails loading={loading} item={item} />}
          />
        )}
      />
    </View>
  );
}

export default withNavigation(ResultsList);
