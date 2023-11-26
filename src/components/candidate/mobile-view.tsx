import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  styled,
  Typography,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useLanguage } from "../../store/providers/lang.provider";
import slides, { CandidateProps } from "./edit.data";

const Styled = styled("div")(({ theme }) => ({
  ".expand": {
    color: theme.palette.primary.main,
  },
  "& .MuiButton-root": {
    left: "50%",
    transform: "translateX(-50%)",
  },
}));

const CandidateMobile: FC<CandidateProps> = ({ togglePostAdPopup }) => {
  const { code } = useLanguage();
  const {
    completedstep,
    completed: allCompleted,
    update,
  } = useAuthentication();
  const [activeTab, setActiveTab] = useState(0);

  const onAccordionChange = (id: number) => (_: any, expanded: boolean) => {
    setActiveTab(expanded ? id : -1);
  };

  const [completed, setCompleted] = useState<number | "ALL">(() => {
    if (allCompleted) return "ALL";
    return completedstep ?? 0;
  });
  const updatedCompleted = (idx: number) => (isCompleted: boolean) => {
    if (isCompleted === true) {
      // if the current step is completed no need to update "completed" to previous stage
      if (completed <= idx) {
        setCompleted(idx);
        update?.({ completedstep: idx });
      }
      setActiveTab(-1); // closes all
    }
  };
  useEffect(() =>{
    if(completedstep !== undefined  && completedstep !== null){
     setActiveTab(completedstep+1)
    }
   },[completedstep])
  return (
    <Styled>
      {slides.map((slide, i) => {
        const Page = slide.page ?? (() => null);
        return (
          <Accordion
            disabled={completed !== "ALL" && completed < i}
            key={slide.id}
            elevation={0}
            expanded={activeTab === i}
            onChange={onAccordionChange(i)}
            classes={{ expanded: "expand" }}
            disableGutters
            TransitionProps={{ unmountOnExit: true, mountOnEnter: true }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Typography fontWeight="700">{slide.label?.[code]}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ padding: 0, paddingBottom: (theme) => theme.spacing(3) }}
            >
              {/* @ts-ignore */}
              <Page
                id={slide.id}
                updateCompleted={updatedCompleted(i)}
                togglePostAdPopup={togglePostAdPopup}
              />
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Styled>
  );
};

export default CandidateMobile;
