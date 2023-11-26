import { Credentials } from "../../utils/auth-types";

export interface Response<T = string> {
  data: Credentials<T>;
  switches: Switches;
}

export interface Switches {
  [key: string]: boolean;
}
