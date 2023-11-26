import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import { useAuthBackend } from "../../../hooks/backend";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";

interface SuccessPageProps { }

const SuccessPage: FC<SuccessPageProps> = () => {
  const [params] = useSearchParams();
  const invoice_id = params.get("invoice");
  const { addError } = useSnackbar();

  const { data, loading, error } = useAuthBackend<
    Response<{ payment_success: boolean }>,
    Error
  >("/payment/confirm", {
    method: "POST",
    data: {
      invoice_id,
    },
  });
  useEffect(() => {
    if (error) addError?.(error.message);
  }, []);

  if (invoice_id === null) return <Navigate to="/" />;

  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(3),
        left: "50%",
        width: "fit-content",
        position: "relative",
        transform: "translateX(-50%)",
        minWidth: "250px",
        minHeight: "250px",
      }}
    >
      <Loader loading={loading} />
      <Stack alignItems="center">
        <Typography
          maxWidth={500}
          fontWeight="700"
          textAlign="center"
          variant="h3"
          color={data?.result.payment_success ? "primary" : "error"}
        >
          {data?.result.payment_success ? "Your payment have completed successfully" : "Your payment is failed"}
        </Typography>
        <Box marginY={2}>
          <img
            src={`/assets/${data?.result.payment_success ? "top-ad.png" : "payment-failed.svg"
              }`}
            alt="successfully applied"
            height={250}
            width={250}
          />
        </Box>
        <Link to="/find-job">
          <Button variant="contained" style={{ alignSelf: "center" }}>
            Search More Jobs
          </Button>
        </Link>
      </Stack>
    </Paper>
  );
};

export default SuccessPage;
