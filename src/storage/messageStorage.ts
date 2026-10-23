import AsyncStorage from "@react-native-async-storage/async-storage";

import { Message } from "../types";

const getStorageKey = (chatId: string) => {
  return `messages_${chatId}`;
};

export async function saveMessages(
  chatId: string,
  messages: Message[]
) {
  try {
    const key = getStorageKey(chatId);

    await AsyncStorage.setItem(
      key,
      JSON.stringify(messages)
    );
  } catch (error) {
    console.error(
      "Error saving messages:",
      error
    );

    throw error;
  }
}

export async function loadMessages(
  chatId: string
): Promise<Message[] | null> {
  try {
    const key = getStorageKey(chatId);

    const storedMessages =
      await AsyncStorage.getItem(key);

    if (!storedMessages) {
      return null;
    }

    return JSON.parse(
      storedMessages
    ) as Message[];
  } catch (error) {
    console.error(
      "Error loading messages:",
      error
    );

    throw error;
  }
}

export async function clearMessages(
  chatId: string
) {
  try {
    const key = getStorageKey(chatId);

    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(
      "Error clearing messages:",
      error
    );

    throw error;
  }
}