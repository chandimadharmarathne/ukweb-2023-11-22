import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
interface DistrictSelectorProps {
  districts: District[];
  countryCode?: string;
  districtID?: string | number;
  onChange?: (value: District | null) => void;
  required?: boolean;
  label?: string;
}

const DistrictSelector: FC<DistrictSelectorProps> = ({
  countryCode,
  districtID,
  onChange,
  required,
  label,
  districts,
}) => {
  return (
    <Autocomplete  
      options={districts}
      disabled={!countryCode}
      fullWidth
      autoHighlight
      value={districts.find((d) => d.id === districtID)}
      id="country-select"
      onChange={(_, value) => onChange?.(value)}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => (
        <Stack direction="row" gap={1} component="li" {...props}>
          <Typography style={{ flex: 10 }}>{option.name}</Typography>
        </Stack>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ?? "Choose a Town / or City"}
          required={required}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password", // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export interface District {
  id: number;
  name: string;
  country_code: string;
  country_id: number;
}
export default DistrictSelector;
