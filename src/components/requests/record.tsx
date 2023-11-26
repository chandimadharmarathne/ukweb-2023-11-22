import { Person } from "@mui/icons-material";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC } from "react";
import { Language } from "../../constants/languages";
import { useLanguage } from "../../store/providers/lang.provider";
import SubmitButton from "../submit-button";

export type RecordType = {
  full_name: string;
  job_title: string;
  requested_date: string;
  avatar?: string;
  type: "generated_cv" | "cv" | "profile";
};

interface RecordProps {
  record: RecordType;
}

const Record: FC<RecordProps> = ({ record }) => {
  const theme = useTheme();
  const { code } = useLanguage();
  return (
    <Box
      display="flex"
      flexDirection="row"
      width="100%"
      bgcolor={grey["100"]}
      borderRadius={"10px"}
      alignItems={{ xs: "flex-start", md: "center" }}
      padding={{ md: 1, xs: 2 }}
    >
      <Avatar color={theme.palette.primary.main}>
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
        <Typography>{record.full_name}</Typography>
        <Typography>{record.job_title}</Typography>
        <Typography>{record.requested_date}</Typography>
        <SubmitButton>{buttonTypes[record.type]?.label[code]}</SubmitButton>
      </Stack>
    </Box>
  );
};

type ButtonType = {
  [key in RecordType["type"]]: {
    label: Language;
  };
};
const buttonTypes: ButtonType = {
  generated_cv: { label: { en: "Accept Generated CV" } },
  cv: { label: { en: "Accept Cv" } },
  profile: { label: { en: "Accept Profile" } },
};

export default Record;
