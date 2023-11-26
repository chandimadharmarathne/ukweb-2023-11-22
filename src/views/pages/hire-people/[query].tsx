import React, { FC } from "react";
import { useParams } from "react-router-dom";
import FindUsers from "../../../components/find-job";
import { UserType } from "../../../constants/input-data";

const HirePeople: FC = () => {
  const { query } = useParams();

  return (
    <FindUsers
      navigateLink={(query) => `/hire-people/${query}`}
      type={UserType.CANDIDATE}
      query={query}
      url={!!query ? "/search/jobrequests" : "/advertisement"}
    />
  );
};

export default HirePeople;
