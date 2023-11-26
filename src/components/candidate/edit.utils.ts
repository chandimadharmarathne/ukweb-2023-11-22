import {
  Credentials,
  ExtendedInputField,
  InputField,
} from "../../utils/auth-types";
import { Errors } from "../../utils/errors";

export const checkRequired = <
  T extends (InputField | ExtendedInputField)[],
  U = string
>(
  inputs: T,
  credentials: Credentials<U>
) => {
  return inputs
    .filter((inp) => inp.props?.required)
    .map((inp) => {
      const value = credentials[inp.name];
      return value !== Errors.INPUT_ERROR && !!value;
    })
    .every((inp) => inp);
};
