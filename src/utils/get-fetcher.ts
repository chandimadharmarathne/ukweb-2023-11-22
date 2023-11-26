import { AxiosRequestConfig } from "axios";
import { Config } from "../hooks/backend";
import { Auth } from "../store/providers/auth.provider";
import { authRequest, request } from "./Axios";
import { Response } from "./utils.types";

const NOT_FETCHED_RESPONSE: unknown = {
  success: false,
};

/** Use to get SWR fetch function with all custom configuration  */
export const getFetcher =
  <Response extends Record<string, any>>(config: Config) =>
  async (url: string): Promise<Response> => {
    if (
      config.onlyFetchIf === true ||
      typeof config.onlyFetchIf === "undefined"
    ) {
      return request<Response>({
        url,
        ...config,
      });
    }
    return NOT_FETCHED_RESPONSE as Response;
  };

export const getAuthFetcher = <T extends Record<string, any>>(
  config: Config
) => {
  return async (url: string): Promise<T> => {
    if (
      config.onlyFetchIf === true ||
      typeof config.onlyFetchIf === "undefined"
    )
      return authRequest<T>({
        url,
        ...config,
      });
    return NOT_FETCHED_RESPONSE as T;
  };
};

export const getCustomFetcher =
  <T = any>(token: Auth["token"], config?: AxiosRequestConfig<any>) =>
  async (url: string) => {
    if (!token)
      return {
        success: true,
        result: {} as T,
      };

    return await authRequest<Response<T>>({
      url,
      ...config,
    });
  };
