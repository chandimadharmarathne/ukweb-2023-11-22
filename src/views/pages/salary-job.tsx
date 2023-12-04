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
import LoadingComponent from '../../components/loader'
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Carousel from 'react-bootstrap/Carousel';
import './carousel.css';
import React, { FC, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Link, useNavigate } from "react-router-dom";
import Instructions from "../../components/home/instructions";
import Title from "../../components/home/section-title";
import { CandidateCardProps, JobCardProps } from "../../components/job-cards";
import MiniCard from "../../components/job-cards/vertical";
import useBackend from "../../hooks/backend";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import Loader from "../loader/Loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "react-alice-carousel/lib/alice-carousel.css";
import SubmitButton from "../../components/submit-button";
import ContactSpeedDial from "../../components/speed-dial";
import CVOnboarding from "./cv-gen/onboarding";
import CVGenerate from "./cv-gen";


import client from "../../applo";
import { GET_CVS } from "../../query";
import { useQuery } from "@apollo/client";
import { getCVTemplate } from "../../services/profile-service";

import PostJobCard from "../../components/job-cards/postJob";
import { dumyDataforPosting } from "../../components/find-job/sections/industry.data";
import NewCVGenerate from "./cv-gen/newJobsCv";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import FindJob from "./find-job/[query2]";
import CV_Generate from "../pages/cv-gen/index";


interface HomePageProps { }
const StyledBox = styled(Box)(() => ({
  position: "relative",
  button: {
    display: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  "&:hover .button": {
    display: "block",
  },
  img: {
    border: "1px solid whitesmoke",
  },
}));
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

const HomePage: FC<HomePageProps> = () => {

  const navigate = useNavigate();
  const { addError } = useSnackbar();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint
  const { loading, error, data } = useQuery(GET_CVS, {
    client: client
  })
  const isTablet = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );
  const [load, setLoad] = React.useState(false)
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
  }, [data])


  let images: any = data?.cvs

  const onChooseTemplate = (id: number) => () => {
    if (!id) return;
    //navigate(`/cv-gen/${id}`);
    window.location.pathname = `/cv-gen/${id}`;
  };

  // useEffect(() => {
  //   if (error)
  //     addSnack?.({
  //       severity: "error",
  //       message: error?.message ?? "Unknown error",
  //     });
  // }, [error]);
  const itemsPerSlide = isMobile ? 1 : images?.length;

  const carouselItems = [];



  for (let i = 0; i < images?.length; i += itemsPerSlide) {
    const slideImages = images.slice(i, i + itemsPerSlide);

    carouselItems.push(
      <>

      </>
    );
  }

  return (
    <StyledPage>

      <FindJob />



      {/* {images?.map((img:any, index:any) => (
          <div key={img.id}>
            <StyledBox minHeight={100}>
              <Button
                className="button"
                variant="contained"
                onClick={() => onChooseTemplate(img.id)}
              >
                Select this Template
              </Button>
              <img
                src={getCVTemplate(img.path)}
                alt={img.label ?? "CV template"}
                draggable={false}
                height={200}
                width={350}
              />
            </StyledBox>
          </div>
        ))} */}

      <><Grid container spacing={2} style={{
        paddingLeft: isDesktop ? "0%" : isMobile ? "0%" : "8.5%",
        width: isDesktop ? "90%" : isMobile ? "100%" : "90%",
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }} >
        {
          isMobile ? <> <Grid item xs={12} md={6} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <img src="/assets/girlnew.png" style={{
              width: '90%',
              height: '100%',
              paddingLeft: isMobile ? '4%' : '5%',

            }} />
          </Grid>   <Grid item xs={12} md={6} direction={'column'} style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
          }}>

              <Stack direction={"column"} alignItems="flex-start" >
                <Stack direction={"row"} alignItems="center">
                  <CheckCircleIcon color="success" style={{
                    width: 100,
                  }} />
                  <Typography style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                    Select your Dream job now.
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <CheckCircleIcon color="success" style={{
                    width: 100
                  }} />
                  <Typography style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                    Create your great CV
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <CheckCircleIcon color="success" style={{
                    width: 100
                  }} />
                  <Typography style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                    Send your CV
                  </Typography>
                </Stack>
              </Stack>


              <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                textAlign : isMobile ? 'center' :'center',

                paddingLeft: isMobile ? '38%' : '38%',
                // paddingLeft: 150,
                //paddingLeft: 150, // Space between bullets and text
              }}>
                <Button component={Link} to="/cv-gen/onboarding" variant="contained" style={{
                  fontFamily: 'ubuntu, sans-serif',
                  justifyContent: 'center',
                  marginBottom: 10,
                  marginTop: 10,

                  backgroundColor: 'green'
                }}>
                  Apply Now
                </Button>
              </div>

            </Grid></> : <>
            <Grid item xs={12} md={6} style={{
              display: 'flex',
              marginLeft: isDesktop ? -900 : isMobile ? '30px' : '11px',
              paddingLeft: isMobile ? '40px' : '11px',

            }}>
              <img src="/assets/girlnew.jpg" style={{
                width: isDesktop ? '750px' : "740px",
                height: 'auto',

              }} />
            </Grid>
            <Grid item xs={12} md={6} direction={'column'} style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: 150, //isDesktop ? "8%" : "8%",
              marginTop: -100,
              marginRight: -800
            }}>

              <Stack direction={"column"} alignItems="flex-start">
                <Stack direction={"row"} alignItems="center">
                  <CheckCircleIcon color="success" style={{
                    width: 100,

                  }} />
                  <Typography style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                    Select your Dream job now.
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <CheckCircleIcon color="success" style={{
                    width: 100
                  }} />
                  <Typography style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                    Create your great CV
                  </Typography>
                </Stack>
                <Stack direction={"row"} alignItems="center">
                  <CheckCircleIcon color="success" style={{
                    width: 100
                  }} />
                  <Typography style={{
                    fontSize: 25,
                    fontWeight: 'bold',
                  }}>
                    Send your CV
                  </Typography>
                </Stack>
              </Stack>


              <div style={{
                justifyContent: 'center',
                alignItems: 'center',
                //paddingLeft: 150, // Space between bullets and text
              }}>
                <Button component={Link} to="/cv-gen/onboarding" variant="contained" style={{
                  fontFamily: 'ubuntu, sans-serif',
                  justifyContent: 'center',
                  marginBottom: 10,
                  marginTop: 10,
                  backgroundColor: 'green'
                }}>
                  Apply Now
                </Button>
              </div>

            </Grid>
          </>
        }


      </Grid></>

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
export default HomePage;
