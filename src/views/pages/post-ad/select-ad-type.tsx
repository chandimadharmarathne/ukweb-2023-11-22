import {
  Dialog,
  DialogContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  RadioGroupProps,
} from "@mui/material";
import React, { FC, useState } from "react";
import { types } from ".";
import SubmitButton, {
  SubmitButtonProps,
} from "../../../components/submit-button";

interface SelectAdTypeProps {
  open: boolean;
  onClose?: () => void;
  onTypeChange?: RadioGroupProps["onChange"];
  onSubmit?: SubmitButtonProps["onClick"];
  type?: number;
  handleInputChange?: any;
  number?:any
}

const SelectAdType: FC<SelectAdTypeProps> = ({
  open,
  onClose,
  onTypeChange,
  onSubmit,
  type,
  handleInputChange,
  number
}) => {


 
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogContent sx={{ display: "flex", flexDirection: "column" }}>
        <RadioGroup value={type} onChange={onTypeChange}>
          {types.map((type) => (
            <FormControlLabel
              key={type.id}
              value={type.id}
              control={<Radio />}
              label={type.label}
            />
          ))}
        </RadioGroup>

        {
          type !== undefined && type !== null && type !== 0 && 
          <div>
      <input
        type="number"
        value={number}
        onChange={handleInputChange}
      />
      
    </div>
        }

        <SubmitButton sx={{ alignSelf: "flex-end" }} onClick={onSubmit}>
          Post
        </SubmitButton>
      </DialogContent>
    </Dialog>
  );
};

export default SelectAdType;
