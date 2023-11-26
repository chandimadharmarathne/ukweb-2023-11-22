import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React from "react";
import { Content } from "../filter.data";

const PostedDate: Content<number> = ({ update }) => {
  return (
    <RadioGroup
    //  defaultValue={0}
    >
      {data.map((checkbox) => {
        const onChange = () => {
          update(checkbox.id);
        };
        return (
          <FormControlLabel
            key={checkbox.id}
            control={<Radio value={checkbox.id} onChange={onChange} />}
            label={checkbox.label}
          />
        );
      })}
    </RadioGroup>
  );
};
const data = [
  // { label: "All", id: 0 },
  { label: "Past 3 days", id: 1 },
  { label: "Past week", id: 2 },
  { label: "Past 2 weeks", id: 3 },
  { label: "Past Month", id: 4 },
];

export default PostedDate;
