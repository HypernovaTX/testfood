import * as React from "react";
import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../util/colorPalette";
/* SVGR has dropped some elements not supported by react-native-svg: animateTransform */

type Props = {
  size?: number;
};

export default function LoadingCircle({ size }: Props) {
  /**
   * Ref
   */
  const spinValue = useRef(new Animated.Value(0)).current;

  /**
   * Effect
   */
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        duration: 500,
        easing: Easing.inOut(Easing.linear),
        toValue: 1,
        useNativeDriver: true,
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  /**
   * Render
   */
  return (
    <Animated.View style={{ transform: [{ rotate: spin }] }}>
      <AntDesign
        name="loading1"
        size={size ?? 32}
        color={colors.light.accent}
      />
    </Animated.View>
  );
}
