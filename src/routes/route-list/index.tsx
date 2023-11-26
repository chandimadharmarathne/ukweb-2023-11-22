import React from "react";
import { Layouts } from "../../layouts";
import NotFound from "../../views/errorPages/404";
import CandidateProfile from "../../views/pages/candidate/[id]";
import CompanyPage from "../../views/pages/company/[id]";
import CVGenerate from "../../views/pages/cv-gen";
import { DownloadCV } from "../../views/pages/cv-gen/download";
import CVOnboarding from "../../views/pages/cv-gen/onboarding";
import SavedCV from "../../views/pages/cv-gen/saved/[id]";
import CandidateGeneratedCV from "../../views/pages/cv-gen/generated/[id]";
import CreateCV from "../../views/pages/cv-gen/[style_id]";
import CandidateFeatures from "../../views/pages/features/candidate";
import EmployerFeatures from "../../views/pages/features/employer";
import FindJob from "../../views/pages/find-job/[query]";
import HirePeople from "../../views/pages/hire-people/[query]";
import HomePage from "../../views/pages/home";
import JobPage from "../../views/pages/job/[id]";
import authRoutes from "./auth";
import packageRoutes from "./packages";
import postAdPages from "./post-ad";
import protectedRoutes from "./protected";
import staticRoutes from "./static";
import CompanyPage1 from "../../components/CompanyPage";
import Industry from "../../components/find-job/sections/industry";
import IndustryList from "../../components/find-job/sections/industryList";
import JobAds from "../../components/JobAds";
import Salary from "../../views/pages/salary-guide";
import Help from "../../views/pages/help";
import NewJobs from "../../views/pages/newJobs";

export type Route = {
  path: string;
  element: JSX.Element;
  props?: any;
  layout?: number;
  innerRoutes?: Route[];
};

const RouteList: Route[] = [
  {
    path: "/",
    layout: Layouts.DEFAULT,
    element: <HomePage />,
  },
  {
    path: "/new-jobs",
    layout: Layouts.DEFAULT,
    element: <NewJobs />,
  },
  {
    path: "/salary-Guide",
    layout: Layouts.DEFAULT,
    element: <Salary />,
  },
  {
    path: "/help",
    layout: Layouts.DEFAULT,
    element: <Help />,
  },
  ...authRoutes,
  ...staticRoutes,
  ...protectedRoutes,
  ...postAdPages,
  ...packageRoutes,
  
  {
    path: "/find-job/:query",
    layout: Layouts.DEFAULT,
    element: <FindJob />,
  },
  {
    path: "/hire-people/:query",
    layout: Layouts.DEFAULT,
    element: <HirePeople />,
  },
  {
    path: "/candidate/:id",
    layout: Layouts.DEFAULT,
    element: <CandidateProfile />,
  },
  {
    path: "/job/:id",
    layout: Layouts.DEFAULT,
    element: <JobPage />,
  },
  {
    path: "/cv-gen",
    layout: Layouts.DEFAULT,
    element: <CVGenerate />,
  },
 
 
  {
    path: "/cv-gen/onboarding",
    layout: Layouts.DEFAULT,
    element: <CVOnboarding />,
  },
  {
    path: "/cv-gen/:style_id",
    layout: Layouts.DEFAULT,
    element: <CreateCV />,
  },
  {
    path: "/cv-gen/:style_id/download",
    layout: Layouts.DEFAULT,
    element: <DownloadCV />,
  },
  {
    path: "/cv-gen/saved/:id",
    layout: Layouts.DEFAULT,
    element: <SavedCV />,
  },
  {
    path: "/cv-gen/generated/:id",
    layout: Layouts.PROTECTED,
    element: <CandidateGeneratedCV />,
  },
  {
    path: "*",
    layout: Layouts.DEFAULT,
    element: <NotFound />,
  },
];

export default RouteList;
