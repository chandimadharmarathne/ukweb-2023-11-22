import React, { useMemo } from "react";
import { DATA_COUNTRIES } from "../../../constants/countries";
import { DATA_GENDERS } from "../../../constants/input-data";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { dateFormat } from "../../../utils/formatters/date-format";
import { SpecialPerson } from "../../../utils/icons";
import { Optional } from "../../../utils/utils.types";
import DetailSection, { DetailSectionProps } from "./detailed-section";
import { Page } from "./sections.data";

const PersonalInfo: Page = ({ url }) => {
  const { data } = useCandidateBackend<Response>(url);
  const infoData = data?.data;
  const info = useMemo<DetailSectionProps["data"]>(
    () => [
      {
        label: "Date of birth",
        content: dateFormat(infoData?.date_of_birth),
        width: 0.33,
      },
      {
        label: "Age",
        content: infoData?.date_of_birth
          ? `${
              new Date().getFullYear() -
              new Date(infoData?.date_of_birth ?? "").getFullYear()
            }yr`
          : undefined,
        width: 0.33,
      },
      { label: "NIC", content: infoData?.nic, width: 0.33 },
      {
        label: "Gender",
        width: 0.33,
        content: DATA_GENDERS.find((gen) => gen.id === infoData?.gender)?.label,
      },
      {
        label: "Country",
        width: 0.33,
        content: DATA_COUNTRIES.find(
          (country) => country.code === infoData?.country
        )?.label,
      },
      {
        label: "District",
        width: 0.33,
        content: infoData?.district,
      },
      { label: "Zip Code", content: infoData?.zip_code, width: 0.33 },
      { label: "Address", content: infoData?.address, width: 1 },
      // { label: "Languages", content: infoData?.address, width: 0.33 },
    ],
    [data]
  );

  return (
    <DetailSection title="Personal Info" data={info} icon={SpecialPerson} />
  );
};

export interface Response {
  data: Optional<Data>;
  switches: Switches;
}

export interface Switches {
  visible_public: boolean;
  visible_employer: boolean;
}
export type Data = {
  date_of_birth: string;
  gender: number;
  nic: string;
  country: string;
  district: number;
  zip_code: string;
  address: string;
};
export default PersonalInfo;
