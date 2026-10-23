import { Message } from "../types";

export const initialMessages: Record<string, Message[]> = {
  "1": [
    {
      id: "1",
      chatId: "1",
      text: "Hey! How are you?",
      sender: "other",
      time: "15:40",
    },
    {
      id: "2",
      chatId: "1",
      text: "I'm good, thanks 👋",
      sender: "me",
      time: "15:41",
    },
    {
      id: "3",
      chatId: "1",
      text: "Are you coming today?",
      sender: "other",
      time: "15:42",
    },
  ],

  "2": [
    {
      id: "1",
      chatId: "2",
      text: "Do we have homework?",
      sender: "me",
      time: "14:20",
    },
    {
      id: "2",
      chatId: "2",
      text: "Yes, page 42.",
      sender: "other",
      time: "14:21",
    },
    {
      id: "3",
      chatId: "2",
      text: "Okay, see you!",
      sender: "other",
      time: "14:22",
    },
  ],

  "3": [
    {
      id: "1",
      chatId: "3",
      text: "Hey Max",
      sender: "me",
      time: "13:55",
    },
    {
      id: "2",
      chatId: "3",
      text: "Send me the file please",
      sender: "other",
      time: "14:03",
    },
  ],

  "4": [
    {
      id: "1",
      chatId: "4",
      text: "Here is the information.",
      sender: "me",
      time: "12:45",
    },
    {
      id: "2",
      chatId: "4",
      text: "Thank you 😊",
      sender: "other",
      time: "12:48",
    },
  ],

  "5": [
    {
      id: "1",
      chatId: "5",
      text: "Can you talk now?",
      sender: "other",
      time: "20:20",
    },
    {
      id: "2",
      chatId: "5",
      text: "Not right now.",
      sender: "me",
      time: "20:21",
    },
    {
      id: "3",
      chatId: "5",
      text: "Let's call later",
      sender: "other",
      time: "20:22",
    },
  ],
};