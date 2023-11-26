import { FC, Suspense } from "react";
import React from "react";
import Header from "../../components/static-pages/header";
import useStaticContent from "../../hooks/static-page-content.hook";
import { CircularProgress } from "@mui/material";

interface TOSPageProps {}

const TOSPage: FC<TOSPageProps> = () => {
  const Content = useStaticContent("tos");
  return (
    <>
      <Header title={{ en: "Terms of Use" }} />
      <Suspense fallback={<CircularProgress />}>
        <Content />
      </Suspense>
    </>
  );
};

export default TOSPage;
