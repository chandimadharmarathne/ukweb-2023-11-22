import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import {
  DATA_LICENSE_TYPES,
  DATA_SKILL_LEVELS,
} from "../../constants/input-data";
import { languages } from "../../constants/languages";
import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  MOBILE_NUM_REGEX,
  TEXT_REGEX,
} from "../../constants/regex";
import {
  Credentials,
  CustomComponentProps,
  ExtendedInputField,
} from "../../utils/auth-types";
import CountrySelect from "../country-selector";
import DatePicker from "../date-pick";
import selectInput from "../select-input";
import DistrictSelector from "../district-selector";
import { useDistrict } from "../../hooks/district.hook";

export const getProfileInputs = (
  credentials: Credentials
): ExtendedInputField[] => [
  {
    name: "first_name",
    validator: (name) => FULL_NAME_REGEX.test(name),
    props: { label: "First Name", required: true },
  },
  {
    name: "last_name",
    validator: (name) => FULL_NAME_REGEX.test(name),
    props: { label: "Last Name", required: true },
  },
  {
    name: "job_title",
    validator: (job) => FULL_NAME_REGEX.test(job),
    props: { label: "Job Title", required: true },
  },
  {
    name: "date_of_birth",
    validator: (_dob) => true,
    props: { label: "Date of Birth", type: "date",required: true },
    CustomComponent: ({ onChange, label }: CustomComponentProps) => {
      return (
        <DatePicker
        required
          value={credentials.date_of_birth}
          label={label}
          onChange={(value) => onChange({ target: { value } })}
        />
      );
    },
  },
  {
    name: "email",
    validator: (email) => EMAIL_REGEX.test(email),
    props: { label: "Email", required: true },
  },
];

export const otherInputs =(
  credentials: Credentials
): ExtendedInputField[] => [
  {
    name: "contact_number",
    validator: (phone) =>{
      if(phone?.length === 0){
        return true
      }else{
        return MOBILE_NUM_REGEX.test(phone)
      }
    },
    props: { label: "Phone", type: "tel" },
  },
  {
    name: "country",
    validator: () => true,
    props: { label: "Country" },
    // @ts-ignore
    CustomComponent: ({ onChange, defaultValue }: CustomComponentProps) => {
      return (
        <CountrySelect
          code={credentials.country}
          onChange={(value) => onChange?.({ target: { value: value?.code } })}
        />
      );
    },
  },
  {
    name: "nationality",
    validator: (nation) => !!languages.find((lang) => lang.code === nation),
    props: { label: "Nationality" },
    CustomComponent: selectInput(
      languages.map((lang) => ({
        id: lang.code,
        label: lang.text,
      })),
      "NO_CONTROL"
    ),
  },
  {
    name: "city",
    validator: (city) =>{
      if(city?.length === 0){
        return true
      }else{
        return TEXT_REGEX.test(city)
      }
    },
    props: { label: "City" },
    CustomComponent: ({ onChange }: CustomComponentProps) => {
      const districts = useDistrict(credentials.country);
      return (
        <DistrictSelector
        districts={districts}
        districtID={credentials.city}
        countryCode={credentials.country}
        onChange={(value) =>  onChange?.({ target: { value: value?.id } })}
      />
      );
    },
  },
  {
    name: "address",
    validator: (address) => {
      if(address?.length === 0){
        return true
      }
      else{
        return TEXT_REGEX.test(address)
      }
    },
    props: { label: "Address",required: true },
  },
  {
    name: "zip_code",
    validator: (code) => {
      if(code?.length === 0){
        return true
      }
      else{
        return TEXT_REGEX.test(code)
      }
    },
    props: { label: "Postal Code" },
  },
  {
    name: "driving_licence",
    validator: () => true,
    props: { label: "Do you have Driving Licence" },
    CustomComponent: selectInput(DATA_LICENSE_TYPES, "NO_CONTROL"),
  },
];

