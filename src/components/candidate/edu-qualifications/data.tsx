import { Checkbox, FormControlLabel } from "@mui/material";
import React from "react";
import { FULL_NAME_REGEX } from "../../../constants/regex";
import {
  CustomComponentProps,
  ErrorHelps,
  ExtendedInputField,
  InputField,
} from "../../../utils/auth-types";
import DatePicker from "../../date-pick";
import { SectionProps } from "./section";

export type Section = SectionProps & {
  id: string;
  inputs?: InputField[];
  errorHelps?: ErrorHelps;
};
export const inputSections: Section[] = [
 
];

export const otherInputs: ExtendedInputField[] = [
  {
    name: "title",
    validator: (title) =>  true,
    props: {  label: "Title" },
  },
  {
    name: "institute",
    validator: (institute) => true,
    props: {  label: "Institute" },
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
    props: { label: "Currently Studing here", defaultChecked: false },
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
export const booleans: InputField[] = [
  {
    name: "make_visible",
    props: { label: "Results make visible to the public" },
  },
];
