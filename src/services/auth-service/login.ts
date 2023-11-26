import { LOCAL_STORAGE_CHANGED } from "../../constants/event-names";
import { UserType } from "../../constants/user-types";
import { Auth, LOCAL_STORAGE_KEY } from "../../store/providers/auth.provider";
import { Credentials } from "../../utils/auth-types";
import { request } from "../../utils/Axios";
import { Errors } from "../../utils/errors";
import { inputs } from "../../views/authPages/login";

export interface LoginResponse {
  success: boolean;
  id: number;
  number: string;
  name: string;
  role: UserType;
  token: string;
  refreshtoken: string;
  expire: number;
  verify: boolean;
  badge: boolean;
  completed: boolean;
  lastlogin: string;
  adposted: boolean;
  completedstep: number;
}

export const login = async (credentials: Credentials) => {
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
    const res = await request<LoginResponse>({
      url: "/login",
      method: "POST",
      data: credentials,
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const storeToken = (response: Auth) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(response));
  document.dispatchEvent(
    new CustomEvent(LOCAL_STORAGE_CHANGED, { detail: response })
  );
};
