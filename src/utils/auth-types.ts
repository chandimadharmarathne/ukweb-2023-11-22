import { TextFieldProps } from "@mui/material";
import { Language } from "../constants/languages";
import { Errors } from "./errors";

export type ErrorHelps = {
  [key: string]: Language;
};
export interface InputField {
  name: string;
  errorHelp?: Language;
  props?: TextFieldProps;
  validator?: (text: any) => boolean;
  CustomComponent?: (...args: any[]) => JSX.Element;
  dependancies?: any[];
}

export type ExtendedInputField = InputField & {
  column?: number;
  formatter?: (_input?: string) => string | void;
};

export interface Credentials<T = string> {
  [_name: string]: T | Errors.INPUT_ERROR;
}
export type ErrorsType = {
  [id: string]: boolean;
};

export type CustomOnChange = ({
  target: { value },
}: {
  target: { value?: any };
}) => void;

export type CustomComponentProps = {
  error?: boolean;
  onChange: CustomOnChange;
  name?: string;
  helperText?: string;
  label?: string;
  value?: any;
  required?: boolean;
};
