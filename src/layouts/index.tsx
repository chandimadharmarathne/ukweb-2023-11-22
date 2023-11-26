export enum Layouts {
  MAIN,
  LOGGED_IN,
  AUTH,
  DEFAULT,
  STATIC,
  PROTECTED,
  POST_AD,
  ONLY_EMPLOYER,
  ONLY_CANDIDATE,
}

export { default as AuthenticationLayout } from "./authentication.layout";
export { default as MainLayout } from "./main.layout";
export { default as StaticPageLayout } from "./static-page.layout";
export { default as PostAdLayout } from "./post-ad.layout";
export { default as ProtectedLayout } from "./protected.layout";
export { default as SpecificRoleLayout } from "./specific-role.layout";
