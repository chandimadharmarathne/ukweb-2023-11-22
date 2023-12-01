import { FC } from "react";
import React from "react";
import { styled } from "@mui/material";
import weirdGredient from "../themes/weird-gredient";

interface AuthenticationProps {}

const StyledPage = styled("main")(({ theme }) => ({
  minHeight: "100vh",
  padding: "0px 0px",
  position: "relative", // Set the parent container to relative position
  h1: {
    color: theme.palette.primary.main,
    textAlign: "center",
    zIndex: 1, // Place the text above the background image
  },
  ".description": {
    textAlign: "center",
    fontWeight: 500,
    marginTop: 10,
    zIndex: 1, // Place the text above the background image
  },
  ".content": {
    maxWidth: 480,
    margin: "auto",
    marginTop: 20,
  },
  ".bottom_section": {
    alignItems: "center",
  },
  ".link": {
    color: theme.palette.primary.main,
    fontWeight: 500,
  },
  ".user_type_label": {
    textTransform: "capitalize",
  },
  img: {
    position: "absolute", // Set the image to absolute position
    top: 0,
    left: 25,
    width: "90%",
    height: "100%",
    zIndex: -1, // Place the image behind the text
    
  },
  "::before": {
    ...weirdGredient,
    zIndex: -1, // Place the background image behind the text
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
}));

interface AuthenticationProps {
  children: React.ReactNode;
}

const AuthenticationLayout: FC<AuthenticationProps> = ({ children }) => {
  return (
    <StyledPage>
      <img src="/assets/cv-blob.svg" className="blob" alt="" />
      {children}
    </StyledPage>
  );
};

export default AuthenticationLayout;
