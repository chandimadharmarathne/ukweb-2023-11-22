import { Button, Typography } from "@mui/material";
import React, { FC } from "react";
import { useAuthentication } from "../store/providers/auth.provider";

interface LogoutProps {}

const Logout: FC<LogoutProps> = () => {
  const logout =() =>{
    
  }
  return (
    <Button onClick={logout} fullWidth sx={{ justifyContent: "flex-start" }}>
      <Typography paddingX={2} color="secondary">
        Logout
      </Typography>
    </Button>
  );
};

export default Logout;
