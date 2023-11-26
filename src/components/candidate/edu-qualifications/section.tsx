import { Box, Typography } from "@mui/material";
import React, { FC } from "react";
import { Credentials } from "../../../utils/auth-types";

export interface SectionProps {
  title: string;
  children?: React.ReactNode;
}

export type SectionType = { [id: string]: Credentials };

const Section: FC<SectionProps> = ({ children, title }) => {
  return (
    <Box paddingY={2}>
      <section>
        <legend style={{ margin: "1rem 0" }}>
          <Typography color="secondary" variant="h3">
            {title}
          </Typography>
        </legend>
        {children}
      </section>
    </Box>
  );
};

export default Section;
