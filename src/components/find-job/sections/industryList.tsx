import { ExpandMore } from "@mui/icons-material";
import {
  Accordion as AccordionBase,
  AccordionDetails,
  AccordionSummary,
  Box,
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

const IndustryList: Content<IndustryFilter> = ({ update, value }) => {
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
           <div>
            {String(checkbox.label?.[code])}
           </div>
          );
        })}
      </AccordionDetails>
    </AccordionBase>
  );
};
export default IndustryList;
