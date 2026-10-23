import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
} from "react-native";

type Props = {
  onPress: () => void;
};

export default function CallButton({
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <Text style={styles.icon}>
        📹
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 46,
    height: 46,

    alignItems: "center",
    justifyContent: "center",
  },

  pressed: {
    opacity: 0.5,
  },

  icon: {
    fontSize: 22,
  },
});