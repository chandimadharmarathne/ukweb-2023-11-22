import { School } from "@mui/icons-material";
import { Container, Paper, styled, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailSection from "../../../components/candidate/public-profile/detailed-section";
import JobOverview from "../../../components/job/overview";
import Suggesstions from "../../../components/suggesstions";
import {
  DATA_DISTRICTS,
  DATA_EDU_LEVELS,
  DATA_GENDERS,
  DATA_JOB_TYPES,
  DATA_SALARY_TYPES,
  UserType,
} from "../../../constants/input-data";
import useBackend from "../../../hooks/backend";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import weirdGredient from "../../../themes/weird-gredient";
import { CustomRequestError } from "../../../utils/Axios";
import { currencyFormat } from "../../../utils/formatters/currency-format";
import { dateFormat } from "../../../utils/formatters/date-format";
import { SpecialPerson, Work } from "../../../utils/icons";
import { Optional, Response } from "../../../utils/utils.types";
import NotFound from "../../errorPages/404";
import Loader from "../../loader/Loader";

const StyledPage = styled("main")(({ theme }) => ({
  padding: theme.spacing(3, 0),
  background: "#F8F8F8",
  zIndex: 1,
  "::before": { ...weirdGredient },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
  ".avatar": {
    zIndex: 2,
    position: "relative",
    border: "5px solid #fff",
  },
  ".action": {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
  [theme.breakpoints.down("md")]: {
    ".back-button": {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#fff",
      width: "100%",
      justifyContent: "center",
      paddingBottom: theme.spacing(2),
      zIndex: 5,
    },
    ".actions": {
      position: "absolute",
      top: 0,
      right: 0,
      margin: theme.spacing(1),
    },
  },
}));

const StyledSection = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(2, 3),
  margin: theme.spacing(2, 0),
  h2: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  ".card": {
    textAlign: "left",
    background: "#F8F8F8",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    "& > strong": {
      paddingRight: theme.spacing(1),
    },
  },
  ".padding-left": {
    paddingLeft: theme.spacing(5),
  },
  ".margin": {
    margin: theme.spacing(1),
  },
}));

const JobPage: FC = () => {
  const { id } = useParams();
  const { addSnack } = useSnackbar();

  const { data, loading, error } = useBackend<
    Response<Result>,
    CustomRequestError
  >(
    ["/advertisement/details", id],
    { params: { id } },
    { revalidateOnFocus: false }
  );

  const job = data?.result.data;

  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error?.message ?? "Unknown error",
      });
  }, [error]);

  if (error?.statusCode === 404) return <NotFound />;
  return (
    <StyledPage>
      <Loader loading={loading} />
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          paddingBottom: (theme) => theme.spacing(15),
        }}
      >
        <JobOverview job={job} />

        <DetailSection title="Overview" icon={Work} data={getOverview(job)} />
        <SectionData title="Job Discription" content={job?.job_description} />
        <SectionData
          title="Role and Responsibillities"
          content={job?.role_and_responsibilities}
          Icon={SpecialPerson}
        />
        <SectionData
          title="Professional Qualifications"
          content={job?.professional_qualifications}
        />
        <SectionData
          title="Education Qualifications"
          content={job?.edu_qualifications}
          Icon={School}
        />
        <DetailSection
          title="Other"
          data={getOthers(job, data?.result.switches)}
          icon={Work}
        />

        <StyledSection>
          <Suggesstions type={UserType.EMPLOYER} amount={3} />
        </StyledSection>
      </Container>
    </StyledPage>
  );
};

// @ts-ignore
export const SectionData = ({ title, content, Icon = Work }) => {
  return (
    <StyledSection elevation={0}>
      <Typography variant="h2">
        <Icon color="primary" fontSize="large" />
        {title}
      </Typography>

      <Paper elevation={0} className="card padding-left">
        {content}
      </Paper>
    </StyledSection>
  );
};

const getOverview = (job?: Job) => [
  {
    label: "Location",
    content: DATA_DISTRICTS.find((d) => d.id === job?.hire_location)?.label,
    width: 0.33,
  },
  {
    label: "Closing Date",
    content: job?.closing_date ? dateFormat(job?.closing_date) : "Unavailable",
    width: 0.33,
  },
  {
    label: "Job Type",
    content: DATA_JOB_TYPES.find((type) => type.id === job?.job_type)?.label,
    width: 0.33,
  },
  {
    label: "Gender",
    content: DATA_GENDERS.find((gen) => gen.id === job?.gender)?.label,
    width: 0.33,
  },
  {
    label: "Minimum Education Qualification",
    content: DATA_EDU_LEVELS.find((edu) => edu.id === job?.edu_level)?.label,
    width: 0.33,
  },
  {
    label: "Salary",
    content: [
      currencyFormat(job?.salary ?? 0),
      DATA_SALARY_TYPES.find((type) => type.id === job?.salary_type)
        ?.shortLabel,
    ].join("/"),
    width: 0.33,
  },
];
const getOthers = (job?: Job, switches?: Switches) => [
  {
    label: "Hiring amount",
    content: job?.hiring_amount,
    width: 0.33,
  },
  {
    label: "Working time Per Day",
    content: job?.workingtime,
    width: 0.33,
  },
  {
    label: "Interview Date",
    content: job?.interviewdt ? dateFormat(job?.interviewdt) : "Unavailable",
    width: 0.33,
  },
  {
    label: "Food",
    content: switches?.food ? "Available" : "Unavailable",
    width: 0.33,
  },
  {
    label: "Accomadation",
    content: switches?.accomodation ? "Available" : "Unavailable",
    width: 0.33,
  },
];

export interface Result {
  data: Job;
  switches: Switches;
}

export type Switches = Optional<{
  [key: string]: boolean;
}>;

export interface Job {
  company_id: string;
  advertisement_type: number;
  industry: string;
  job_title: string;
  job_title_description: string;
  job_type: string;
  hiring_amount: number;
  hire_location: number;
  closing_date: string;
  gender: number;
  edu_level: number;
  age_from: number;
  age_to: number;
  salary: number;
  salary_type: number;
  job_description: string;
  role_and_responsibilities: string;
  professional_qualifications: string;
  edu_qualifications: string;
  related_document?: any;
  cover?: any;
  workingtime?: any;
  interviewdt?: any;
}
export default JobPage;
