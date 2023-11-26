import { Stack } from "@mui/material";
import React from "react";
import { DATA_EDU_LEVELS } from "../../../constants/input-data";
import { CustomOnChange } from "../../../utils/auth-types";
import selectInput from "../../select-input";
import { Content } from "../filter.data";

const EduLevel: Content<number> = ({ value, update, id }) => {
  const updateGender: CustomOnChange = ({ target: { value: gender } }) =>
    update(gender);

  const ChooseGender = selectInput(DATA_EDU_LEVELS, String(value));
  return (
    <Stack spacing={2}>
      <ChooseGender
        onChange={updateGender}
        label="Choose Minimum Education Level"
        error={false}
        name={id}
        helperText={""}
      />
    </Stack>
  );
};

export default EduLevel;
