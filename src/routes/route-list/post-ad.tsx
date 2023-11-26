import { Route } from ".";
import { Layouts } from "../../layouts";
import PostAdPage from "../../views/pages/post-ad";
import React from "react";
import PaidAdPage from "../../views/pages/post-ad/paid-ad";
import TopAdPage from "../../views/pages/post-ad/top-ad";
import CreateAdPage from "../../views/pages/post-ad/post";
import EditPostedAd from "../../views/pages/post-ad/edit/[id]";
import HomeAdPage from "../../views/pages/post-ad/home-ad";

const postAdPages: Route[] = [
  {
    path: "/post-ad",
    layout: Layouts.ONLY_EMPLOYER,
    element: <PostAdPage />,
  },
  {
    path: "/post-ad/paid-ad/:invoice_id",
    layout: Layouts.POST_AD,
    element: <PaidAdPage />,
  },
  {
    path: "/post-ad/top-ad/:invoice_id",
    layout: Layouts.POST_AD,
    element: <TopAdPage />,
  },
  {
    path: "/post-ad/home-ad/:invoice_id",
    layout: Layouts.POST_AD,
    element: <HomeAdPage />,
  },
  {
    path: "/post-ad/top-ad/:invoice_id",
    layout: Layouts.POST_AD,
    element: <TopAdPage />,
  },
  {
    path: "/post-ad/post",
    layout: Layouts.ONLY_EMPLOYER,
    element: <CreateAdPage />,
  },
  {
    path: "/post-ad/edit/:id",
    layout: Layouts.ONLY_EMPLOYER,
    element: <EditPostedAd />,
  },
];

export default postAdPages;
