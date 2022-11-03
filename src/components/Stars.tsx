import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { colors } from "../util/colorPalette";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.light.gray,
  },
  ratingTextLoading: {
    marginLeft: 4,
    height: 8,
    width: 177,
    backgroundColor: colors.light.loading,
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
          <FontAwesome
            name="circle"
            size={16}
            color={colors.light.loading}
            key={i}
          />
        ))}
        <Text style={styles.ratingTextLoading}> </Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {stars.map((kind, i) => (
        <FontAwesome name={kind} size={16} color={colors.light.star} key={i} />
      ))}
      <Text style={styles.ratingText}>
        ({rating}) - {count} Review(s)
      </Text>
    </View>
  );
}
