import React, { useMemo } from "react";
import {
  DATA_LICENSE_TYPES,
  DATA_VEHICLE_MODELS,
} from "../../../constants/input-data";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { Vehical } from "../../../utils/icons";
import { Optional } from "../../../utils/utils.types";
import DetailSection, { DetailSectionProps } from "./detailed-section";
import { Page } from "./sections.data";

const VehicalInfo: Page = ({ url }) => {
  const { data } = useCandidateBackend<Optional<Data>>(url);

  const info = useMemo<DetailSectionProps["data"]>(
    () => [
      {
        label: "Vehical Model",
        width: 0.5,
        content: DATA_VEHICLE_MODELS.find(
          (model) => model.id === data?.vehicle_model
        )?.label,
      },
      {
        label: "Country",
        width: 0.5,
        content: DATA_LICENSE_TYPES.find(
          (license) => license.id === data?.license_type
        )?.label,
      },
    ],
    [data]
  );

  return <DetailSection title="Vehical & License" data={info} icon={Vehical} />;
};

export interface Data {
  vehicle_model: number;
  license_type: number;
}
export default VehicalInfo;
