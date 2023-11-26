import {
  Box,
  Typography,
  Button,
  Chip,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import useBackend from "../../../hooks/backend";
import { getProfilePic, Profile } from "../../../services/profile-service";
import { Response } from "../../../utils/utils.types";
import { SpecialMessage } from "../inbox.types";

const ShareProfile: SpecialMessage = ({ sender, isMe }) => {
  const { data } = useBackend<Response<Profile>, Error>(["/profile", sender], {
    params: { id: sender },
  });

  if (isMe)
    return (
      <Chip
        label={
          <Typography color="secondary">You shared your profile</Typography>
        }
        style={{ width: "fit-content", alignSelf: "center" }}
      />
    );
  return (
    <Box width="fit-content">
      <Card sx={{ display: { md: "flex", xs: "block" } }}>
        <CardMedia
          component="img"
          sx={{ width: 150, padding: (theme) => theme.spacing(1) }}
          image={getProfilePic(data?.result.dp ?? "defaultuser.svg")}
        />
        <Box flex={3}>
          <CardContent>
            <Typography variant="h3">
              {data?.result.name} shared his Profile
            </Typography>
            <Link
              to={`/${
                data?.result.role === "candidate" ? "candidate" : "company"
              }/${sender}`}
            >
              <Button style={{ marginTop: 10 }} variant="contained">
                View
              </Button>
            </Link>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
};
export default ShareProfile;
