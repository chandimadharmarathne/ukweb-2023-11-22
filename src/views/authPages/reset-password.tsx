import { Stack, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SubmitButton from "../../components/submit-button";
import { OTP_REGEX, PASSWORD_REGEX } from "../../constants/regex";
import { DATA_USER_TYPES } from "../../constants/user-types";
import * as authService from "../../services/auth-service";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Credentials, ErrorHelps, InputField } from "../../utils/auth-types";
import { Errors } from "../../utils/errors";

const ResetPasswordPage: FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({
    type: DATA_USER_TYPES[0].id,
  });
  const { code } = useLanguage();
  const { addSnack } = useSnackbar();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const number = params.get("number");

  const updateCredentials =
    (name: string, validate: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setCredentials((prev) => ({
        ...prev,
        [name]: validate?.(value) ? value : Errors.INPUT_ERROR,
      }));
    };

  const submit = async () => {
    try {
      if (!number) throw new Error("No mobile number found");
      const response = await authService.resetPassword({
        ...credentials,
        number,
      });
      if (response.success) {
        addSnack?.({
          severity: "success",
          message: "You've successfully reset your password",
        });
        navigate("/login");
      }
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };
  return (
    <>
      <Typography variant="h1" style={{
        paddingTop:'90px'
      }}>Reset Password</Typography>

      <Stack spacing={4} className="content">
        {inputs.map((input) => {
          const hasError = credentials?.[input.name] === Errors.INPUT_ERROR;
          const Input = input.CustomComponent ?? TextField;
          return (
            <Input
            style={{
              margin:20
            }}
              {...input.props}
              error={hasError}
              name={input.name}
              key={input.name}
              helperText={hasError ? errorHelps[input.name]?.[code] : ""}
              onChange={updateCredentials(input.name, input.validator)}
            />
          );
        })}

        <Stack className="bottom_section" spacing={2}>
          <SubmitButton onClick={()=>{

          }}>Reset</SubmitButton>
        </Stack>
      </Stack>
    </>
  );
};

export const inputs: InputField[] = [
  {
    name: "token",
    validator: (password) => OTP_REGEX.test(password),
    props: {
      placeholder: "Enter OTP code",
      required: true,
      label: "OTP",
    },
  },
  {
    name: "password",
    validator: (password) => PASSWORD_REGEX.test(password),
    props: {
      placeholder: "Enter your password",
      type: "password",
      required: true,
      label: "Password",
    },
  },
  {
    name: "confirm_password",
    validator: (password) => PASSWORD_REGEX.test(password),
    props: {
      placeholder: "Enter your password again",
      type: "password",
      required: true,
      label: "Confirm Password",
    },
  },
];

const errorHelps: ErrorHelps = {
  type: {
    en: "Invalid Type",
    si: "",
  },
  number: {
    en: "Entered Number is Invalid",
    si: "",
  },
  password: {
    en: "Password need to be at least 8 characters long with a Number and a special character",
    si: "",
  },
};

export default ResetPasswordPage;
