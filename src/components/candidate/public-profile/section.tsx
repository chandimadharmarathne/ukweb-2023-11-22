import { Paper, styled } from "@mui/material";

export const Section = styled(Paper)(({ theme }) => ({
  background: theme.palette.background.paper,
  padding: theme.spacing(2, 3),
  margin: theme.spacing(2, 0),
  h2: {
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(1),
  },
  ".card": {
    textAlign: "left",
    background: "#F8F8F8",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(1),
    "& > strong": {
      paddingRight: theme.spacing(1),
    },
  },
  ".padding-left": {
    paddingLeft: theme.spacing(5),
  },
  ".margin": {
    margin: theme.spacing(1),
  },
}));
