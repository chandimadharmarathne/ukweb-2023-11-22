import { authRequest } from "../../utils/Axios";
import { Response } from "../../utils/utils.types";

export type SelectCandidateArgs = {
  user_id: number;
  job_id: number;
  apply_id: number;
  approve: boolean;
};
export const selectCandidate = async ({
  user_id,
  job_id,
  apply_id,
  approve,
}: SelectCandidateArgs) => {
  const res = await authRequest<Response>({
    url: "/jobs/apply",
    method: "PATCH",
    data: { user_id, job_id, apply_id, approve },
  });
  return res;
};
