import { request } from "../../utils/Axios";
import { Response } from "../../utils/utils.types";

export const resendOTP = async (number?: string) => {
  const res = await request<Response>({
    url: "/sendotpagain",
    method: "POST",
    data: {
      number,
    },
  });
};
