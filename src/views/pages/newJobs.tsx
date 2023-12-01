import {
  Button,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  styled,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { FC, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";
import Instructions from "../../components/home/instructions";
import Title from "../../components/home/section-title";
import { CandidateCardProps, JobCardProps } from "../../components/job-cards";
import MiniCard from "../../components/job-cards/vertical";
import useBackend from "../../hooks/backend";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import Loader from "../loader/Loader";

import "react-alice-carousel/lib/alice-carousel.css";
import SubmitButton from "../../components/submit-button";
import ContactSpeedDial from "../../components/speed-dial";
import CVOnboarding from "./cv-gen/onboarding";
import CVGenerate from "./cv-gen";
import FindJob from "./find-job/[query]";
import NewCVGenerate from "./cv-gen/newJobsCv";
import { dumyDataforPosting } from "../../components/find-job/sections/industry.data";
import PostJobCard from "../../components/job-cards/postJob";
import LoadingComponent from "../../components/loader";

interface HomePageProps { }

const StyledPage = styled("main")(({ theme }) => ({
  section: {
    padding: theme.spacing(5, 0),
  },
  ".images": {
    display: "flex",
    justifyContent: "space-around",
  },
  ".images .cover": {
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
      maxWidth: 240,
    },
  },
  ".instructions": {
    padding: theme.spacing(5, 2),
    background: grey["100"],
  },
  ".user-statements": {
    background: grey["100"],
  },
  ".questions": {
    padding: theme.spacing(5, 2),
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "p a": {
      color: theme.palette.primary.contrastText,
      fontWeight: "500",
    },
  },
  ".user-statements, .questions": {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  ".contact-button": {
    marginTop: theme.spacing(2),
    background: theme.palette.background.default,
    color: theme.palette.primary.main,
  },
  ".contact-button:hover": {
    background: grey["100"],
  },
  ":where(img)": {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
  ".cover img": {
    objectFit: "cover",
  },
}));

const NewJobs: FC<HomePageProps> = () => {
  // const { data, loading, error } = useBackend<Response, Error>(
  //   "/advertisement/home"
  // );
  const { addSnack } = useSnackbar();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint
  const [load, setLoad] = React.useState(false)
  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );
  const loaderConfig = {
    color: 'darkblue',
    size: 40,
    distance: 3
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoad(false);
    }, 20000); // 2 minutes in milliseconds

    return () => {
      // Clear the timeout if the component unmounts before the timeout expires
      clearTimeout(timeout);
    };
  }, [])// useEffect(() => {
  //   if (error)
  //     addSnack?.({
  //       severity: "error",
  //       message: error?.message ?? "Unknown error",
  //     });
  // }, [error]);

  return (
    <StyledPage>
      {
        load ? <LoadingComponent config={loaderConfig} /> : null
      }
      <FindJob />
      <CVGenerate />




      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
      }}>
        <Card style={{
          backgroundColor: 'gray',
          width: isDesktop ? "87%" : isMobile ? "90%" : "95%",
          marginLeft: isDesktop ? "1.5%" : isMobile ? "0%" : "7.5%",
        }}>
          <h1 style={{
            textAlign: 'center',
            //fontFamily:"Ubuntu, sans-serif",
            color: 'white',
          }}
          >
            Hire The People You Need
          </h1>



          <Grid container style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }} >
            {/* {
            dumyDataforPosting?.map((item:any) =>(
              <Grid item xs={12} sm={6} md={4} lg={3} xl={3} style={{
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                padding:10
              }}>
                <PostJobCard card={item}                />
              </Grid>
            ))
          }  */}

            <Grid item xs={12} sm={6} md={4} style={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: 'center',
              padding: isMobile ? 0 : 10
            }}>
              <PostJobCard card={dumyDataforPosting[0]} />
            </Grid>

            <Grid item xs={12} sm={6} md={4} style={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'space-between',
              alignItems: 'center',
              padding: isMobile ? 0 : 10
            }}>
              <PostJobCard card={dumyDataforPosting[1]} />
            </Grid>

          </Grid>
        </Card>
      </div>







    </StyledPage>
  );
};

const responsive = {
  0: { items: 1 },
  480: { items: 2 },
  900: { items: 3 },
};

export interface Response {
  success: boolean;
  result: Result;
}

export interface Result {
  jobRequests: CandidateCardProps[];
  jobs: JobCardProps[];
}
export default NewJobs;
