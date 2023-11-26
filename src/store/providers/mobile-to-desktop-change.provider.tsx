import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/system";
import React, { createContext, FC, useContext } from "react";

const MobileContext = createContext(false);



interface MobileProviderProps {
  children: React.ReactNode;
}

const MobileProvider: FC<MobileProviderProps> = ({ children }) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <MobileContext.Provider value={matches}>{children}</MobileContext.Provider>
  );
};

export const useMobile = () => {
  return useContext(MobileContext);
};

export default MobileProvider;
