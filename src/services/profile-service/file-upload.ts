import { ALLOWED_TYPES } from "../../constants/allowed-images";
import { authRequest } from "../../utils/Axios";

export const fileUpload = async <T extends object = any>(
  url: string,
  fd?: FormData
) => {
  const response = await authRequest<T>({
    url,
    method: "POST",
    data: fd,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

export const profilePicUpload = async (pic: File) => {
  type Response = Promise<{
    success: boolean;
    result: string;
    dp: string;
  }>;

  if (!ALLOWED_TYPES.includes(pic?.type)) throw new Error("Invalid Type");
  const fd = new FormData();
  fd.append("display_pic", pic);

  return await fileUpload<Response>("/profile/dp", fd);
};
