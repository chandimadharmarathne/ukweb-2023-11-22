import { FC } from "react";
import VehicalInfo from "./vehical";
import AboutMe from "./about-me";
import Overview from "./overview";
import PersonalInfo from "./personal-info";
import Documents from "./documents";
import FamilyInfo from "./family";
import Qualifications from "./qualification";
import Preference from "./preference";
import { Profile } from "../../../services/profile-service";
import EduInfo from "./edu-info";

export type Page = FC<{
  id: Section["id"];
  url: string;
  label?: string;
  me?: boolean;
  profile?: Profile;
}>;

export type Section = {
  page: Page;
  id: string;
};

const sections: Section[] = [
  { id: "overview", page: Overview },
  { id: "about", page: AboutMe },
  { id: "info", page: PersonalInfo },
  { id: "family", page: FamilyInfo },
  { id: "vehicle", page: VehicalInfo },
  { id: "education", page: EduInfo },
  { id: "qualification", page: Qualifications },
  { id: "preference", page: Preference },
  { id: "documents", page: Documents },
];

export default sections;
