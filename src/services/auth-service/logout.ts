import { Auth } from "../../store/providers/auth.provider";
import { request } from "../../utils/Axios";

export const logout = async (
  id: Auth["id"],
  refreshToken: Auth["refreshtoken"]
) => {
  try {
    const response = await request<{ success: boolean; result: string }>({
      url: "/logout",
      method: "POST",
      data: {
        id,
        refreshtoken: refreshToken,
      },
    });
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
