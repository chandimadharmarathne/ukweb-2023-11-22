import { Work } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import React, { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Link as LinkProps } from "./nav-links";

interface InnerLinksProps {
  link: LinkProps;
}

const InnerLinks: FC<InnerLinksProps> = ({ link }) => {
  const Icon = link.icon ?? Work;
  const button = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu((prev) => !prev);
  };

  return (
    <>
      <IconButton
      style={{
        color:"black"
      }}
        onClick={toggleMenu}
        ref={button}
        aria-label={link.label}
        aria-expanded={showMenu}
      >
        <Tooltip title={String(link.label)}>
          <Icon style={{
            color:"black"
          }} />
        </Tooltip>
      </IconButton>
      <Menu onClose={toggleMenu} open={showMenu} anchorEl={button.current}>
        {link.innerLinks?.map((innerLink) => {
          const Icon = innerLink.icon ?? Work;
   
          return (
            <MenuItem key={innerLink.label} onClick={toggleMenu}>
              <Icon color="primary" />
              {innerLink.Component ? (
                <innerLink.Component />
              ) : (
                <Link to={`${link.link}${innerLink.link}`}>
                  <Typography paddingX={2} color="secondary">
                    {innerLink.label}
                  </Typography>
                </Link>
              )}
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};
export default InnerLinks;
