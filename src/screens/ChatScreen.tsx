import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import {
  SafeAreaView,
} from "react-native-safe-area-context";

import {
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import {
  RootStackParamList,
} from "../navigation/types";

import { chats } from "../data/chats";
import {
  initialMessages,
} from "../data/messages";

import { Message } from "../types";

import Avatar from "../components/Avatar";
import MessageBubble from "../components/MessageBubble";
import CallButton from "../components/CallButton";

import {
  loadMessages,
  saveMessages,
} from "../storage/messageStorage";

type Props = NativeStackScreenProps<
  RootStackParamList,
  "Chat"
>;

export default function ChatScreen({
  navigation,
  route,
}: Props) {
  const { chatId } = route.params;

  const chat = chats.find(
    (item) => item.id === chatId
  );

  const [messages, setMessages] =
    useState<Message[]>([]);

  const [text, setText] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const listRef =
    useRef<FlatList<Message>>(null);

  // Загрузка сообщений
  useEffect(() => {
    const initializeMessages =
      async () => {
        try {
          setLoading(true);
          setError(null);

          const storedMessages =
            await loadMessages(chatId);

          if (storedMessages) {
            setMessages(storedMessages);
          } else {
            const defaultMessages =
              initialMessages[chatId] ?? [];

            setMessages(defaultMessages);

            await saveMessages(
              chatId,
              defaultMessages
            );
          }
        } catch (err) {
          console.error(err);

          setError(
            "Could not load messages."
          );

          setMessages(
            initialMessages[chatId] ?? []
          );
        } finally {
          setLoading(false);
        }
      };

    initializeMessages();
  }, [chatId]);

  const sendMessage = async () => {
    const cleanText = text.trim();

    if (!cleanText) {
      return;
    }

    const now = new Date();

    const hours = now
      .getHours()
      .toString()
      .padStart(2, "0");

    const minutes = now
      .getMinutes()
      .toString()
      .padStart(2, "0");

    const newMessage: Message = {
      id: Date.now().toString(),
      chatId,
      text: cleanText,
      sender: "me",
      time: `${hours}:${minutes}`,
    };

    const updatedMessages = [
      ...messages,
      newMessage,
    ];

    setMessages(updatedMessages);

    setText("");

    try {
      await saveMessages(
        chatId,
        updatedMessages
      );
    } catch (err) {
      console.error(err);

      setError(
        "Could not save message."
      );
    }

    setTimeout(() => {
      listRef.current?.scrollToEnd({
        animated: true,
      });
    }, 100);
  };

  if (!chat) {
    return (
      <SafeAreaView
        style={styles.centerContainer}
      >
        <Text style={styles.errorText}>
          Chat not found
        </Text>
      </SafeAreaView>
    );
  }

  if (loading) {
    return (
      <SafeAreaView
        style={styles.centerContainer}
      >
        <ActivityIndicator
          size="large"
          color="#4c7df0"
        />

        <Text style={styles.loadingText}>
          Loading messages...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : undefined
        }
      >
        {/* HEADER */}

        <View style={styles.header}>
          <Pressable
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.backText}>
              ‹
            </Text>
          </Pressable>

          <Avatar
            uri={chat.avatar}
            size={43}
          />

          <View style={styles.userInfo}>
            <Text style={styles.name}>
              {chat.name}
            </Text>

            <Text
              style={[
                styles.status,
                chat.status === "online" &&
                  styles.online,
              ]}
            >
              {chat.status}
            </Text>
          </View>

          <CallButton
            onPress={() =>
              navigation.navigate(
                "VideoCall",
                {
                  userName: chat.name,
                }
              )
            }
          />
        </View>

        {/* ERROR */}

        {error && (
          <View style={styles.errorBanner}>
            <Text
              style={styles.errorBannerText}
            >
              {error}
            </Text>
          </View>
        )}

        {/* MESSAGES */}

        <FlatList
          ref={listRef}
          data={messages}
          keyExtractor={(item) =>
            item.id
          }
          renderItem={({ item }) => (
            <MessageBubble
              message={item}
            />
          )}
          contentContainerStyle={
            styles.messagesContainer
          }
          showsVerticalScrollIndicator={
            false
          }
          keyboardShouldPersistTaps="handled"
          onContentSizeChange={() => {
            listRef.current?.scrollToEnd({
              animated: false,
            });
          }}
        />

        {/* INPUT */}

        <View
          style={styles.inputContainer}
        >
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Message..."
            placeholderTextColor="#999"
            style={styles.input}
            multiline
            maxLength={500}
          />

          <Pressable
            onPress={sendMessage}
            style={({ pressed }) => [
              styles.sendButton,
              pressed &&
                styles.pressed,
            ]}
          >
            <Text style={styles.sendIcon}>
              ➤
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef1f5",
  },

  centerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef1f5",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: "#777",
  },

  header: {
    height: 70,

    paddingHorizontal: 10,

    flexDirection: "row",
    alignItems: "center",

    backgroundColor: "#ffffff",

    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },

  backButton: {
    width: 40,
    height: 50,

    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    fontSize: 40,
    lineHeight: 42,
    color: "#4c7df0",
  },

  userInfo: {
    flex: 1,
    marginLeft: 11,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#191919",
  },

  status: {
    marginTop: 2,

    fontSize: 12,
    color: "#999",
  },

  online: {
    color: "#2ecc71",
  },

  messagesContainer: {
    paddingVertical: 12,
  },

  errorBanner: {
    paddingVertical: 8,
    paddingHorizontal: 15,

    backgroundColor: "#ffe3e3",
  },

  errorBannerText: {
    color: "#c92a2a",
    fontSize: 13,
    textAlign: "center",
  },

  inputContainer: {
    minHeight: 65,

    paddingHorizontal: 12,
    paddingVertical: 9,

    flexDirection: "row",
    alignItems: "flex-end",

    backgroundColor: "#fff",

    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
  },

  input: {
    flex: 1,

    minHeight: 45,
    maxHeight: 100,

    paddingHorizontal: 16,
    paddingVertical: 11,

    borderRadius: 23,

    backgroundColor: "#f1f3f5",

    color: "#191919",
    fontSize: 16,
  },

  sendButton: {
    width: 45,
    height: 45,

    marginLeft: 8,

    borderRadius: 23,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#4c7df0",
  },

  pressed: {
    opacity: 0.7,
  },

  sendIcon: {
    marginLeft: 2,
    fontSize: 20,
    color: "#fff",
  },

  errorText: {
    fontSize: 18,
    color: "#e63946",
  },
});