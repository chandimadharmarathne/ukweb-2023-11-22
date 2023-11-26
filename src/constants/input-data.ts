import ManualCV from "../components/job/apply-manual-cv";

export enum UserType {
  EMPLOYER,
  CANDIDATE,
}
export enum AdType {
  Free,
  Paid,
  Top,
  Home,
}
export const DATA_SORT_BY = [{ id: 1, label: "Sort key 1" }];

export const DATA_GENDERS = [
  { id: 0, label: "Any" },
  { id: 1, label: "Male" },
  { id: 2, label: "Female" },
];

export const DATA_VEHICLE_MODELS = [
  { id: 0, label: "No vehical" },
  { id: 1, label: "Car" },
  { id: 2, label: "Van" },
];

export const DATA_LICENSE_TYPES = [
  { id: 0, label: " Yes" },
  { id: 1, label: "No" },
];

export const DATA_EDU_LEVELS = [
  { id: 1, label: "O/L" },
  { id: 2, label: "A/L" },
  { id: 3, label: "Diploma" },
  { id: 4, label: "Higher Diploma" },
  { id: 5, label: "Graduate" },
  { id: 6, label: "Master" },
  { id: 7, label: "Ph.D" },
  { id: 0, label: "Other" },
];

export const DATA_ALIVE_STATUS = [
  { id: 1, label: "Alive" },
  { id: 0, label: "Deceased" },
];

export const DATA_JOB_TYPES = [
  { id: "fulltime", label: "Fulltime" },
  { id: "parttime", label: "Parttime" },
  { id: "internship", label: "Internship" },
  { id: "contract", label: "Contract" },
  { id: "remote", label: "Remote" },
];

export const DATA_MARITAL_STATUS = [
  { id: 0, label: "Single" },
  { id: 1, label: "Married" },
  { id: 2, label: "Devorced" },
  { id: 3, label: "Other" },
];

export const DATA_SALARY_TYPES = [
  { id: 0, label: "Hour", shortLabel: "hr" },
  { id: 1, label: "Day", shortLabel: "dy" },
  { id: 2, label: "Month", shortLabel: "mo" },
 
];

export const DATA_NOTICE_TIME = [
  { id: 0, label: "Day(s)" },
  { id: 1, label: "Week(s)" },
  { id: 2, label: "Month(s)" },
];
export const DATA_EMPLOYEE_AMOUNTS = [
  { id: 0, label: "less than 10" },
  { id: 1, label: "10 - 100" },
  { id: 2, label: "100 - 300" },
  { id: 3, label: "300 - 1000" },
  { id: 4, label: "more than 1000" },
];

export const DATA_ADVERTISEMENT_TYPES = [
  { id: 0, label: "Free" },
  { id: 1, label: "Paid", paid: true },
  { id: 2, label: "Top", paid: true },
  { id: 3, label: "Home", paid: true },
];

export const DATA_PAYMENT_TYPES = [
  { id: 0, label: "Card" },
  { id: 1, label: "Bank" },
  { id: 2, label: "Package" },
];

export const DATA_DISTRICTS = [
  { id: 1, label: "Ampara" },
  { id: 2, label: "Anuradhapura" },
  { id: 3, label: "Badulla" },
  { id: 4, label: "Batticaloa" },
  { id: 5, label: "Colombo" },
  { id: 6, label: "Galle" },
  { id: 7, label: "Gampaha" },
  { id: 8, label: "Hambantota" },
  { id: 9, label: "Jaffna" },
  { id: 10, label: "Kalutara" },
  { id: 11, label: "Kandy" },
  { id: 12, label: "Kegalle" },
  { id: 13, label: "Kilinochchi" },
  { id: 14, label: "Kurunegala" },
  { id: 15, label: "Mannar" },
  { id: 16, label: "Matale" },
  { id: 17, label: "Matara" },
  { id: 18, label: "Monaragala" },
  { id: 19, label: "Mullaitivu" },
  { id: 20, label: "Nuwara Eliya" },
  { id: 21, label: "Polonnaruwa" },
  { id: 22, label: "Puttalam" },
  { id: 23, label: "Ratnapura" },
  { id: 24, label: "Trincomalee" },
  { id: 25, label: "Vavuniyat" },
];

export const DATA_SKILL_LEVELS = [
  { id: 0, label: "Beginer" },
  { id: 1, label: "More than a Beginer" },
  { id: 2, label: "Intermediate" },
  { id: 3, label: "Professional" },
  { id: 4, label: "Guru" },
];

export const DATA_APPLYJOB_TYPES = [
  {
    id: 0,
    label: "Profile",
    title: "Send full profile",
    description: "Here, employers have access to view your full profile",
  },
  
  {
    id: 1,
    label: "Manual CV",
    title: "Manually Upload your CV",
    Component: ManualCV,
  },
];
export const DATA_ADVERTISEMENT_HISTORY_STATUS = [
  { id: 0, label: "Applied" },
  { id: 1, label: "Approved" },
  { id: 2, label: "Rejected" },
  { id: 3, label: "Vacancy" },
];

export const DATA_VACANCY_STATUS = [
  { id: 0, label: "Not Responded" },
  { id: 1, label: "Approved" },
  { id: 2, label: "Denied" },
];

export enum AdHistoryStatus {
  APPLIED,
  APPROVED,
  REJECTED,
  VACANCY,
}
