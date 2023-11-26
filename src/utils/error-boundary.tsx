import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import React, { Component } from "react";
import SubmitButton from "../components/submit-button";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: string;
  errorTrace?: string;
  errorInfo?: string;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, info: any) {
    console.trace({ error, info });
    this.setState({
      error: error.message,
      errorTrace: info?.componentStack,
      errorInfo: JSON.stringify(error),
    });
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }
  render() {
    if (this.state.hasError)
      return (
        <Dialog open maxWidth="lg" fullWidth>
          <DialogContent>
            <Typography variant="h2">Something went wrong</Typography>
            <Typography>Refresh the browser</Typography>
            <Accordion disableGutters elevation={0}>
              <AccordionSummary expandIcon={<ExpandMore />}>
                {this.state.error}
              </AccordionSummary>
              <AccordionDetails>
                <code>{this.state.errorTrace}</code>
              </AccordionDetails>
            </Accordion>
          </DialogContent>
          <DialogActions>
            <SubmitButton
              style={{ width: "fit-content" }}
              onClick={() => window.location.reload()}
            >
              Reload
            </SubmitButton>
          </DialogActions>
        </Dialog>
      );
    return this.props.children;
  }
}

export default ErrorBoundary;
