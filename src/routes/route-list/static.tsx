import React from "react";
import { Route } from ".";
import { Layouts } from "../../layouts";
import AboutPage from "../../views/pages/about";
import ContactPage from "../../views/pages/contact";
import PrivacyPage from "../../views/pages/privacy";
import TOSPage from "../../views/pages/tos";

const staticRoutes: Route[] = [
  {
    path: "/about",
    layout: Layouts.STATIC,
    element: <AboutPage />,
  },
  {
    path: "/contact-us",
    layout: Layouts.STATIC,
    element: <ContactPage />,
  },
  {
    path: "/privacy",
    layout: Layouts.STATIC,
    element: <PrivacyPage />,
  },
  {
    path: "/tos",
    layout: Layouts.STATIC,
    element: <TOSPage />,
  },
  {
    path: "/privacy",
    layout: Layouts.STATIC,
    element: <PrivacyPage />,
  },
];

export default staticRoutes;
