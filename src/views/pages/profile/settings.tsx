import {
  Box,
  Container,
  Paper,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import SubmitButton from "../../../components/submit-button";
import {
  FULL_NAME_REGEX,
  MOBILE_NUM_REGEX,
  PASSWORD_REGEX,
} from "../../../constants/regex";
import { useAuthBackend } from "../../../hooks/backend";
import * as profileService from "../../../services/profile-service";
import { useLanguage } from "../../../store/providers/lang.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Credentials, ErrorHelps, InputField } from "../../../utils/auth-types";
import { Errors } from "../../../utils/errors";
import Loader from "../../loader/Loader";

const StyledMain = styled("main")(({ theme }) => {
  return {
    padding: theme.spacing(5, 1),
    background: "#f1f1f1",
    ".paper": {
      minHeight: "80vh",
    },

    ".image > img": {
      width: "100%",
      height: "100%",
    },
  };
});
const SettingsPage: FC = () => {
  const { data, loading, error } = useAuthBackend<Credentials, Error>(
    "/profile-settings"
  );

  const [credentials, setCredentials] = useState<Credentials>({});
  const { code } = useLanguage();
  const { addSnack } = useSnackbar();

  useEffect(() => {
    if (data) setCredentials(data);
    if (error)
      addSnack?.({
        severity: "error",
        message: error.message,
      });
  }, [data, error]);

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
      const res = await profileService.updateSettings(credentials);
      if (res.success)
        addSnack?.({
          severity: "success",
          message: "Successfully Updated",
        });
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <StyledMain>
      <Container>
        <Paper elevation={0} className="paper">
          {loading ? (
            <Loader loading={loading} />
          ) : (
            <Box padding={5}>
              <Typography variant="h1" color="primary">
                Settings
              </Typography>

              <Stack direction="row" spacing={10}>
                <Box flex={1}>
                  <Stack spacing={2} alignItems="center">
                    {inputs.map((input) => {
                      const hasError =
                        credentials?.[input.name] === Errors.INPUT_ERROR;
                      return (
                        <TextField
                          fullWidth
                          {...input.props}
                          error={hasError}
                          name={input.name}
                          key={input.name}
                          defaultValue={data?.[input.name]}
                          onChange={updateCredentials(
                            input.name,
                            input.validator
                          )}
                          helperText={
                            hasError ? errorHelps[input.name]?.[code] : ""
                          }
                        />
                      );
                    })}
                    <SubmitButton onClick={submit}>Save Changes</SubmitButton>
                  </Stack>
                </Box>
                <Box
                  flex={1}
                  className="image"
                  display={{ md: "block", xs: "none" }}
                >
                  <img src="/assets/settings.png" alt="" />
                </Box>
              </Stack>
            </Box>
          )}
        </Paper>
      </Container>
    </StyledMain>
  );
};

export const inputs: InputField[] = [
  {
    name: "full_name",
    validator: (name) => FULL_NAME_REGEX.test(name),
    props: {
      placeholder: "Enter your Full Name",
      label: "Full Name",
      required: true,
    },
  },
  {
    name: "number",
    validator: (number) => MOBILE_NUM_REGEX.test(number),
    props: {
      placeholder: "Enter your mobile number",
      label: "New Mobile Number",
      required: true,
    },
  },
  {
    name: "current_password",
    validator: (password) => PASSWORD_REGEX.test(password),
    props: {
      placeholder: "Password securely hashed",
      type: "password",
      required: true,
      label: "Current Password",
    },
  },
  {
    name: "new_password",
    validator: (password) => PASSWORD_REGEX.test(password),
    props: {
      placeholder: "New Password",
      type: "password",
      required: true,
      label: "New Password",
    },
  },
  {
    name: "retyped_new_password",
    validator: (password) => PASSWORD_REGEX.test(password),
    props: {
      placeholder: "Re-Enter new password",
      type: "password",
      required: true,
      label: "Re-Enter new password",
    },
  },
];

const errorHelps: ErrorHelps = {
  number: {
    en: "Entered Number is Invalid",
    si: "waradiiii",
  },
};

export default SettingsPage;
