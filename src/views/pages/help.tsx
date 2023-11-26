import React, { FC, useEffect } from "react";
import useBackend from "../../hooks/backend";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Box } from "@mui/system";
import styled from "@mui/material/styles/styled";
import { Typography, Container } from "@mui/material";
import { CandidateCardProps, JobCardProps } from "../../components/job-cards";
import { description } from "../../components/find-job/sections/industry.data";
import ContactPage from "./contact";

const StyledPage = styled("main")(({ theme }) => {
  const borderRadius = 10;
  return {
    padding: theme.spacing(5, 0),
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
    
  };
});

const splitTextIntoParagraphs = (text:any, maxWords:any) => {
  const words = text.split(' ');
  const paragraphs = [];
  let currentParagraph = '';
  let currentWordCount = 0;

  for (const word of words) {
    if (currentWordCount >= maxWords) {
      // Check if the current word contains a full stop (period)
      if (word.includes('.')) {
        paragraphs.push(currentParagraph + ' ' + word);
        currentParagraph = '';
        currentWordCount = 0;
      }
    }

    if (currentWordCount === 0) {
      currentParagraph = word;
      currentWordCount = 1;
    } else {
      currentParagraph += ' ' + word;
      currentWordCount++;
    }
  }

  if (currentParagraph !== '') {
    paragraphs.push(currentParagraph);
  }

  return paragraphs;
};

const capitalizeFirstLetter = (text:any) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const Help: FC = () => {
  const maxWordsPerParagraph = 2000; // Adjust this value as needed
  // const { data, loading, error } = useBackend<Response, Error>(
  //   "/advertisement/home"
  // );
  const { addSnack } = useSnackbar();

  // useEffect(() => {
  //   if (error)
  //     addSnack?.({
  //       severity: "error",
  //       message: error?.message ?? "Unknown error",
  //     });
  // }, [error]);

  const paragraphs = splitTextIntoParagraphs(description, maxWordsPerParagraph);

  return (
    <StyledPage>
     
      <Container>
       <ContactPage/>
      </Container>
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

export default Help;
