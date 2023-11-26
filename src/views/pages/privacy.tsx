import { LinearProgress } from "@mui/material";
import React, { FC, Suspense } from "react";
import Header from "../../components/static-pages/header";
import useStaticContent from "../../hooks/static-page-content.hook";

interface PrivacyPageProps {}

const PrivacyPage: FC<PrivacyPageProps> = () => {
  const Content = useStaticContent("privacy");
  return (
    <>
      <Header title={{ en: "Privacy Policy" }} />
      <Suspense fallback={<LinearProgress />}>
        <Content />
      </Suspense>
    </>
  );
};

export default PrivacyPage;
