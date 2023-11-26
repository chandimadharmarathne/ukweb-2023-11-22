import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { AdType } from "../../../constants/input-data";

const PostAdPage: FC = () => {
  return <Navigate to="post" />;
};
export const types = [
  { id: AdType.Free, label: "Post as a Free Ad", link: "free-ad" },
  { id: AdType.Paid, label: "Post as a Paid Ad", link: "paid-ad" },
  { id: AdType.Top, label: "Post as a Top Ad", link: "top-ad" },
  { id: AdType.Home, label: "Post as a Home Ad", link: "home-ad" },
] as const;

export default PostAdPage;
