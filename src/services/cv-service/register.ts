import { request } from "../../utils/Axios";
import { toFormData } from "../../utils/to-formdata";

export const registerCV = async (
  data: any,
  pic?: File,
  number?: any,
  email?: string
) => {
  return await request({
    url: "/cv/save",
    method: "POST",
    data: toFormData({
      display_pic: pic,
      data,
      number,
      email,
    }),
  });
};
