import React from "react";
import CountrySelect from "../../../../components/country-selector";
import DistrictSelector, {
  District,
} from "../../../../components/district-selector";
import selectInput from "../../../../components/select-input";
import { ALLOWED_TYPES } from "../../../../constants/allowed-images";
import { DATA_COUNTRIES } from "../../../../constants/countries";
import { DATA_EMPLOYEE_AMOUNTS } from "../../../../constants/input-data";
import {
  MOBILE_NUM_REGEX,
  TEXT_REGEX,
  URL_REGEX,
} from "../../../../constants/regex";
import {
  Credentials,
  CustomComponentProps,
  ErrorHelps,
  ExtendedInputField,
} from "../../../../utils/auth-types";
import { Checkbox } from "@mui/material";

export const PROFILE_PICTURE_ID = "@profile_pic";
export const essential: ExtendedInputField[] = [
  {
    name: "company_name",
    validator: (name) => TEXT_REGEX.test(name),
    
    props: { label: "Company Name", required: true },
  },
  {
    name: "company_address",
    validator: () => true,
    props: { label: "Address", required: false },
  },
  {
    name: "Online"  ,
    validator: () => true,
    props: { label: "Online", required: false },
    CustomComponent: ({ onChange,value,label }: CustomComponentProps) => {
      return (
       <div>
        
        <Checkbox
       
       checked={value}
        onChange={(e) => onChange({ target: { value: e.target.checked } })}

        />
        <label>{label}</label>
        </div>
      );
    },

  },
  {
    name: "company_number",
    column: 6,
    validator: (number) => MOBILE_NUM_REGEX.test(number),
    props: { label: "Contact Number", required: true },
  },
  {
    name:"other_contact_number",
    column: 6,
    validator: (number) => {
      if(number.length === 0) {
        return true;

      }
      else{
        return MOBILE_NUM_REGEX.test(number);
      }
    },
    props: { label: "Other Contact Number", required: false },
  },
  {
    name: "company_email",
    column: 6,
    validator: () => true,
    props: { label: "Email", type: "email", required: true },
  },
  {
    name: "company_fb_url",
    validator: (url) => {
      if (url.length === 0) {
        return true;
      } else {
        return URL_REGEX.test(url);
      }
    },
    props: { label: "Facebook Profile URL", type: "url" },
  },
  {
    name: "company_linkedin_url",
    validator: (url) => {
      if (url.length === 0) {
        return true;
      } else {
        return URL_REGEX.test(url);
      }
    },
    props: { label: "Linked in Profile URL", type: "url" },
  },
  {
    name: "company_website",
    validator: (url) => {
      if (url.length === 0) {
        return true;
      } else {
        return URL_REGEX.test(url);
      }
    },
    props: { label: "Company Website URL", type: "url" },
  },
  {
    name: "other_links",
    validator: (url) => {
      if (url.length === 0) {
        return true;
      } else {
        return URL_REGEX.test(url);
      }
    },
    props: { label: "Other Links", type: "url" },
  },
];

export const getCompanyInfo = (
  credentials: Credentials,
  districts?: District[]
) => {
  const companyInfo: ExtendedInputField[] = [
    {
      name: "company_register_number",
      validator: () => true,
      column: 6,
      props: { label: "Company Registration No " },
    },
    {
      name: "number_of_employees",
      validator: () => true,
      column: 6,
      CustomComponent: selectInput(
        DATA_EMPLOYEE_AMOUNTS,
        credentials.number_of_employees
      ),
      props: { label: "Number of employees", type: "number", required: true },
    },
    {
      name: "country",
      column: 4,
      props: { label: "Country", required: true },
      validator: (value) =>
        !!DATA_COUNTRIES.find((country) => country.code === value),
      CustomComponent: ({ onChange }: CustomComponentProps) => {
        return (
          <CountrySelect
            required
            code={credentials.country}
            onChange={(value) => onChange?.({ target: { value: value?.code } })}
          />
        );
      },
    },
    {
      name: "district",
      validator: () => true,
      column: 4,
      props: { required: true },
      dependancies: [credentials.country, districts],
      CustomComponent: ({ onChange }: CustomComponentProps) => (
        <DistrictSelector
          districts={districts!}
          required
          districtID={credentials.district}
          countryCode={credentials.country}
          onChange={(value) => onChange?.({ target: { value: value?.id } })}
        />
      ),
    },
    {
      name: "zip_code",
      validator: () => true,
      column: 4,
      props: { label: "Zip Code", required: false },
    },
  ];
  return companyInfo;
};

export const otherInfo: ExtendedInputField[] = [
  {
    name: "company_about",
    validator: () => true,
    props: {
      label: "About Company",
      multiline: true,
      rows: 10,
      required: true,
    },
  },
];
export const profilePic: ExtendedInputField = {
  name: "profile_picture",
  validator: (file: File) => {
    if (ALLOWED_TYPES.includes(file.type)) return true;
    return false;
  },
  props: {
    id: PROFILE_PICTURE_ID,
    type: "file",
    "aria-hidden": true,
    hidden: true,
    style: {
      display: "none",
    },
  },
};

export const errorHelps: ErrorHelps = {
  full_name: {
    en: "Only Letters are allowed",
  },
};
