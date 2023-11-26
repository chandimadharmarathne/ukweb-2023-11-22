import { createContext, FC, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import { SOCKET_URL } from "../../constants/config";
import React from "react";
import { useAuthentication } from "./auth.provider";

const SocketContext = createContext<Socket | null>(null);

interface SocketProviderProps {
  children: React.ReactNode;
}


const SocketProvider: FC<SocketProviderProps> = ({ children }) => {
  const info = useAuthentication();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    createSocket();
  }, [info.token]);

  const createSocket = () => {
    if (info.token) {
      const socket = io(SOCKET_URL, {
        auth: { authorization: `Bearer ${info.token}` },
      });
      socket.connect();
      setSocket(socket);
    }
  };

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);

export default SocketProvider;
