import React from "react";

import CountrySelect from "../../../components/country-selector";
import DatePicker from "../../../components/date-pick";
import DistrictSelector, {
  District,
} from "../../../components/district-selector";
import {
  DATA_FILTERS,

} from "../../../components/find-job/sections/industry.data";
import selectInput from "../../../components/select-input";
import {
  DATA_EDU_LEVELS,
  DATA_GENDERS,
  DATA_JOB_TYPES,
  DATA_SALARY_TYPES,

} from "../../../constants/input-data";
import { TEXT_REGEX } from "../../../constants/regex";
import {
  Credentials,
  CustomComponentProps,
  ErrorHelps,
  ExtendedInputField,
  InputField,
} from "../../../utils/auth-types";
import { Checkbox } from "@mui/material";
import MultiDistrictSelector from "../../../components/multi-district-selector";
import { DATA_INDUSTRY } from "../../../components/find-job/sections/industry.data";
export const getEssentials = (
  credentials: Credentials,
  districts?: District[]
) => {
  const jobTitles =
    DATA_FILTERS.find((item) => item.id === credentials.industry)?.content?.map(
      (job) => ({ id: job.id, label: job.label?.en })
    ) ?? [];

  const essential: ExtendedInputField[] = [

    {
      name: "job_title",
      column: 6,
      dependancies: [jobTitles],
      CustomComponent: selectInput(jobTitles, credentials.job_title),
      validator: (value) => !!jobTitles.find((job) => job.id === value),
      props: {
        label: "Job Title",
        disabled: !credentials.industry,
        required: true,
      },
    },
    {
      name: "job_title_description",
      validator: (title) => TEXT_REGEX.test(title),
      props: {
        label: "Job Title Description",
        required: true,
      },
    },

    {
      name: "country",
      CustomComponent: ({ onChange }: CustomComponentProps) => {
        return (
          <CountrySelect
            code={credentials.country}
            onChange={(value) => onChange?.({ target: { value: value?.code } })}
          />
        );
      },
      validator: () => true,
      column: 4,
      props: { label: "Country", required: true },
    },
    {
      name: "hire_locations",
      validator: () => true,
      column: 4,
      props: { label: "Location", required: true },
      dependancies: [credentials.country, districts],
      CustomComponent: ({
        onChange,
        required,
        label,
      }: CustomComponentProps) => (
        <MultiDistrictSelector
          districts={districts!}
          label={label}
          required={required}
          districtID={Array.isArray(credentials.hire_locations) ? credentials.hire_locations : [credentials.hire_locations]}
          countryCode={credentials.country}
          onChange={(value) => onChange?.({ target: { value: value?.map((v:any) => v?.id) } })}
        />
      ),
    },
    {
      name: "job_type",
      column: 4,
      CustomComponent: selectInput(DATA_JOB_TYPES, "NO_CONTROL"),
      validator: (value) => !!DATA_JOB_TYPES.find((type) => type.id === value),
      props: { label: "Job Type", required: true },
    },
    {
      name: "closing_date",
      validator: () => true,
      column: 4,
      props: { label: "Closing Date", type: "date", required: true },
      CustomComponent: ({
        onChange,
        label,
        required,
      }: CustomComponentProps) => {
        return (
          <DatePicker
            required={required}
            label={label}
            value={credentials.closing_date}
            onChange={(value) => onChange({ target: { value } })}
          />
        );
      },
    },
    {
      name: "gender",
      column: 4,
      CustomComponent: selectInput(DATA_GENDERS, "NO_CONTROL"),
      props: { label: "Gender", required: true },
      validator: (gender) => !!DATA_GENDERS.find((gen) => gen.id === gender),
    },
    {
      name: "edu_level",
      column: 4,
      props: { label: "Minimum Education Qualification", required: true },
      CustomComponent: selectInput(DATA_EDU_LEVELS, "NO_CONTROL"),
      validator: (level) => !!DATA_EDU_LEVELS.find((edu) => edu.id === level),
    },
    {
      name: "age_from",
      column: 2,
      props: { label: "Age Limit From", type: "number", required: true },
      validator: (age) => parseInt(age) < 100,
    },
    {
      name: "age_to",
      column: 2,
      props: { label: "Age Limit To", type: "number", required: true },
      validator: (age) => parseInt(age) < 100,
    },
    {
      name: "salary",
      validator: () => true,
      column: 4,
      props: { label: "Salary", type: "number", required: true },
    },
    {
      name: "salary_type",
      validator: () => true,
      column: 2,
      CustomComponent: selectInput(DATA_SALARY_TYPES, "NO_CONTROL"),
      props: { label: "Salary Type", required: true },
    },
    {
      name: "salary_negotiable",
      validator: () => true,
      column: 2,
      CustomComponent: ({ onChange,value }: CustomComponentProps) =>{
        return (
          <div>
       
             <Checkbox
          checked={value ?? false}
          onChange={(e) => onChange?.({ target: { value: e.target.checked } })}
        />
         <label>Salary Negotiable</label>
          </div>
        );
      },
      props: { label: "Salary Negotiable" },
          
    }
  ];
  return essential;
};
const textareaValidator = (text: string) => TEXT_REGEX.test(text);

export const textareaFields: InputField[] = [
  {
    name: "job_description",
    props: { label: "Job Description", required: true },
    validator: textareaValidator,
  },
  {
    name: "role_and_responsibilities",
    props: { label: "Role & Responsibilities", required: true },
    validator: textareaValidator,
  },
  {
    name: "edu_qualifications",
    props: { label: "Professional Qualifications", required: true },
    validator: textareaValidator,
  },
  {
    name: "professional_qualifications",
    props: { label: "Education Qualifications", required: true },
    validator: textareaValidator,
  },
];

export const getOtherInputs = (
  credentials: Credentials
): ExtendedInputField[] => [
  {
    name: "hiring_amount",
    validator: (amount) => 
    {
      if(amount?.length === 0) {
        return true
      }
      else{
        return !isNaN(amount)
      }

    },
    column: 4,
    props: {
      label: "Hiring Amount",
      type: "number",
      inputMode: "numeric",
      required: false,
    },
  },
  {
    name: "workingtime",
    validator: (hours) => {
      if(hours?.length === 0) {
        return true
      }
      else{
        return parseInt(hours) < 24
      }
    },
    column: 4,
    props: {
      label: "Working Time (hours per day)",
      type: "number",
      required: false,
    },
  },
  {
    name: "interviewdt",
    validator: () => true,
    column: 4,
    props: {
      label: "Interview Date",
    },
    CustomComponent: ({ onChange, label }: CustomComponentProps) => (
      <DatePicker
        label={label}
        value={credentials.interviewdt}
        onChange={(value) => onChange({ target: { value } })}
      />
    ),
  },
];

export const booleans: InputField[] = [
  {
    name: "food",
    props: { label: "Food", required: false },
  },
  {
    name: "accomodation",
    props: { label: "Accomodation", required: false },
  },
];
export const errorHelps: ErrorHelps = {
  job_title: {
    en: "Only Letters are allowed",
  },
  workingtime: {
    en: "Max 24 hours a day",
  },
};
