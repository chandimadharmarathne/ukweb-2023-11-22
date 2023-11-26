import { Button, ButtonTypeMap, CircularProgress, styled } from "@mui/material";
import { FC, MouseEvent, useState } from "react";
import React from "react";
import { CommonProps } from "@mui/material/OverridableComponent";

export interface SubmitButtonProps {
  onClick?: (e?: MouseEvent<HTMLButtonElement>) => void | Promise<void>;
  style?: CommonProps["style"];
}

const StyledButton = styled(Button)(({ theme }) => ({
  maxWidth: 240,
  ".progress": {
    color: theme.palette.primary.main,
    position: "absolute",
  },
}));

const SubmitButton: FC<
  SubmitButtonProps & ButtonTypeMap<Record<string, any>, "button">["props"]
> = ({ children, onClick, style, ...props }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoading(true);
    await onClick?.(e);
    setLoading(false);
  };
  return (
    <StyledButton
      variant="contained"
      size="medium"
      fullWidth
      type="submit"
      {...props}
      onClick={handleClick}
      disabled={loading}
      style={style}
    >
      {loading && <CircularProgress className="progress" size={30} />}
      {children}
    </StyledButton>
  );
};

export default SubmitButton;
