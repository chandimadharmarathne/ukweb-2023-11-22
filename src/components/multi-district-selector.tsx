import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";

interface DistrictSelectorProps {
  districts: District[] | [];
  countryCode?: string;
  districtID?: any;
  onChange?: (values: District[] | null) => void;
  required?: boolean;
  label?: string;
}

const MultiDistrictSelector: FC<DistrictSelectorProps> = ({
  countryCode,
  districtID,
  onChange,
  required,
  label,
  districts,
}) => {
  const [selectedDistricts, setSelectedDistricts] = useState<District[]>([]);

  const isOptionEqualToValue = (option: District, value: District) =>
    option.id === value.id;

  const handleDistrictChange = (event: React.SyntheticEvent, values: District[]) => {
    setSelectedDistricts(values.slice(0, 5)); // Only keep the first 5 selected values
    onChange?.(values.slice(0, 5));
  }

  useEffect(() => {
    if(districtID){
      setSelectedDistricts(districts.filter((d) => districtID.includes(d.id)));
    }
  },[districtID])

  return (
    <Autocomplete
    limitTags={5}

      onChange={handleDistrictChange}
      value={selectedDistricts}
      multiple
      id="tags-standard"
      options={districts}
      getOptionLabel={(option) => option.name}
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

export default MultiDistrictSelector;
