import {
  Box,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { useErrors } from "../../../hooks/error.hook";
import { useLanguage } from "../../../store/providers/lang.provider";
import { Credentials, InputField } from "../../../utils/auth-types";
import Loader from "../../../views/loader/Loader";
import SubmitButton from "../../submit-button";
import { Page } from "../edit.data";
import { Response } from "../edit.types";
import { booleans, errorHelps, getInputs } from "./data";

const FamilyInfo: Page = ({ id, updateCompleted }) => {
  const [credentials, setCredentials] = useState<Credentials>({});
  const [switches, setSwitches] = useState({});
  const { code } = useLanguage();
  const { data, loading, submit } = useCandidateBackend<Response>(id);
  const { checkErrors, updateError, hasErrors, addError } = useErrors(
    getInputs(credentials)
  );

  useEffect(() => {
    if (data) {
      setCredentials(data.data);
      setSwitches(data.switches);
    }
  }, [data]);

  const updateCredentials =
    (name: string, validate: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      updateError(name, validate?.(value));
      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const onChangeSwitch = (name: string) => (_: SyntheticEvent, on: boolean) => {
    setSwitches((prev) => ({ ...prev, [name]: on }));
  };
  const submitData = async () => {
    try {
      checkErrors(credentials);

      await submit({ data: credentials, switches });
      updateCompleted(true);
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <Box>
      <Grid container padding={2} spacing={2}>
        {getInputs(credentials).map((input) => {
          const hasError = hasErrors(input.name);

          const Input = input.CustomComponent ?? TextField;
          return (
            <Grid item xs={12} md={input.column ?? 6} key={input.name}>
              <Input
                {...input.props}
                error={hasError}
                name={input.name}
                fullWidth
                value={credentials?.[input.name] ?? ""}
                onChange={updateCredentials(input.name, input.validator)}
                helperText={hasError ? errorHelps[input.name]?.[code] : ""}
              />
            </Grid>
          );
        })}
      </Grid>
      <Stack padding={2}>
        {booleans.map((input) => (
          <FormControlLabel
            key={input.name}
            label={String(input.props?.label)}
            labelPlacement="start"
            color="primary"
            defaultChecked={data?.switches?.[input.name]}
            control={<Switch />}
            style={{ justifyContent: "space-between", maxWidth: 500 }}
            onChange={onChangeSwitch(input.name)}
          />
        ))}
      </Stack>

      <SubmitButton onClick={submitData}>Save Changes</SubmitButton>
    </Box>
  );
};

export default FamilyInfo;
