import { Credentials } from "../../utils/auth-types";
import { authRequest } from "../../utils/Axios";
import { Errors } from "../../utils/errors";
import { inputs } from "../../views/pages/profile/settings";

interface Response {
  success: boolean;
  number: string;
  full_name: string;
}

export const updateSettings = async (
  credentials: Credentials
): Promise<Response> => {
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
    const res = await authRequest<Response>({
      url: "/profile-settings",
      method: "PATCH",
      data: credentials,
    });
    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
