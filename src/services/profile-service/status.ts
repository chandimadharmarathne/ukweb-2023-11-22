import { authRequest } from "../../utils/Axios";
import { Response } from "../../utils/utils.types";

export const status = async () => {
  const res = await authRequest<Response<{ completed: boolean }>>({
    url: "/profile/status",
    method: "GET",
  });
  return res;
};
