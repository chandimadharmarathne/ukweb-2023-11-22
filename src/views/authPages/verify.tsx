import {
  Button,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import SubmitButton from "../../components/submit-button";
import { REGISTERED_NUM } from "../../constants/keys";
import { OTP_REGEX } from "../../constants/regex";
import * as authService from "../../services/auth-service";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Credentials, ErrorHelps, InputField } from "../../utils/auth-types";
import { Errors } from "../../utils/errors";

const VerifyPage: FC = () => {
  const [credentials, setCredentials] = useState<Credentials>({});
  const { addSnack } = useSnackbar();
  const { code } = useLanguage();
  const navigate = useNavigate();
  const number = sessionStorage.getItem(REGISTERED_NUM);

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
      const response = await authService.verify({ ...credentials, number });
      if (response.success) {
        sessionStorage.removeItem(REGISTERED_NUM);
        addSnack?.({
          severity: "success",
          message: response.result,
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

  if (!number) return <Navigate to="/" />;
  return (
    <>
      <Typography variant="h1">Verify</Typography>

      <Stack spacing={4} className="content">
        {getInputs(credentials, number).map((input) => {
          const hasError = credentials?.[input.name] === Errors.INPUT_ERROR;
          const Input = input.CustomComponent ?? TextField;
          return (
            <Input
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
          <SubmitButton onClick={submit}>Verify</SubmitButton>
        </Stack>
      </Stack>
    </>
  );
};
export const getInputs = (
  credentails: Credentials,
  number?: any
): InputField[] => [
  {
    name: "otp",
    validator: (otp: string) => OTP_REGEX.test(otp),
    props: {
      placeholder: "Enter your OTP code",
      label: "OTP Code",
      required: true,
      InputProps: {
        style: { padding: 0 },
        endAdornment: <RequestOTP number={number} />,
      },
    },
  },
];

const RequestOTP: FC<{ number: string }> = ({ number }) => {
  const { addError } = useSnackbar();
  const resend = async () => {
    try {
      await authService.resendOTP(number);
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  return (
    <InputAdornment
      position="end"
      variant="filled"
      style={{ alignSelf: "stretch", height: 55, maxHeight: "none" }}
    >
      <Button
        variant="contained"
        disableElevation
        style={{ alignSelf: "center", height: "inherit" }}
        onClick={resend}
      >
        Request OTP Again
      </Button>
    </InputAdornment>
  );
};
const errorHelps: ErrorHelps = {
  otp: {
    en: "Need to be a code with 6 numbers",
  },
};

export default VerifyPage;
