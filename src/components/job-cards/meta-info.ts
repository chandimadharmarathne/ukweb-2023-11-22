import { CalendarToday, Facebook, LinkedIn, School, Web } from "@mui/icons-material";
import { CandidateCardProps, JobCardProps, JobCardProps1 } from ".";
import {
  DATA_EDU_LEVELS,
  DATA_GENDERS,
  DATA_JOB_TYPES,
  DATA_SALARY_TYPES,
} from "../../constants/input-data";
import { languages } from "../../constants/languages";
import { currencyFormat } from "../../utils/formatters/currency-format";
import { dateFormat } from "../../utils/formatters/date-format";
import PublicIcon from '@mui/icons-material/Public';
import {
  CandidateSearch,
  Date,
  Gender,
  Languages,
  Location,
  Salary,
  Work,
} from "../../utils/icons";

export const getCandidateMetaInfo = (candidate: CandidateCardProps) => [
  { icon: Date, label: `${candidate.age} Years Old` },
  {
    icon: Gender,
    label: DATA_GENDERS.find((gen) => gen.id === candidate.gender)?.label,
  },
  {
    icon: Location,
    label: candidate.like_location,
  },
  {
    icon: School,
    label: DATA_EDU_LEVELS.find((edu) => edu.id === candidate.edu_level)?.label,
  },
  {
    icon: Work,
    label: DATA_JOB_TYPES.find((type) => type.id === candidate.job_type)?.label,
  },
  {
    icon: Salary,
    label: [
      currencyFormat(candidate.salary),
      DATA_SALARY_TYPES.find((type) => type.id === candidate.salary_type)
        ?.shortLabel,
    ].join("/"),
  },
  {
    icon: Languages,
    label: candidate.languages
      ?.map((lang) => languages.find((l) => l.code === lang)?.text)
      .join(" / "),
  },
];

export const getJobMetaInfo = (job: JobCardProps) => [
  {
    icon: Location,
    label: job.hire_locations,
  },
  {
    icon: CandidateSearch,
    label: job.hiring_amount + " Positions",
  },
  {
    icon: Work,
    label: DATA_JOB_TYPES.find((type) => type.id === job.job_type)?.label,
  },
  {
    icon: Gender,
    label: DATA_GENDERS.find((gen) => gen.id === job.gender)?.label,
  },
  {
    icon: Date,
    label: dateFormat(job.closing_date),
  },
  {
    icon: School,
    label: DATA_EDU_LEVELS.find((edu) => edu.id === job.edu_level)?.label,
  },
  {
    icon: CalendarToday,
    label: `Age: ${job.age_from} - ${job.age_to}`,
  },
  {
    icon: Salary,
    label: [
      currencyFormat(job.salary),
      DATA_SALARY_TYPES.find((type) => type.id === job.salary_type)?.shortLabel,
    ].join("/"),
  },
];
export const getJobMetaInfo1 = (job: JobCardProps1) => [
  {
    icon: Location,
    label: job.address,
  },
  {
    icon: CandidateSearch,
    label: job.employee_amount+ " employees",
  },
  {
    icon: Work,
    label:"Registred: "+ job.registration_no,
  },

  {
    icon: Date,
    label: dateFormat(job.lastupdate),
  },
 {
   icon:PublicIcon,
    label:job.country
 },{
   icon:Web,
    label:job.website ?? "No website"
 },{
    icon:LinkedIn,
    label:job.linkedin_url ?? "No linkedin"
 },{
   icon:Facebook,
    label:job.facebook_url ?? "No facebook"
 }
];