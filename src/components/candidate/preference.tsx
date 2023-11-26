import { Checkbox, FormControlLabel, Grid, Stack } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { DATA_COUNTRIES } from "../../constants/countries";
import {
  DATA_JOB_TYPES,
  DATA_NOTICE_TIME,
  DATA_SALARY_TYPES,
} from "../../constants/input-data";
import useCandidateBackend from "../../hooks/candidate-edit.hook";
import { useDistrict } from "../../hooks/district.hook";
import { useErrors } from "../../hooks/error.hook";
import { useLanguage } from "../../store/providers/lang.provider";
import {
  Credentials,
  CustomComponentProps,
  ErrorHelps,
  ExtendedInputField,
  InputField,
} from "../../utils/auth-types";
import Loader from "../../views/loader/Loader";
import CountrySelect from "../country-selector";
import DistrictSelector, { District } from "../district-selector";
import FormInput from "../input";
import selectInput from "../select-input";
import SubmitButton from "../submit-button";
import { Page } from "./edit.data";
import MultiDistrictSelector from "../multi-district-selector";
import MultiJobs from "../multi-jobtypes";

const JobPreference: Page = ({ id, updateCompleted }) => {
  const [credentials, setCredentials] = useState<Credentials>({});
  const { code } = useLanguage();
  const districts = useDistrict(credentials.country);

  const { checkErrors, updateError, hasErrors, addError } = useErrors(
    getInputs(credentials) as any
  );

  const { data, loading, submit } = useCandidateBackend<Credentials>(id);

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

  const submitForm = async () => {
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
    <Stack>
      <Grid container padding={2} spacing={2}>
        {getInputs(credentials, districts).map((input) => {
          const hasError = hasErrors(input.name);
          return (
            <Grid item xs={12} md={input.column ?? 6} key={input.name}>
              <FormInput
                error={hasError}
                input={input}
                value={credentials?.[input.name] ?? ""}
                onChange={updateCredentials(input.name, input.validator)}
                helperText={hasError ? errorHelps[input.name]?.[code] : ""}
              />
            </Grid>
          );
        })}
      </Grid>

      <SubmitButton onClick={submitForm} style={{ alignSelf: "flex-end" }}>
        Save Changes
      </SubmitButton>
    </Stack>
  );
};
const getInputs = (credentials: Credentials, districts?: District[]) => {
  const inputs: ExtendedInputField[] = [
    {
      name: "job_type",
      props: { label: "Job Type", required: true },
      column: 4,
      CustomComponent: selectInput(DATA_JOB_TYPES, credentials.job_type),
      validator: (value) => !!DATA_JOB_TYPES.find((type) => type.id === value),
    },
    {
      name: "salary",
      column: 3,
      validator: (value) => !!value,
      props: { label: "Expected Salary Rs.", type: "number", required: true },
    },{
      name: "price_negotiable",
      validator: () => true,
      column: 4,
      props: { label: "Negotiable", defaultChecked: false },
      CustomComponent: ({
        onChange,
        label,
        name,
        value,
      }: CustomComponentProps) => (
        <FormControlLabel
          label={String(label)}
          control={<Checkbox checked={!!value} />}
          name={name}
          onChange={(_: any, checked: any) => onChange?.({ target: { value: checked } })}
        />
      ),
    },
    {
      name: "salary_type",
      column: 4,
      CustomComponent: selectInput(DATA_SALARY_TYPES, credentials.salary_type),
      validator: (value) =>
        !!DATA_SALARY_TYPES.find((type) => type.id === value),
      props: { label: "Expected Salary For", type: "number", required: true },
    },

    {
      name: "country",
      validator: (value) =>
        !!DATA_COUNTRIES.find((country) => country.code === value),
      CustomComponent: ({ onChange }: CustomComponentProps) => {
        return (
          <CountrySelect
            code={credentials.country}
            onChange={(value) => onChange?.({ target: { value: value?.code } })}
          />
        );
      },
    },
    {
      name: "like_locations",
      validator: () => true,
      props: { label: "Liked Location" },
      dependancies: [credentials.country, districts],
      CustomComponent: ({ onChange }: CustomComponentProps) => (
        <MultiDistrictSelector
          districts={districts?.filter(
            (obj, index, self) => index === self.findIndex((o) => o.id === obj.id && o.name === obj.name)
          ) ?? []}
          districtID={credentials.like_locations}
          countryCode={credentials.country}
          onChange={(value) => {
            onChange?.({ target: { value: value?.map((v) => v.id) } })
          
          }}
        />
      ),
    },
    {
      name: "like_jobs",
      validator: () => true,
      props: { label: "Liked Job"},
      CustomComponent: ({ onChange }: CustomComponentProps) => (
        <MultiJobs
         
          districts={DATA_JOB_TYPES}
          districtID={credentials.like_jobs}
          countryCode={credentials.country}
          onChange={(value) => {
            console.log(value)
            onChange?.({ target: { value: value?.map((v: { id: any; }) => v.id) } })
          
          }}
        />
      )
    },
    {
      name: "notice_period",
      validator: (value) => true,
      column: 3,
      props: { label: "Notice Period", },
    },
    {
      name: "notice_period_type",
      column: 3,
      CustomComponent: selectInput(
        DATA_NOTICE_TIME,
        credentials.notice_period_type
      ),
      validator: (value) => true,
      props: { label: "Notice Period Type" },
    },
  ];
  return inputs;
};

const errorHelps: ErrorHelps = {};

export default JobPreference;
