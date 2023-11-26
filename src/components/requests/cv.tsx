import { Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useAuthBackend } from "../../hooks/backend";
import { useToggle } from "../../hooks/toggle.hook";
import * as profileService from "../../services/profile-service";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { Response } from "../../utils/utils.types";
import Loader from "../../views/loader/Loader";
import Tile from "../tile";

const CVRequestsPage: FC = () => {
  const [again, toggleAgain] = useToggle();
  const {
    data: requests,
    loading,
    error,
  } = useAuthBackend<Response<Result[]>, Error>(["/request/cv/my", again]);
  const { addError, addSnack } = useSnackbar();

  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error?.message ?? "Unknown error",
      });
  }, [error]);

  const accept = (id: number, approve: boolean) => async () => {
    try {
      const { success } = await profileService.acceptCV(id, approve);
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
  if (loading) return <Loader />;
  return (
    <Stack spacing={2}>
      {requests?.result.map((req) => (
        <Tile
          avatar={profileService.getProfilePic(req.dp)}
          key={req.id}
          hideButtonsOnDesktop={false}
          records={[
            { content: req.user_name },
            { title: "Requested on", content: dateFormat(req.timestamp) },
          ]}
          buttons={[
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
  timestamp: string;
}
export default CVRequestsPage;
