import { authRequest } from "../../utils/Axios";
import { InboxResponse } from "../../components/inbox/inbox.types";

export const sendMessage = async (chat: number | string, msg: string) => {
  try {
    const res = await authRequest<InboxResponse>({
      url: "/chat-message",
      method: "POST",
      data: {
        chat,
        msg,
      },
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
