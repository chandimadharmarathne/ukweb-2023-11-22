import { School } from "@mui/icons-material";
import { Typography, Stack, Paper } from "@mui/material";
import React from "react";
import { DATA_EDU_LEVELS } from "../../../constants/input-data";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { getUploadedImage } from "../../../services/profile-service";
import { Optional } from "../../../utils/utils.types";
import RelatedDocument from "../../related-document";
import { BlockType } from "../repeat-block";
import { Section } from "./section";
import { Page } from "./sections.data";

const EduInfo: Page = ({ url }) => {
  const { data } = useCandidateBackend<Optional<Data>>(url);

  return (
    <Section>
      <Typography variant="h2">
        <School color="primary" fontSize="large" />
        Education Qualifications
      </Typography>
      <Stack spacing={1}>
        <Paper elevation={0} className="card padding-left">
          Highest Education Qualification Level:{" "}
          {DATA_EDU_LEVELS.find((ed) => ed.id === data?.data?.edu_level)
            ?.label ?? "Unavailable"}
        </Paper>

        {data?.data?.results.al && (
          <RelatedDocument
            title={"Advance Level Examination Results"}
            src={String(getUploadedImage(data?.data?.results.al))}
          />
        )}
        {data?.data?.results.ol && (
          <RelatedDocument
            title={"Ordinary Level Examination Results"}
            src={String(getUploadedImage(data?.data?.results.ol))}
          />
        )}
      </Stack>
    </Section>
  );
};

export interface Data {
  data: {
    edu_level: number;
    ol: Info;
    al: Info;
    results: Results;
  };
  switches: Switches;
  other: BlockType[];
}
export interface Switches {
  make_visible: boolean;
}
export interface Results {
  al: string;
  ol: string;
}

export interface Info {
  index_num: number;
  year: number;
}
export default EduInfo;
