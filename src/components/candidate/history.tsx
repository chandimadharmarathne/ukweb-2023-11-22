import { Container, Grid, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdHistoryStatus } from "../../constants/input-data";
import { useAuthBackend } from "../../hooks/backend";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Response } from "../../utils/utils.types";
import TabPanel from "../tabs/tab-panel";
import TabsContainer from "../tabs/tabs-container";
import { Panel, PanelProps } from "./history-panels";
import AnalyticsCard from "./overview-card";

interface CandidateHistoryProps {}
const CandidateHistory: FC<CandidateHistoryProps> = () => {
  const navigate = useNavigate();
  const { data, error } = useAuthBackend<Response<Result>, Error>(
    "/analytics/candidates"
  );
  const { addError } = useSnackbar();

  useEffect(() => {
    if (error) addError?.(error?.message ?? "Unknown error");
  }, [error]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const getButtons: PanelProps["getButtons"] = (record) => [
    { label: "View Job", onClick: () => navigate(`/job/${record.job_id}`) },
  ];

  return (
    <main>
      <Container>
        <Typography variant="h1" color="primary">
          History
        </Typography>
        <Grid container spacing={3}>
          <Grid sx={{ alignSelf: "stretch" }} item xs={12} sm={6} lg={4}>
            <AnalyticsCard
              title="Jobs"
              records={[
                {
                  title: "Number of Jobs Applied",
                  count: data?.result.job_applied,
                },
                {
                  title: "Number of Jobs Selected",
                  count: data?.result.job_selected,
                },
                {
                  title: "Number of Jobs Rejected",
                  count: data?.result.job_rejected,
                },
              ]}
            />
          </Grid>
          <Grid sx={{ alignSelf: "stretch" }} item xs={12} sm={6} lg={4}>
            <AnalyticsCard
              title="Vacancies"
              records={[
                {
                  title: "Number of Vacancies Requested",
                  count: data?.result.vacancy_requests,
                },
                {
                  title: "Number of Vacancies Approved",
                  count: data?.result.vacancy_approved,
                },
              ]}
            />
          </Grid>
        </Grid>

        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          style={{ marginBottom: 20 }}
        >
          <Tab label="Applied" />
          <Tab label="Selected" />
          <Tab label="Rejected" />
        </Tabs>
        <Stack direction="row" spacing={2}>
          <TabsContainer style={{ flex: 2 }} value={activeTab}>
            <TabPanel index={0}>
              <Panel type={AdHistoryStatus.APPLIED} getButtons={getButtons} />
            </TabPanel>
            <TabPanel index={1}>
              <Panel type={AdHistoryStatus.APPROVED} getButtons={getButtons} />
            </TabPanel>
            <TabPanel index={2}>
              <Panel type={AdHistoryStatus.REJECTED} getButtons={getButtons} />
            </TabPanel>
          </TabsContainer>
        </Stack>
      </Container>
    </main>
  );
};

interface Result {
  job_applied: number;
  job_selected: number;
  job_rejected: number;
  vacancy_requests: number;
  vacancy_approved: number;
}
export default CandidateHistory;
