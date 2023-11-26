import { Bookmark, Search } from "@mui/icons-material";
import { Container, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import InfoCard, { InfoCardProps } from "../../../components/info-card";
import { Main } from "../../../components/styled-common/main";
import SubmitButton from "../../../components/submit-button";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { Chat } from "../../../utils/icons";

const CandidateFeatures: FC = () => {
  const { token } = useAuthentication();
  return (
    <Main>
      <Container
        sx={{
          "& > section": { margin: "5rem 0" },
          "& header  h2": { margin: "2rem 0" },
          "& button": { margin: "1rem auto" },
          "& a": { display: "grid" },
        }}
      >
        <Typography textAlign="center" variant="h1" color="primary">
          Features for Candidates
        </Typography>
        <Typography textAlign="center" marginBottom={5}>
          <p>
            jobwomen offers candidates all-inclusive packages during the journey
            of chasing their DREAM job.
          </p>
          <p>
            In order for you to enjoy our benefits, you simply need to create a
            profile by registering with us. Our registration process is very
            simple and straightforward. Upon registration, you can login to the
            site at any time to search for jobs. You are also able to edit your
            profile as well as see the overview of your profile at any time you
            wish. Unlike conventional job search engines, jobwomen provides a
            large range of benefits to the candidates.
          </p>
        </Typography>

        <section>
          <Grid container spacing={2}>
            <Grid item {...gridSizes}>
              <img
                src="/assets/top-ad.png"
                alt="man with success"
                width={150}
                height={150}
              />
            </Grid>
            {candidateFeatures.map((info, i) => (
              <Grid item {...gridSizes} key={i}>
                <InfoCard {...info} key={i} />
              </Grid>
            ))}
          </Grid>

          {!token && (
            <Link to="/register">
              <SubmitButton>Register as a Candidate</SubmitButton>
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

const candidateFeatures: InfoCardProps[] = [
  {
    icon: Search,
    title: "Search & Filters",
    content:
      "“General Search” and “Filters” enable you to search vacancy information based on industry, job type, location, gender, education, salary, and many more!",
  },
  {
    icon: Bookmark,
    title: "Post & Save Ads",
    content:
      "You can now quickly “Post” as well as “Save” ads to get yourself notified to recruiters.",
  },
  {
    icon: Chat,
    title: "Connect with Each Other",
    content:
      "You can STAY TUNED with the other users on this platform by chatting with one another.",
  },
];

export default CandidateFeatures;
