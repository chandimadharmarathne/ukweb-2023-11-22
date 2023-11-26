import { LoginResponse } from ".";
import { request } from "../../utils/Axios";
import { storeToken } from "./login";

export interface RefreshResponse {
  success: boolean;
  token: string;
  expire: number;
}
export const refresh = async (
  refreshtoken: LoginResponse["refreshtoken"],
  number: LoginResponse["number"]
) => {
  try {
    const response = await request<RefreshResponse>({
      url: "/authrefresh",
      method: "POST",
      data: { refreshtoken, number },
    });
    return response;
  } catch (error: any) {
    if (error.message === "EXPIRED") {
      storeToken({});
      throw new Error("You were logged out because of inactivity");
    }
    throw error;
  }
};
export const checkTokenExpire = async (info: LoginResponse) => {
  if (!info?.refreshtoken) throw new Error("Please Login to proceed");

  const currentTime = Date.now();
  const expireTime = info.expire;
  if (expireTime > currentTime) {
    return {
      success: true,
      token: info.token,
    };
  } else {
    const { expire, token } = await refresh(info.refreshtoken, info.number);
    storeToken({ ...info, expire, token });
    console.debug("[TOKEN REFRESHED]", new Date());
    return {
      success: true,
      token,
    };
  }
};
