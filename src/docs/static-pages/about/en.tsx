import { Container, Stack, Typography } from "@mui/material";
import * as React from "react";

export default () => (
  <Container style={{ marginBottom: 100 }}>
    <Stack spacing={5}>
      <Typography>
        <p>
          Welcome to <i>jobwomen</i>! We are simply a job search engine that
          connects both candidates and employers to achieve their DREAMS by
          finding the perfect professions and ideal employees, respectively. For
          candidates, we offer a variety of recommended services, such as job
          search, job application, CV generator, and advertisement posting
          functions. Similarly, for employers, <i>jobwomen</i> provides services
          ranging from posting job vacancies to hiring employees. Unlike many
          other famous sites that provide services for either candidates or
          employers,
          <i>jobwomen</i> connects both parties together into one platform. This
          is the UNIQUENESS of our site. Our unique services in a nutshell are
          as follows;
        </p>
        <p>
          We help the candidate to reduce their stress when it comes to creating
          an updated CV. We offer a CV generator function in which candidates
          are able to create their CVs just in seconds. We have a collection of
          modern and stylish CV templates. Currently, we are offering this
          service free of charge and are planning to have a few paid options as
          well in the time to come.
        </p>
        <p>
          Another great feature we offer is the option for posting
          advertisements. In spite of traditional career sites, at{" "}
          <i>jobwomen</i>, both employers and candidates can post ads of their
          interest depending on the requirements either to hire an employee or
          find a profession. There are certain advertisement packages available
          at the moment and you may continue to read the section “Packages” for
          more information.{" "}
        </p>
        <p>
          Despite many other sites of similar nature, we rate candidates by
          mapping their qualifications with job requirements. Accordingly, both
          candidates, as well as employers, are able to get a general idea of
          their position and suitability for the profession, respectively
        </p>
        <p>
          Browse our website to get inspired and stay tuned for the latest
          careers!
        </p>
      </Typography>
    </Stack>
  </Container>
);
