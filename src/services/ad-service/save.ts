import { authRequest } from "../../utils/Axios";

export const save = async (id: string | number) => {
  const res = await authRequest<{ success: boolean }>({
    url: "/advertisement/saved",
    method: "POST",
    data: {
      id,
    },
  });
  return res;
};
export const unsave = async (id: string | number) => {
  const res = await authRequest<{ success: boolean }>({
    url: "/advertisement/saved",
    method: "DELETE",
    data: {
      id,
    },
  });
  return res;
};
