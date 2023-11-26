import { authRequest } from "../../utils/Axios";
import { post } from "./post";

interface Response {
  success: boolean;
}

export const deleteAd = async (id: number | string) => {
  try {

    const res = await authRequest<Response>({
      url: "/advertisement",
      method: "DELETE",
      data: {
        advertisement_id: id,
      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
