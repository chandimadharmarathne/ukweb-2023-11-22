import { UserType } from "../../constants/user-types";
import { authRequest } from "../../utils/Axios";

interface Response {
  success: boolean;
}

export const requestProfile = async (id: number | string) => {
  const res = await authRequest<Response>({
    url: "/request/profile",
    method: "POST",
    data: { id },
  });
  return res;
};
export const reportProfile = async (id: number | string, reason: string) => {
  return await authRequest<Response>({
    url: "/report-account",
    method: "POST",
    data: { id, reason },
  });
};
export const acceptProfile = async (id: number, approve: boolean) => {
  const res = await authRequest<Response>({
    url: "/request/profile",
    method: "PATCH",
    data: { request_id: id, approve },
  });
  return res;
};

export interface Profile {
  id: number;
  name: string;
  dp?: any;
  role: UserType;
  verify: number;
  badge: number;
}
