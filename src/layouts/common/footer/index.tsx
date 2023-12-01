import {
  Email,
  Facebook,
  Instagram,
  LinkedIn,
  LocalPhone,
} from "@mui/icons-material";
import {
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import React, { FC } from "react";
import { Link } from "react-router-dom";
import Social from "../../../components/social-link";
import {
  EMAIL,
  FACEBOOK_LINK,
  INSTAGRAM_LINK,
  LINKEDIN_LINK,
} from "../../../constants/social-links";

const StyledFooter = styled("footer")(({ theme }) => {
  const textColor = theme.palette.secondary.contrastText;
  return {
    background: theme.palette.secondary.main,
    ".container": {
      color: textColor,
      padding: "1.5rem",
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "1rem",
    },
    img: { filter: "invert()" },
    svg: {
      fill: textColor,
    },
    hr: {
      background: textColor,
    },
    a: {
      color: textColor,
    },
  };
});
const Footer: FC = () => {
  return (
    <StyledFooter className="not-printable" style={{
      width: '87.5%',
      marginLeft:'7%',
    }} >
      <Container className="container">
        <Box>
          <Link to={"/"}>
            <img
              src={"/assets/logo.jpg"}
              alt="jobwomen logo"
              width={240}
              height={100}
            />
          </Link>
          <Typography maxWidth={"50ch"}>
            jobwomen offers outstanding packages for both candidates and
            recruiters to find jobs and employees in the most effective way.
            Keep in touch with us to explore your DREAM CAREER. © 2022 jobwomen.
            All Rights Reserved.
          </Typography>
        </Box>

        <Box>
          <Typography variant="h2">Special Links</Typography>
          <nav aria-label="footer pages">
            <List>
              {links.map((link) => (
                <ListItem key={link.link}>
                  <Link to={link.link}>{link.text}</Link>
                </ListItem>
              ))}
            </List>
          </nav>
        </Box>
        <Box>
          <Typography variant="h2">Contact Us</Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <LocalPhone />
              </ListItemIcon>
              <ListItemText>
                <Stack
                  divider={
                    <Divider
                      className="divider"
                      orientation="vertical"
                      flexItem
                    />
                  }
                  direction="row"
                  spacing={2}
                >
                  <div>
                    047 222 3 444
                  </div>
                  <div>
                    047 222 3 444
                  </div>
                </Stack>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <Email />
              </ListItemIcon>

              <ListItemText>
                <a href={`mailto:${EMAIL}`}>jobwomen@gmail.com</a>
              </ListItemText>
            </ListItem>
          </List>
          <Stack direction="row" spacing={1} paddingX={2}>
            <Social icon={Facebook} link={FACEBOOK_LINK} />
            <Social icon={Instagram} link={INSTAGRAM_LINK} />
            <Social icon={LinkedIn} link={LINKEDIN_LINK} />
          </Stack>
        </Box>
      </Container>
    </StyledFooter>
  );
};

const links: { link: string; text: string }[] = [
  { text: "Home", link: "/" },
  { text: "Contact Us", link: "/contact-us" },
  { text: "New Jobs", link: "/new-jobs" },
  { text: "Salary Guide", link: "/salary-Guide" },
];

export default Footer;
