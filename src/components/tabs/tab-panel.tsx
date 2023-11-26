import { Box } from "@mui/material";
import React, { FC } from "react";

interface TabPanelProps {
  index: number;
  value?: number;
  children?: React.ReactNode;
}

const TabPanel: FC<TabPanelProps> = ({ value, index, children }) => {
  if (value === index) return <Box>{children}</Box>;

  return null;
};

export default TabPanel;
