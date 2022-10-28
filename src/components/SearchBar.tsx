import { Dispatch, useRef, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#F0EEEE",
    borderRadius: 8,
    flexDirection: "row",
    height: 48,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  iconContainer: {
    fontSize: 28,
    marginHorizontal: 8,
    alignSelf: "center",
  },
  input: { flexGrow: 1 },
});

type Props = {
  onChange: Dispatch<string>;
  onSubmit: () => void;
  value: string;
};

export default function SearchBar({ onChange, onSubmit, value }: Props) {
  /**
   * Render
   */
  return (
    <View style={styles.background}>
      <Entypo name="magnifying-glass" style={styles.iconContainer} />
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        placeholder="Search"
        value={value}
        onChangeText={onChange}
        onEndEditing={onSubmit}
      />
    </View>
  );
}
