import React from "react";

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { RootStackParamList } from "../navigation/types";
import { chats } from "../data/chats";
import ChatItem from "../components/ChatItem";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Chats"
>;

export default function ChatsScreen({
  navigation,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.smallTitle}>
            Messenger
          </Text>

          <Text style={styles.title}>
            Chats
          </Text>
        </View>

        <Pressable
          style={styles.profileButton}
          onPress={() =>
            navigation.navigate("Profile")
          }
        >
          <Text style={styles.profileIcon}>
            👤
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatItem
            chat={item}
            onPress={() =>
              navigation.navigate("Chat", {
                chatId: item.id,
              })
            }
          />
        )}
        ItemSeparatorComponent={() => (
          <View style={styles.separator} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  smallTitle: {
    fontSize: 13,
    color: "#999",
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
  },

  profileButton: {
    width: 46,
    height: 46,

    borderRadius: 23,

    backgroundColor: "#eef1f5",

    alignItems: "center",
    justifyContent: "center",
  },

  profileIcon: {
    fontSize: 22,
  },

  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginLeft: 85,
  },
});