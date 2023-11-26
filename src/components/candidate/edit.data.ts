import { FC } from "react";
import Overview from "./overview";
import { Language } from "../../constants/languages";
import AboutMe from "./about-me";
import PersonalInfo from "./personal-info";
import RelatedDocuments from "./related-documents";
import FamilyInfo from "./family-info";
import VehicalInfo from "./vehical-info";
import EduQualifications from "./edu-qualifications";
import JobPreference from "./preference";
import ProQualifications from "./pro-qualifications";
import { DownloadCV } from "../../views/pages/cv-gen/download";

const slides: Slide[] = [
  { id: "Header", label: { en: "Header" }, page: Overview },
  { id: "about", label: { en: "About me" }, page: AboutMe },
  // { id: "Personal", label: { en: "Personal Info" }, page: PersonalInfo },

  // {
  //   id: "vehicle",
  //   label: { en: "Vehicle & License" },
  //   page: VehicalInfo,
  // },
  {
    id: "education",
    label: { en: "Education Qualifications" },
    page: EduQualifications,
  },
  {
    id: "qualification",
    label: { en: "Professional qualifications" },
    page: ProQualifications,
  },
  { id: "ref", label: { en: "References" }, page: FamilyInfo },
  // {
  //   id: "preference",
  //   label: { en: "Job Preference" },
  //   page: JobPreference,
  // },
  {
    id: "Finalize",
    label: { en: "Completed CV" },
    page: DownloadCV,
  },
];

export type Page = FC<{
  id: Slide["id"];
  label?: string;
  /** Update Completed status of that section */
  updateCompleted: (completed: boolean) => void;
  togglePostAdPopup: () => void;
}>;

export type Slide = {
  label: Language;
  page: Page;
  id: string;
};

export interface CandidateProps {
  togglePostAdPopup: () => void;
}

export default slides;
