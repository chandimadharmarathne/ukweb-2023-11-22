import React, { FC } from "react";
import { useParams } from "react-router-dom";
import FindUsers from "../../../components/find-job";
import { UserType } from "../../../constants/input-data";
import { useAuthentication } from "../../../store/providers/auth.provider";

const FindJob: FC = () => {
  const { query } = useParams();
 
  return (
    <FindUsers
      navigateLink={(query) => `/find-job/${query}`}
      query={query}
      type={UserType.EMPLOYER}
      url={!!query ? "/search/advertisements" : "/advertisement"}
    />
  );
};
export default FindJob;
