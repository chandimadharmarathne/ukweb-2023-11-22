import { Credentials } from "../../utils/auth-types";
import { request } from "../../utils/Axios";
import { Errors } from "../../utils/errors";
import { getInputs } from "../../views/authPages/register";
import { storeToken } from "./login";

type Response = {
  success: boolean;
  msg: string;
};

export const register = async (credentials: Credentials): Promise<Response> => {
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
      url: "/signup",
      method: "POST",
      data: credentials,
    });
    storeToken({}); // clear all previous sessions after new registration
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
