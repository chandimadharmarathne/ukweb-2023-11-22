export const DATA_USER_TYPES = [
  { id: "employer", displayText: "Employer" },
  { id: "candidate", displayText: "Candidate" },
] as const;

export type UserType = typeof DATA_USER_TYPES[number]["id"];
