import { styled } from "@mui/material";

export const Main = styled("main")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));
