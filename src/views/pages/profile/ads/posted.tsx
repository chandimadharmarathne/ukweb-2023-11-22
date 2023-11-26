import { Container, Grid, Tab, Tabs, Typography } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardProps } from "../../../../components/job-cards";
import MiniCard from "../../../../components/job-cards/vertical";
import { StyledPaper } from "../../../../components/styled-common/paper";
import TabPanel from "../../../../components/tabs/tab-panel";
import TabsContainer from "../../../../components/tabs/tabs-container";
import { useAuthBackend } from "../../../../hooks/backend";
import * as adService from "../../../../services/ad-service";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { Response } from "../../../../utils/utils.types";
import Loader from "../../../loader/Loader";
import { types } from "../../post-ad";

interface SavedAdsProps {}

const PostedAds: FC<SavedAdsProps> = () => {
  const { addSnack } = useSnackbar();
  const navigate = useNavigate();
  const available = useAuthBackend<Response<CardProps[]>, Error>(
    "/advertisement/available"
  );
  const expired = useAuthBackend<Response<CardProps[]>, Error>(
    "/advertisement/expired"
  );
  const unpaid = useAuthBackend<
    Response<(CardProps & { advertisement_type: number })[]>,
    Error
  >("/advertisement/unpaid");

  useEffect(() => {
    if (available.error || expired.error)
      addSnack?.({
        severity: "error",
        message:
          (available.error?.message || expired.error?.message) ??
          "Unknown error",
      });
  }, [available.error, expired.error]);

  const [activeTab, setActiveTab] = useState(0);
  const handleTabChange = (_: any, newValue: number) => {
    setActiveTab(newValue);
  };

  const deleteAd = (id: number) => async () => {
    try {
      const res = await adService.deleteAd(id);
      if (res.success)
        addSnack?.({
          message: "Successfully Removed",
          severity: "info",
        });
    } catch (error: any) {
      addSnack?.({
        message: error.message,
        severity: "error",
      });
    }
  };

  const editAd = (id: number) => () => {
    navigate(`/post-ad/edit/${id}`);
  };
  const viewAd = (id: number) => () => {
    navigate(`/job/${id}`);
  };
  const payAd = (id: number, adType: number) => () => {
    navigate(
      `/post-ad/${types.find((type) => type.id === adType)?.link}/${id}`
    );
  };
  const viewAnalytics = (id: number) => () => {
    navigate(`/profile/company/overview/${id}`);
  };
  return (
    <main>
      <Container>
        <StyledPaper>
          <Typography color="primary" variant="h1">
            Posted Ads
          </Typography>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            style={{ marginBottom: 20 }}
          >
            <Tab label="Available Ads" />
            <Tab label="Expired Ads" />
            <Tab label="Unpaid Ads" />
          </Tabs>

          <TabsContainer value={activeTab}>
            <TabPanel index={0}>
              <Loader loading={available.loading} />
              <Grid container spacing={2}>
                {!available.data?.result.length && !available.loading && (
                  <Typography>No posts found</Typography>
                )}
                {available.data?.result.map((card) => (
                  <Grid item xs={12} md={4} sm={6} key={card.id}>
                    
                    <MiniCard
                      showButtons={false}
                      card={card}
                      actions={[
                        { label: "View Ad", onClick: viewAd(card.id) },
                        {
                          label: "View Analytics",
                          onClick: viewAnalytics(card.id),
                        },
                        { label: "Edit Ad", onClick: editAd(card.id) },
                        { label: "End Ad", onClick: deleteAd(card.id) },
                      ]}
                    />
                  </Grid>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel index={1}>
              <Loader loading={expired.loading} />
              <Grid container spacing={2}>
                {!expired.data?.result.length && !expired.loading && (
                  <Typography>No posts found</Typography>
                )}
                {expired.data?.result.map((card) => (
                  <MiniCard
                    showButtons={false}
                    card={card}
                    key={card.id}
                    actions={[
                      { label: "Delete Ad", onClick: deleteAd(card.id) },
                    ]}
                  />
                ))}
              </Grid>
            </TabPanel>
            <TabPanel index={2}>
              <Loader loading={unpaid.loading} />
              <Grid container spacing={2}>
                {!unpaid.data?.result.length && !unpaid.loading && (
                  <Typography>No posts found</Typography>
                )}
                {unpaid.data?.result.map((card) => (
                  <MiniCard
                    showButtons={false}
                    card={card}
                    key={card.id}
                    actions={[
                      {
                        label: "Pay Ad",
                        onClick: payAd(card.id, card.advertisement_type),
                      },
                      { label: "Delete Ad", onClick: deleteAd(card.id) },
                    ]}
                  />
                ))}
              </Grid>
            </TabPanel>
          </TabsContainer>
        </StyledPaper>
      </Container>
    </main>
  );
};

export default PostedAds;
