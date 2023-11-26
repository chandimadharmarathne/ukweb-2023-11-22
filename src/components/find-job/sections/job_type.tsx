import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import { DATA_JOB_TYPES } from "../../../constants/input-data";
import { Content } from "../filter.data";

const JobType: Content<{ [key: string]: boolean }> = ({ update, value }) => {
  return (
    <FormGroup>
      {DATA_JOB_TYPES.map((checkbox) => {
        const onChange = (_: any, checked: boolean) => {
          update({ ...value, [checkbox.id]: checked });
        };
        return (
          <FormControlLabel
            key={checkbox.id}
            control={
              <Checkbox
                id={checkbox.id}
                onChange={onChange}
                checked={!!value?.[checkbox.id]}
              />
            }
            label={checkbox.label}
          />
        );
      })}
    </FormGroup>
  );
};

export default JobType;
