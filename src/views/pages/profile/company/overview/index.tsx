import { Container, Grid, Paper, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import OverviewCard from "../../../../../components/job-cards/overview-card";
import { useAuthBackend } from "../../../../../hooks/backend";
import { useSnackbar } from "../../../../../store/providers/snackbar.provider";
import { dateFormat } from "../../../../../utils/formatters/date-format";
import { Response } from "../../../../../utils/utils.types";

interface CompanyOverviewProps {}

const CompanyOverview: FC<CompanyOverviewProps> = () => {
  const { data, error } = useAuthBackend<Response<Result[]>, Error>(
    "/analytics/employerad"
  );
  const { addError } = useSnackbar();
  useEffect(() => {
    if (error) addError?.(error?.message ?? "Unknown error");
  }, [error]);

  return (
    <main style={{ padding: 16 }}>
      <Container>
        <Paper style={{ padding: 16 }}>
          <Typography variant="h1" color="primary">
            Ads Overview
          </Typography>
          <Grid container spacing={2}>
            {data?.result.map((card) => (
              <Grid item xs={12} md={4} key={card.id}>
                <OverviewCard
                  id={card.id}
                  title={card.job_title_description}
                  industry={card.industry}
                  date={dateFormat(card.timestamp)}
                  sections={[
                    [
                      { title: "Amount of applications", amount: card.applied },
                      { title: "Selected Candidates", amount: card.selected },
                      { title: "Rejected Candidates", amount: card.rejected },
                    ],
                  ]}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Container>
    </main>
  );
};
export interface Result {
  id: number;
  timestamp: string;
  industry: string;
  job_title: string;
  applied: number;
  selected: number;
  rejected: number;
  job_title_description: string;
}
export default CompanyOverview;
