import { FC } from "react";
import { Language } from "../../constants/languages";
import EduLevel from "./sections/edu-levels";
import Gender from "./sections/gender";
import Industry from "./sections/industry";
import JobType from "./sections/job_type";
import Location from "./sections/location";
import PostedDate from "./sections/posted_date";
import SalaryRange from "./sections/salary_range";

export const data: Filter[] = [
  { label: { en: "Catagory" }, id: "catagory", content: JobType },
  { label: { en: "Country" }, id: "country", content: Location },

];

export type Filter = {
  label: Language;
  id: string;
  content?: Content<any>;
};

export type Content<T = unknown> = FC<{
  id: string;
  update: (value: T) => void;
  value?: T;
}>;
