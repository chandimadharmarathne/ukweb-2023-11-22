import { Credentials } from "../../utils/auth-types";
import { request } from "../../utils/Axios";
import { Errors } from "../../utils/errors";
import { getInputs } from "../../views/authPages/verify";

type Response = {
  success: boolean;
  msg?: string;
  result?: string;
};

export const verify = async (
  credentials: Credentials<any>
): Promise<Response> => {
  const requiredInputs = getInputs(credentials)
    .filter((input) => !!input.props?.required)
    .map((input) => input.name);

  if (requiredInputs.some((input) => !credentials[input]?.length))
    throw new Error("Required fields were not provided");
  if (
    Object.keys(credentials).some(
      (input) => credentials[input] === Errors.INPUT_ERROR
    )
  )
    throw new Error("Invalid Credentials were provided");

  try {
    const res = await request<Response>({
      url: "/verify",
      method: "POST",
      data: credentials,
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
