import React, { FC, Fragment } from "react";
import { Auth, useAuthentication } from "../store/providers/auth.provider";
import { RequiredKeys } from "../utils/utils.types";
import NotFound from "../views/errorPages/404";

interface SpecificRoleLayoutProps {
  role: RequiredKeys<Auth["role"]>;
  children: React.ReactNode;
}

const SpecificRoleLayout: FC<SpecificRoleLayoutProps> = ({
  role,
  children,
}) => {
  const { role: userRole } = useAuthentication();
  if (role === "employer" && userRole === "employer")
    return <Fragment>{children}</Fragment>;

  if (role === "candidate" && userRole === "candidate")
    return <Fragment>{children}</Fragment>;

  return <NotFound />;
};

export default SpecificRoleLayout;
