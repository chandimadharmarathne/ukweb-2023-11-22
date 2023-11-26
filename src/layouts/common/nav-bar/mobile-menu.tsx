import { Close, ExpandMore, Menu, Work } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../../store/providers/auth.provider";
import getLinks, { Link as LinkType } from "./nav-links";

interface MobileMenuProps {
  postAdLink: string;
}

const MobileMenu: FC<MobileMenuProps> = ({ postAdLink }) => {
  const [open, setOpen] = useState(false);

  let role = 'candidate'
  let token = localStorage?.getItem("user") ?? null

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button style={{
                          color:"black"
                        }} variant="text" size="large" onClick={toggleMenu}>
        <Menu fontSize="large" />
      </Button>
      <Drawer style={{
        height:"fit-content"
      }} open={open} anchor="top" onClose={toggleMenu}>
        <IconButton
          size="large"
          color="primary"
          style={{ alignSelf: "flex-end",color:"black" }}
          onClick={toggleMenu}
          
        >
          <Close />
        </IconButton>
        <List style={{ width: 280 }}>
          {getLinks('candidate')
            .filter((link:any) => {
              if (!!token) return true;
              return !!link.loggedIn === !!token;
            })
            .map((link:any) => {
              const Icon = link.icon ?? Work;

              return (
                <ListItem
                  key={link.link}
                  sx={{ padding: (theme) => theme.spacing(0, 2) }}
                >
                  <ListItemIcon sx={{ alignSelf: "flex-start" }}>
                    <Icon style={{
                      color:"black"
                  
                    }} fontSize="large" />
                  </ListItemIcon>
                  {link.Component ? (
                    <ListItemText
                      sx={{ padding: (theme) => theme.spacing(0, 1),
                      color:"black"
                       }}
                    >
                      <link.Component />
                    </ListItemText>
                  ) : link.innerLinks ? (
                    <Accordion disableGutters elevation={0}>
                      <AccordionSummary
                        expandIcon={<ExpandMore color="primary" />}
                      >
                        <Typography style={{
                          color:"black"
                        }} fontWeight="700">
                          {link.label}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {link.innerLinks.map((innerLink: LinkType) => {
                          const Icon = innerLink.icon ?? (() => null);
                          return (
                            <Box paddingY={0.5} key={innerLink.link}>
                              {innerLink.Component ? (
                                <innerLink.Component />
                              ) : (
                                <Stack
                                  direction="row"
                                  spacing={1}
                                  onClick={toggleMenu}
                                  component={Link}
                                  to={`${link.link}${innerLink.link}`}
                                >
                                  <Icon style={{
                          color:"black"
                        }} />

                                  <Typography style={{
                          color:"black"
                        }} fontWeight="700">
                                    {innerLink.label}
                                  </Typography>
                                </Stack>
                              )}
                            </Box>
                          );
                        })}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <ListItemButton
                      onClick={toggleMenu}
                      component={Link}
                      to={link.link}
                    >
                      <Typography style={{
                          color:"black"
                        }} fontWeight="700">
                        {link.label}
                      </Typography>
                    </ListItemButton>
                  )}
                </ListItem>
              );
            })}
        </List>
        <Stack spacing={2} paddingX={2} paddingY={5} maxWidth={150}>
          {!token && (
            <Link to="/login">
              <Button style={{
                color:"black"
              }} variant="outlined" fullWidth>
                Login
              </Button>
            </Link>
          )}
        </Stack>
      </Drawer>
    </>
  );
};
export default MobileMenu;
