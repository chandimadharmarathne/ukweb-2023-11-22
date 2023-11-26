import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import React from "react";
import { CustomComponentProps } from "../utils/auth-types";

type SelectInput = (
  selectables: { id: string | number; label?: string | React.ReactNode }[],
  value?: string | number | "NO_CONTROL"
) => (props: CustomComponentProps & SelectProps<any>) => JSX.Element;

const selectInput: SelectInput =
  (selectables, value) =>
  ({ onChange, helperText, error, label, name, required, ...props }) => {
    return (
      <FormControl fullWidth>
        <InputLabel id={name} required={required}>
          {label}
        </InputLabel>
        <Select
          labelId={name}
          id={name}
          label={label}
          error={error}
          value={
            value || value === 0 // 0 can be a id of a field
              ? value === "NO_CONTROL"
                ? undefined
                : value
              : ""
          }
          fullWidth
          onChange={onChange}
          {...props}
        >
          {selectables.map((selectable) => (
            <MenuItem value={selectable.id} key={selectable.id}>
              {selectable.label}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  };

export default selectInput;
