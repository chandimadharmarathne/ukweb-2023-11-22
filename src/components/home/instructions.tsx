import { FC } from "react";
import React from "react";
import { Container, Grid, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { Language } from "../../constants/languages";
import { useLanguage } from "../../store/providers/lang.provider";
import { CandidateSearch, Chat, Job, ApplyJob, Work } from "../../utils/icons";

interface InstructionsProps {}

const Instructions: FC<InstructionsProps> = () => {
  const { code } = useLanguage();
  return (
    <Container maxWidth={"xl"}>
      <Grid container spacing={5} paddingY={4}>
        {instructions.map((instruction, i) => {
          const Icon = instruction.icon ?? Work;
          return (
            <Grid
              item
              lg={3}
              md={6}
              sm={6}
              xs={12}
              key={i}
              alignItems="center"
              display="flex"
              flexDirection="column"
            >
              <Icon fontSize="large" color="primary" />
              <Typography
                color="primary"
                fontWeight="400"
                paddingY={1}
                variant="h3"
                textAlign="center"
              >
                {instruction.title[code]}
              </Typography>
              <Typography textAlign="center" color="secondary">
                {instruction.text[code]}
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

type Instruction = {
  icon?: OverridableComponent<SvgIconTypeMap<Record<string, any>, "svg">> & {
    muiName: string;
  };
  title: Language;
  text: Language;
};
const instructions: Instruction[] = [
  {
    title: { en: "Find the Right Job", si: "" },
    text: {
      en: "Discovering the right occupation where your qualifications and capabilities lays is just a fingertip away!",
    },
    icon: Job,
  },
  {
    title: { en: "Find Perfect Candidates", si: "" },
    text: {
      en: "Compare profiles and select the perfect match for your vacancy. Our website rates how well candidates score based on their skills, work experience, and education with regard to the type of vacancy they applied for.",
    },
    icon: CandidateSearch,
  },
  {
    title: { en: "Connect with Each Other" },
    text: {
      en: "We connect both candidates and employers in one place to establish reliable links.",
    },
    icon: Chat,
  },
  {
    title: { en: "Apply for Jobs" },
    text: {
      en: "Our platform offers job vacancies ranging in varied fields and industries providing all the candidates with equal opportunity for the DREAM career.",
    },
    icon: ApplyJob,
  },
];
export default Instructions;
