import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import { StyledPaper } from ".";
import { useLanguage } from "../../store/providers/lang.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { DATA_INDUSTRY } from "../find-job/sections/industry.data";

interface OverviewCardProps {
  title: string;
  date: string;
  id: any;
  industry?: string;
  sections: { title: string; amount: number }[][];
  onViewAd?: () => void;
}

const OverviewCard: FC<OverviewCardProps> = ({
  title,
  date,
  industry,
  sections,
  onViewAd,
  id,
}) => {
  const { code } = useLanguage();
  return (
    <Card style={{ maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h2" color="secondary" margin={0}>
          {title}
        </Typography>
        <Typography>{dateFormat(date, { dateStyle: "long" })}</Typography>

        <StyledPaper elevation={0} style={{ margin: "10px 0" }}>
          <Typography variant="subtitle1">

          </Typography>
        </StyledPaper>

        <Stack divider={<Divider />}>
          {sections.map((section, i) => (
            <Stack key={i} paddingY={1} spacing={0.5}>
              {section.map((record, j) => (
                <Stack
                  direction="row"
                  key={`${i}=${j}`}
                  justifyContent="space-between"
                >
                  <Typography color="secondary">{record.title}</Typography>
                  <Typography color="primary" fontWeight="700">
                    {record.amount}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          ))}
        </Stack>
      </CardContent>
      <CardActions>
        <Stack spacing={1}>
          <Link to={`/job/${id}`}>
            <Button
              variant="text"
              color="primary"
              onClick={onViewAd}
              style={{ justifyContent: "flex-start" }}
            >
              View Ad
            </Button>
          </Link>
          <Link to={id}>
            <Button
              variant="text"
              color="primary"
              onClick={onViewAd}
              style={{ justifyContent: "flex-start" }}
            >
              View Candidate details
            </Button>
          </Link>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default OverviewCard;
