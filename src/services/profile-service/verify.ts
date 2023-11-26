import { authRequest } from "../../utils/Axios";

interface Response {
  success: boolean;
}

export const verify = async (data: any): Promise<Response> => {
  try {
    const res = await authRequest<Response>({
      url: "/verify-badge",
      method: "POST",
      data,
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
