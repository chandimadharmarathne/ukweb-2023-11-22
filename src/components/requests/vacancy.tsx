import { Stack, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthBackend } from "../../hooks/backend";
import { useToggle } from "../../hooks/toggle.hook";
import * as adService from "../../services/ad-service";
import * as profileService from "../../services/profile-service";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { Response } from "../../utils/utils.types";
import Loader from "../../views/loader/Loader";
import ApplyJob from "../job/apply-job";
import Tile from "../tile";

const VacancyPage: FC = () => {
  const [again, toggleAgain] = useToggle();

  const {
    data: requests,
    loading,
    error,
  } = useAuthBackend<Response<Result[]>, Error>(["/jobs/vacancy", again]);

  const [selectedID, setselectedID] = useState<number>();
  const [showPopup, togglePopup] = useToggle();
  const { addError, addSnack } = useSnackbar();
  const { id: userID } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error?.message ?? "Unknown error",
      });
  }, [error]);

  const reject = (id: number, job_id: number) => async () => {
    try {
      const { success } = await adService.acceptVacancy({
        apply_id: id,
        user_id: userID!,
        approve: false,
        job_id,
      });
      if (success)
        addSnack?.({
          severity: "warning",
          message: "You've denied the request",
        });
      toggleAgain();
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  const accept = (id: number) => async () => {
    setselectedID(id);
    togglePopup();
  };

  if (loading) return <Loader />;
  return (
    <Stack spacing={2}>
      <ApplyJob id={selectedID!} show={showPopup} onClose={togglePopup} />

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
            { label: "Deny", onClick: reject(req.id, req.ad_id) },
            { label: "Accept", onClick: accept(req.ad_id) },
            { label: "View Job", onClick: () => navigate(`/job/${req.ad_id}`) },
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
  ad_id: number;
  timestamp: string;
}
export default VacancyPage;
