import { Work } from "@mui/icons-material";
import React, { useMemo } from "react";
import {
  DATA_JOB_TYPES,
  DATA_NOTICE_TIME,
  DATA_SALARY_TYPES,
} from "../../../constants/input-data";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { Optional } from "../../../utils/utils.types";
import { DATA_INDUSTRY } from "../../find-job/sections/industry.data";
import DetailSection, { DetailSectionProps } from "./detailed-section";
import { Page } from "./sections.data";

const Preference: Page = ({ url }) => {
  const { data } = useCandidateBackend<Optional<Result>>(url);

  const info = useMemo<DetailSectionProps["data"]>(
    () => [
      {
        label: "Industry",
        content: DATA_INDUSTRY.find((ind) => ind.id === data?.industry)?.label,
        width: 0.33,
      },
      {
        label: "Expected Salary",
        content: `${data?.salary} per ${
          DATA_SALARY_TYPES.find((type) => type.id === data?.salary_type)?.label
        }`,
        width: 0.33,
      },
      {
        label: "Job type",
        content: DATA_JOB_TYPES.find((type) => type.id === data?.job_type)
          ?.label,
        width: 0.33,
      },
      {
        label: "Notice Period",
        content: `${data?.notice_period} ${
          DATA_NOTICE_TIME.find(({ id }) => data?.notice_period_type === id)
            ?.label
        }`,
        width: 0.33,
      },
      {
        label: "Liked working location",
        content: data?.like_locations,
        width: 0.33,
      },
    ],
    [data]
  );
  return <DetailSection title="Job Preference" data={info} icon={Work} />;
};
export interface Result {
  salary: string;
  salary_type: number;
  notice_period: string;
  notice_period_type: number;
  job_type: string;
  like_locations: number;
  industry: string;
}
export default Preference;
