import React from "react";
import { Route } from ".";
import { Layouts } from "../../layouts";
import ForgotPasswordPage from "../../views/authPages/forgot-password";
import LoginPage from "../../views/authPages/login";
import RegisterPage from "../../views/authPages/register";
import ResetPasswordPage from "../../views/authPages/reset-password";
import VerifyPage from "../../views/authPages/verify";
const authRoutes: Route[] = [
  {
    path: "/login",
    layout: Layouts.AUTH,
    element: <LoginPage />,
  },
  {
    path: "/register",
    layout: Layouts.AUTH,
    element: <RegisterPage />,
  },
  {
    path: "/forgot-password",
    layout: Layouts.AUTH,
    element: <ForgotPasswordPage />,
  },
  {
    path: "/reset-password",
    layout: Layouts.AUTH,
    element: <ResetPasswordPage />,
  },
  {
    path: "/verify",
    layout: Layouts.AUTH,
    element: <VerifyPage />,
  },
];

export default authRoutes;
