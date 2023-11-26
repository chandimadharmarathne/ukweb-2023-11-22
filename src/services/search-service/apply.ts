import { authRequest } from "../../utils/Axios";
import { toFormData } from "../../utils/to-formdata";

export const applyJob = async (id: any, type: number, cv?: File) => {
  const res = await authRequest<{ success: true }>({
    url: "/jobs/apply",
    method: "POST",
    data: toFormData({
      advertisement_id: id,
      applytype: type,
      "custom-cv": cv,
    }),
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });

  return res;
};
