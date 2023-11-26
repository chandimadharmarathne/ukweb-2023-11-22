import React, { FC } from "react";
import { useParams } from "react-router-dom";

import { UserType } from "../../../constants/input-data";
import { useAuthentication } from "../../../store/providers/auth.provider";
import FindUsers from "../../../components/find-job/newSearch";

const FindJob: FC = () => {
  const { query2 } = useParams();
 
  return (
    <FindUsers
      navigateLink={(query2) => `/find-job/${query2}`}
      query={query2}
      type={UserType.EMPLOYER}
      url={!!query2 ? "/search/advertisements" : "/advertisement"}
    />
  );
};
export default FindJob;
