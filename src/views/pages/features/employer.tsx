import { AccessTime, Feed, Search, Share } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import InfoCard, { InfoCardProps } from "../../../components/info-card";
import { Main } from "../../../components/styled-common/main";
import SubmitButton from "../../../components/submit-button";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { SpecialPerson } from "../../../utils/icons";

const EmployerFeatures: FC = () => {
  const { token } = useAuthentication();
  return (
    <Main>
      <Container
        style={{ paddingBottom: 20 }}
        sx={{
          "& > section": { margin: "5rem 0" },
          "& header  h2": { margin: "2rem 0" },
          "& button": { margin: "1rem auto" },
          "& a": { display: "grid" },
        }}
      >
        <Typography textAlign="center" variant="h1" color="primary">
          Features for Employers
        </Typography>
        <Typography
          maxWidth="md"
          margin="auto"
          textAlign="center"
          marginBottom={5}
        >
          <p>
            At jobwomen, our goal is to make the impossible real. Thus, we offer
            a wide range of features for employers to filter and find out
            overall BEST FITS for their vacancies.
          </p>

          <p>
            As an employer, you need to create a profile by registering on the
            site. Upon registration, you can edit the company information as
            needed and also able to see an overview of your company profile.
          </p>
        </Typography>

        <section>
          <Grid container spacing={2}>
            {employerFeatures.map((info, i) => (
              <Grid item {...gridSizes} key={i} order={i}>
                <InfoCard {...info} />
              </Grid>
            ))}
            <Grid item {...gridSizes} order={2}>
              <img
                src="/assets/meeting.png"
                alt="Employer in a meeting"
                width={150}
                height={150}
              />
            </Grid>
          </Grid>
          {!token && (
            <Link to="/register">
              <SubmitButton>Register as a Employer</SubmitButton>
            </Link>
          )}
        </section>
      </Container>
    </Main>
  );
};

const gridSizes = {
  xs: 12,
  sm: 6,
  md: 4,
};
const employerFeatures: InfoCardProps[] = [
  {
    icon: Share,
    title: "Quick and Easy: Share Company Profile",
    content:
      "You are able to share your company profile among your contacts and candidates as you wish.",
  },
  {
    icon: SpecialPerson,
    title: "Quick and Easy: Hire People",
    content:
      "We offer you every possible way to filter right candidates for your company within a comparatively short period of time.",
  },
  {
    icon: Search,
    title: "Quick and Easy: Search & Filters",
    content:
      "General search, as well as filters, are available for you to filter the cream of the cream based on the industry, job type, location, gender, education, salary, and date of advertisement posted.",
  },
  {
    icon: AccessTime,
    title: "Quick and Easy: Save Time",
    content: "You can save the time required for screening. ",
  },
  {
    icon: Feed,
    title: "Quick and Easy: Follow Updates",
    content:
      "Notifications make it possible for you to follow any updates with regards to your activities in this platform",
  },
];

export default EmployerFeatures;
