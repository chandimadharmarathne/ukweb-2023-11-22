import axios, { AxiosRequestConfig } from "axios";
import { BACKEND_URL } from "../constants/config";
import * as authService from "../services/auth-service";
import { LOCAL_STORAGE_KEY } from "../store/providers/auth.provider";

export const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

// instance.interceptors.response.use((res) => {
//   console.debug(
//     "[FETCHING]",
//     res.config.method,
//     res.config.url,
//     res.config.params,
//     res.status
//   );
//   return res;
// });

export const request = async <T extends Record<string, any>>(
  config: AxiosRequestConfig<any>
): Promise<T> => {
  try {
    const req = await instance(config);
    const res = await req.data;
    if (res.error) throw new Error(res.error);

    return res;
  } catch (error: any) {
    if (error.response?.status === 401) authService.storeToken({});

    throw {
      message: error.response?.data?.error ?? error.message,
      statusCode: error.response?.status,
      data: error.response?.data,
    };
  }
};

/** Uses for protected requests  */
export const authRequest = async <T extends Record<string, any>>(
  config: AxiosRequestConfig<any>
): Promise<T> => {
  const data = localStorage.getItem(LOCAL_STORAGE_KEY);

  const info: authService.LoginResponse = JSON.parse(data!);

  try {
    const { token } = await authService.checkTokenExpire(info);
    const req = await instance({
      ...config,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await req.data;
    if (res.error) throw new Error(res.error);

    return res;
  } catch (error: any) {
    // 419 - Token expired
    if (error.response?.status === 419) {
      const { expire, token } = await authService.refresh(
        info.refreshtoken,
        info.number
      );
      authService.storeToken({ ...info, expire, token });
      console.debug("[TOKEN REFRESHED]", new Date());
      return await authRequest(config);
    }

    if (error.response?.status === 401) authService.storeToken({});

    throw {
      message: error.response?.data?.error ?? error.message,
      statusCode: error.response?.status,
      data: error.response?.data,
    };
  }
};

export type CustomRequestError = {
  message: string;
  statusCode?: number;
  data?: any;
};
