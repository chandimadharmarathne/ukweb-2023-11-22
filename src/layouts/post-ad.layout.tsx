import { Container, styled } from "@mui/material";
import React, { FC } from "react";

const StyledMain = styled("main")(({ theme }) => {
  return {
    padding: theme.spacing(5, 1),
    background: "#E5E5E5",
    minHeight: "100vh",
    ".paper": {
      padding: theme.spacing(5),
    },
    img: {
      objectFit: "contain",
    },
    ".description": {
      padding: theme.spacing(2, 0),
    },
    ".left-box": {
      background: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
    ".left-box, .right-box": {
      flex: 1,
      padding: theme.spacing(5),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    "* :is(.left-box, .right-box) > h1": {
      textAlign: "center",
    },
    ".right-box > *": {
      maxWidth: 400,
    },
    ".actions": {
      marginLeft: "auto",
      marginRight: 0,
      padding: theme.spacing(5, 0),
    },
  };
});

interface PostAdLayoutProps {
  children: React.ReactNode;
}

const PostAdLayout: FC<PostAdLayoutProps> = ({ children }) => {
  return (
    <StyledMain>
      <Container maxWidth="xl">{children}</Container>
    </StyledMain>
  );
};

export default PostAdLayout;
