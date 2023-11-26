import { authRequest } from "../../utils/Axios";
import { Response } from "../../utils/utils.types";

export const getInitialNotifications = async (lastupdated: any) => {
  return await authRequest<Response<Result>>({
    url: "/notification/count-header",
    params: {
      lastupdated: new Date(lastupdated).getTime(),
    },
  });
};

export interface Result {
  chats: number;
  notifications: number;
}
