import React, { FC } from "react";
import CandidateHistory from "../../../components/candidate/history";
import { useAuthentication } from "../../../store/providers/auth.provider";
import NotFound from "../../errorPages/404";

const History: FC = () => {
  const { role } = useAuthentication();
  return role === "candidate" ? (
    <CandidateHistory />
  ) : (
    // : role === "employer" ? (
    //   <EmployerHistory />
    // )
    <NotFound />
  );
};

export default History;
