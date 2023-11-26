import { Children, FC } from "react";
import React from "react";
import { Typography } from "@mui/material";

interface TitleProps {
  id?: string;
  children: React.ReactNode;
}

const Title: FC<TitleProps> = ({ children, id }) => {
  return (
    <Typography variant="h2" fontWeight={"700"} textAlign="center" id={id}>
      {Children.map(children, (child) => {
        // @ts-ignore
        if (child?.type === "strong")
          return (
            <Typography
              color="primary"
              variant="inherit"
              display="inline"
              margin={1}
            >
              {/* @ts-ignore */}
              {React.cloneElement(child)}
            </Typography>
          );
        return child;
      })}
    </Typography>
  );
};

export default Title;
