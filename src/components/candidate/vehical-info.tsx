import { Box, Grid, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  DATA_VEHICLE_MODELS,
  DATA_LICENSE_TYPES,
} from "../../constants/input-data";
import useCandidateBackend from "../../hooks/candidate-edit.hook";
import { useErrors } from "../../hooks/error.hook";
import { useLanguage } from "../../store/providers/lang.provider";
import { Credentials, ErrorHelps, InputField } from "../../utils/auth-types";
import Loader from "../../views/loader/Loader";
import selectInput from "../select-input";
import SubmitButton from "../submit-button";
import { Page } from "./edit.data";

const VehicalInfo: Page = ({ id, updateCompleted }) => {
  const [credentials, setCredentials] = useState<Credentials>({});
  const { code } = useLanguage();

  const { data, loading, submit } = useCandidateBackend<Credentials>(id);

  const { checkErrors, updateError, hasErrors, addError } = useErrors(
    getInputs(credentials) as any
  );

  useEffect(() => {
    if (data) {
      setCredentials(data);
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

  const submitData = async () => {
    try {
      checkErrors(credentials);
      await submit(credentials);
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
            <Grid item xs={12} md={6} key={input.name}>
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

      <SubmitButton onClick={submitData}>Save Changes</SubmitButton>
    </Box>
  );
};

const getInputs = (credentials: Credentials) => {
  const inputs: InputField[] = [
    {
      name: "vehicle_model",
      props: { label: "Vehicle Model",  },
      validator: (value) => true
       ,
      CustomComponent: selectInput(
        DATA_VEHICLE_MODELS,
        credentials.vehicle_model
      ),
    },
    {
      name: "license_type",
      props: { label: "License Type",  },
      validator: (value) => true,
      CustomComponent: selectInput(
        DATA_LICENSE_TYPES,
        credentials.license_type
      ),
    },
  ];

  return inputs;
};

const errorHelps: ErrorHelps = {};

export default VehicalInfo;
