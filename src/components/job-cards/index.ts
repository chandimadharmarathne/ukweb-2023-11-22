import { Paper, styled } from "@mui/material";
import { languages } from "../../constants/languages";
import { UserType } from "../../constants/user-types";

export type CommonProps = {
  id: number;
  published_on: string;
  candidate_name:string;
  display_picture?: any;
  industry: string;
  edu_level: number;
  salary: number;
  salary_type: number;
  badge: boolean;
  visibile: any;
  job_title_description:string;
};

export type CommonProps1 = {
  id: number;
  published_on: string;
  display_picture?: any;
  industry: string;
  edu_level: number;
  salary: number;
  salary_type: number;
  badge: boolean;
  visibile: any;

};

export type CandidateCardProps = CommonProps & {
  advertisement_type: 1;
  candidate_name: string;
  age: number;
  job_title: string;
  gender: number;
  like_location: number;
  job_type: string;
  languages: typeof languages[number]["code"][];
  visibile: any;
};

export type JobCardProps = CommonProps & {
  advertisement_type: number;
  job_title_description: string;
  industry: string;
  company_name: string;
  hire_locations: number;
  job_type: string;
  hiring_amount: number;
  closing_date: string;
  gender: number;
  age_from: number;
  age_to: number;
  cover?: string;
  visibile: any;
};
export type JobCardProps1 = any;
export type CardProps = any;
export type CardProps1 = any;
export interface MiniCardProps {
  type?: UserType;
  card: CardProps;
}
export interface MiniCardProps1 {
  type?: UserType;
  card1: CardProps1;
}
export const isCandidateCard = (card: CardProps): card is CandidateCardProps =>
  (card as CandidateCardProps).candidate_name !== undefined;

export const StyledPaper = styled(Paper)(({ theme }) => ({
  backgroundColor:'white',
  color: "black",
  padding: 10,
  h6: {
    fontWeight: 500,
  },
}));
