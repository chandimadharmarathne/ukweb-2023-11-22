import React, { useMemo } from "react";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { Family } from "../../../utils/icons";
import { Optional } from "../../../utils/utils.types";
import DetailSection, { DetailSectionProps } from "./detailed-section";
import { Page } from "./sections.data";

const FamilyInfo: Page = ({ url }) => {
  const { data } = useCandidateBackend<Optional<Result>>(url);

  const info = useMemo<DetailSectionProps["data"]>(
    () => [
      { label: "Father’s Name", content: data?.data?.father_name, width: 0.33 },
      {
        label: "Father’s Occupation",
        content: data?.data?.father_occupation,
        width: 0.33,
      },
      {
        label: "Alive / Deceased",
        content: !!data?.data?.father_is_alive ? "Alive" : "Deceased",
        width: 0.33,
      },
      { label: "Mother’s Name", content: data?.data?.mother_name, width: 0.33 },
      {
        label: "Mother’s Occupation",
        content: data?.data?.mother_occupation,
        width: 0.33,
      },
      {
        label: "Alive / Deceased",
        content: !!data?.data?.mother_is_alive ? "Alive" : "Deceased",
        width: 0.33,
      },
    ],
    [data]
  );
  return <DetailSection title="Family Info" data={info} icon={Family} />;
};
export interface Result {
  data: Data;
  switches: Switches;
}

export interface Switches {
  make_visible: boolean;
}

export interface Data {
  father_name: string;
  father_occupation: string;
  father_is_alive: number;
  mother_name: string;
  mother_occupation: string;
  mother_is_alive: number;
  marital_status: number;
  spouse_name: string;
  spouse_occupation: string;
  number_of_children: string;
}
export default FamilyInfo;
