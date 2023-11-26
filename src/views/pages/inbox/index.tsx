import { Close, MoreHoriz } from "@mui/icons-material";
import {
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  Stack,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, Fragment, useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { InboxResponse } from "../../../components/inbox/inbox.types";
import InboxMessage, { ChatItem } from "../../../components/inbox/mini-message";
import { SocketEvents } from "../../../constants/event-names";
import { useAuthBackend } from "../../../hooks/backend";
import { useSocketEvent } from "../../../hooks/socket";
import * as chatService from "../../../services/chat-service";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { sort } from "../../../utils/object-sort";
import Loader from "../../loader/Loader";

const drawerWidth = 350;

const StyledMain = styled("main")(({ theme }) => {
  const borderRadius = 10;
  return {
    padding: theme.spacing(0.5),
    paddingBottom: theme.spacing(5),
    minHeight: "100vh",
    background: grey["100"],

    ".stack": {
      background: theme.palette.background.default,
      borderRadius,
      height: "85vh",
    },
    ".list": { height: "100%", overflowY: "scroll" },
    ".filter": {
      padding: theme.spacing(3),
      width: drawerWidth,
      flexShrink: 0,
      [theme.breakpoints.up("md")]: {
        zIndex: 0,
        position: "relative",
      },
      "& .MuiDrawer-paper": {
        maxWidth: drawerWidth,
        width: "100%",
        boxSizing: "border-box",
        [theme.breakpoints.up("md")]: {
          position: "relative",
        },
        [theme.breakpoints.down("md")]: {
          padding: theme.spacing(2),
        },
      },
    },
  };
});

const InboxPage: FC = () => {
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [showSideMenu, setShowSideMenu] = useState(true);

  const { addSnack } = useSnackbar();
  const { data, loading, error, mutate } = useAuthBackend<InboxResponse, Error>(
    "/chat"
  );
  const { id } = useParams();

  useSocketEvent(
    SocketEvents.CHAT_UPDATED,
    (error: Error | null, newChat: ChatItem) => {
      if (error)
        return addSnack?.({
          severity: "error",
          message: error.message,
        });

      const newList = [
        newChat,
        ...(data?.chats?.filter((chat) => chat.chat_id !== newChat.chat_id) ??
          []),
      ];
      mutate(
        { success: true, chats: sort("lastupdate", newList, "asc") },
        { revalidate: false }
      );
    }
  );

  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error.message,
      });
  }, [error]);

  const toggleSideMenu = () => setShowSideMenu((prev) => !prev);

  const deleteChat = (id: ChatItem["chat_id"]) => async () => {
    try {
      const { success } = await chatService.deleteChat(id);
      if (success) {
        mutate((prev) =>
          prev
            ? {
                ...prev,
                chats: prev?.chats.filter((chat) => chat.chat_id !== id),
              }
            : undefined
        );
        addSnack?.({
          severity: "warning",
          message: "Chat deleted",
        });
      }
    } catch (error: any) {
      addSnack?.({
        message: error.message,
        severity: "error",
      });
    }
  };

  return (
    <StyledMain>
      <Container disableGutters={isTablet} maxWidth="xl">
        <Stack className="stack" direction="row">
          <Drawer
            open={!isTablet || showSideMenu}
            variant={isTablet ? "temporary" : "persistent"}
            anchor="left"
            className="filter"
            onClose={toggleSideMenu}
          >
            <Typography
              variant="h1"
              color="primary"
              justifyContent="space-between"
              display="flex"
            >
              <span>Message</span>
              {isTablet && (
                <IconButton onClick={toggleSideMenu} color="primary">
                  <Close />
                </IconButton>
              )}
            </Typography>
            <Divider />
            <Loader loading={loading} />
            <List className="list">
              {!!data?.chats.length ? (
                sort("lastupdate", data?.chats, "dsc").map((message) => (
                  <Fragment key={message.chat_id}>
                    <InboxMessage
                      message={message}
                      onClick={toggleSideMenu}
                      onDelete={deleteChat(message.chat_id)}
                    />
                    <Divider />
                  </Fragment>
                ))
              ) : (
                <Typography>No Chats found</Typography>
              )}
            </List>
          </Drawer>
          {!id && isTablet && (
            <Stack
              direction="row"
              spacing={2}
              height="fit-content"
              justifyContent="center"
              width="100%"
            >
              <Typography textAlign="center" variant="h1" color="primary">
                Messages
              </Typography>
              <IconButton onClick={toggleSideMenu} color="primary">
                <MoreHoriz />
              </IconButton>
            </Stack>
          )}
          <Outlet
            context={{
              toggleSideMenu,
              chats: data?.chats,
            }}
          />
        </Stack>
      </Container>
    </StyledMain>
  );
};

export default InboxPage;
