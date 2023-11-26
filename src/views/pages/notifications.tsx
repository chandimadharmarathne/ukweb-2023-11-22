import {
  Avatar,
  Container,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Notification,
  NOTIFICATIONS,
} from "../../components/notifications/types";
import { SocketEvents } from "../../constants/event-names";
import { useSocketEvent } from "../../hooks/socket";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { authRequest } from "../../utils/Axios";
import { dateDiff, dateFormat } from "../../utils/formatters/date-format";
import { Response } from "../../utils/utils.types";
import Loader from "../loader/Loader";

const StyledMain = styled("main")(({ theme }) => ({
  padding: theme.spacing(5, 1),
}));

const Notifications: FC = () => {
  const theme = useTheme();
  const { addError } = useSnackbar();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const { lastlogin, update } = useAuthentication();

  useEffect(() => {
    getNotifications();
  }, []);

  useSocketEvent(SocketEvents.NOTIFICATION, (notification: Notification) => {
    setNotifications((prev) => [notification, ...prev]);
  });

  const getNotifications = async () => {
    setLoading(true);
    try {
      const res = await authRequest<Response<Notification[]>>({
        url: "/notification",
      });
      if (res.success) setNotifications(res.result);
    } catch (error: any) {
      addError?.(error.message);
    }
    setLoading(false);
  };

  return (
    <StyledMain>
      <Container>
        <Typography variant="h1" color="primary">
          Notifications
        </Typography>
        <Loader loading={loading} />
        {!!notifications.length && (
          <List>
            {notifications.map((notify) => {
              const notification = NOTIFICATIONS.find(
                (notification) => notification.type === notify.type
              );
              const handleClick = async () => {
                try {
                  await notification?.onClick?.(notify);
                  if (dateDiff(lastlogin!, notify.timestamp))
                    update?.({
                      lastlogin: new Date(notify.timestamp).toISOString(),
                    });
                } catch (error: any) {
                  addError?.(error.message);
                }
              };

              if (!notification) return null;
              return (
                <ListItem
                  key={notify.id}
                  sx={{
                    borderRadius: 1,
                    bgcolor: dateDiff(lastlogin!, notify.timestamp)
                      ? "#2a89891f"
                      : undefined,
                  }}
                >
                  <ListItemButton
                    disableRipple
                    component={Link}
                    to={notification.getLink?.(notify) ?? "#"}
                    onClick={handleClick}
                    sx={{ display: { xs: "block", sm: "flex" } }}
                  >
                    <ListItemAvatar>
                      <Avatar
                        src={notification.getPic?.(notify.image)}
                        sx={{ bgcolor: theme.palette.primary.main }}
                      >
                        {notify.title?.[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography color="secondary">{notify.title}</Typography>
                      <Typography color={grey["500"]} variant="subtitle2">
                        {notification.getDescription?.(notify)}
                      </Typography>
                      <Typography variant="caption" color={grey["500"]}>
                        {dateFormat(notify.timestamp, {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </Typography>
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
        {!loading && !notifications.length && (
          <Typography variant="h3" paragraph color="secondary">
            No notifications
          </Typography>
        )}
      </Container>
    </StyledMain>
  );
};

export default Notifications;
