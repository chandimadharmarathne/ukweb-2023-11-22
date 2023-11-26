import { KeyboardArrowRight } from "@mui/icons-material";
import { Breadcrumbs, styled, Theme, Typography, useMediaQuery } from "@mui/material";
import React, { FC } from "react";
import { NavLink } from "react-router-dom";
import { Language } from "../../constants/languages";
import usePath from "../../hooks/path.hook";
import { useLanguage } from "../../store/providers/lang.provider";
import { green } from "@mui/material/colors";

interface HeaderProps {
  title: Language;
}
const StyledHeader = styled("header")(({ theme }) => ({
  //background: green["500"],
  color: "black",
  padding: theme.spacing(5, 0),
  marginBottom: theme.spacing(5),
  display: "flex",
  width: "70%",
  alignItems: "center",
  flexDirection: "column",
  ".active": {
    textDecoration: "underline",
  },
  ".link, svg": {
    fontWeight: "700",
    color: theme.palette.primary.dark,
  },
}));

const Header: FC<HeaderProps> = ({ title }) => {
  const { code } = useLanguage();
  const path = usePath();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint

  const isTablet = useMediaQuery<Theme>((theme) =>
  theme.breakpoints.between("sm", "md")
);
  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );
  return (
    <StyledHeader style={{
      width: isMobile ? "100%" : "70%",
    }}>
      <Typography variant="h1">{title[code]}</Typography>
      <Breadcrumbs
        separator={<KeyboardArrowRight />}
        style={{
          textTransform: "capitalize",
        }}
      >
        {path.map((pathPiece, i) => (
          <NavLink
            className={(i === path.length - 1 ? "active" : "") + " link"}
            to={pathPiece.link}
            key={pathPiece.link}
          >
            {pathPiece.piece}
          </NavLink>
        ))}
      </Breadcrumbs>
    </StyledHeader>
  );
};

export default Header;