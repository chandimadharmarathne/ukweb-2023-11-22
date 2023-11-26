import { KeyboardArrowRight } from "@mui/icons-material";
import { Stack, Tabs, Tab, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useLanguage } from "../../store/providers/lang.provider";
import slides, { CandidateProps } from "./edit.data";
import TabPanel from "../tabs/tab-panel";
import TabsContainer from "../tabs/tabs-container";
import { useAuthentication } from "../../store/providers/auth.provider";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
const CandidateDesktop: FC<CandidateProps> = ({ togglePostAdPopup }) => {
  const { code } = useLanguage();
  const {
    completedstep,
    completed: allCompleted,
    adposted,
    update,
  } = useAuthentication();
  const [completed, setCompleted] = useState<number | "ALL">(() => {
    if (allCompleted) return "ALL";
    return completedstep ?? 0;
  });
  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };
   //console.log("completed", completedstep);
  const updatedCompleted = (idx: number) => (isCompleted: boolean) => {
    //console.log("completed", isCompleted)
    if (isCompleted === true) {
      // if the current step is completed no need to update "completed" to previous stage
      if (completed <= idx) {
       // console.log("completed2", completed,idx);
        setCompleted(idx);
        update?.({ completedstep: idx });
      }
      setActiveTab(idx + 1); // the next tab will be active
    }
  };

  // useEffect(() =>{
  //   console.log("completed1", completedstep,activeTab);
  //  if(completedstep !== undefined  && completedstep !== null){
  //   setActiveTab(completedstep+1)
  //  }
  // },[completedstep])

  return (
    <Stack direction="row">
      <Tabs
        orientation="vertical"
        value={activeTab}
        onChange={handleTabChange}
        TabIndicatorProps={{ style: { display: "none" } }}
        style={{ flex: 1 }}
      >
        {slides.map((slide, i) => (
          <Tab
            key={slide.id}
            disabled={completed !== "ALL" && completed < i}
            label={
              <Stack
                width="100%"
                direction="row"
                justifyContent="space-between"
                spacing={1}
              >
                <Typography fontWeight="500" textAlign="left">
                  {slide.label?.[code]}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={1}>
                 
                {
                completedstep && completedstep >= i && 

                  <CheckCircleIcon style={{ color: 'green' }} />
                }
                <KeyboardArrowRight />
                  </Stack>
              </Stack>
            }
          />
        ))}
      </Tabs>

      <TabsContainer value={activeTab} style={{ flex: 3 }}>
        {slides.map((slide, i) => {
          const Page = slide.page ?? (() => null);
          return (
            <TabPanel key={slide.id} index={i}>
              <Page
                id={slide.id}
                updateCompleted={updatedCompleted(i)}
                togglePostAdPopup={togglePostAdPopup}
              />
            </TabPanel>
          );
        })}
      </TabsContainer>
    </Stack>
  );
};

export default CandidateDesktop;
