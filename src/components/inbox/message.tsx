import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { FC, useRef, useState } from "react";
import { Message as IMessage } from "./inbox.types";
import { ActionType } from "../../utils/utils.types";
import { MoreVert } from "@mui/icons-material";
import * as chatService from "../../services/chat-service";
import { useParams } from "react-router-dom";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";

interface MessegeProps {
  message: IMessage;
  isMe?: boolean;
}

const Messege: FC<MessegeProps> = ({ message, isMe }) => {
  const { id } = useParams();
  const button = useRef(null);
  const [show, setShow] = useState(false);
  const toggle = () => setShow((prev) => !prev);
  const { addError } = useSnackbar();
  const [deleted, setDeleted] = useState(false);

  const deleteMsg = async () => {
    try {
      const { success } = await chatService.deleteMessage({
        chat: id,
        timestamp: message.timestamp,
      });
      if (success) setDeleted(true);
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const myActions: ActionType[] = [
    {
      label: "Delete",
      onClick: deleteMsg,
    },
  ];
  const actions: ActionType[] = isMe ? myActions : [];
  if (deleted) return null;
  return (
    <Box
      bgcolor={isMe ? "#AAD0D0" : "#E0E0E0"}
      padding={2}
      borderRadius={2}
      width="fit-content"
      minWidth={200}
      alignSelf={isMe ? "flex-end" : "flex-start"}
      position="relative"
    >
      {!!actions.length && (
        <>
          <IconButton
            ref={button}
            onClick={toggle}
            style={{ position: "absolute", right: 0, top: 0 }}
          >
            <MoreVert />
          </IconButton>
          <Menu onClose={toggle} open={show} anchorEl={button.current}>
            {actions.map((action, i) => (
              <MenuItem key={i} onClick={action.onClick}>
                {action.label}
              </MenuItem>
            ))}
          </Menu>
        </>
      )}
      <Typography>{message.msg}</Typography>
      <Typography
        variant="caption"
        width="100%"
        textAlign={isMe ? "right" : "left"}
      >
        {dateFormat(message.timestamp, {
          timeStyle: "short",
          dateStyle: "short",
        })}
      </Typography>
    </Box>
  );
};

export default Messege;
