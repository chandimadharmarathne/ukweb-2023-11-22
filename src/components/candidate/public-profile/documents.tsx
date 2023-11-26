import { Stack, Typography } from "@mui/material";
import React from "react";
import { BACKEND_URL } from "../../../constants/config";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { Docs } from "../../../utils/icons";
import RelatedDocument from "../../related-document";
import { Section } from "./section";
import { Page } from "./sections.data";

const Documents: Page = ({ url }) => {
  const { data } = useCandidateBackend<Response>(url);

  const files = Object.entries(data ?? {}).filter(
    ([, value]) => typeof value === "string"
  );

  return (
    <Section>
      <Typography variant="h2">
        <Docs color="primary" fontSize="large" />
        Related Documents
      </Typography>
      <Stack spacing={1}>
        {!!files.length ? (
          files.map(([key, link]) => (
            <RelatedDocument
              key={key}
              title={key}
              src={`${BACKEND_URL}/static/uploads/${link}`}
            />
          ))
        ) : (
          <Typography>No Documents were provided</Typography>
        )}
      </Stack>
    </Section>
  );
};

export interface Response {
  [key: string]: string | boolean;
}
export default Documents;
