import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Main } from "../../../../components/styled-common/main";
import useBackend from "../../../../hooks/backend";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { CustomRequestError } from "../../../../utils/Axios";
import { Response } from "../../../../utils/utils.types";
import NotFound from "../../../errorPages/404";
import Loader from "../../../loader/Loader";
import { DownloadCV } from "../download";

interface SavedCVProps {}

const SavedCV: FC<SavedCVProps> = () => {
  const { id } = useParams();
  const {
    data: raw,
    loading,
    error,
  } = useBackend<Response<CVResponse>, CustomRequestError>("/cv/save", {
    params: { id },
  });

  const { addError } = useSnackbar();

  const data = raw?.result.data ? JSON.parse(raw?.result.data) : {};

  useEffect(() => {
    if (error) addError?.(error.message);
  }, [error]);

  if (loading)
    return (
      <Main>
        <Loader />
      </Main>
    );

  if (error?.statusCode === 404) return <NotFound />;
  return (
    <DownloadCV
      viaSaved
      styleID={raw?.result.template}
      profilePic={raw?.result.dp}
      savedData={{
        credentials: data,
        blocks: data.blocks,
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

export default SavedCV;
