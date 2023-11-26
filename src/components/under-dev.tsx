import {
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FC, useState } from "react";
import { EMAIL_REGEX, PASSWORD_REGEX } from "../constants/regex";
import { useToggle } from "../hooks/toggle.hook";
import { useSnackbar } from "../store/providers/snackbar.provider";
import { Credentials, InputField } from "../utils/auth-types";
import { Errors } from "../utils/errors";
import { Main } from "./styled-common/main";
import SubmitButton from "./submit-button";

interface UnderDevProps {
  login: (data: Credentials) => void | Promise<void>;
}

const UnderDev: FC<UnderDevProps> = ({ login }) => {
  const { addError } = useSnackbar();

  const [show, toggleShow] = useToggle();
  const [credentials, setCredentials] = useState<Credentials>({});

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
      await login(credentials);
    } catch (error: any) {
      toggleShow();
      addError?.(error.message);
    }
  };

  return (
    <Main>
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <img
          width={240}
          height={240}
          src="/assets/under-devolopment.png"
          alt="Under development"
        />
        <Typography variant="h1" color="primary">
          Maintainance Mode
        </Typography>
        <Typography textAlign="center" paragraph color="secondary">
          The website you are looking for is under maintainance mode. Please
          visit again after a while to witness this wonderful website
        </Typography>
        <SubmitButton onClick={toggleShow}>Login</SubmitButton>

        <Dialog open={show} onClose={toggleShow} fullWidth maxWidth="sm">
          <DialogContent>
            <Typography paragraph color="secondary">
              If you are the admin of this website, please login{" "}
            </Typography>
            <Stack spacing={4} className="content">
              {inputs.map((input) => {
                const hasError =
                  credentials?.[input.name] === Errors.INPUT_ERROR;
                const Input = input.CustomComponent ?? TextField;
                return (
                  <Input
                    {...input.props}
                    error={hasError}
                    name={input.name}
                    key={input.name}
                    onChange={updateCredentials(input.name, input.validator)}
                    fullWidth
                  />
                );
              })}
            </Stack>
            <DialogActions sx={{ justifyContent: "center" }}>
              <SubmitButton onClick={submit}>Login</SubmitButton>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Container>
    </Main>
  );
};

export const inputs: InputField[] = [
  {
    name: "email",
    validator: (email) => EMAIL_REGEX.test(email),
    props: {
      placeholder: "Enter your Email",
      label: "Email",
      required: true,
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
];

export default UnderDev;
