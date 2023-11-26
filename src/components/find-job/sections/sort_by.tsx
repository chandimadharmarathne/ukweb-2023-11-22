import { Stack } from "@mui/material";
import React from "react";
import { DATA_SORT_BY } from "../../../constants/input-data";
import { CustomOnChange } from "../../../utils/auth-types";
import selectInput from "../../select-input";
import { Content } from "../filter.data";

const SortBy: Content<number> = ({ update, value, id }) => {
  const updateGender: CustomOnChange = ({ target: { value: id } }) =>
    update(id);

  const ChooseSortkey = selectInput(DATA_SORT_BY, String(value));
  return (
    <Stack spacing={2}>
      <ChooseSortkey
        onChange={updateGender}
        label="Sort by"
        error={false}
        name={id}
        helperText={""}
      />
    </Stack>
  );
};

export default SortBy;
