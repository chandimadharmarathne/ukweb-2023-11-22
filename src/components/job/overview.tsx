import {
  Email,
  Facebook,
  Favorite,
  Language,
  LinkedIn,
  Message,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useBackend from "../../hooks/backend";
import * as adService from "../../services/ad-service";
import * as chatService from "../../services/chat-service";
import * as profileService from "../../services/profile-service";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Phone } from "../../utils/icons";
import { Response } from "../../utils/utils.types";
import { Company } from "../../views/pages/company/[id]";
import { Job } from "../../views/pages/job/[id]";
import Social from "../social-link";
import ApplyJob from "./apply-job";

interface JobOverviewProps {
  job?: Job;
}

const JobOverview: FC<JobOverviewProps> = ({ job }) => {
  const { palette } = useTheme();
  const { id } = useParams();
  const { role, id: userID } = useAuthentication();

  const { addError, addSnack } = useSnackbar();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const { data } = useBackend<Response<Company>, Error>(
    ["/company", job?.company_id],
    { params: { id: job?.company_id }, onlyFetchIf: !!job?.company_id }
  );
  const { data: image } = useBackend<Response<{ dp: string }>>(
    ["/profile", job?.company_id],
    { params: { id: job?.company_id }, onlyFetchIf: !!job?.company_id }
  );
  const company = data?.result;

  const togglePopup = () => setShowPopup((prev) => !prev);

  const sendMessage = async () => {
    try {
      const chatID = await chatService.redirectTo(job?.company_id);
      navigate("/inbox/" + chatID);
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const shareAd = async () => {
    await navigator.share({
      title: job?.job_title_description,
      url: `/job/${id}`,
    });
  };
  const saveAd = async () => {
    try {
      const res = await adService.save(id ?? 0);
      if (res.success) addSnack?.({ severity: "success", message: "Ad Saved" });
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  return (
    <Stack
      spacing={3}
      paddingY={10}
      direction={{ md: "row", xs: "column" }}
      alignItems={{ xs: "center" }}
    >
      <ApplyJob id={id!} show={showPopup} onClose={togglePopup} />
      <Avatar
        className="avatar"
        src={
          profileService.getAdCover(job?.cover) ??
          profileService.getProfilePic(image?.result?.dp)
        }
        sx={{
          width: 200,
          height: 200,
          bgcolor: palette.primary.main,
        }}
      >
        jobwomen
      </Avatar>
      <Stack alignItems={{ xs: "center", md: "flex-start" }}>
        {job?.industry && (
          <Typography
            variant="h1"
            fontWeight="700"
            textAlign={{ xs: "center", sm: "left" }}
          >
            {job?.job_title_description}
          </Typography>
        )}
        <Typography paragraph color="primary" variant="h3">
          {company?.company_name}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Stack direction="row" spacing={2}>
            <Social icon={Facebook} link={company?.company_fb_url} />
            <Social icon={LinkedIn} link={company?.company_linkedin_url} />
            <Social icon={Language} link={company?.company_website} />
            <Social icon={Email} link={`mailto:${company?.company_email}`} />
            <Social icon={Phone} link={`tel:${company?.company_number}`} />
          </Stack>
        </Stack>
      </Stack>

      <Stack
        alignItems="flex-end"
        marginRight={0}
        alignSelf="stretch"
        marginLeft="auto !important"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          className="actions"
        >
          <IconButton className="action" onClick={sendMessage}>
            <Message />
          </IconButton>
          <IconButton className="action" onClick={saveAd}>
            <Favorite />
          </IconButton>
          <IconButton className="action" onClick={shareAd}>
            <Share />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={1} className="back-button">
          {job?.company_id != userID && (
            <Button
              component={Link}
              to={`/company/${job?.company_id}`}
              variant="outlined"
            >
              View Company Profile
            </Button>
          )}
          {role === "candidate" && (
            <Button variant="contained" onClick={togglePopup}>
              Apply Now
            </Button>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default JobOverview;
