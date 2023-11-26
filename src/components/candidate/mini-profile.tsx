import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { useAuthBackend } from "../../hooks/backend";
import { getProfilePic } from "../../services/profile-service";
import { Response } from "../../utils/utils.types";
import SubmitButton from "../submit-button";
import { TileProps } from "../tile";

interface CandidateMiniProfileProps {
  id: any;
  buttons?: TileProps["buttons"];
  records?: TileProps["records"];
}

const CandidateMiniProfile: FC<CandidateMiniProfileProps> = ({
  id,
  buttons,
  records,
}) => {
  const { data: image } = useAuthBackend<Response<{ dp: string }>>(
    ["/profile/dp", id],
    { params: { id } }
  );

  return (
    <Card
      style={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardMedia
        src={getProfilePic(image?.result?.dp) ?? "/assets/logo-color.png"}
        style={{ padding: 10, borderRadius: 10, objectFit: "contain" }}
        height={200}
        width={200}
        component="img"
      />
      <CardContent
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box marginBottom={2}>
          {records?.map((record, i) => (
            <Typography margin={0} key={i}>
              {record.title && (
                <Typography component="span" fontWeight="700">
                  {record.title} :{" "}
                </Typography>
              )}
              {record.content}
            </Typography>
          ))}
        </Box>
        <Stack spacing={1}>
          {buttons &&
            buttons.map(({ label, ...props }, i) => (
              <SubmitButton key={i} {...props}>
                {label}
              </SubmitButton>
            ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default CandidateMiniProfile;
