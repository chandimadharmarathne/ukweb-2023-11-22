import {
  Box,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  FormControlLabel,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { DATA_ADVERTISEMENT_TYPES } from "../constants/input-data";
import { currencyFormat } from "../utils/formatters/currency-format";
import SubmitButton from "./submit-button";

interface PackageCardProps {
  tag: string;
  price: number;
  type: number;
  amount: number;
  description?: string;
  features?: { title: string; on: boolean }[];
  onBuy?: () => void;
}

const PackageCard: FC<PackageCardProps> = ({
  tag,
  price,
  description,
  onBuy,
  type,
  amount,
  features = [],
}) => {
  return (
    <Card
      sx={{
        position: "relative",
        maxWidth: "400px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        paddingBlock: (theme) => theme.spacing(2),
      }}
    >
      <Tag>{tag}</Tag>
      <CardContent>
        <Box width="fit-content" margin="auto">
          <Typography variant="h2" color="primary" margin={0}>
            {currencyFormat(price)}
          </Typography>
          <Typography textAlign="right" color="primary" marginBottom={2}>
            {amount}{" "}
            {DATA_ADVERTISEMENT_TYPES.find((ad) => ad.id === type)?.label}{" "}
            Advertisements
          </Typography>
        </Box>
        <Typography textAlign="center">{description}</Typography>
        <Stack>
          {features.map((feature) => (
            <Box key={feature.title}>
              <FormControlLabel
                label={feature.title}
                control={<Checkbox checked={feature.on} />}
              />
            </Box>
          ))}
        </Stack>
      </CardContent>
      <CardActions
        sx={{ justifySelf: "space-between", justifyContent: "center" }}
      >
        <SubmitButton onClick={onBuy}>Buy Now</SubmitButton>
      </CardActions>
    </Card>
  );
};
export interface MyPackage {
  pkg_id: number;
  pkg_name: string;
  pkg_price: number;
  pkg_expire: string;
  pkg_days_left: number;
  pkg_purchase_id: number;
  pkg_purchase_date: string;
}

const Tag = styled("div")(({ theme }) => ({
  maxWidth: 300,
  width: "fit-content",
  fontSize: 20,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 2),
  fontWeight: "700",
  clipPath: "polygon(0 0, 90% 0%, 100% 100%, 0% 100%)",
}));

export default PackageCard;
