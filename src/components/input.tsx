import { TextField, TextFieldProps } from "@mui/material";
import React, { FC, useMemo } from "react";
import { InputField } from "../utils/auth-types";
import { NotNull } from "../utils/utils.types";

type FormInputProps = {
  input: InputField;
  value: NotNull<any>;
  onChange: TextFieldProps["onChange"];
} & TextFieldProps;

const FormInput: FC<FormInputProps> = ({
  input,
  value,
  onChange,
  ...props
}) => {
  const Input = useMemo(
    () => input.CustomComponent ?? TextField,
    [input.name, value, ...(input.dependancies ?? [])]
  );
  return (
    <Input
      fullWidth
      name={input.name}
      value={value}
      onChange={onChange}
      {...input.props}
      {...props}
    />
  );
};

export default FormInput;
