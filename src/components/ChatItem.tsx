import React from "react";

import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Chat } from "../types";
import Avatar from "./Avatar";

type Props = {
  chat: Chat;
  onPress: () => void;
};

export default function ChatItem({
  chat,
  onPress,
}: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.avatarContainer}>
        <Avatar uri={chat.avatar} />

        {chat.status === "online" && (
          <View style={styles.onlineDot} />
        )}
      </View>

      <View style={styles.content}>
        <View style={styles.topRow}>
          <Text style={styles.name}>
            {chat.name}
          </Text>

          <Text style={styles.time}>
            {chat.lastMessageTime}
          </Text>
        </View>

        <View style={styles.bottomRow}>
          <Text
            numberOfLines={1}
            style={styles.message}
          >
            {chat.lastMessage}
          </Text>

          {chat.unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {chat.unreadCount}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 13,
    backgroundColor: "#fff",
  },

  pressed: {
    backgroundColor: "#f3f3f3",
  },

  avatarContainer: {
    position: "relative",
  },

  onlineDot: {
    position: "absolute",
    right: 0,
    bottom: 2,

    width: 14,
    height: 14,
    borderRadius: 7,

    backgroundColor: "#2ecc71",

    borderWidth: 2,
    borderColor: "#fff",
  },

  content: {
    flex: 1,
    marginLeft: 13,
    justifyContent: "center",
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
  },

  time: {
    fontSize: 12,
    color: "#999",
  },

  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  message: {
    flex: 1,
    color: "#777",
    fontSize: 14,
  },

  badge: {
    minWidth: 22,
    height: 22,

    marginLeft: 10,

    paddingHorizontal: 6,

    borderRadius: 11,

    backgroundColor: "#4c7df0",

    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "700",
  },
});