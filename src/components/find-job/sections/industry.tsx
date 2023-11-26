import { ExpandMore } from "@mui/icons-material";
import {
  Accordion as AccordionBase,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useLanguage } from "../../../store/providers/lang.provider";
import { Content } from "../filter.data";
import { Data, DATA_FILTERS } from "./industry.data";

type CheckboxData = {
  [id: string]: boolean;
};

type IndustryFilter = {
  [id: string]: CheckboxData;
};

const Industry: Content<any> = ({ update, value }) => {
  const onUpdate = (id: Data["id"]) => (checkboxValue: CheckboxData) => {
    update({ ...value, [id]: { ...value?.[id], ...checkboxValue } });
  };
  return (
    <Box>
      {DATA_FILTERS.map((record) => (
        <Accordion
          {...record}
          key={record.id}
          update={onUpdate(record.id)}
          value={value?.[record.id]}
        />
      ))}
    </Box>
  );
};
const Accordion: FC<
  Data & { value?: CheckboxData; update: (value: CheckboxData) => void }
> = ({ label, content, update, value }) => {
  const { code } = useLanguage();
  return (
    <AccordionBase elevation={0}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography>{String(label?.[code])}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {content?.map((checkbox) => {
          const onChange = (_: any, checked: boolean) => {
            update({ [checkbox.id]: checked });
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
              label={String(checkbox.label?.[code])}
            />
          );
        })}
      </AccordionDetails>
    </AccordionBase>
  );
};
export default Industry;
