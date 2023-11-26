import { District } from "../components/district-selector";
import { Response } from "../utils/utils.types";
import useBackend from "./backend";

export const useDistrict = (countryCode?: string) => {
  const { data } = useBackend<Response<District[]>>(
    ["/system/data/districts", countryCode],
    { params: { country: countryCode }, onlyFetchIf: !!countryCode },
    { errorRetryCount: 0, revalidateOnFocus: false }
  );

  return data?.result ?? [];
};
