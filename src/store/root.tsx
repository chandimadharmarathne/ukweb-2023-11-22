import { ThemeProvider } from "@mui/material";
import React, { FC, ReactNode } from "react";
import { HashRouter } from "react-router-dom";
import theme from "../themes";
import ErrorBoundary from "../utils/error-boundary";
import AuthProvider from "./providers/auth.provider";
import { LanguageProvider } from "./providers/lang.provider";
import MobileProvider from "./providers/mobile-to-desktop-change.provider";
import SnackbarProvider from "./providers/snackbar.provider";
import SocketProvider from "./providers/socket.provider";

interface RootProps {
  children: ReactNode;
}

const Root: FC<RootProps> = ({ children }: RootProps) => {
  return (
    <ThemeProvider theme={theme}>
      <HashRouter>
        <MobileProvider>
          <AuthProvider>
            <SocketProvider>
              <LanguageProvider>
                <SnackbarProvider>
                  <ErrorBoundary>{children}</ErrorBoundary>
                </SnackbarProvider>
              </LanguageProvider>
            </SocketProvider>
          </AuthProvider>
        </MobileProvider>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Root;
