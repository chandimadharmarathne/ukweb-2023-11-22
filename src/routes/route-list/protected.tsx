import React from "react";
import { Route } from ".";
import { Layouts } from "../../layouts";
import CandidateProfile from "../../views/pages/candidate/[id]";
import SuccessPage from "../../views/pages/payment/success";
import InboxPage from "../../views/pages/inbox";
import MessagePanel from "../../views/pages/inbox/[id]";
import Notifications from "../../views/pages/notifications";
import PostedAds from "../../views/pages/profile/ads/posted";
import SavedAds from "../../views/pages/profile/ads/saved";

import MyCompanyPage from "../../views/pages/profile/company";
import CompanyEditPage from "../../views/pages/profile/company/edit";
import CompanyOverview from "../../views/pages/profile/company/overview";
import EmployerAdDetails from "../../views/pages/profile/company/overview/[id]";
import History from "../../views/pages/profile/history";
import SettingsPage from "../../views/pages/profile/settings";
import ProfileViewed from "../../views/pages/profile/viewed";
import RequestsPage from "../../views/pages/requests";
import MyPackages from "../../views/pages/packages/my";
import CandidateEdit from "../../views/pages/profile/candidate/edit";

const protectedRoutes: Route[] = [
  {
    path: "/notifications",
    layout: Layouts.PROTECTED,
    element: <Notifications />,
    props: {
      exact: true,
    },
  },
  {
    path: "/inbox",
    layout: Layouts.PROTECTED,
    element: <InboxPage />,
    innerRoutes: [{ path: ":id", element: <MessagePanel /> }],
  },
  {
    path: "/profile/settings",
    layout: Layouts.PROTECTED,
    element: <SettingsPage />,
  },
  {
    path: "/payment/success",
    layout: Layouts.AUTH,
    element: <SuccessPage />,
  },
  {
    path: "/profile/company/edit",
    layout: Layouts.ONLY_EMPLOYER,
    element: <CompanyEditPage />,
  },
  {
    path: "/profile/company",
    layout: Layouts.ONLY_EMPLOYER,
    element: <MyCompanyPage />,
  },
  {
    path: "/profile/company/overview",
    layout: Layouts.ONLY_EMPLOYER,
    element: <CompanyOverview />,
  },
  {
    path: "/profile/company/overview/:id",
    layout: Layouts.ONLY_EMPLOYER,
    element: <EmployerAdDetails />,
  },
  {
    path: "/profile/me",
    layout: Layouts.ONLY_CANDIDATE,
    element: <CandidateProfile me />,
  },
  {
    path: "/profile/viewed",
    layout: Layouts.PROTECTED,
    element: <ProfileViewed />,
  },
  {
    path: "/profile/ads/saved",
    layout: Layouts.PROTECTED,
    element: <SavedAds />,
  },
  {
    path: "/profile/ads/posted",
    layout: Layouts.PROTECTED,
    element: <PostedAds />,
  },
  {
    path: "/profile/my-packages",
    layout: Layouts.PROTECTED,
    element: <MyPackages />,
  },
  {
    path: "/profile/candidate/edit",
    layout: Layouts.ONLY_CANDIDATE,
    element: <CandidateEdit />,
  },
  {
    path: "/profile/history",
    layout: Layouts.PROTECTED,
    element: <History />,
  },
  {
    path: "/requests",
    layout: Layouts.ONLY_CANDIDATE,
    element: <RequestsPage />,
  },
];
export default protectedRoutes;
