import { request } from "../../utils/Axios";
import { toFormData } from "../../utils/to-formdata";

export const saveCV = async (
  data: any,
  pic?: File,
  email?: string,
  styleID?: string
) => {
  return await request({
    url: "/cv/save",
    method: "POST",
    data: toFormData({
      display_pic: pic,
      data,
      email,
      template: styleID,
    }),
  });
};
export const getSavedCV = async (id: any) => {
  return await request({
    url: "/cv/save",
    method: "GET",
    data: { id },
  });
};
