import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React, { FC } from "react";
interface CountrySelectorProps {
  error?: boolean;
  helperText?: string;
  onChange?: () => void;
}

const CountrySelector: FC<CountrySelectorProps> = ({
  error,
  helperText,
  onChange,
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="country">Country</InputLabel>
      <Select
        labelId="country"
        id="country"
        label="User Type"
        fullWidth
        error={error}
        onChange={onChange}
      >
        <MenuItem>Country</MenuItem>
      </Select>
      {error && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};

export default CountrySelector;
