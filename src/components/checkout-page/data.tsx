import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Stack,
  Typography,
} from "@mui/material";
import { ChangeEventHandler, FC, useEffect } from "react";
import * as adService from "../../services/ad-service";
import React from "react";
import { useAuthBackend } from "../../hooks/backend";
import { Response } from "../../utils/utils.types";
import { MyPackage } from "../package-card";
import Loader from "../../views/loader/Loader";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { useToggle } from "../../hooks/toggle.hook";
import { UserType } from "../../constants/user-types";
import { FilePresent } from "@mui/icons-material";

export const DATA_PAYMENT_TYPES: PaymentType[] = [
  {
    id: adService.PaymentTypes.CARD,
    label: "Card",
    helpText: "VISA, Master, eZ cash",
  },
  {
    id: adService.PaymentTypes.BANK,
    label: "Bank",
    helpText: "Relavant bank account details will be display",
    Component: ({ value, onChange }) => {
      const onReciptChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (file) onChange?.(file);
      };
      return (
        <Stack marginTop={2}>
          <Button variant="contained">
            <label htmlFor="reciept">
              {!!value ? "Change Reciept" : "Upload Reciept"}
            </label>
          </Button>
          {value?.size && (
            <Stack direction="row" marginY={1} gap={1} alignItems="center">
              <FilePresent />
              <Typography>{value?.name}</Typography>
            </Stack>
          )}
          <input
            accept="image/*,application/pdf"
            type="file"
            onChange={onReciptChange}
            id="reciept"
            hidden
          />
        </Stack>
      );
    },
  },
  {
    id: adService.PaymentTypes.PACKAGE,
    label: "From My Package",
    helpText: "Lorem ipsum dolor sit amet.",
    Component: ({ onChange, value }) => {
      const [show, toggleShow] = useToggle(true);
      const { addError } = useSnackbar();
      const { data, loading, error } = useAuthBackend<
        Response<MyPackage[]>,
        Error
      >("/packages/my");

      useEffect(() => {
        if (error) {
          addError?.(error.message);
        }
      }, [error]);

      const onSelectPkg = (id: number) => () => {
        onChange?.(id);
      };
      return (
        <Dialog maxWidth="sm" fullWidth open={show} onClose={toggleShow}>
          <Loader loading={loading} />
          <DialogContent>
            <Typography variant="h2" color="primary">
              Choose your package
            </Typography>
            <Stack spacing={1}>
              {data?.result.map((pkg) => (
                <Stack
                  direction="row"
                  key={pkg.pkg_id}
                  justifyContent="space-between"
                >
                  <Box display="flex" alignItems="center">
                    <Typography variant="h5" margin={0} paragraph>
                      {pkg.pkg_name}
                    </Typography>
                    <Typography variant="caption" margin={0} marginLeft={1}>
                      {pkg.pkg_days_left} days left
                    </Typography>
                  </Box>
                  <Button
                    onClick={onSelectPkg(pkg.pkg_id)}
                    variant="outlined"
                    disabled={value === pkg.pkg_id}
                  >
                    {value === pkg.pkg_id ? "Selected" : "Select"}
                  </Button>
                </Stack>
              ))}
            </Stack>
          </DialogContent>
        </Dialog>
      );
    },
  },
];
export const getPaymentTypes = (...types: number[]) =>
  DATA_PAYMENT_TYPES.filter((type) => types.includes(type.id));

export interface PaymentType {
  id: number;
  label: string;
  helpText?: string;
  Component?: FC<{ value?: any; onChange?: (value: any) => void }>;
}

export const getPaymentTypesForRole = (role?: UserType | null) => {
  if (role === "candidate")
    return getPaymentTypes(
      adService.PaymentTypes.BANK,
      adService.PaymentTypes.CARD
    );

  return DATA_PAYMENT_TYPES;
};
