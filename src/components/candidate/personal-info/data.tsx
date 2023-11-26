import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import React from "react";
import { DATA_COUNTRIES } from "../../../constants/countries";
import { DATA_GENDERS } from "../../../constants/input-data";
import { Lang, languages } from "../../../constants/languages";
import { NIC_REGEX, TEXT_REGEX } from "../../../constants/regex";
import {
  Credentials,
  CustomComponentProps,
  ErrorHelps,
  ExtendedInputField,
  InputField,
} from "../../../utils/auth-types";
import CountrySelect from "../../country-selector";
import DatePicker from "../../date-pick";
import DistrictSelector, { District } from "../../district-selector";
import selectInput from "../../select-input";

export const getInputs = (credentials: Credentials, districts?: District[]) => {
  const inputs: ExtendedInputField[] = [
    {
      name: "date_of_birth",
      props: { label: "Date of Birth", type: "date", required: true },
      validator: () => true,
      CustomComponent: ({
        onChange,
        label,
        required,
        value,
      }: CustomComponentProps) => {
        return (
          <DatePicker
            required={required}
            label={label}
            value={value}
            onChange={(value) => onChange({ target: { value } })}
          />
        );
      },
    },
    {
      name: "gender",
      props: { label: "Gender", required: true },
      validator: (gender) => !!DATA_GENDERS.find((gen) => gen.id === gender),
      CustomComponent: selectInput(
        DATA_GENDERS.filter((gen) => gen.id !== 0),
        credentials.gender
      ),
    },
    {
      name: "nic",
      validator: (nic) => NIC_REGEX.test(nic),
      props: { label: "NIC" },
    },
    {
      name: "languages",
      validator: (langs: { [key in Lang["code"]]: boolean }) => {
        return Object.keys(langs).every(
          (code) => !!languages.find((lang) => lang.code === code)
        );
      },
      props: { label: "Languages", required: true },
      CustomComponent: ({ onChange, value }: CustomComponentProps) => {
        const onChangeCheck = (e: any, checked: boolean) => {
          onChange?.({
            target: {
              value: { ...value, [e.target.name]: checked },
            },
          });
        };

        return (
          <Stack direction="row">
            {languages.map((lang) => (
              <FormControlLabel
                key={lang.code}
                label={lang.text}
                name={lang.code}
                control={<Checkbox />}
                onChange={onChangeCheck}
                checked={value?.[lang.code] ?? false}
              />
            ))}
          </Stack>
        );
      },
    },
    {
      name: "country",
      props: { label: "Country", required: true },
      validator: (value) =>
        !!DATA_COUNTRIES.find((country) => country.code === value),
      CustomComponent: ({ onChange, required }: CustomComponentProps) => {
        return (
          <CountrySelect
            required={required}
            code={credentials.country}
            onChange={(value) => onChange?.({ target: { value: value?.code } })}
          />
        );
      },
    },
    {
      name: "district",
      props: { label: "District", required: true },
      validator: () => true,
      dependancies: [credentials.country, districts],
      CustomComponent: ({ onChange, required }: CustomComponentProps) => (
        <DistrictSelector
          required={required}
          districts={districts!}
          districtID={credentials.district}
          countryCode={credentials.country}
          onChange={(value) => onChange?.({ target: { value: value?.id } })}
        />
      ),
    },
    {
      name: "zip_code",
      validator: () => true,
      props: { label: "Zip Code" },
    },
    {
      name: "address",
      validator: (address) => TEXT_REGEX.test(address),
      column: 12,
      props: { label: "Address" },
    },
  ];

  return inputs;
};

export const booleans: InputField[] = [
  {
    name: "visible_public",
    props: { label: "Make Address and NIC number visible to the public" },
  },
  {
    name: "visible_employer",
    props: { label: "Make Address and NIC number visible to the Employers" },
  },
];

export const errorHelps: ErrorHelps = {};
