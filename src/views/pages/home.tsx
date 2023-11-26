import {
  Button,
  Card,
  Container,
  Grid,
  GridDirection,
  Paper,
  Stack,
  styled,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Slider from 'react-slick';
import LoadingComponent from '../../components/loader'
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import Carousel from 'react-bootstrap/Carousel';
import './carousel.css';
import React, { FC, useEffect, useRef } from "react";
import AliceCarousel, { AutoplayDirection } from "react-alice-carousel";
import { Link, useNavigate } from "react-router-dom";
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

import client from "../../applo";
import { GET_CVS } from "../../query";
import { useQuery } from "@apollo/client";
import { getCVTemplate } from "../../services/profile-service";

import PostJobCard from "../../components/job-cards/postJob";
import { dumyDataforPosting } from "../../components/find-job/sections/industry.data";
import NewCVGenerate from "./cv-gen/newJobsCv";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  /* img: {
    border: "1px solid whitesmoke",
  }, */
  img: { // Fix here: use '& .imgCV' instead of 'imgCV'
    border: "1px solid whitesmoke",
    width: '250px', // Set the desired width, for example, 100% of the container
    height: "auto", // Maintain aspect ratio
    maxWidth: "200", // Ensure the image doesn't exceed its original size
    maxHeight: "200", // Ensure the image doesn't exceed its original size
  },


}));

