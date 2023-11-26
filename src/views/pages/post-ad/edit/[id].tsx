import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Main } from "../../../../components/styled-common/main";
import { useAuthBackend } from "../../../../hooks/backend";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { Credentials } from "../../../../utils/auth-types";
import { Response } from "../../../../utils/utils.types";
import NotFound from "../../../errorPages/404";
import Loader from "../../../loader/Loader";
import { Switches } from "../../job/[id]";
import CreateAdPage from "../post";

interface EditPostedAdProps {}

const EditPostedAd: FC<EditPostedAdProps> = () => {
  const { id } = useParams();
  const { addError } = useSnackbar();
  const { data, loading, error } = useAuthBackend<Response<Result>, Error>(
    ["/advertisement/details", id],
    { params: { id } }
  );

  useEffect(() => {
    if (error) addError?.(error?.message);
  }, [error]);

  if (loading)
    return (
      <Main>
        <Loader />
      </Main>
    );

  if (!data) return <NotFound />;

  return (
    <CreateAdPage
      id={id}
      editMode
      defaults={{
        data: data?.result.data,
        switches: data?.result.switches,
      }}
    />
  );
};

type Result = {
  data: Credentials;
  switches: Switches;
};

export default EditPostedAd;
