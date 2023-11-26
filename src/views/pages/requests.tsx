import { Container, Paper, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import CVRequestsPage from "../../components/requests/cv";
import ProfileRequestsPage from "../../components/requests/profile";
import VacancyPage from "../../components/requests/vacancy";
import { Main } from "../../components/styled-common/main";
import TabPanel from "../../components/tabs/tab-panel";
import TabsContainer from "../../components/tabs/tabs-container";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useNavigate } from "react-router-dom";

const RequestsPage: FC = () => {
  const { role } = useAuthentication();
  const [showFilter, setShowFilter] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [newQuery, setNewQuery] = useState("");
  
  const [activeTab, setActiveTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("id"));
  });
  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };
  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const navigate = useNavigate();
  const handleSearch = () => {
   // const newUrl = navigateLink(newQuery) + `?page=${page}`;

    // Perform any search-related actions here, such as updating the URL or triggering a search request.
  };
  return (
    <Main>
      <Container>
        <Paper elevation={0} className="paper">
          <Typography variant="h1" color="primary">
            Requests
          </Typography>

          {/* <Typography textAlign="right" color="secondary" paddingBottom={2}>
            Showing 1 - 5 of 1366 requests
          </Typography> */}

          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            style={{ marginBottom: 20 }}
            variant="scrollable"
            scrollButtons
          >
            <Tab label="Profile Requests" />
            <Tab label="CV Requests" />
            <Tab label="Vacancy Requests" />
          </Tabs>
          <Stack direction="row" spacing={2}>
            <TabsContainer style={{ flex: 2 }} value={activeTab}>
              <TabPanel index={0}>
                <ProfileRequestsPage />
              </TabPanel>
              <TabPanel index={1}>
                <CVRequestsPage />
              </TabPanel>
              <TabPanel index={2}>
                <VacancyPage />
              </TabPanel>
            </TabsContainer>
          </Stack>
        </Paper>
      </Container>
    </Main>
  );
};

export interface RequestResults {
  id: number;
  user: number;
  user_name: string;
  dp: string;
  role: number;
  timestamp: string;
}
export default RequestsPage;
