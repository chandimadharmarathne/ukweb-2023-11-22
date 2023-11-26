import { Container, Stack, Typography } from "@mui/material";
import * as React from "react";

export default () => (
  <Container style={{ marginBottom: 100 }}>
    <Stack spacing={5}>
      <Typography
        sx={{
          "legend::after": { content: `":"` },
          legend: { fontWeight: "700" },
        }}
      >
        <p>
          jobwomen is a website which makes a platform for job seekers and
          clients (individuals or companies) to find their perfect candidate or
          employer through posting their advertisements on the website.
        </p>

        <p>
          By accessing or using the site in any manner, including, but not
          limited to, browsing the site or contributing content or other
          materials to the site, you agree to be bound by these Terms &
          Conditions. Capitalized terms are defined in this Agreement
        </p>

        <section>
          <legend>Definitions</legend>
          <p>
            “Website” means the jobwomen.lk website which provides you services
            related to discovering employment opportunities, posting
            advertisements, applying for jobs, recruiting people and generating
            curriculum vitae.
          </p>
          <p>
            “Candidate” means any person with a legal personality who has
            created a job seeker account on the website.
          </p>
          <p>
            “Client” means any person or entity with a legal personality who has
            created a recruiter account on the website
          </p>
          <p>
            “User” means candidates or clients with an account on the website.
          </p>
          <p>
            “Visitor” means any person accessing and using the website for any
            purpose.
          </p>
          <p>
            “Service” means all services provided by jobwomen, including posting
            advertisements, recruitment and generating curriculum vitaes (CV)
            and any other service that jobwomen introduces from time to time.
          </p>
          <p>
            “CV/Resume” refers to a summary of someone’s personal, educational,
            career, and other relevant information.
          </p>
          <p>
            “Job Advertisement” refers to an announcement of an open job
            position.
          </p>
        </section>
        <section>
          <legend>Amendments</legend>
          <p>
            We revise the terms and conditions of the service from time to time
            in order to adhere to the prevailing legal framework and
            requirements. As the service provider, we reserve the right to
            update, amend or modify our terms and conditions at any time without
            prior notice to the users of our website. By using our website, you
            are agreeing to be bound by the then-current version of these terms
            and conditions.
          </p>
        </section>
        <section>
          <legend>Governing Law</legend>
          <p>
            These Terms of Business hereunder are governed by the laws of
            Democratic Socialist Republic of Sri Lanka and all disputes arising
            from these terms shall fall within the exclusive jurisdiction of the
            Courts of Sri Lanka
          </p>
        </section>
      </Typography>
    </Stack>
  </Container>
);
