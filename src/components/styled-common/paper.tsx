import { Paper, styled } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(7, 5),
  },
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
  },
}));
