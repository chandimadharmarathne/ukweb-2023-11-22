import { authRequest } from "../../utils/Axios";
import { newTab } from "../../utils/new-tab";
import { Response } from "../../utils/utils.types";
import { getCVTemplate } from "./images";

export const requestCV = async (id: number | string) => {
  const res = await authRequest<Response>({
    url: "/request/cv",
    method: "POST",
    data: { id },
  });
  return res;
};
export const acceptCV = async (id: number, approve: boolean) => {
  const res = await authRequest<Response>({
    url: "/request/cv",
    method: "PATCH",
    data: { request_id: id, approve },
  });
  return res;
};
export const grantedCV = async (token?: string) => {
  const validate = newTab("preview-window");
  try {
    const res = await authRequest<Response<{ cv: string }>>({
      url: "/request/cv",
      method: "GET",
      params: { token },
    });
    const url = getCVTemplate(res.result.cv);
    validate(url);
    if (!url) throw new Error("No CV Found");
  } catch (error) {
    validate(false);
    throw error;
  }
};
