import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: "#888",
  },
  ratingTextLoading: {
    marginLeft: 4,
    height: 8,
    width: 177,
    backgroundColor: "#CCC",
  },
});

type Props = {
  count: number;
  loading?: boolean;
  rating: number;
};
enum Star {
  solid = "star",
  half = "star-half-o",
  empty = "star-o",
}

export default function Stars({ count, loading, rating }: Props) {
  /**
   * Memo
   */
  const stars = useMemo(() => {
    const templateArray = new Array<Star>(5).fill(Star.empty);
    return templateArray.map((_, i) => {
      const index = i + 1;
      if (index <= rating) {
        return Star.solid;
      }
      return index <= Math.ceil(rating) ? Star.half : Star.empty;
    });
  }, [rating]);

  /**
   * Render
   */
  if (loading) {
    return (
      <View style={styles.container}>
        {stars.map((_, i) => (
          <FontAwesome name="circle" size={16} color="#CCC" key={i} />
        ))}
        <Text style={styles.ratingTextLoading}> </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {stars.map((kind, i) => (
        <FontAwesome name={kind} size={16} color="#FC0" key={i} />
      ))}
      <Text style={styles.ratingText}>
        ({rating}) - {count} Review(s)
      </Text>
    </View>
  );
}
