import React from "react";
import { Route } from ".";
import { Layouts } from "../../layouts";
import Packages from "../../views/pages/packages";
import BuyPackage from "../../views/pages/packages/buy/[invoice_id]";
import MyPackages from "../../views/pages/packages/my";

const packageRoutes: Route[] = [
  {
    path: "/packages",
    layout: Layouts.DEFAULT,
    element: <Packages />,
  },
  {
    path: "/packages/my",
    layout: Layouts.DEFAULT,
    element: <MyPackages />,
  },
  {
    path: "/packages/buy/:invoice_id",
    layout: Layouts.POST_AD,
    element: <BuyPackage />,
  },
];

export default packageRoutes;
