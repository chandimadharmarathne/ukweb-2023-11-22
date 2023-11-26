import { Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React from "react";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { dateFormat } from "../../../utils/formatters/date-format";
import { Work } from "../../../utils/icons";
import { Optional } from "../../../utils/utils.types";
import { Page } from "./sections.data";

const Qualifications: Page = ({ url }) => {
  const { data } = useCandidateBackend<Optional<Result>>(url);

  const info = data?.data?.map((block) => [
    { label: "Company", content: block.company },
    {
      label: "Period",
      content: `${dateFormat(block.from)} - ${
        block.to ? dateFormat(block.to) : block.is_working ? "Current" : ""
      }`,
    },
    { label: "Job Title", content: block.title },
  ]);
  if (!!data?.data?.length) return null;
  return (
    <Stack bgcolor="#fff" padding={2} spacing={2}>
      <Typography variant="h2">
        <Work color="primary" fontSize="large" />
        Professional Qualifications
      </Typography>

      {info?.map((block, i) => (
        <Stack padding={1} key={i} bgcolor={grey["100"]}>
          {block.map((item, j) => (
            <Typography paragraph key={j}>
              <strong>{item.label}</strong> : {item.content}
            </Typography>
          ))}
        </Stack>
      ))}
    </Stack>
  );
};
export interface Result {
  data: Data[];
}

export interface Data {
  title: string;
  company: string;
  from: string;
  to: string;
  is_working: boolean;
}
export default Qualifications;
