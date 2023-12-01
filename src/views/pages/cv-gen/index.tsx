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
import { is } from "date-fns/locale";
const StyledMain = styled("main")(() => ({
  ".blob": {
    zIndex: -1,
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    top: 0,
  },
}));
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

  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );
  useEffect(() => {
    setJobData(data?.jobs?.slice(0, 3) ?? [])
  }, [data])

  return (
    <StyledMain style={{
      //backgroundImage: isMobile ? "":`url('/assets/normal.avif')`,

      backgroundRepeat: 'no-repeat',
      //backgroundSize: 'contain', // Adjust the sizing as needed
      // Additional background properties if necessary
      width: isDesktop ? "100%" : "100%",
      marginLeft: isDesktop ? "2%" : "1%",
      paddingLeft: 1,
      opacity: 1
    }}>


      {
        !isMobile && <Typography variant="h2" id="heading" color="secondary" style={{
          fontFamily: 'ubuntu, sans-serif',
          textAlign: 'center',
          color: 'black',

        }}>
          How to Apply for a Dream Job within 3 steps
        </Typography>
      }
      {
        isMobile && <Typography variant="h2" id="heading" color="secondary" style={{
          fontFamily: 'ubuntu, sans-serif',
          textAlign: 'center',
          color: 'black',
          padding: "0px 20px"

        }}>
          How to Apply for a Dream Job within 3 steps
        </Typography>
      }


      <Grid container spacing={2} style={{
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
            <img src="/assets/girlnew.jpg" style={{
              width: '100%',
              height: '100%',
             
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
                paddingLeft: 150,
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
              marginTop:-100,
              marginRight:-800
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


      </Grid>

      <Grid container spacing={2} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        width: isDesktop ? "88%" : isMobile ? "92%" : "95%",
        marginLeft: isDesktop ? "4%" : isMobile ? "1%" : "1%",
        //marginLeft: isMobile ? "4%" : "5%",
        // padding: 20,
      }} >


        {jobData?.map((card: any) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',

          }}>
            <JobCard card={card} key={card.id} />
          </Grid>
        ))}
      </Grid>














    </StyledMain>
  );
};



export default CVGenerate;
