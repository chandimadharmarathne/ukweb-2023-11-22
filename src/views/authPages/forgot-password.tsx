import React from "react";
import { ChangeEvent, FC, useState } from "react";
import { Stack, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Credentials, ErrorHelps, InputField } from "../../utils/auth-types";
import { Errors } from "../../utils/errors";
import { EMAIL_REGEX, MOBILE_NUM_REGEX } from "../../constants/regex";
import { useLanguage } from "../../store/providers/lang.provider";
import SubmitButton from "../../components/submit-button";
import * as authService from "../../services/auth-service";
import { useSnackbar } from "../../store/providers/snackbar.provider";

interface ForgotPasswordPageProps {}

const ForgotPasswordPage: FC<ForgotPasswordPageProps> = () => {
  const [credentials, setCredentials] = useState<Credentials>({});
  const { code } = useLanguage();
  const { addSnack } = useSnackbar();
  const navigate = useNavigate();

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
      const response = await authService.forgotPassword(credentials);
      if (response.success) {
        navigate(`/reset-password?number=${credentials.number}`);
        addSnack?.({
          severity: "success",
          message: response.msg,
        });
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
      <Typography variant="h1">Reset Password</Typography>

      <Stack spacing={4} className="content">
        {inputs.map((input) => {
          const hasError = credentials?.[input.name] === Errors.INPUT_ERROR;
          return (
            <TextField
            style={{
              margin:20
            }}
              {...input.props}
              error={hasError}
              helperText={hasError ? errorHelps[input.name]?.[code] : ""}
              name={input.name}
              key={input.name}
              onChange={updateCredentials(input.name, input.validator)}
            />
          );
        })}
        <Stack className="bottom_section" spacing={2}>
          <SubmitButton onClick={submit}>Reset Password</SubmitButton>
          <Stack direction="row" spacing={1}>
            <Typography color="secondary">Back To </Typography>
            <Link to="/login">
              <Typography className="link">Login</Typography>
            </Link>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export const inputs: InputField[] = [
  {
    name: "email",
    validator: (number) => EMAIL_REGEX.test(number),
    props: {
      placeholder: "Enter your email",
      label: "Email",
      required: true,
    },
  },
];

const errorHelps: ErrorHelps = {
  number: {
    en: "Entered Email is Invalid",
    si: "waradiiii",
  },
};

export default ForgotPasswordPage;
