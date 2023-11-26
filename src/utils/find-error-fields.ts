import { Credentials, ExtendedInputField, InputField } from "./auth-types";

export type ErrorFields = { [name: string]: boolean };
type Options = {
  ignore?: string[];
};

export const findErrorFields = (
  data: Credentials<any>,
  inputs: (InputField | ExtendedInputField)[],
  options?: Options
): ErrorFields => {
  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => {
      if (options?.ignore?.includes(key)) return [key, false];

      const input = inputs.find((input) => input.name === key);
      const isValid = input?.validator?.(value);

      return [key, !isValid];
    })
  );
};
