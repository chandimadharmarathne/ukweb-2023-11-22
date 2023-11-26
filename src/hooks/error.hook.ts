import { useState } from "react";
import { useSnackbar } from "../store/providers/snackbar.provider";
import { InputField, ErrorsType, Credentials } from "../utils/auth-types";

export const useErrors = (allInputs: InputField[]) => {
  const [errors, setErrors] = useState<ErrorsType>({});
  const { addError } = useSnackbar();

  const updateError = (name: string, hasError?: boolean) =>
    setErrors((prev) => ({ ...prev, [name]: hasError !== true }));

  const hasErrors = (name: string) => errors[name];

  /** Use in submit to give error messages
   * @param filledInputs Only used when the intial inputs can be immutable such as edit modes
   */
  const checkErrors = (filledInputs?: Credentials<any>): void | never => {
    const required = allInputs
      .filter((inp) => inp.props?.required)
      .map((inp) => {
        const filledInput = filledInputs?.[inp.name] ?? errors[inp.name];
        return {
          name: inp.props?.label,
          not_valid: typeof filledInput === "undefined",
        };
      })
      .filter((inp) => inp.not_valid);

    if (required.length !== 0)
      throw new Error("Required Inputs not provided: " + required[0].name);
    console.log("errors", errors)
    const filteredErrors = errors
      ? Object.entries(errors)
          .filter(([, has]) => has)
          .map(
            ([key]) => allInputs.find((inp) => inp.name === key)?.props?.label
          )
      : [];

    if (filteredErrors.length !== 0)
      throw new Error("Invalid Inputs: " + filteredErrors.join(", "));
  };

  const clearErrors = () => {
    setErrors({});
  };
  return {
    updateError,
    hasErrors,
    checkErrors,
    clearErrors,
    /** Use this to update snackbar
     * @sameas
     * ```json
     * const { addError } = useSnackbar();
     * ```
     */
    addError,
  };
};
