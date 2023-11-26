import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import React from "react";
import { DATA_GENDERS } from "../../../constants/input-data";
import { Content } from "../filter.data";

const Gender: Content<{ [key: number]: boolean }> = ({ value, update }) => {
  // const updateGender: CustomOnChange = ({ target: { value: gender } }) =>
  //   update(gender);

  const onChangeCheck = (id: number) => (_: any, checked: boolean) => {
    update?.({ ...value, [id]: checked });
  };

  return (
    <Stack direction="row">
      {DATA_GENDERS.map((gen) => (
        <FormControlLabel
          key={gen.id}
          label={gen.label}
          control={<Checkbox />}
          onChange={onChangeCheck(gen.id)}
          checked={!!value?.[gen.id]}
        />
      ))}
    </Stack>
  );
};

export default Gender;
