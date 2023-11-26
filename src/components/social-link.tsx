import { Box, SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { FC } from "react";

interface SocialProps {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, any>, "svg">> & {
    muiName: string;
  };
  link?: string;
}

const Social: FC<SocialProps> = ({ link, icon: Icon }) => {
  if (!link) return null;

  return (
    <a href={link} target="_blank" rel="noreferrer">
      <Box
        bgcolor={({ palette }) => palette.primary.main}
        width={40}
        height={40}
        display="flex"
        justifyContent="center"
        alignItems="center"
        borderRadius={"50%"}
        color={({ palette }) => palette.background.default}
      >
        <Icon color="inherit" />
      </Box>
    </a>
  );
};

export default Social;
