import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#912411",
      "100": "#2a89891f",
      light: "#C9E1E1 ",
      contrastText: "#FFFFFF",
    },
    background: {
      paper: "#ffffff",
    },
    secondary: {
      light: "#0066ff",
      main: "#525252",
      contrastText: "#FFFFFF",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },

  typography: {
    fontSize: 14,
    fontFamily: "ubuntu, sans-serif",
    h1: {
      fontWeight: 700,
      fontSize: "clamp(16px, 10vmin, 48px)",
      margin: "1rem 0",
    },
    h2: {
      fontSize: "clamp(14px, 5vmin, 32px)",
      fontWeight: 700,
      letterSpacing: 1,
      margin: "1rem 0",
    },
    h3: {
      fontSize: "1.5rem",
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
      fontSize: 16,
    },
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
        outlinedPrimary: {
          boxShadow: `
            0px 1px 5px 0px #00000033,
            0px 3px 4px 0px #0000001F,          
            0px 2px 4px 0px #00000024
          `,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& > div": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          "& > div": {
            borderRadius: 10,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
    MuiModal: {
      styleOverrides: {
        root: {
          zIndex: 9999,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        popper: {
          zIndex: 9999,
        },
      },
    },
    MuiSnackbar: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          zIndex: 99999,
        },
      },
    },
  },
});

export default theme;
