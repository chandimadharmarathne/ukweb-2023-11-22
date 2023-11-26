import { createContext, FC, useContext, useState } from "react";
import React from "react";
import { Alert, AlertProps, Snackbar } from "@mui/material";

const ERRORS_NOT_TO_DISPLAY = ["Network Error", "canceled", "Request aborted"];

type Snack = {
  severity: AlertProps["severity"];
  message?: string;
  onClick?: () => void;
} | null;

type AddSnack = {
  addSnack: ((snack: Snack) => void) | null;
  addError?: (message: string) => void;
};

const SnackbarContext = createContext<AddSnack>({ addSnack: null });


interface SnackbarProviderProps {
  children: React.ReactNode;
}


const SnackbarProvider: FC<SnackbarProviderProps> = ({ children }) => {
  const [snack, setSnack] = useState<Snack>(null);

  const addSnack: AddSnack["addSnack"] = (snack) => {
    if (snack?.message && ERRORS_NOT_TO_DISPLAY.includes(snack?.message))
      return;
    setSnack(snack);
  };

  const addError = (message: string) => {
    addSnack({
      severity: "error",
      message,
    });
  };

  const handleClose = () => {
    setSnack(null);
  };

  return (
    <SnackbarContext.Provider value={{ addSnack, addError }}>
      {children}

      {snack && (
        <Snackbar open autoHideDuration={5000} onClose={handleClose}>
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={snack.severity}
            sx={{ width: "100%" }}
            onClick={snack.onClick}
          >
            {snack.message}
          </Alert>
        </Snackbar>
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export default SnackbarProvider;
