import { FC, Suspense } from "react";
import React from "react";
import Header from "../../components/static-pages/header";
import useStaticContent from "../../hooks/static-page-content.hook";
import { LinearProgress } from "@mui/material";

interface AboutPageProps {}

const AboutPage: FC<AboutPageProps> = () => {
  const Content = useStaticContent("about");

  return (
    <>
      <Header title={{ en: "About Us" }} />
      <Suspense fallback={<LinearProgress />}>
        <Content />
      </Suspense>
    </>
  );
};

export default AboutPage;
