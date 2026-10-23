import React from "react";
import { Image, StyleSheet } from "react-native";

type Props = {
  uri: string;
  size?: number;
};

export default function Avatar({
  uri,
  size = 55,
}: Props) {
  return (
    <Image
      source={{ uri }}
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: "#ddd",
  },
});