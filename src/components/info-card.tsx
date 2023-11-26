import { Avatar, Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { FC, ReactNode } from "react";

export interface InfoCardProps {
  icon: OverridableComponent<SvgIconTypeMap<Record<string, any>, "svg">> & {
    muiName: string;
  };
  title: ReactNode;
  content: string;
}

const InfoCard: FC<InfoCardProps> = ({ icon: Icon, title, content }) => {
  return (
    <Stack
      aria-role="region"
      aria-label={typeof title === "string" ? title : undefined}
      sx={(theme) => ({
        [theme.breakpoints.down("sm")]: {
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        },
      })}
    >
      <Avatar sx={{ bgcolor: (theme) => theme.palette.primary.main }}>
        <Icon htmlColor="white" />
      </Avatar>
      <Typography
        variant="h3"
        fontWeight="500"
        color="primary"
        margin={0}
        marginY={1}
      >
        {title}
      </Typography>
      <Typography paragraph>{content}</Typography>
    </Stack>
  );
};

export default InfoCard;
