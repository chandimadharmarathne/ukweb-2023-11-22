import { Autocomplete, Box, Stack, TextField, Typography } from "@mui/material";
import React, { FC } from "react";
import { DATA_COUNTRIES, CountryType } from "../constants/countries";
import { getCountryImage } from "../services/profile-service";

interface CountrySelectProps {
  onChange?: (value: CountryType | null) => void;
  code?: typeof DATA_COUNTRIES[number]["code"];
  required?: boolean;
}

const CountrySelect: FC<CountrySelectProps> = ({
  onChange,
  code,
  required,
}) => {
  return (
    <Autocomplete
      options={DATA_COUNTRIES}
      fullWidth
      autoHighlight
      value={DATA_COUNTRIES.find((country) => code === country.code)}
      id="country-select"
      onChange={(_, value) => onChange?.(value)}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Stack direction="row" gap={1} component="li" {...props}>
          <Box flex={1}>
            <img
              loading="lazy"
              width={20}
              height={20}
              src={getCountryImage(option.code)}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt={option.label}
            />
          </Box>
          <Typography style={{ flex: 10 }}>
            {option.label} ({option.code}) {option.phone}
          </Typography>
        </Stack>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose a country"
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

export default CountrySelect;
