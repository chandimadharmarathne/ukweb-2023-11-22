import React, { FC } from "react";
import {
  Layouts,
  AuthenticationLayout,
  MainLayout,
  StaticPageLayout,
  ProtectedLayout,
  PostAdLayout,
  SpecificRoleLayout,
} from "../layouts";

interface RouteElementProps {
  layout?: number;
  element: JSX.Element;
}

const RouteElement: FC<RouteElementProps> = ({ layout, element }) => {
  switch (layout) {
    case Layouts.PROTECTED:
      return (
        <MainLayout>
          <ProtectedLayout>{element}</ProtectedLayout>
        </MainLayout>
      );
    case Layouts.STATIC:
      return (
        <MainLayout>
          <StaticPageLayout>{element}</StaticPageLayout>
        </MainLayout>
      );
    case Layouts.AUTH:
      return (
        <MainLayout>
          
          <AuthenticationLayout>{element}</AuthenticationLayout>
        </MainLayout>
      );
    case Layouts.POST_AD:
      return (
        <MainLayout>
          <ProtectedLayout>
            <PostAdLayout>{element}</PostAdLayout>
          </ProtectedLayout>
        </MainLayout>
      );
    default:
      return <MainLayout>{element}</MainLayout>;
  }
};

export default RouteElement;
