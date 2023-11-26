import { Card, CardContent, Stack, Typography } from "@mui/material";
import React, { FC } from "react";

interface OverviewCardProps {
  title: string;
  records: { title: string; count?: number }[];
}

const AnalyticsCard: FC<OverviewCardProps> = ({ title, records }) => {
  return (
    <Card
      style={{
        width: "100%",
        height: "100%",
        maxWidth: "60ch",
        background: "#2A8989",
        color: "#fff",
      }}
    >
      <CardContent>
        <Typography variant="h2">{title}</Typography>
        {records.map((record, i) => (
          <Stack key={i} direction="row" justifyContent="space-between">
            <Typography>{record.title}</Typography>
            <Typography>{record.count}</Typography>
          </Stack>
        ))}
      </CardContent>
    </Card>
  );
};

export default AnalyticsCard;
