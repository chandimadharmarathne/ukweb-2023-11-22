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
          Being a trustworthy job portal, we do care about your privacy.
          Therefore, we are strongly committed in protecting the privacy rights
          of visitors to jobwomen.lk and strive to provide a safe user experience
          for our users.
        </p>

        <section>
          <legend>Personal Data</legend>
          <p>
            Personal data refers to all kinds of details; including names,
            identification numbers, contact numbers, email addresses,
            residential addresses, pictures etc.; that can be used in any manner
            to identify a specific individual. Encrypted data and various kinds
            of electronic identities such as IP address can be treated as
            personal data if they are connected to a specific individual.
          </p>
        </section>
        <section>
          <legend>Collecting Data</legend>
          <p>
            We have provided you the facility to access and surf our website
            without registration by providing your personal information.
            However, you are required to provide the information requested, if
            you wish to register with our website.
          </p>
        </section>
        <section>
          <legend>Responsibility of Collected Data</legend>
          <p>
            jobwomen recruitment (Pvt) Ltd is the entity responsible for the
            treatment of personal data.
          </p>
        </section>
        <section>
          <legend>Storage and Usage of Personal Data</legend>
          <p>
            We are using servers of a world’s leading cloud computing web
            service provider in storing and handling of users in order to ensure
            the protection of your personal data and provide a better user
            experience.
          </p>
        </section>
        <section>
          <legend>Disclosure of Data</legend>
          <p>
            Any form of information shared with the jobwomen by either candidates
            or employers will be treated strictly confidential. Such information
            will not be shared, sold, or rented with any person or non
            affiliated third parties. Only upon permission and consent of the
            information provider, jobwomen may share your resumes with companies
            or recruiters. In such cases, jobwomen will not be responsible if any
            form of violence to privacy happens by a third party while handling
            your personal information.
          </p>
          <p>
            In addition, data gathered from the jobwomen may store and/or
            processed in another country. In certain circumstances, it will be
            clearly communicated to the users in writing and by agreeing to the
            privacy policy, they will consent to such transfers outside the
            country.
          </p>
        </section>
        <section>
          <legend>Policy Amendments</legend>
          <p>
            We may revise this Privacy Policy from time to time depending on the
            prevailing requirements at the time of revision. As the service
            provider, we reserve the right to update, amend or modify this
            policy at any time without prior notice to the users of our website.
          </p>
          <p>
            In some cases, you will be notified by periodic emails with regards
            to existing vacancies, new services, and products as well as
            technical service issues of a particular company. You may not be
            able to unsubscribe from such services in certain cases as they are
            an integral part of the service you have selected
          </p>
        </section>
      </Typography>
    </Stack>
  </Container>
);
