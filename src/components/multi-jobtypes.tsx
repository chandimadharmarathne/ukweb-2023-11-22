import { Autocomplete, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { DATA_JOB_TYPES } from "../constants/input-data";

interface DistrictSelectorProps {
  districts: any;
  countryCode?: string;
  districtID?: any;
  onChange?: (values: any | null) => void;
  required?: boolean;
  label?: string;
}

const MultiJobs: FC<DistrictSelectorProps> = ({
  countryCode,
  districtID,
  onChange,
  required,
  label,
  districts,
}) => {
  const [selectedDistricts, setSelectedDistricts] = useState<any[]>([]);

  const isOptionEqualToValue = (option: District, value: District) =>
    option.id === value.id;

  const handleDistrictChange = (event: React.SyntheticEvent, values: any) => {
    setSelectedDistricts(values);
   onChange?.(values);
  }

  useEffect(() => {
    if(districtID){
      setSelectedDistricts(districts.filter((d:any) => districtID.includes(d?.id)));
    }
  },[districtID])

  return (
    <Autocomplete
    limitTags={2}
      onChange={handleDistrictChange}
      value={selectedDistricts}
      multiple
      id="tags-standard"
      options={DATA_JOB_TYPES}
      getOptionLabel={(option) => option.label}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label ?? "Choose job types"}
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
  [x: string]: any;
  id: number;
  name: string;
  country_code: string;
  country_id: number;
}

export default MultiJobs;
