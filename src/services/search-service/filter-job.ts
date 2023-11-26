import { FilterType } from "../../components/find-job/filter";
import { JobCardProps } from "../../components/job-cards";
import { UserType } from "../../constants/input-data";
import { request } from "../../utils/Axios";
import { Optional, Response } from "../../utils/utils.types";

export const filterJob = async (type: any, filters: Optional<FilterType>) => {
  const res = await request<Response<Result>>({
    url:
      type === UserType.EMPLOYER
        ? "/filter/advertisements"
        : "/filter/jobrequests",
    data: filters,
    method: "POST",
  });

  return res;
};

export interface Result {
  pages: number;
  data: JobCardProps[];
}
