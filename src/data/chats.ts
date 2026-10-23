import { Chat } from "../types";

export const chats: Chat[] = [
  {
    id: "1",
    name: "Alex Johnson",
    avatar: "https://i.pravatar.cc/150?img=12",
    status: "online",
    lastMessage: "Are you coming today?",
    lastMessageTime: "18:32",
    unreadCount: 2,
  },

  {
    id: "2",
    name: "Anna Müller",
    avatar: "https://i.pravatar.cc/150?img=47",
    status: "online",
    lastMessage: "Okay, see you!",
    lastMessageTime: "17:15",
    unreadCount: 0,
  },

  {
    id: "3",
    name: "Max Brown",
    avatar: "https://i.pravatar.cc/150?img=11",
    status: "last seen 10 min ago",
    lastMessage: "Send me the file please",
    lastMessageTime: "14:03",
    unreadCount: 1,
  },

  {
    id: "4",
    name: "Sophie Wilson",
    avatar: "https://i.pravatar.cc/150?img=32",
    status: "offline",
    lastMessage: "Thank you 😊",
    lastMessageTime: "12:48",
    unreadCount: 0,
  },

  {
    id: "5",
    name: "Daniel Smith",
    avatar: "https://i.pravatar.cc/150?img=14",
    status: "online",
    lastMessage: "Let's call later",
    lastMessageTime: "Yesterday",
    unreadCount: 4,
  },
];