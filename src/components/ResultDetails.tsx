import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Business } from "../types/BusinessDTO";
import Stars from "./Stars";

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  nameText: {
    fontWeight: "bold",
    fontSize: 16,
  },
  nameTextLoading: {
    marginVertical: 3,
    height: 10,
    width: 250,
    backgroundColor: "#CCC",
  },
  thumb: {
    backgroundColor: "#CCC",
    borderRadius: 4,
    width: 250,
    height: 120,
  },
});

type Props = {
  item?: Business;
  loading?: boolean;
};

export default function ResultsDetails({ item, loading }: Props) {
  /**
   * Output
   */
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.thumb} />
        <View style={styles.nameTextLoading} />
        <Stars
          loading
          count={item?.review_count ?? 0}
          rating={item?.rating ?? 0}
        />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Image source={{ uri: item?.image_url || "./" }} style={styles.thumb} />
      <Text style={styles.nameText}>{item?.name ?? "(N/A)"}</Text>
      <Stars count={item?.review_count ?? 0} rating={item?.rating ?? 0} />
    </View>
  );
}
