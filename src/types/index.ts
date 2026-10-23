export type Chat = {
  id: string;
  name: string;
  avatar: string;
  status: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

export type Message = {
  id: string;
  chatId: string;
  text: string;
  sender: "me" | "other";
  time: string;
};