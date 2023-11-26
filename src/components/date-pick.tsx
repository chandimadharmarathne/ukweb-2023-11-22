import { debounce, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { PickerStateProps } from "@mui/x-date-pickers/internals/hooks/usePickerState";
import React, { FC } from "react";
import { Optional } from "../utils/utils.types";

type DatePickerProps = {
  onChange: (value: any) => void;
  value?: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
} & Optional<PickerStateProps<string | null, any>>;

const DatePicker: FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  required,
  defaultValue = null,
  ...props
}) => {
  const onChangeUpdate = (date: Date | null) => {
    if (!date) return;
    if (date.toString() !== "Invalid Date") onChange?.(date);
  };

  return (
    <DesktopDatePicker
      label={label ?? "Date & Time"}
      inputFormat="dd/MM/yyyy"
      onChange={debounce(onChangeUpdate, 1000)}
      value={value || defaultValue}
      renderInput={(params) => (
        <TextField fullWidth {...params} required={required} />
      )}
      {...props}
    />
  );
};

export default DatePicker;
