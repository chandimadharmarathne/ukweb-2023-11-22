import { Paper, Typography } from "@mui/material";
import React from "react";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { SpecialPerson } from "../../../utils/icons";
import Loader from "../../../views/loader/Loader";
import { Section } from "./section";
import { Page } from "./sections.data";

const AboutMe: Page = ({ url }) => {
  const { data, loading } = useCandidateBackend<Response>(url);
  if (!data?.about) return null;

  return (
    <Section elevation={0}>
      <Typography variant="h2">
        <SpecialPerson color="primary" fontSize="large" />
        About Me
      </Typography>
      <Loader loading={loading} />

      <Paper elevation={0} className="card padding-left">
        {data?.about}
      </Paper>
    </Section>
  );
};

export interface Response {
  about: string;
}
export default AboutMe;
