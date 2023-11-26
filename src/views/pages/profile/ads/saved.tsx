import { Container, Grid, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { CardProps } from "../../../../components/job-cards";
import MiniCard from "../../../../components/job-cards/vertical";
import { StyledPaper } from "../../../../components/styled-common/paper";
import { useAuthBackend } from "../../../../hooks/backend";
import * as adService from "../../../../services/ad-service";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { Response } from "../../../../utils/utils.types";
import Loader from "../../../loader/Loader";

interface SavedAdsProps {}

const SavedAds: FC<SavedAdsProps> = () => {
  const { addSnack, addError } = useSnackbar();

  const { data, error, loading } = useAuthBackend<Response<CardProps[]>, Error>(
    "/advertisement/saved",
    undefined,
    { revalidateOnFocus: true }
  );
  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error.message ?? "Unknown error",
      });
  }, [error]);

  const unsave = (id: number) => async () => {
    try {
      const { success } = await adService.unsave(id);
      if (success) {
        addSnack?.({ severity: "info", message: "Ad unsaved" });
      }
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  return (
    <main style={{ padding: 10 }}>
      <Container>
        <StyledPaper>
          <Typography color="primary" variant="h1">
            Saved Ads
          </Typography>
          <Loader loading={loading} />
          {!data?.result.length && (
            <Typography paragraph>No Data Available</Typography>
          )}
          <Grid container spacing={2}>
            {data?.result.map((card) => (
              <Grid md={4} sm={6} xs={12} item key={card.id}>
                <MiniCard
                  card={card}
                  actions={[{ label: "Unsave", onClick: unsave(card.id) }]}
                />
              </Grid>
            ))}
          </Grid>
        </StyledPaper>
      </Container>
    </main>
  );
};

export default SavedAds;
