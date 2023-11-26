import { MoreHoriz, Share } from "@mui/icons-material";
import {
  Avatar,
  Button,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import {
  Message as IMessage,
  MessagesResponse,
  OutletContext,
} from "../../../components/inbox/inbox.types";
import Message from "../../../components/inbox/message";
import SPECIAL_MSGS from "../../../components/inbox/special";
import SubmitButton from "../../../components/submit-button";
import { Verified } from "../../../components/verify-profile";
import { SocketEvents } from "../../../constants/event-names";
import { useAuthBackend } from "../../../hooks/backend";
import { useSocketEvent } from "../../../hooks/socket";
import { getProfilePic, Profile } from "../../../services/profile-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { useSocket } from "../../../store/providers/socket.provider";
import { sort } from "../../../utils/object-sort";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";

const MessagePanel: FC = () => {
  const socket = useSocket();
  const theme = useTheme();
  const { id: myID } = useAuthentication();

  const { id = "0" } = useParams();
  const [message, setMessage] = useState("");
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));
  const { toggleSideMenu, chats: chatList } = useOutletContext<OutletContext>();
  const { addSnack } = useSnackbar();
  const messageList = useRef<HTMLDivElement>(null);
  const chatMetaData = chatList?.find((chat) => chat.chat_id === parseInt(id));
  const { data: profile } = useAuthBackend<Response<Profile>>(
    ["/profile", chatMetaData?.user_id],
    {
      params: { id: chatMetaData?.user_id },
      onlyFetchIf: !!chatMetaData?.user_id,
    }
  );
  const { data, error, loading, mutate } = useAuthBackend<
    MessagesResponse,
    Error
  >(["/chat-message", id], { params: { chat: id } });

  useEffect(() => {
    if (error)
      addSnack?.({
        severity: "error",
        message: error.message,
      });
  }, [error]);

  useEffect(() => {
    messageList?.current?.scrollTo({
      top: messageList.current.scrollHeight,
      behavior: "auto",
    });
  }, [id, data]);

  useSocketEvent(
    SocketEvents.NEW_MESSAGE_CAME,
    (error: Error | null, message: IMessage) => {
      if (error)
        return addSnack?.({
          severity: "error",
          message: error.message,
        });
      console.debug("Message Recieved", message);

      mutate((data) => ({
        success: true,
        chats: [...(data?.chats ?? []), message],
      }));
    }
  );

  const updateMessage = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setMessage(value);
  };
  /** 
   @param customMessage is used to send custom special messages. [not triggered by the user directly]
   */
  const submit = async (customMessage?: keyof typeof SPECIAL_MSGS) => {
    try {
      if (!customMessage && !message) return;
      socket?.emit(
        SocketEvents.SEND_MESSAGE,
        parseInt(id) ?? 0,
        customMessage ?? message,
        (msg: IMessage) => {
          console.debug("Message Sent", msg);
          setMessage("");
          mutate((data) => ({
            success: true,
            chats: [...(data?.chats ?? []), msg],
          }));
        }
      );
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  const sendProfile = async () => {
    await submit("SHARE_PROFILE");
  };

  return (
    <Stack flex={2} direction="column" justifyContent="space-between">
      <Loader loading={loading} />
      <Toolbar
        variant="regular"
        style={{ flex: 1, justifyContent: "space-between" }}
      >
        <Link
          to={`/${
            profile?.result?.role === "candidate" ? "candidate" : "company"
          }/${profile?.result?.id}`}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={getProfilePic(profile?.result?.dp)}>
              {profile?.result?.name?.[0]}
            </Avatar>
            <Typography variant="h2" color="primary">
              {profile?.result?.name}
              <Verified verified={!!profile?.result?.badge} />
            </Typography>
          </Stack>
        </Link>
        {isTablet ? (
          <IconButton color="primary" onClick={sendProfile}>
            <Share />
          </IconButton>
        ) : (
          <Button endIcon={<Share />} onClick={sendProfile}>
            Share My Profile
          </Button>
        )}
        {isTablet && (
          <IconButton color="primary" onClick={toggleSideMenu}>
            <MoreHoriz />
          </IconButton>
        )}
      </Toolbar>

      <Stack
        width="95%"
        alignSelf="center"
        flex={8}
        spacing={2}
        overflow="scroll"
        padding={{ xs: 1, md: 2 }}
        style={{ overflowX: "hidden" }}
        ref={messageList}
      >
        {sort("timestamp", data?.chats, "asc").map((msg) => {
          const IsSpecial = SPECIAL_MSGS[msg.msg];
          if (!!IsSpecial)
            return (
              <IsSpecial
                {...msg}
                key={msg.timestamp}
                isMe={myID === msg.sender}
              />
            );
          return (
            <Message
              message={msg}
              key={msg.timestamp}
              isMe={myID === msg.sender}
            />
          );
        })}
      </Stack>

      <Stack
        direction={{ xs: "column", md: "row" }}
        padding={2}
        spacing={2}
        flex={1}
        alignItems="flex-end"
      >
        <TextField
          fullWidth
          maxRows={5}
          placeholder="Type your massege here"
          label="Message"
          value={message}
          onChange={updateMessage}
          onKeyPress={(e) => e.key === "Enter" && submit()}
        />
        <SubmitButton style={{ maxWidth: 150 }} onClick={() => submit()}>
          Send
        </SubmitButton>
      </Stack>
    </Stack>
  );
};

export default MessagePanel;
