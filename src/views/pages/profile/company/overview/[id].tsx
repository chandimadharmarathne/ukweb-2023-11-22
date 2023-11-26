import { Box, Container, Stack, Tab, Tabs, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CandidateMiniProfile from "../../../../../components/candidate/mini-profile";
import { Main } from "../../../../../components/styled-common/main";
import TabPanel from "../../../../../components/tabs/tab-panel";
import TabsContainer from "../../../../../components/tabs/tabs-container";
import Tile, { TileProps } from "../../../../../components/tile";
import { Verified } from "../../../../../components/verify-profile";
import {
  AdHistoryStatus,
  DATA_VACANCY_STATUS,
} from "../../../../../constants/input-data";
import { useAuthBackend } from "../../../../../hooks/backend";
import { useToggle } from "../../../../../hooks/toggle.hook";
import * as adService from "../../../../../services/ad-service";
import { getProfilePic } from "../../../../../services/profile-service";
import { useSnackbar } from "../../../../../store/providers/snackbar.provider";
import { Response } from "../../../../../utils/utils.types";
import Loader from "../../../../loader/Loader";
import { BACKEND_URL } from "../../../../../constants/config";

const EmployerAdDetails: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addError, addSnack } = useSnackbar();
  const [selectedUserProfile, setSelectedUserProfile] = useState<{
    [key: string]: any;
  }>({});
  const [activeTab, setActiveTab] = useState(0);
  const [activeTab1, setActiveTab1] = useState(0);
  const [activeTab2, setActiveTab2] = useState(0);

  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
    setSelectedUserProfile({});
  };
  const handleTabChange1 = (_: any, newValue: number) => {
    setActiveTab1(newValue);
    setActiveTab(newValue)
    setSelectedUserProfile({});

  };
  const handleTabChange2 = (_: any, newValue: number) => {
    setActiveTab2(newValue);
    
    setSelectedUserProfile({});

  };
  const onSelect: TileProps["onSelect"] = (_, id, records, buttons, user) => {
    setSelectedUserProfile({ id, user, records, buttons });
  };

  const selectCandidate = (args: adService.SelectCandidateArgs) => async () => {
    try {
      const res = await adService.selectCandidate(args);
      if (res.success) addSnack?.({ severity: "success", message: res.result });
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const download = async (url1: any) => {
    try {
      const response = await fetch(url1);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "image.jpg";
      a.href = url;
      a.click();
      URL.revokeObjectURL(url);

    } catch (error) {
      console.log(error);
    }
  };
  const getAppliedButtons: PanelProps["getButtons"] = (record) => {
    const info = {
      apply_id: record.id,
      user_id: record.user,
      job_id: id as unknown as number,
    };
    return [
      {
        label: "View Profile",
        onClick: () => navigate(`/candidate/${record.user}`),
      },
      { label: "Select", onClick: selectCandidate({ ...info, approve: true }) },
      {
        label: "Reject",
        onClick: selectCandidate({ ...info, approve: false }),
      },
      {
        label: "View CV",
        onClick: () => {
          window.open(`${BACKEND_URL}/static/uploads/${record.cv}`, "_blank");
        },
      },{
        label: "download CV",
        onClick: () => {
          let url1 = `${BACKEND_URL}/static/uploads/${record.cv}`;

                    download(url1);
        }
      }
    ];
  };
  const getSelectedButtons: PanelProps["getButtons"] = (record) => [
    {
      label: "View Profile",
      onClick: () => navigate(`/candidate/${record.user}`),
    },
  ];
  const getVacancyButtons: PanelProps["getButtons"] = (record) => [
    {
      label: "View Profile",
      onClick: () => navigate(`/candidate/${record.id}`),
    },
  ];
  const getVacancyRecords: PanelProps["getRecords"] = (record) => [
    {
      content: DATA_VACANCY_STATUS.find((v) => v.id === record.selection_status)
        ?.label,
    },
  ];

  return (
    <Main>
      <Container>
        <Typography variant="h1" color="primary">
          Ad Details
        </Typography>

       <Tabs
       value={activeTab1}
       onChange={handleTabChange1}
       style={{ marginBottom: 20 }}
       variant="scrollable"
       scrollButtons="auto"
       allowScrollButtonsMobile
       > 

          <Tab label="Inbox" />
          <Tab label="Sent" />
          </Tabs>
          <TabsContainer style={{ flex: 2 }} value={activeTab1}>
            <TabPanel index={0}>
            <Tabs
          value={activeTab}
          onChange={handleTabChange}
          style={{ marginBottom: 20 }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Applied" />
          <Tab label="Selected" />
          <Tab label="Rejected" />
          <Tab label="Vacancy Requests" />
        </Tabs>
        <Stack direction="row" spacing={2}>
          <TabsContainer style={{ flex: 2 }} value={activeTab}>
            <TabPanel index={0}>
              <Panel
                onSelect={onSelect}
                selectedUser={selectedUserProfile}
                type={AdHistoryStatus.APPLIED}
                getButtons={getAppliedButtons}
              />
            </TabPanel>
            <TabPanel index={1}>
              <Panel
                onSelect={onSelect}
                selectedUser={selectedUserProfile}
                type={AdHistoryStatus.APPROVED}
                getButtons={getSelectedButtons}
              />
            </TabPanel>
            <TabPanel index={2}>
              <Panel
                onSelect={onSelect}
                selectedUser={selectedUserProfile}
                type={AdHistoryStatus.REJECTED}
                getButtons={getSelectedButtons}
              />
            </TabPanel>
            <TabPanel index={3}>
              <Panel
                url="/analytics/employerad-history-vacancy"
                onSelect={onSelect}
                selectedUser={selectedUserProfile}
                type={AdHistoryStatus.VACANCY}
                getButtons={getVacancyButtons}
                getRecords={getVacancyRecords}
              />
            </TabPanel>
          </TabsContainer>

          <Box flex={1} display={{ xs: "none", md: "block" }}>
            {selectedUserProfile.id && (
              <CandidateMiniProfile
                buttons={selectedUserProfile.buttons}
                id={selectedUserProfile.user}
                records={selectedUserProfile.records}
              />
            )}
          </Box>
        </Stack>
              </TabPanel>
              <TabPanel index={1}>
              <Tabs
          value={activeTab2}
          onChange={handleTabChange2}
          style={{ marginBottom: 20 }}
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
        >
          <Tab label="Accept" />
          <Tab label="Deny" />
          <Tab label="View Only" />
     
        </Tabs>
        <Stack direction="row" spacing={2}>
          <TabsContainer style={{ flex: 2 }} value={activeTab2}>
            <TabPanel index={0}>
              <Panel
                onSelect={onSelect}
                selectedUser={selectedUserProfile}
                type={AdHistoryStatus.APPLIED}
                getButtons={getAppliedButtons}
              />
            </TabPanel>
            <TabPanel index={1}>
              <Panel
                onSelect={onSelect}
                selectedUser={selectedUserProfile}
                type={AdHistoryStatus.APPROVED}
                getButtons={getSelectedButtons}
              />
            </TabPanel>
            <TabPanel index={2}>
              <Panel
                onSelect={onSelect}
                selectedUser={selectedUserProfile}
                type={AdHistoryStatus.REJECTED}
                getButtons={getSelectedButtons}
              />
            </TabPanel>
            
          </TabsContainer>

          <Box flex={1} display={{ xs: "none", md: "block" }}>
            {selectedUserProfile.id && (
              <CandidateMiniProfile
                buttons={selectedUserProfile.buttons}
                id={selectedUserProfile.user}
                records={selectedUserProfile.records}
              />
            )}
          </Box>
        </Stack>
                </TabPanel>
          </TabsContainer>
      
      
      </Container>
    </Main>
  );
};
interface PanelProps {
  selectedUser: any;
  type: number;
  onSelect?: TileProps["onSelect"];
  getButtons?: (record: Result) => TileProps["buttons"];
  getRecords?: (record: any) => TileProps["records"];
  url?: string;
}
const Panel: FC<PanelProps> = ({
  selectedUser,
  onSelect,
  type,
  getButtons,
  getRecords,
  url = "/analytics/employerad-history",
}) => {
  const { id } = useParams();

  const { addError } = useSnackbar();
  const [toggle, toggleRequest] = useToggle();

  const { data, loading, error } = useAuthBackend<Response<Result[]>, Error>(
    [url, id, type, toggle],
    { params: { id, type } }
  );
  useEffect(() => {
    if (error) addError?.(error?.message ?? "Unknown error");
  }, [error]);

  const onSelectTile: typeof onSelect = (...args) => {
    onSelect?.(...args);
    toggleRequest();
  };

  return (
    <Stack spacing={1}>
      <Loader loading={loading} />
      {!data?.result.length && (
        <Typography paragraph>No details available</Typography>
      )}
      {data?.result.map((record) => (
        <>
        <Tile
          key={record.id}
          selected={record.id === selectedUser}
          // @ts-ignore
          onSelect={(...args) => onSelectTile(...args, record.user)}
          id={record.id}
          avatar={getProfilePic(record.dp)}
          buttons={getButtons?.(record)}
          records={[
            {
              content: (
                <>
                  {record.name}
                  <Verified verified={!!record.badge} />
                </>
              ),
            },
            ...(getRecords?.(record) ?? []),
          ]}
        />
        <label>{record?.appliedvia}</label>
        </>
      ))}
    </Stack>
  );
};

export interface Result {
  id: number;
  user: number;
  name: string;
  role: number;
  dp?: any;
  badge: number;
  cv: string;
  appliedvia: string;
}
export default EmployerAdDetails;
