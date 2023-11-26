import {
  Box,
  Button,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
/* import { useToggle } from "../../hooks/toggle.hook"; */
import { PaymentTypes } from "../../services/ad-service";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import CountrySelect from "../country-selector";
import SubmitButton from "../submit-button";
import { PaymentType } from "./data";

interface CheckoutProps {
  title: string;
  price: string;
  paymentTypes: PaymentType[];
  options?: { id: string; label: string }[];
  description?: string;
  bannerImg?: string;
  onPay?: (type: any, data: any) => void | Promise<any>;
}

const Checkout: FC<CheckoutProps> = ({
  title,
  description,
  bannerImg,
  price,
  paymentTypes,
  options,
  onPay,
}) => {
  const { addError } = useSnackbar();

  const [paid, togglePaid] = useState(false);

  const [paymentType, setPaymentType] = useState<number>();
  const [data, setData] = useState<{
    [id: number | string]: any;
  }>({});

  const PaymentComponent =
    paymentTypes.find((type) => type.id === paymentType)?.Component ??
    (() => null);

  const onChange = (value: any) => {
    setData((prev) => ({ ...prev, [paymentType!]: value }));
  };

  const onOptionChange = (_: any, value: string) => {
    setData((prev) => ({ ...prev, selectedOption: value }));
  };
  const navigate = useNavigate();
  const pay = async () => {
    try {
      if (paymentType === undefined)
        throw new Error("No Payment method Selected");
      navigate("/")
      await onPay?.(paymentType, data);
      
      
      /* togglePaid((prev) => !prev) */
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  return (
    <Paper>
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box className="left-box">
          <Typography variant="h1">{title}</Typography>
          <Typography className="description">{description}</Typography>
          {options && (
            <FormControl fullWidth className="ad-radio">
              <RadioGroup name="adType" onChange={onOptionChange}>
                {options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          )}
          <Box display={{ xs: "none", md: "block" }}>
            <img
              src={bannerImg ?? "/assets/paid-ad.png"}
              alt={title}
              width={400}
              height={400}
            />
          </Box>
        </Box>
        <Box className="right-box">
          <Typography variant="h1" color="primary">
            Pricing
          </Typography>
          <CountrySelect code="LK" />
          <Typography variant="h2" color="secondary" paddingY={1}>
            {price}
          </Typography>

          <FormControl fullWidth>
            <RadioGroup
              name="payment"
              onChange={(_, id) => setPaymentType(parseInt(id))}
            >
              {paymentTypes.map((radio) => (
                <FormControlLabel
                  key={radio.id}
                  value={radio.id}
                  control={<Radio />}
                  label={
                    <>
                      {radio.label}
                      <FormHelperText>{radio.helpText}</FormHelperText>
                    </>
                  }
                />
              ))}
            </RadioGroup>
          </FormControl>
          <PaymentComponent value={data[paymentType!]} onChange={onChange} />

          <Stack direction="row" spacing={2} className="actions">
            <Button>Cancel</Button>
            <SubmitButton onClick={pay}>Pay Now</SubmitButton>
          </Stack>
        </Box>
      </Stack>

      <Dialog open={paid && paymentType !== PaymentTypes.CARD}>
        <DialogContent>
          <Stack alignItems="center">
            <Typography
              maxWidth={500}
              fontWeight="700"
              textAlign="center"
              variant="h3"
              color="primary"
            >
              You have paid successfully
            </Typography>
            <Box marginY={2}>
              <img
                src="/assets/top-ad.png"
                alt="successfully applied"
                height={250}
                width={250}
              />
            </Box>
            <Link to="/">
              <Button variant="contained" style={{ alignSelf: "center" }}>
                Back to Home
              </Button>
            </Link>
          </Stack>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};

export default Checkout;
