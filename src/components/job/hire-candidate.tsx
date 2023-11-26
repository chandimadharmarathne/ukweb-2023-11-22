// STILL NEED TO BE CONNECTED
import { Box, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { useAuthBackend } from "../../hooks/backend";
import * as adService from "../../services/ad-service";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { Response } from "../../utils/utils.types";
import { JobCardProps } from "../job-cards";
import SubmitButton from "../submit-button";

interface HireCandidateProps {
  id?: any;
  onClose?: () => void;
}

const HireCandidate: FC<HireCandidateProps> = ({ id, onClose }) => {
  const { data } = useAuthBackend<Response<JobCardProps[]>>(
    "/advertisement/available"
  );
  const { addError, addSnack } = useSnackbar();

  const send = (ad: number) => async () => {
    try {
      const { success } = await adService.sendVacancy(id, ad);
      if (success) {
        addSnack?.({ message: "Successfully sent", severity: "success" });
        onClose?.();
      }
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  return (
    <Stack padding={1}>
      <Typography variant="h2" color="primary">
        Send job vacancy profile
      </Typography>
      <Stack spacing={2}>
        {data?.result.map((ad) => (
          <Stack
            key={ad.id}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            maxWidth={750}
            spacing={1}
          >
            <Box>
              <Typography margin={0} fontWeight="bold" paragraph>
                {ad.job_title_description}
              </Typography>
              <Typography color="secondary">
                {dateFormat(new Date())}
              </Typography>
            </Box>
            <SubmitButton sx={{ width: "fit-content" }} onClick={send(ad.id)}>
              Send Job Profile
            </SubmitButton>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

const slides: { label: string; component?: FC<any> }[] = [
  { label: "Send request", component: () => <h1>Something</h1> },
  { label: "Send job vacancy profile", component: () => <h1>Something</h1> },
];
export default HireCandidate;
