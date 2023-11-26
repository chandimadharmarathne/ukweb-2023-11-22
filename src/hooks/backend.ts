import { AxiosRequestConfig } from "axios";
import { useEffect } from "react";
import useSWR, { SWRConfiguration } from "swr";
import useSWRInfinite from "swr/infinite";
import { getAuthFetcher, getFetcher } from "../utils/get-fetcher";
import { Optional } from "../utils/utils.types";

type Options = {
  onlyFetchIf: boolean;
};

export type Config = AxiosRequestConfig<any> & Optional<Options>;

const useBackend = <
  Response extends object = Record<string, unknown>,
  Error extends object = Record<string, unknown>
>(
  url: string | any[],
  config: Config = {},
  swrConfig?: SWRConfiguration<Response, Error>
) => {
  const abortController = new AbortController();

  const fetcher = getFetcher<Response>({
    ...config,
    signal: abortController.signal,
  });
  const { error, data, mutate } = useSWR<Response, Error>(url, fetcher, {
    revalidateOnFocus: false,
    ...swrConfig,
  });

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);
  return {
    loading: !error && !data,
    data,
    error,
    mutate,
  };
};

export const useBackendPagination = <
  Response extends object = Record<string, unknown>,
  Error extends object = Record<string, unknown>
>(
  url: (page: number) => string,
  config: Config = {}
) => {
  const fetcher = getFetcher<Response>(config);
  const { ...all } = useSWRInfinite<Response, Error>(url, fetcher);
  return { ...all, loading: !all.error && !all.data };
};

export const useAuthBackend = <
  Response extends object = Record<string, unknown>,
  Error extends object = Record<string, unknown>
>(
  url: string | any[],
  requestConfig: Config = {},
  swrConfig?: SWRConfiguration<Response, Error>
) => {
  const abortController = new AbortController();
  const fetcher = getAuthFetcher<Response>({
    ...requestConfig,
    signal: abortController.signal,
  });
  const { error, data, mutate } = useSWR<Response, Error>(url, fetcher, {
    revalidateOnFocus: false,
    ...swrConfig,
  });

  useEffect(() => {
    return () => {
      abortController.abort();
    };
  }, []);

  return {
    loading: !error && !data,
    data,
    error,
    mutate,
  };
};

/** Uses a custom fetch function to fetch*/
export const useCustomFetch = <
  Response extends object = Record<string, unknown>,
  Error extends object = Record<string, unknown>
>(
  url: string | any[],
  fetcher: (url: string) => Promise<Response>,
  swrConfig?: SWRConfiguration<Response, Error>
) => {
  const { error, data, mutate } = useSWR<Response, Error>(url, fetcher, {
    revalidateOnFocus: false,
    ...swrConfig,
  });
  return {
    loading: !error && !data,
    data,
    error,
    mutate,
  };
};

export default useBackend;
