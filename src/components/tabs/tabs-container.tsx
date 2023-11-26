import { Box } from "@mui/material";
import React, { Children, FC, ReactElement } from "react";

interface TabsContainerProps {
  value: number;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

const TabsContainer: FC<TabsContainerProps> = ({ value, children, style }) => {
  return (
    <Box style={style}>
      {Children.map(children, (child) =>
        React.cloneElement(child as ReactElement<any>, { value })
      )}
    </Box>
  );
};

export default TabsContainer;
