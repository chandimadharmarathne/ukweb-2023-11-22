import {
  Edit,
  Facebook,
  Favorite,
  InsertLink,
  LinkedIn,
  Message,
  Report,
  Share,
} from "@mui/icons-material";
import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, Fragment, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AdType } from "../../../constants/input-data";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { useToggle } from "../../../hooks/toggle.hook";
import * as adService from "../../../services/ad-service";
import * as chatService from "../../../services/chat-service";
import * as profileService from "../../../services/profile-service";
import { getProfilePic } from "../../../services/profile-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useLanguage } from "../../../store/providers/lang.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Phone } from "../../../utils/icons";
import { Optional } from "../../../utils/utils.types";
import { types } from "../../../views/pages/post-ad";
import SelectAdType from "../../../views/pages/post-ad/select-ad-type";
import { DATA_FILTERS } from "../../find-job/sections/industry.data";
import HireCandidate from "../../job/hire-candidate";
import Social from "../../social-link";
import SubmitButton from "../../submit-button";
import VerifyMe, { Verified } from "../../verify-profile";
import { Page } from "./sections.data";

const Overview: Page = ({ url, me, profile }) => {
  const { id } = useParams();
  const { id: currentID, badge, role, token, adposted,completed,update } = useAuthentication();
  const userID = me ? currentID : id;

  const { palette } = useTheme();
  const { data } = useCandidateBackend<Response>(url);
  const candidate = useMemo(() => data?.data, [userID, data]);
  const [reportReason, setReportReason] = useState("");
  const [showPopup, togglePopup] = useToggle();
  const [showReportPopup, toggleReportPopup] = useToggle();
  const [adType, setAdType] = useState<number>();
  const [showAdSelect, toggleShowAdSelect] = useToggle();
  const [showRequestMenu, toggleRequestMenu] = useToggle();
  const requestButton = useRef<HTMLButtonElement>(null);
  const [addPostDisabled, setAddPostDisabled] = useState(false);

  const industry = DATA_FILTERS.find(
    (industry) => industry.id === candidate?.industry
  );
  const job_title = industry?.content?.find(
    (job) => job.id === candidate?.job_title
  );
  const { code } = useLanguage();

  const { addSnack, addError } = useSnackbar();
  const [days, setDays] = useState(0);
  const navigate = useNavigate();

  const onReportReasonChange = (e: ChangeEvent<HTMLInputElement>) => {
    setReportReason(e.target.value);
  };

  const sendMessage = async () => {
    try {
      const chatID = await chatService.redirectTo(userID ?? 0);
      navigate("/inbox/" + chatID);
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const requestProfile = async () => {
    try {
      toggleRequestMenu();
      const { success } = await profileService.requestProfile(userID ?? 0);
      if (success)
        addSnack?.({ message: "Successfully Requested", severity: "success" });
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const reportProfile = async () => {
    try {
      const { success } = await profileService.reportProfile(
        userID!,
        reportReason
      );
      if (success) {
        addSnack?.({ message: "You've Reported this user", severity: "info" });
        toggleReportPopup();
      }
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  const shareProfile = async () => {
    await navigator.share({
      title: `${candidate?.first_name} (${job_title?.label?.en})`,
      url: `/candidate/${userID}`,
    });
  };
  const saveAd = async () => {
    try {
      const res = await adService.save(userID!);
      if (res.success)
        addSnack?.({
          severity: "success",
          message: "Ad Saved",
        });
    } catch (error: any) {
      addError?.(error.message);
    }
  };


  useEffect(() => {
    checkStatus();
  },[]);

  const checkStatus = async() => {
    const { result } = await profileService.status();

    if (result?.completed) {
      update?.({ completed: true });
    } else {
      update?.({ completed: false });
    }
  }


  

  const onChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdType(parseInt(value));
  };

  const postAd = async () => {
    try {
      const res = await adService.postCandidateAd(adType,days);
      if (res.success) {
        toggleShowAdSelect();
        if (adType !== AdType.Free) {
          navigate(
            `/post-ad/${types.find((type) => type.id === adType)?.link}/${
              res.result?.invoiceId
            }`
          );
        } else {
          addSnack?.({
            severity: "success",
            message: "Ad successfully posted",
          });
        }
      }
    } catch (error: any) {
      addError?.(error.message);
    }
  };
 
  const requestCV = async () => {
    try {
      toggleRequestMenu();
      const res = await profileService.requestCV(id!);
      if (res.success)
        addSnack?.({
          severity: "success",
          message: "Successfully Requested",
        });
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  const handleInputChange = (event:any) => {
    setDays(event.target.value);
  };


  return (
    <Fragment>
      <SelectAdType
        type={adType}
        open={showAdSelect}
        onClose={toggleShowAdSelect}
        onSubmit={postAd}
        onTypeChange={onChangeType}
        handleInputChange={handleInputChange}
        number={days}
      />
      <Dialog open={showPopup} onClose={togglePopup}>
        <DialogContent>
          <HireCandidate id={userID} onClose={togglePopup} />
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="md"
        open={showReportPopup}
        onClose={toggleReportPopup}
      >
        <DialogContent>
          <Stack spacing={1}>
            <Typography variant="h3" color="primary">
              Report this user
            </Typography>
            <TextField
              fullWidth
              name="report-reason"
              label="Reason"
              onChange={onReportReasonChange}
            />
            <SubmitButton
              onClick={reportProfile}
              sx={{ alignSelf: "flex-end", width: "fit-content" }}
            >
              Report
            </SubmitButton>
          </Stack>
        </DialogContent>
      </Dialog>
      {!badge && me && <VerifyMe />}
      <Stack
        spacing={3}
        paddingY={10}
        direction={{ md: "row", xs: "column" }}
        alignItems={{ xs: "center" }}
        position="relative"
      >
        <Avatar
          sx={{
            width: 200,
            height: 200,
            bgcolor: palette.primary.main,
          }}
          src={getProfilePic(profile?.dp)}
        />
        <Stack alignItems={{ xs: "center", md: "flex-start" }}>
          {!!token ? (
            <Typography variant="h1" fontWeight="700">
              {candidate?.first_name} {candidate?.last_name}{" "}
              <Verified fontSize="large" verified={!!data?.data.badge} />
            </Typography>
          ) : (
            <Typography variant="h1" fontWeight="700">
              {profile?.name}
              <Verified fontSize="large" verified={!!profile?.badge} />
            </Typography>
          )}

          {!!token && (
            <>
              <Typography paragraph color="secondary" variant="h3">
                Looking for job as{" "}
                <Typography
                  display="inline"
                  color="primary"
                  fontWeight="700"
                  paragraph
                  component="span"
                  variant="h3"
                >
                  {job_title?.label?.[code]}
                </Typography>
              </Typography>
              <Stack direction="row" spacing={2}>
                <Social
                  link={`tel:${candidate?.contact_number}`}
                  icon={Phone}
                />
                <Social
                  link={candidate?.facebook_profile_url}
                  icon={Facebook}
                />
                <Social
                  link={candidate?.linked_in_profile_url}
                  icon={LinkedIn}
                />
                {candidate?.other_links?.map((link, i) => (
                  <Social link={link} key={i} icon={InsertLink} />
                ))}
              </Stack>
            </>
          )}
        </Stack>

        <Stack
          marginRight={0}
          alignSelf="stretch"
          marginLeft="auto !important"
          justifyContent="space-between"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="flex-end"
            className="actions"
          >
            <IconButton onClick={sendMessage}>
              <Message />
            </IconButton>
            <IconButton onClick={saveAd}>
              <Favorite />
            </IconButton>
            <IconButton onClick={shareProfile}>
              <Share />
            </IconButton>
            <IconButton onClick={toggleReportPopup}>
              <Report />
            </IconButton>
          </Stack>
          <Stack direction="row-reverse" className="back-button" spacing={1}>
            {me ? (
              <>
                <Button
                  component={Link}
                  to="/profile/candidate/edit"
                  variant="contained"
                  startIcon={<Edit />}
                >
                  {
                    !adposted ? "Edit Profile" : "Edit Ad"
                  }
                </Button>
                {!adposted && (
                  <Button  variant="outlined" onClick={() =>{
                    if(completed){
                      toggleShowAdSelect()
                    }
                    else{
                      addSnack?.({
                        message: "Please complete your profile",
                        severity: "error",
                      });
                    }
                  }}>
                    Post as Ad
                  </Button>
                )}
              </>
            ) : role === "employer" ? (
              <>
                <Button onClick={() =>{
                  if(completed){
                  togglePopup();
                  }
                  else{
                    addSnack?.({
                      message: "Please complete your profile",
                      severity: "error",
                    });
                  }
                }} variant="contained">
                  Hire Now
                </Button>
                <Button
                  ref={requestButton}
                  onClick={() =>{
                    if(completed){
                    toggleRequestMenu();
                    }
                    else{
                      addSnack?.({
                        message: "Please complete your profile",
                        severity: "error",
                      });
                    }
                  }}
                  variant="outlined"
                >
                  Request
                </Button>
              </>
            ) : null}
          </Stack>
        </Stack>
        <Menu
          open={showRequestMenu}
          onClose={toggleRequestMenu}
          anchorEl={requestButton.current}
        >
          <MenuItem onClick={requestCV}>Request CV</MenuItem>
          <MenuItem onClick={requestProfile}>Request view full profile</MenuItem>
        </Menu>
      </Stack>
    </Fragment>
  );
};

export interface Response {
  data: Optional<Data>;
  switches: Switches;
  verified: boolean;
}

export interface Switches {
  visible_public: boolean;
  visible_employer: boolean;
}

export type Data = {
  first_name: string;
  last_name: string;
  contact_number: string;
  other_contact_number: string;
  industry: string;
  job_title: string;
  email: string;
  facebook_profile_url: string;
  linked_in_profile_url: string;
  other_links: string[];
  badge: boolean;
};
export default Overview;
