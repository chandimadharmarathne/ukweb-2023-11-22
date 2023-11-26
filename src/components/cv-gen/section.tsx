import { Box, Typography } from "@mui/material";
import React, { FC } from "react";

interface SectionProps {
  title: string;
  titleHelp?: string;
  children: React.ReactNode;
}

const Section: FC<SectionProps> = ({ title, titleHelp, children }) => {
  return (
    <Box marginY={3} bgcolor="#fff" padding={2} borderRadius={2}>
      <Typography variant="h2" color="secondary" fontWeight="700" margin={0}>
        {title}
      </Typography>
      {titleHelp && (
        <Typography color="primary" fontWeight="500" paragraph marginBottom={1}>
          {titleHelp}
        </Typography>
      )}

      <Box>{children}</Box>
    </Box>
  );
};

export default Section;
