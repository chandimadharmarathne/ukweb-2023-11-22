import { useEffect, useCallback } from "react";
import { SocketEvents } from "../constants/event-names";
import { useSocket } from "../store/providers/socket.provider";

export const useSocketEvent = (
  event: SocketEvents,
  callback: (...args: any) => void
) => {
  const socket = useSocket();

  const cb = useCallback(
    (...args: any[]) => {
      callback(...args);
      console.groupCollapsed("Event Occured:", event);
      args.forEach((arg) => console.debug(arg));
      console.groupEnd();
    },
    [event]
  );

  useEffect(() => {
    if (socket) {
      console.debug("Listening to", event);
      socket.on(event, cb);
    }
    return () => {
      console.debug("Removed previous event", event);
      socket?.removeListener(event, cb);
    };
  }, [cb, event, socket]);
};
