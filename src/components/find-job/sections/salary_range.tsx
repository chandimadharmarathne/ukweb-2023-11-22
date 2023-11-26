import {
  Box,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { ChangeEvent } from "react";
import { DATA_SALARY_TYPES } from "../../../constants/input-data";
import selectInput from "../../select-input";
import { Content } from "../filter.data";

type SalaryType = {
  from?: number;
  to?: number;
  type?: number;
};

const SalaryRange: Content<SalaryType> = ({ update, value = {} }) => {
  const updateCustomRange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value: inputValue } = e.target;
    update({
      ...value,
      [name]: parseFloat(inputValue),
    });
  };
  const updateType = (e: any) => {
    update({ ...value, type: e.target.value });
  };

  const SalaryType = selectInput(DATA_SALARY_TYPES, value.type ?? 0);
  return (
    <Box>
      <SalaryType
        label="Salary Type"
        error={false}
        helperText=""
        name="salary_type"
        onChange={updateType}
      />
      <RadioGroup name="salary_range">
        {data.map((checkbox) => {
          const onChange = (_: any) => {
            update({
              ...value,
              from: checkbox.from,
              to: checkbox.to,
            });
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
      <Box>
        <Typography mb={1}>Custom Range</Typography>
        <Stack direction="row" spacing={1}>
          <TextField
            variant="filled"
            name="from"
            type="number"
            label="From"
            onChange={updateCustomRange}
          />
          <TextField
            variant="filled"
            name="to"
            type="number"
            label="To"
            onChange={updateCustomRange}
          />
        </Stack>
      </Box>
    </Box>
  );
};
const data = [
  { label: "Rs 0.00 - Rs.50000.00", id: 0, from: 0, to: 50000 },
  { label: "Rs.50000.00 - Rs.100000.00", id: 1, from: 50000, to: 100000 },
  { label: "Rs.100000.00 - Rs.150000.00", id: 2, from: 100000, to: 150000 },
  { label: "Rs.150000.00 - Rs.200000.00 ", id: 3, from: 150000, to: 200000 },
  { label: "Rs.200000.00 - More", id: 4, from: 200000, to: undefined },
];

export default SalaryRange;
