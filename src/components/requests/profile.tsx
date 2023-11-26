import { Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserType } from "../../constants/input-data";
import { useAuthBackend } from "../../hooks/backend";
import { useToggle } from "../../hooks/toggle.hook";
import * as profileService from "../../services/profile-service";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { Response } from "../../utils/utils.types";
import Loader from "../../views/loader/Loader";
import Tile from "../tile";

const ProfileRequestsPage: FC = () => {
  const [again, toggleAgain] = useToggle();

  const {
    data: requests,
    loading,
    error,
  } = useAuthBackend<Response<Result[]>, Error>(["/request/profile/my", again]);
  const { addError, addSnack } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error?.message,
      });
  }, [error]);

  const accept = (id: number, approve: boolean) => async () => {
    try {
      const { success } = await profileService.acceptProfile(id, approve);
      if (success)
        addSnack?.({
          severity: approve ? "success" : "warning",
          message: approve
            ? "Successfully accepted"
            : "You've denied the request",
        });
      toggleAgain();
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const view = (id: number, role: number) => () => {
    if (role === UserType.EMPLOYER) return navigate(`/company/${id}`);
    if (role === UserType.CANDIDATE) return navigate(`/candidate/${id}`);
  };
  if (loading) return <Loader />;
  return (
    <Stack spacing={2}>
      {requests?.result.map((req) => (
        <Tile
          key={req.id}
          avatar={profileService.getProfilePic(req.dp)}
          hideButtonsOnDesktop={false}
          records={[
            { content: req.user_name },
            { title: "Requested on", content: dateFormat(req.timestamp) },
          ]}
          buttons={[
            { label: "View Profile", onClick: view(req.user, req.role) },
            { label: "Deny", onClick: accept(req.id, false) },
            { label: "Accept", onClick: accept(req.id, true) },
          ]}
        />
      ))}
      {requests?.result.length === 0 && (
        <Typography paragraph>No details available</Typography>
      )}
    </Stack>
  );
};

export interface Result {
  id: number;
  user: number;
  user_name: string;
  dp: string;
  role: number;
  timestamp: string;
}
export default ProfileRequestsPage;
