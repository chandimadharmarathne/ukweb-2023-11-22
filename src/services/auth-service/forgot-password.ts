import { Credentials } from "../../utils/auth-types";
import { request } from "../../utils/Axios";
import { Errors } from "../../utils/errors";
import { Response } from "../../utils/utils.types";
import { inputs } from "../../views/authPages/forgot-password";

export interface ForgetpasswordResponse {
  success: boolean;
  msg: string;
}

export const forgotPassword = async (credentials: Credentials) => {
  const requiredInputs = inputs
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
    const res = await request<ForgetpasswordResponse>({
      url: "/forgotpassword",
      method: "POST",
      data: credentials,
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const resetPassword = async (credentials: Credentials) => {
  const requiredInputs = inputs
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

  const res = await request<Response>({
    url: "/resetpassword",
    method: "POST",
    data: credentials,
  });
  return res;
};
