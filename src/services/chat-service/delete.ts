import { authRequest } from "../../utils/Axios";
import {
  InboxResponse,
  MessagesResponse,
} from "../../components/inbox/inbox.types";

export const deleteChat = async (chat: string | number) => {
  try {
    const res = await authRequest<InboxResponse>({
      url: "/chat",
      method: "DELETE",
      data: {
        chat,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
type Args = {
  chat: any;
  timestamp: string;
};

export const deleteMessage = async (args: Args) => {
  try {
    const res = await authRequest<MessagesResponse>({
      url: "/chat-message",
      method: "DELETE",
      data: {
        ...args,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
