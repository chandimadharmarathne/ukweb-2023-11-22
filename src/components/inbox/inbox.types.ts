import { FC } from "react";
import { ChatItem } from "./mini-message";

export type OutletContext = {
  toggleSideMenu: () => void;
  chats?: ChatItem[];
};

export type InboxResponse = {
  success: boolean;
  chats: ChatItem[];
};
export type MessagesResponse = {
  success: boolean;
  chats: Message[];
};

export interface Message {
  sender: number;
  msg: string;
  timestamp: string;
}

export type SpecialMessage = FC<
  {
    isMe: boolean;
  } & Message
>;
