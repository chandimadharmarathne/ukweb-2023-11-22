import { Grid, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { UserType } from "../constants/input-data";
import useBackend from "../hooks/backend";
import { useSnackbar } from "../store/providers/snackbar.provider";
import { Response } from "../utils/utils.types";
import Loader from "../views/loader/Loader";
import { CandidateCardProps } from "./job-cards";
import MiniCard from "./job-cards/vertical";

interface SuggesstionsProps {
  type: UserType;
  amount: number;
}

const Suggesstions: FC<SuggesstionsProps> = ({ type, amount }) => {
  const { addSnack } = useSnackbar();

  const { data, loading, error } = useBackend<
    Response<CandidateCardProps[]>,
    Error
  >("/advertisement/suggest", { params: { type, amount } });

  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error?.message ?? "Unknown error",
      });
  }, [error]);
  return (
    <>
      <Typography variant="h2">Suggestions</Typography>
      <Loader loading={loading} />
      <Grid container spacing={2}>
        {data?.result.map((card) => (
          <Grid key={card.id} item sm={12} md={6} lg={4}>
            <MiniCard card={card} type="candidate" />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Suggesstions;
