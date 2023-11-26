import { authRequest } from "../../utils/Axios";
import { Response } from "../../utils/utils.types";

export const buy = async (id: string | number) => {
  const res = await authRequest<Response<{ invoice_id: string }>>({
    url: "/packages/invoice",
    method: "POST",
    data: {
      package: id,
    },
  });
  return res.result;
};
