import { styled } from "@mui/material";
import { FC } from "react";
import React from "react";

const StyledPage = styled("main")(() => ({
  minHeight: "100vh",
}));

interface StaticPageLayoutProps {
  children: React.ReactNode;
}

const StaticPageLayout: FC<StaticPageLayoutProps> = ({ children }) => {
  return <StyledPage>{children}</StyledPage>;
};

export default StaticPageLayout;