const StyledPage = styled("main")(({ theme }) => ({
  alignItems: "center",
  //display: "flex",
  alignContent: "center",
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

  // image slieder settings
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (galleryRef.current) {
        const galleryTop = galleryRef.current.getBoundingClientRect().top;
        const arrowTop = galleryRef.current.offsetHeight / 2;
        const newTop = galleryTop + arrowTop;
        document.getElementById('leftArrow')?.style.setProperty('transform', `translateY(${newTop}px)`);
        document.getElementById('rightArrow')?.style.setProperty('transform', `translateY(${newTop}px)`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToLeft = () => {
    console.log('Scrolling to left')
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: -200, // Adjust the scroll distance as needed
        behavior: 'smooth', // Add smooth scrolling effect
      });
    }
  };

  const scrollToRight = () => {
    if (galleryRef.current) {
      galleryRef.current.scrollBy({
        left: 200, // Adjust the scroll distance as needed
        behavior: 'smooth',
      });
    }
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

      <div style={{
        backgroundColor: 'green',
        //width:"80%"
        width: isDesktop ? "87.5%" : isMobile ? "87.5%" : "80%",
        justifyContent:'center',
        padding: isDesktop ? '10px 5px' : isMobile ? '5px 10px' : '5px 5px',
        marginLeft: isDesktop ? "7%" : isMobile ? "7%" : "8%",
      }}>

        <h3 style={{
          textAlign: 'center',
          //padding:10,
          //fontFamily:"Ubuntu, sans-serif",
          color: 'white',
        }}
        >
          How to Apply for a Job
        </h3>

        <p style={{
          color: "white"
        }}>
          Create awesome CV using
          our CV generator
        </p>

      </div>
      <NewCVGenerate />



      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        //padding: 20,
        paddingTop: 10,
        paddingBottom: 10,
      }}>
        <Card style={{
          backgroundColor: 'white',
          width: isDesktop ? "89%" : isMobile ? "80%" : "85%",

        }}>
          <h2 style={{
            textAlign: 'center',
            //fontFamily:"Ubuntu, sans-serif",
            color: 'black',
          }}
          >
            Choose a template for your CV
          </h2>
          <p style={{
            textAlign: 'center',
            //fontFamily:"Ubuntu, sans-serif",
            marginTop: -10,
            paddingBottom : isMobile? 10 : 10,
            color: 'green',
          }}  >
            You can always change your template later
          </p>
          {/* <Carousel nextIcon={<ArrowForward />} nextLabel="" prevIcon={<ArrowBack />} prevLabel="" >
            {images?.map((img: any, index: any, display:GridDirection, overflowX:ScrollOptions) => (
              <Carousel.Item >
                <StyledBox
                  gridTemplateColumns={AutoplayDirection}
                  grid-gap={10}
                  minHeight={350}
                  paddingLeft={0}
                  key={img.id}
                  marginX={1}>

                  <a href={`/#/cv-gen/${img.id}`}>
                    <img
                      key={index}
                      className="d-block w-100"
                      src={getCVTemplate(img.path)}
                      alt={img.label ?? 'CV template'}
                      draggable={false}
                      height={300}
                      width={300}
                    />
                  </a>
                </StyledBox>

              </Carousel.Item>
            ))}
          </Carousel> */}

          {/*  <div className="gallery-wrap">
          <img
                src={picture ?? "/assets/user.png"}
                alt={credentials?.first_name}
                width={200}
                height={200}
              />
            </div> */}

          <div className="container" style={{marginTop:'-50px'}}>
            
            <div className="galary-wrap" ref={galleryRef} style={{overflowX:'hidden', whiteSpace:'nowrap', position:'relative'}}>
              <img src="../assets/leftArrow.png" id="leftArrow" style={{position:'fixed', left:'15%', top:'-8%', transform:  'translateY(-50%)', cursor: 'pointer' }} onClick={scrollToLeft}/>

              {images?.map((img: any, index: any) => (

                <div className="card" key={img.id} style={{display:'inline-block', margin:'0 -30px', padding:'0 100px'}}>

                    <a href={`/#/cv-gen/${img.id}`}>

                      <img
                        key={index}
                        className="d-block w-100"
                        src={getCVTemplate(img.path)}
                        alt={img.label ?? 'CV template'}
                        draggable={false}
                        height={20}
                        width={20}
                        style={{height:'300px', width:'auto', marginTop:'-5px'}}
                      />

                    </a>

                </div>


              ))}
              <img src="../assets/rightArrow.png" id="rightArrow" style={{position:'fixed', right:'15%', top:'-8%', transform:  'translateY(-50%)', cursor: 'pointer' }} onClick={scrollToRight}/>

            </div>

          </div>



          <div style={{
            display: isMobile ? 'flex' : '',
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
            paddingLeft: isMobile ? 0 : isDesktop ? 150 : 91, // Space between bullets and text
          }}>
            <Button component={Link} to="/cv-gen/onboarding" variant="contained" style={{
              // fontFamily: 'ubuntu, sans-serif',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: '-100px',
              marginLeft: isDesktop ? '35%' : isMobile ? '15%' : '15%',
              marginRight: isDesktop ? '35%' : isMobile ? '15%' : '15%',
              backgroundColor: 'darkgreen',
              
            }}>
              Build your CV
            </Button>
          </div>

        </Card>
      </div>

      {/* <div style={{ overflowX: 'auto' }}>
        <Grid container spacing={2}>
          {images?.map((img: any) => (

            <Grid item xs={6} sm={5} md={4} key={img.id}>
              <StyledBox minHeight={350} paddingLeft={10} key={img.id} marginX={1}>
                <Button
                  className="button"
                  variant="contained"
                  onClick={onChooseTemplate(img.id)}
                >
                  Select this Template
                </Button>
                <img
                  src={getCVTemplate(img.path)}
                  alt={img.label ?? "CV template"}
                  draggable={false}
                  width={300}
                  height={300}

                />

              </StyledBox>
            </Grid>

          ))}
        </Grid>
      </div>, */}

      {/*     <div style={{ gridTemplateColumns: 'auto' }}>

        {images?.map((img: any) => (


          <StyledBox
            gridTemplateColumns={AutoplayDirection}
            grid-gap={10}
            minHeight={350}
            paddingLeft={10}
            key={img.id}
            marginX={1}>
            <Button
              className="button"
              variant="contained"
              onClick={onChooseTemplate(img.id)}
            >
              Select this Template
            </Button>
            <img
              src={getCVTemplate(img.path)}
              alt={img.label ?? "CV template"}
              draggable={false}
              width={300}
              height={300}

            />

          </StyledBox>


        ))}

      </div>, */}


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
          width: isDesktop ? "89%" : isMobile ? "80%" : "85%",

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
                justifyContent:'space-between',
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
          <Grid container style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }} >
            <Grid
              item xs={12} sm={6} md={4} lg={3} xl={3} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                color: 'white',
              }}>
              All you  need is your email address to create
            </Grid>
            <Grid
              item xs={12} sm={6} md={4} lg={3} xl={3} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                color: 'white',
              }}>
              All you  need is your email address to create
            </Grid>
            <Grid
              item xs={12} sm={6} md={4} lg={3} xl={3} style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                color: 'white',
              }}>
              All you  need is your email address to create
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
export default HomePage;
