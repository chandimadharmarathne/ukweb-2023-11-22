import { MoreHoriz } from "@mui/icons-material";
import {
  IconButton,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import React, { FC, MouseEventHandler, useRef, useState } from "react";
import { Link } from "react-router-dom";
// @ts-ignore
import relativeDate from "relative-date";

export interface ChatItem {
  chat_id: number;
  user_id: number;
  user_name: string;
  lastupdate: string;
}
export interface InboxMessageProps {
  message: ChatItem;
  onDelete?: () => void;
  onClick?: () => void;
}

const InboxMessage: FC<InboxMessageProps> = ({
  message,
  onDelete,
  onClick,
}) => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setShowMenu((prev) => !prev);
  };

  const button = useRef(null);
  const actions = [{ label: "Delete", onClick: onDelete }];

  return (
    <ListItem onClick={onClick}>
      <ListItemText>
        <Link to={String(message.chat_id)}>
          <Typography
            title={message.user_name}
            color="primary"
            variant="h3"
            fontWeight="500"
            overflow="hidden"
            textOverflow="ellipsis"
            maxWidth="15ch"
            whiteSpace="nowrap"
          >
            {message.user_name}
          </Typography>
        </Link>
        <Typography
          whiteSpace="nowrap"
          width="90%"
          overflow="hidden"
          textOverflow="ellipsis"
          color="secondary"
        >
          {relativeDate(new Date(message.lastupdate))}
        </Typography>
        <ListItemSecondaryAction>
          <IconButton
            ref={button}
            onClick={toggleMenu}
            aria-label="more actions"
          >
            <MoreHoriz />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItemText>
      <Menu
        open={showMenu}
        anchorEl={button.current}
        onClose={toggleMenu}
        anchorOrigin={{ horizontal: "left", vertical: "center" }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
      >
        {actions.map((action, key) => (
          <MenuItem key={key} onClick={action.onClick}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </ListItem>
  );
};

export default InboxMessage;
