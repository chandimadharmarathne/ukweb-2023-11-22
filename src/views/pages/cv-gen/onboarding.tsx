import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";
import React, { FC, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { useNavigate } from "react-router-dom";
import { Main } from "../../../components/styled-common/main";
import useBackend from "../../../hooks/backend";
import { getCVTemplate } from "../../../services/profile-service";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";
import { useQuery } from "@apollo/client";
import { GET_CVS } from '../../../query'
import client from "../../../applo";
import CreateCV from "./[style_id]";
import { useMobile } from "../../../store/providers/mobile-to-desktop-change.provider";
import '../../../index.css'
const StyledBox = styled(Box)(() => ({
  position: "relative",
  button: {
    display: "none",
    position: "absolute",
    top: "80%",
    left: "30%",
    transform: "translate(-50%, -50%)",

  },
  "&:hover .button": {
    display: "block",
  },
  'img': { // Fix here: use '& .imgCV' instead of 'imgCV'
    border: "1px solid whitesmoke",
    width: '350px', // Set the desired width, for example, 100% of the container
    height: "auto", // Maintain aspect ratio
    maxWidth: "300", // Ensure the image doesn't exceed its original size
    maxHeight: "300", // Ensure the image doesn't exceed its original size
  },
}));




const CVOnboarding: FC = () => {
  const navigate = useNavigate();
  const { addError } = useSnackbar();
  const [id, setId] = React.useState<number>(0);
  const [activeStep, setActiveStep] = React.useState(0);
  const { loading, error, data } = useQuery(GET_CVS, {
    client: client
  })

  const isMobile = useMobile()


  let images: any = data?.cvs

  const onChooseTemplate = (id: number) => () => {
    if (!id) return;

    setId(id);
    // setActiveStep(activeStep+1)
    navigate(`/cv-gen/${id}`);
  };

  let contents = [
    <Grid container spacing={2}>
      {images?.map((imgCV: any) => (

        <Grid item xs={6} sm={5} md={4} key={imgCV.id}>
          <StyledBox minHeight={650} key={imgCV.id} marginX={1}>
            <Button
              className="button"
              variant="contained"
              onClick={onChooseTemplate(imgCV.id)}
            >
              Select this Template
            </Button>
            <img
              src={getCVTemplate(imgCV.path)}
              alt={imgCV.label ?? "CV template"}
              draggable={false}
              width={500}
              height={500}

            />

          </StyledBox>
        </Grid>

      ))}
    </Grid>,

    <Grid container spacing={2}>
      {images?.map((imgCV: any) => (

        <StyledBox minHeight={900} key={imgCV.id} marginX={1}>
          <Button
            className="button"
            variant="contained"
            onClick={onChooseTemplate(imgCV.id)}

          >
            Select this Template
          </Button>
          <img
            src={getCVTemplate(imgCV.path)}
            alt={imgCV.label ?? "CV template"}
            draggable={false}
            width={500}
            height={500}
          />

        </StyledBox>

      ))}
    </Grid>
  ]



  return (
    <Main>
      <Container>
        <Stepper style={{ marginBottom: 24, marginTop: 80 }} alternativeLabel activeStep={activeStep} >
          {steps.map((step, i) => (
            <Step key={i} >
              <StepLabel>{step.label}</StepLabel>
              {
                activeStep === i &&
                <StepContent style={{
                  width: "300%",
                  padding: 10,
                  marginLeft: activeStep === 1 ? isMobile ? "-70%" : "-70%" : activeStep === 2 ? "-100%" : "0%"

                }}>
                  {
                    contents[activeStep]
                  }
                </StepContent>
              }
            </Step>
          ))}
        </Stepper>




      </Container>
    </Main>
  );
};

const responsive = {
  0: { items: 1 },
  480: { items: 2 },
  900: { items: 3 },
};

const steps = [
  { label: "Select Template" },
  { label: "Add Information" },
  { label: "Download" },
];

export interface Template {
  id: number;
  label: string;
  path: string;
}
export default CVOnboarding;
