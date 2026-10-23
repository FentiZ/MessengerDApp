import React from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Message } from "../types";

type Props = {
  message: Message;
};

export default function MessageBubble({
  message,
}: Props) {
  const isMine = message.sender === "me";

  return (
    <View
      style={[
        styles.row,
        isMine
          ? styles.myRow
          : styles.otherRow,
      ]}
    >
      <View
        style={[
          styles.bubble,
          isMine
            ? styles.myBubble
            : styles.otherBubble,
        ]}
      >
        <Text
          style={[
            styles.text,
            isMine && styles.myText,
          ]}
        >
          {message.text}
        </Text>

        <Text
          style={[
            styles.time,
            isMine && styles.myTime,
          ]}
        >
          {message.time}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    paddingHorizontal: 12,
    marginVertical: 4,
  },

  myRow: {
    alignItems: "flex-end",
  },

  otherRow: {
    alignItems: "flex-start",
  },

  bubble: {
    maxWidth: "78%",
    paddingHorizontal: 14,
    paddingTop: 10,
    paddingBottom: 7,
    borderRadius: 18,
  },

  myBubble: {
    backgroundColor: "#4c7df0",
    borderBottomRightRadius: 5,
  },

  otherBubble: {
    backgroundColor: "#ffffff",
    borderBottomLeftRadius: 5,
  },

  text: {
    fontSize: 16,
    color: "#222",
  },

  myText: {
    color: "#ffffff",
  },

  time: {
    marginTop: 5,
    alignSelf: "flex-end",
    fontSize: 10,
    color: "#999",
  },

  myTime: {
    color: "#dce5ff",
  },
});