import { authRequest } from "../../utils/Axios";

interface Response {
  success: boolean;
  chat_id: number;
}
export const redirectTo = async (reciever?: string | number) => {
  try {
    if (!reciever) throw new Error("Unkown Company");
    const res = await authRequest<Response>({
      url: "/chat",
      method: "POST",
      data: {
        reciever,
      },
    });
    if (res.success) return res.chat_id;
    return 0;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