export const professionalInputs: ExtendedInputField[] = [
  {
    name: "title",
    validator: (title) => {
      if(title?.length === 0){
        return true
      }
      else{
        return FULL_NAME_REGEX.test(title)
      }
    },
    props: {  label: "Title" },
  },
  {
    name: "company",
    validator: (company) => {
      if(company?.length === 0){
        return true
      }
      else{
        return FULL_NAME_REGEX.test(company)
      }
    },
    props: {  label: "Company" },
  },
  {
    name: "from",
    validator: () => true,
    column: 4,
    props: { label: "From", type: "date" },
    CustomComponent: ({ onChange, label, value }: CustomComponentProps) => (
      <DatePicker
        value={value}
        label={label}
        onChange={(value) => onChange({ target: { value } })}
      />
    ),
  },
  {
    name: "to",
    validator: () => true,
    column: 4,
    props: { label: "To", type: "date" },
    CustomComponent: ({ onChange, label, value }: CustomComponentProps) => (
      <DatePicker
        value={value}
        label={label}
        onChange={(value) => onChange({ target: { value } })}
      />
    ),
  },
  {
    name: "is_working",
    validator: () => true,
    column: 4,
    props: { label: "Currently working here" },
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
        onChange={(_, checked) => onChange?.({ target: { value: checked } })}
      />
    ),
  },
];
export const eduInputs: ExtendedInputField[] = [
  {
    name: "title",
    validator: (title) => FULL_NAME_REGEX.test(title),
    props: { required: true, label: "Title" },
  },
  {
    name: "institute",
    validator: (institute) => FULL_NAME_REGEX.test(institute),
    props: { required: true, label: "Institute" },
  },
  {
    name: "from",
    validator: () => true,
    column: 4,
    props: { label: "From", type: "date" },
    CustomComponent: ({ onChange, label, value }: CustomComponentProps) => (
      <DatePicker
        value={value}
        label={label}
        onChange={(value) => onChange({ target: { value } })}
      />
    ),
  },
  {
    name: "to",
    validator: () => true,
    column: 4,
    props: { label: "To", type: "date" },
    CustomComponent: ({ onChange, label, value }: CustomComponentProps) => (
      <DatePicker
        value={value}
        label={label}
        onChange={(value) => onChange({ target: { value } })}
      />
    ),
  },
  {
    name: "is_studying",
    validator: () => true,
    column: 4,
    props: { label: "Currently Studing here" },
    CustomComponent: ({ onChange, label, name }: CustomComponentProps) => (
      <FormControlLabel
        label={String(label)}
        control={<Checkbox />}
        name={name}
        onChange={(_, checked) => onChange?.({ target: { value: checked } })}
      />
    ),
  },
];
export const extraCurricularInputs: ExtendedInputField[] = [
  {
    name: "description",
    validator: (title) => {
      if(title?.length === 0){
        return true
      }
      else{
        return FULL_NAME_REGEX.test(title)
      }
    },
    props: {  label: "Description" },
  },
  {
    name: "from",
    validator: () => true,
    column: 4,
    props: { label: "From", type: "date" },
    CustomComponent: ({ onChange, label, value }: CustomComponentProps) => (
      <DatePicker
        value={value}
        label={label}
        onChange={(value) => onChange({ target: { value } })}
      />
    ),
  },
  {
    name: "to",
    validator: () => true,
    column: 4,
    props: { label: "To", type: "date" },
    CustomComponent: ({ onChange, label, value }: CustomComponentProps) => (
      <DatePicker
        value={value}
        label={label}
        onChange={(value) => onChange({ target: { value } })}
      />
    ),
  },
];
export const skillsInputs: ExtendedInputField[] = [
  {
    name: "skill",
    column: 6,
    validator: (title) => FULL_NAME_REGEX.test(title),
    props: { required: true, label: "Skill" },
  },
  {
    name: "skill_level",
    column: 6,
    validator: () => true,
    props: { required: true, label: "Skill Level" },
    CustomComponent: selectInput(DATA_SKILL_LEVELS, "NO_CONTROL"),
  },
];
export const referenceInputs: ExtendedInputField[] = [
  {
    name: "person",
    column: 6,
    validator: (title) => FULL_NAME_REGEX.test(title),
    props: { required: true, label: "Contact Person" },
  },
  {
    name: "company",
    column: 6,
    validator: (title) => FULL_NAME_REGEX.test(title),
    props: { required: true, label: "Company" },
  },
  {
    name: "number",
    column: 6,
    validator: (num) => MOBILE_NUM_REGEX.test(num),
    props: { required: true, label: "Contact number" },
  },
  {
    name: "email",
    column: 6,
    validator: (email) => EMAIL_REGEX.test(email),
    props: { required: true, label: "Email" },
  },
];
export const referenceInputs1: ExtendedInputField[] = [
  {
    name: "person",
    column: 6,
    validator: (title) => FULL_NAME_REGEX.test(title),
    props: { required: true, label: "Contact Person" },
  },
  {
    name: "number",
    column: 6,
    validator: (num) => MOBILE_NUM_REGEX.test(num),
    props: { required: true, label: "Contact number" },
  },
 
];