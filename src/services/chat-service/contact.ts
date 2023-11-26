import { Credentials } from "../../utils/auth-types";
import { request } from "../../utils/Axios";

export interface Response {
  success: boolean;
  result: string;
}
export const contact = async (details: Credentials) => {
  try {
    const res = await request<Response>({
      url: "/contact",
      method: "POST",
      data: details,
    });
    if (res.success) return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
