import {
  Edit,
  Email,
  Facebook,
  Language,
  LinkedIn,
  Message,
  Share,
  Work,
} from "@mui/icons-material";


import {
  Avatar,
  Button,
  Container,
  IconButton,
  Paper,
  Stack,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetailSection from "../../../components/candidate/public-profile/detailed-section";
import { CardProps } from "../../../components/job-cards";
import MiniCard from "../../../components/job-cards/vertical";
import Social from "../../../components/social-link";
import VerifyMe, { Verified } from "../../../components/verify-profile";
import { DATA_COUNTRIES } from "../../../constants/countries";
import { DATA_EMPLOYEE_AMOUNTS } from "../../../constants/input-data";
import useBackend from "../../../hooks/backend";
import * as chatService from "../../../services/chat-service";
import * as profileService from "../../../services/profile-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import weirdGredient from "../../../themes/weird-gredient";
import { Phone } from "../../../utils/icons";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";
import AvatarPopup from "./avatarView";

const StyledPage = styled("main")(({ theme }) => ({
  padding: theme.spacing(3, 0),
  background: "#F8F8F8",
  zIndex: 1,
  "::before": { ...weirdGredient },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
  ".avatar": {
    zIndex: 2,
    position: "relative",
    border: "5px solid #fff",
  },
  ".action": {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
  [theme.breakpoints.down("md")]: {
    ".back-button": {
      position: "fixed",
      bottom: 0,
      left: 0,
      right: 0,
      background: "#fff",
      justifyContent: "center",
      marginBottom: theme.spacing(2),
      zIndex: 5,
    },
    ".actions": {
      position: "absolute",
      top: 0,
      right: 0,
      margin: theme.spacing(1),
    },
  },
}));

const Section = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(2, 3),
  margin: theme.spacing(2, 0),
  h2: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  ".card": {
    textAlign: "left",
    background: "#F8F8F8",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    "& > strong": {
      paddingRight: theme.spacing(1),
    },
  },
  ".padding-left": {
    paddingLeft: theme.spacing(5),
  },
  ".margin": {
    margin: theme.spacing(1),
  },
}));

const CompanyPage: FC<{ me?: boolean }> = ({ me }) => {
  const { id } = useParams();

  const { palette } = useTheme();
  const { addSnack } = useSnackbar();
  const navigate = useNavigate();
  const { badge, id: myID } = useAuthentication();

  const { data: dp } = useBackend<Response<{ dp: string }>>(["/profile", id], {
    params: { id: me ? myID : id },
  });
  const { data, loading, error } = useBackend<Response<Company>, Error>(
    ["/company", id],
    { params: { id: me ? myID : id } }
  );
  const { data: ads } = useBackend<Response<CardProps[]>>(
    ["/advertisement/company", id],
    { params: { id: me ? myID : id } }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);





  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error?.message ?? "Unknown error",
      });
  }, [error]);

  const company = data?.result;
  const metaData = [
    {
      label: "Company Registration No",
      content: company?.company_register_number,
      width: 0.33,
    },
    {
      label: "Number of employees",
      content: DATA_EMPLOYEE_AMOUNTS.find(
        (count) => count.id === company?.number_of_employees
      )?.label,
      width: 0.33,
    },
    {
      label: "Country",
      content: DATA_COUNTRIES.find(
        (country) => country.code === company?.country
      )?.label,
      width: 0.33,
    },
    {
      label: "Address",
      width: 0.33,
      content: company?.company_address,
    },
    {
      label: "District",
      width: 0.33,
      content: company?.district_name,
    },
    {
      label: "Zip Code",
      width: 0.33,
      content: company?.zip_code,
    },
  ];
  const goBack = () => {
    navigate(-1);
  };
  const sendMessage = async () => {
    try {
      const chatID = await chatService.redirectTo(12);
      navigate("/inbox/" + chatID);
    } catch (error: any) {
      addSnack?.({
        message: error.message,
        severity: "error",
      });
    }
  };

  const shareProfile = async () => {
    await navigator.share({
      title: data?.result.company_name,
      url: `/company/${me ? myID : id}`,
    });
  };

  return (
    <StyledPage>
      <Loader loading={loading} />
       <AvatarPopup avatarImage={profileService.getProfilePic(dp?.result?.dp)} open={isModalOpen} closeModal={() =>
      {
        setIsModalOpen(false)
      }} />
      <Container style={{ position: "relative" }}>
        {!badge && me && <VerifyMe />}
        <Stack
          spacing={3}
          paddingY={10}
          direction={{ md: "row", xs: "column" }}
          alignItems={{ xs: "center" }}
        >
          <Avatar
            className="avatar"
            sx={{
              width: 200,
              height: 200,
              bgcolor: palette.primary.main,
            }}
            src={profileService.getProfilePic(dp?.result?.dp)}
            onClick={() =>{
              setIsModalOpen(true)
            }}
          >
            jobwomen
          </Avatar>
         
          <Stack alignItems={{ xs: "center", md: "flex-start" }}>
            <Typography
              variant="h1"
              textAlign={{ xs: "center", md: "left" }}
              fontWeight="700"
            >
              {company?.company_name}
              <Verified
                fontSize="large"
                sx={{ pl: 0.5 }}
                verified={!!company?.badge}
              />
            </Typography>
            <Typography paragraph color="primary" variant="h3">
              {company?.company_address}
            </Typography>
            <Stack direction="row" spacing={2}>
              <Social icon={Facebook} link={company?.company_fb_url} />
              <Social icon={LinkedIn} link={company?.company_linkedin_url} />
              <Social icon={Language} link={company?.company_website} />
              <Social icon={Email} link={`mailto:${company?.company_email}`} />
              <Social icon={Phone} link={`tel:${company?.company_number}`} />
            </Stack>
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
              {!me && (
                <IconButton className="action" onClick={sendMessage}>
                  <Message />
                </IconButton>
              )}
              <IconButton className="action" onClick={shareProfile}>
                <Share />
              </IconButton>
            </Stack>

            {me ? (
              <Button
                component={Link}
                to="/profile/company/edit"
                variant="contained"
                className="back-button"
                startIcon={<Edit />}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                variant="outlined"
                onClick={goBack}
                className="back-button"
              >
                Back To Ad
              </Button>
            )}
          </Stack>
        </Stack>
        <DetailSection title="Company Overview" data={metaData} icon={Work} />

        <Section elevation={0}>
          <Typography variant="h2">
            <Work color="primary" fontSize="large" />
            About Company
          </Typography>

          <Paper elevation={0} className="card padding-left">
            {company?.company_about}
          </Paper>
        </Section>
        {!!ads?.result.length && (
          <Section elevation={0}>
            <Typography variant="h2">Posted Ads</Typography>
            <AliceCarousel
              mouseTracking
              responsive={responsive}
              controlsStrategy="alternate"
              disableButtonsControls
              items={ads.result.map((ad) => (
                <MiniCard card={ad} showButtons key={ad.id} />
              ))}
            />
          </Section>
        )}
      </Container>
    </StyledPage>
  );
};

const responsive = {
  0: { items: 1 },
  480: { items: 2 },
  900: { items: 3 },
};

export interface Company {
  company_name: string;
  company_address: string;
  company_number: string;
  company_email: string;
  company_fb_url: string;
  company_linkedin_url: string;
  company_website: string;
  company_register_number: string;
  number_of_employees: number;
  country: string;
  district: number;
  district_name: string;
  zip_code: number;
  badge: boolean;
  company_about: string;
}

export default CompanyPage;
