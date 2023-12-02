import { Padding, Paid, Receipt, Work } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  styled,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InfoCard from "../../../components/info-card";
import useBackend from "../../../hooks/backend";
import { getCVTemplate } from "../../../services/profile-service";
import { SpecialPerson } from "../../../utils/icons";
import { Response } from "../../../utils/utils.types";
import { Template } from "./onboarding";
import { cv_guidelines } from "../../../components/find-job/sections/industry.data";
import StepCard from "../../../components/job-cards/StepCard";
import { text } from "stream/consumers";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../../../query";
import client from "../../../applo";
import JobCard from "../../../components/job-cards/horizontal";

const StyledMain = styled("main")(({ theme }) => {
  const borderRadius = 10;

  return {
    padding: theme.spacing(5, 0),
    marginTop: theme.spacing(8),
    ".searchbar": {
      background: theme.palette.background.default,
      borderRadius,
    },
    ".body": {
      margin: theme.spacing(3, 2),
      background: "#ffffff",
      borderRadius,
    },
    ".result": {
      padding: theme.spacing(2),
    },
    ".paginator": {
      paddingTop: theme.spacing(4),
      width: "fit-content",
      margin: "auto",
    },
    "searchbar": {
      borderRadius: 0
    }
  };
});
const ASPECT = 247 / 315;
const HEIGHT = 450;




