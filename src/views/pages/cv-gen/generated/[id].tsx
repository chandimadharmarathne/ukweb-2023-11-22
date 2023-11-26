import React, { FC, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Main } from "../../../../components/styled-common/main";
import { useAuthBackend } from "../../../../hooks/backend";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { Response } from "../../../../utils/utils.types";
import Loader from "../../../loader/Loader";
import { DownloadCV } from "../download";

const CandidateGeneratedCV: FC = () => {
  const { id } = useParams();
  const [params] = useSearchParams();

  const token = params.get("token");

  const { data, error, loading } = useAuthBackend<Response<any>, Error>(
    ["/candidate", id],
    { params: { token, id } }
  );

  const candidate = data?.result;

  const { addError } = useSnackbar();

  useEffect(() => {
    if (error) addError?.(error.message);
  }, [error]);

  if (loading)
    return (
      <Main>
        <Loader />
      </Main>
    );

  return (
    <DownloadCV
      viaSaved
      styleID={1}
      savedData={{
        credentials: {
          ...candidate?.data_overview,
          ...candidate?.data_info,
          ...candidate?.data_preference,
          about: candidate?.data_about,
        },
        blocks: {
          pro_info: candidate?.data_qualifications,
          edu_info: candidate?.data_education?.other,
          extra_activities: [],
          skills: [],
          references: [],
        },
      }}
    />
  );
};

export interface CVResponse {
  id: number;
  dp: string;
  template: number;
  data: string;
}

export default CandidateGeneratedCV;

const example = {
  blocks: {
    pro_info: [
      {
        title: "developer",
        company: "Hela",
        from: "2022-05-06T18:30:00.000Z",
        to: "2022-05-22T18:30:00.000Z",
        key: 1653202909712,
      },
    ],
    edu_info: [
      {
        title: "Bachelor of Science Computer Information Systems ",
        institute: "Columbia University NY",
        from: "2014-05-22T07:02:21.482Z",
        is_studying: true,
        key: 1653202967538,
      },
    ],
    extra_activities: [
      {
        description:
          "cooperate with designers to create clean interfaces and simple, intuitive interactions and experiences.",
        from: "2022-04-30T18:30:00.000Z",
        to: "2022-04-30T18:30:00.000Z",
        key: 1653203023119,
      },
    ],
    skills: [
      { skill: "react ", skill_level: 3, key: 1653203028374 },
      { skill: "Project management", skill_level: 2, key: 1653203032367 },
    ],
    references: [
      {
        person: "Dulranga dhawanitha",
        number: "0740646688",
        email: "dulranga.webdesign@gmail.com",
        company: "company name",
        key: 1653203040858,
      },
    ],
  },
};
