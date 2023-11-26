import { FC } from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "../store/providers/auth.provider";
import React from "react";


interface ProtectedLayoutProps {
  children: React.ReactNode;
}
const ProtectedLayout: FC<ProtectedLayoutProps> = ({ children }) => {
  const { success } = useAuthentication();
  if (success) return <>{children}</>;
  return <Navigate to={"/login"} />;
};

export default ProtectedLayout;