const CVGenerate: FC = () => {
  // const { data } = useBackend<Response<Template[]>, Error>("/system/cv");
  // const images = data?.result;
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint
  const [jobData, setJobData] = useState<any>([])
  const { loading, error, data } = useQuery(GET_JOBS, {
    client: client
  })
  const [open, setOpen] = useState(false)
  const isTablet = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );


  useEffect(() => {
    setJobData(data?.jobs?.slice(0, 3) ?? [])
  }, [data])

  return (
    <StyledMain style={{
      width: isDesktop ? "100%" : isMobile ? "100%" : "100%",
      //backgroundImage: isMobile ? "":`url('/assets/normal.avif')`,
      //padding: isDesktop ?"18px 10px": isTablet ? "5px 15px":"10px 20px",
      //width:"100%"
      // width: isDesktop ?"100%":isMobile ?"100%":"100%",
      // marginLeft:isDesktop? 0:isMobile ? 0:0,
      // backgroundRepeat: 'no-repeat',
      // backgroundSize: 'contain', // Adjust the sizing as needed
      // // Additional background properties if necessary
      // opacity: 1,
      // justifyContent:"center",
      // alignItems:'center'
    }}>


      <Typography variant="h2" id="heading" color="secondary" style={{
        //  fontFamily: 'ubuntu, sans-serif',
        textAlign: 'center',
        color: 'black',
        marginLeft: isDesktop ? '-100px' : isMobile ? 0 : 13,
        marginTop: isMobile ? '-60px' : '-60px',
      }}>
        The CV that gets the job
      </Typography>


      <Grid container spacing={8} style={{
        // padding: 20,
        width: isDesktop ? '100%' : isMobile ? '100%' : '100%',


        //marginLeft:isDesktop?0:isMobile ? 0:-20,
      }} >


        <Grid item xs={12} md={6} lg={6} style={{

        }} >
          <div>
            <div style={{
              display: isMobile ? 'flex' : '',
              flexDirection: 'column',
              alignItems: isMobile ? 'center' : 'center', // You can adjust alignment as needed
              paddingLeft: isMobile ? '10%' : isDesktop ? "16%" : 91, // Space between bullets and text

              justifyContent: isMobile ? 'center' : 'space-between'
            }}>
              {
                !isMobile && <div>
                  <Typography variant="body1" id="heading" color="secondary" style={{
                    // fontFamily: 'ubuntu, sans-serif',
                    textAlign: 'justify',
                    color: 'black',
                    fontSize: 20,
                    marginTop: '50px',
                  }}>
                    Build a new CV in 03
                  </Typography>
                  <Typography variant="body1" id="heading" color="secondary" style={{
                    //fontFamily: 'ubuntu, sans-serif',
                    textAlign: 'justify',
                    color: 'black',
                    fontSize: 20,
                  }}>
                    minutes or Improve
                  </Typography>
                  <Typography variant="body1" id="heading" color="secondary" style={{
                    // fontFamily: 'ubuntu, sans-serif',
                    textAlign: 'justify',
                    color: 'black',
                    fontSize: 20,
                  }}>
                    your existing one
                  </Typography></div>
              }
              {
                isMobile && <>
                  <Typography variant="body1" id="heading" color="secondary" style={{
                    // fontFamily: 'ubuntu, sans-serif',
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'black',
                    fontSize: 20,
                    paddingLeft: "16%",
                    paddingRight: "-5%",
                  }}>
                    Build a new CV in 03  minutes or Improve your existing one
                  </Typography>
                </>
              }
            </div>

            {/* <Stack direction={"column"} alignItems="flex-start" >
            <Stack direction={"row"} alignItems="center">
              <CheckCircleIcon color="success" style={{
                width: 100
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
          </Stack> */}


            <div style={{
              display: isMobile ? 'flex' : '',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: isMobile ? '34%' : isDesktop ? "16%" : 91, // Space between bullets and text
              paddingRight: isMobile ? '11%' : '11%',
              marginTop: isMobile ? -20 : -20,
            }}>
              <Button component={Link} to="/cv-gen/onboarding" variant="contained" style={{
                // fontFamily: 'ubuntu, sans-serif',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 40,
                backgroundColor: 'darkblue',
              }}>
                Create your CV
              </Button>
            </div>
          </div>
        </Grid>



        <Grid item xs={12} md={6} lg={6} >
          <div style={{
            display: isMobile ? 'flex' : 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            position: 'relative',
            marginTop: isDesktop ? '130px' : isMobile ? '60px' : '60px',
            paddingBottom: isDesktop ? '350px' : isMobile ? '150px' : '150px',

            //paddingRight:'27px',
            //marginLeft:isMobile? 0:isDesktop ?"9%":0,
            right: 0,
            // marginRight:isMobile? 10:isDesktop? 48 :30,

          }}>
            <img src="/assets/cvGirl.png" style={{
              width: isDesktop ? '65%' : isTablet ? '80%' : isMobile ? '78%' : '100%',
              height: 'auto',
              position: isDesktop ? 'absolute' : isMobile ? 'relative' : 'relative',
              paddingTop: isDesktop ? '10px' : isMobile ? '10px' : '15px',
              marginBottom: isMobile ? '-140px' : '-150px',
              marginTop: isMobile ? '-140px' : '-150px',
              marginRight: '-150px',
              paddingLeft: isTablet ? '100px' : '101px',
            }} />
            <img src="/assets/mainCv.jpeg" style={{
              width: isDesktop ? '50%' : isMobile ? '48%' : '50%',
              height: 'auto',
              position: 'absolute',
              paddingRight: '50px',
              paddingTop: '200px',
              marginLeft: isDesktop ? '-400px' : isMobile ? 0 : 13,
              marginBottom: isMobile ? '70px' : 13,
            }} />


          </div>
        </Grid>

      </Grid>


      <Typography variant="h2" id="heading" color="secondary" style={{
        //  fontFamily: 'ubuntu, sans-serif',
        textAlign: 'center',
        color: 'black',
        marginTop: '50px',
      }}>
        How to Create CV within 03 steps
      </Typography>


      <Grid container spacing={2} style={{ //how to create cv
        padding: isDesktop ? "18px 18px 18px 18px" : isMobile ? "10px 20px" : "5px 54px",
        //width:"100%"
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: isDesktop ? "101.5%" : isMobile ? "100%" : "100%",
        marginLeft: isDesktop ? 0 : isMobile ? 0 : 13,
        //marginRight:isDesktop?'-1000px':isMobile ? 0:13,

        // In here, can change How to create CV within 3 stemp's steps and description size, margins //
      }} >


        <Grid item xs={12} md={6} lg={6} >
          <div>
            <div style={{
              display: isMobile ? '' : 'flex',
              flexDirection: isMobile ? 'row' : 'column',
              alignItems: 'center', // You can adjust alignment as needed
              padding: isDesktop ? "18px 78px" : isMobile ? "10px 10px" : "10px 10px",
              //width:"100%"
              width: isDesktop ? 500 : isTablet ? "90%" : "90%",
              marginLeft: isDesktop ? 40 : isMobile ? -10 : -10,
            }}>
              <div style={{
                paddingLeft: isDesktop ? 0 : isMobile ? 35 : 35,
                paddingRight: isDesktop ? 35 : isMobile ? 10 : 10,
                width: isDesktop ? 500 : isTablet ? 450 : isMobile ? 300 : 300,
                paddingBottom: 20,
                // padding: 10,
                //paddingBottom:isMobile?20:10,
              }}>
                <Typography variant="h3" id="heading" color="secondary" style={{
                  // fontFamily: 'ubuntu, sans-serif',
                  textAlign: isMobile ? 'center' : 'justify',
                  color: 'green',
                  fontSize: 20,
                }}>
                  Step 01
                </Typography>
                <Typography variant="body1" id="heading" color="secondary" style={{
                  // fontFamily: 'ubuntu, sans-serif',
                  textAlign: isMobile ? 'center' : 'justify',
                  color: 'black',
                  fontSize: 20,
                  paddingBottom: 10,
                }}>
                  Choose the sample template of your interest which represents you well among the other candidates by clicking "View All Templates" button.
                </Typography>
              </div>
              <div style={{
                paddingBottom: 20,
                paddingLeft: isDesktop ? 0 : isMobile ? 35 : 35,
                paddingRight: isDesktop ? 35 : isMobile ? 10 : 10,
                width: isDesktop ? 500 : isTablet ? 450 : isMobile ? 300 : 300,
                // padding: 10,
                // paddingBottom:isMobile?20:10,
              }}>
                <Typography variant="h3" id="heading" color="secondary" style={{
                  // fontFamily: 'ubuntu, sans-serif',
                  textAlign: isMobile ? 'center' : 'justify',
                  color: 'green',
                  fontSize: 20,
                }}>
                  Step 02
                </Typography>
                <Typography variant="body1" id="heading" color="secondary" style={{
                  // fontFamily: 'ubuntu, sans-serif',
                  textAlign: isMobile ? 'center' : 'justify',
                  color: 'black',
                  fontSize: 20,

                }}>
                  Feed your personal, educational, professional, technical, extracurricular and other relevant information to the selected format.
                </Typography>
              </div>
              <div style={{
                paddingLeft: isDesktop ? 0 : isMobile ? 35 : 35,
                paddingRight: isDesktop ? 35 : isMobile ? 10 : 10,
                width: isDesktop ? 500 : isTablet ? 450 : isMobile ? 300 : 300,
                // padding: 10,
                //paddingBottom:isMobile?20:10,
              }}>
                <Typography variant="h3" id="heading" color="secondary" style={{
                  // fontFamily: 'ubuntu, sans-serif',
                  textAlign: isMobile ? 'center' : 'justify',
                  color: 'green',
                  fontSize: 20,
                }}>
                  Step 03
                </Typography>
                <Typography variant="body1" id="heading" color="secondary" style={{
                  // fontFamily: 'ubuntu, sans-serif',
                  textAlign: isMobile ? 'center' : 'justify',
                  color: 'black',
                  fontSize: 20,
                }}>
                  Double check your details and click "Generate CV" button to automatically create a full sample CV
                </Typography>
              </div>
            </div>

            {/* <Stack direction={"column"} alignItems="flex-start" >
            <Stack direction={"row"} alignItems="center">
              <CheckCircleIcon color="success" style={{
                width: 100
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
          </Stack> */}


            {/* <div style={{
            justifyContent: 'center',
            alignItems: 'center',
            paddingLeft: 150, // Space between bullets and text
          }}>
            <Button component={Link} to="/cv-gen/onboarding" variant="contained" style={{
             // fontFamily: 'ubuntu, sans-serif',
              justifyContent: 'center',
              marginBottom: 10,
              marginTop: 40,
              backgroundColor: 'darkblue',
            }}>
              Create your CV
            </Button>
          </div> */}
          </div>
        </Grid>



        <Grid item xs={12} md={6} lg={6} style={{
          marginLeft: isDesktop ? '-70px' : isMobile ? '15px' : '15px',
          marginRight: isDesktop ? '4%' : isMobile ? '4%' : '4%',
          // change How to create CV within 03 steps margine in both side//
          // In here, can change image ( correct, incorrect) paddings and image size//
        }}>

          <img src="/assets/admire.jpeg" style={{
            width: isDesktop ? '92%' : isMobile ? '97%' : '90%',
            height: '70%',
            paddingLeft: '-50%',

          }} />

        </Grid>

      </Grid>













    </StyledMain>
  );
};



export default CVGenerate;
