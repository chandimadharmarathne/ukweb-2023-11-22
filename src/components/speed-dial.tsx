import { Phone, WhatsApp } from "@mui/icons-material";
import {
  Avatar,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
} from "@mui/material";
import React, { FC } from "react";
import {
  MESSENGER_LINK,
  TEL_LINK,
  WHATSAPP_LINK,
} from "../constants/social-links";
import { FBMessenger } from "../utils/icons";

interface ContactSpeedDialProps {}

const ContactSpeedDial: FC<ContactSpeedDialProps> = () => {
  return (
    <SpeedDial
      ariaLabel="Contact us"
      sx={{
        position: "fixed",
        bottom: 0,
        right: 0,
        margin: (theme) => theme.spacing(2),
      }}
      icon={<SpeedDialIcon />}
    >
      {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          tooltipTitle={action.name}
          icon={
            <Avatar
              component={"a"}
              target="_blank"
              rel="noopener noreferrer"
              href={action.link}
              sx={{ bgcolor: (theme) => theme.palette.primary.main }}
            >
              {action.icon}
            </Avatar>
          }
        />
      ))}
    </SpeedDial>
  );
};

const actions = [
  { icon: <FBMessenger />, name: "FB Messenger", link: MESSENGER_LINK },
  { icon: <WhatsApp />, name: "Whatsapp", link: WHATSAPP_LINK },
  { icon: <Phone />, name: "Call or Text", link: TEL_LINK },
];

export default ContactSpeedDial;
