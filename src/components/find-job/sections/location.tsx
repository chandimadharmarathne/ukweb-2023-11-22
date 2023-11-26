import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CountryType } from "../../../constants/countries";
import { useDistrict } from "../../../hooks/district.hook";
import CountrySelect from "../../country-selector";
import DistrictSelector from "../../district-selector";
import { Content } from "../filter.data";

interface LocationProps {
  location?: number;
  country?: string;
}

const Location: Content<LocationProps> = ({ value, update }) => {
  const [info, setInfo] = useState<LocationProps>({});

  const districts = useDistrict(info.country);

  useEffect(() => {
    update(info);
  }, [info]);

  const updateCountry = (country: CountryType | null) =>
    setInfo((prev) => ({ ...prev, country: country?.code }));

  const updateDistrict = (location?: number) =>
    setInfo((prev) => ({ ...prev, location }));
  return (
    <Stack spacing={2}>
      <CountrySelect code={value?.country} onChange={updateCountry} />

      <DistrictSelector
        districts={districts}
        districtID={info.location}
        countryCode={info.country}
        onChange={(value) => updateDistrict(value?.id)}
      />
    </Stack>
  );
};

export default Location;
