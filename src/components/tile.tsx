import { Person } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { green, grey } from "@mui/material/colors";
import React, { FC } from "react";
import { useMobile } from "../store/providers/mobile-to-desktop-change.provider";
import SubmitButton, { SubmitButtonProps } from "./submit-button";

export type RecordType = {
  content: React.ReactNode;
  title?: string;
};

export interface TileProps {
  records: RecordType[];
  id?: any;
  selected?: boolean;
  avatar?: string;
  buttons?: (SubmitButtonProps & { label: string })[];
  hideButtonsOnDesktop?: boolean;
  onSelect?: (
    e: any,
    id: any,
    records: RecordType[],
    buttons: TileProps["buttons"],
    user?: number
  ) => void;
}

const Tile: FC<TileProps> = ({
  records,
  avatar,
  buttons,
  selected,
  onSelect,
  id,
  hideButtonsOnDesktop = true,
}) => {
  const theme = useTheme();
  const isMobile = useMobile();
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      bgcolor={selected ? green["50"] : grey["100"]}
      borderRadius={"10px"}
      alignItems={{ xs: "flex-start", md: "center" }}
      padding={{ md: 1, xs: 2 }}
      onClick={(e) => onSelect?.(e, id, records, buttons)}
    >
      <Avatar src={avatar} color={theme.palette.primary.main}>
        <Person />
      </Avatar>
      <Stack
        direction={{ md: "row", xs: "column" }}
        spacing={{ md: 3, xs: 1 }}
        alignItems={{ xs: "flex-start", md: "center" }}
        justifyContent="space-between"
        paddingLeft={{ md: 1, xs: 2 }}
        flex={1}
      >
        {records.map((record, i) => (
          <Typography margin={0} key={i} flex={1}>
            {record.title && (
              <Typography component="span" fontWeight="700">
                {record.title} :{" "}
              </Typography>
            )}
            {record.content}
          </Typography>
        ))}
        {(isMobile || !hideButtonsOnDesktop) && (
          <Stack spacing={1} direction={{ md: "row", xs: "column" }}>
            {buttons &&
              buttons.map(({ label, ...props }, i) => (
                <SubmitButton
                  {...props}
                  key={i}
                  style={{ ...props.style, whiteSpace: "nowrap" }}
                >
                  {label}
                </SubmitButton>
              ))}
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Tile;
