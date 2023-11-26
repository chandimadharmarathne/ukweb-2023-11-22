import { Stack, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import {
  DATA_ADVERTISEMENT_HISTORY_STATUS,
  DATA_APPLYJOB_TYPES,
} from "../../constants/input-data";
import { useAuthBackend } from "../../hooks/backend";
import { getProfilePic } from "../../services/profile-service";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { Response } from "../../utils/utils.types";
import Loader from "../../views/loader/Loader";
import { getJobTitle } from "../find-job/sections/industry.data";
import Tile, { TileProps } from "../tile";

export interface PanelProps {
  type: number;
  getButtons?: (record: Result) => TileProps["buttons"];
}
export const Panel: FC<PanelProps> = ({ type, getButtons }) => {
  const { addError } = useSnackbar();
  const { code } = useLanguage();

  const { data, loading, error } = useAuthBackend<Response<Result[]>, Error>(
    ["/jobs/apply", type],
    { params: { type } }
  );
  useEffect(() => {
    if (error) addError?.(error?.message ?? "Unknown error");
  }, [error]);

  return (
    <Stack spacing={1}>
      <Loader loading={loading} />
      {!data?.result.length && (
        <Typography paragraph>No Data Available</Typography>
      )}
      {data?.result.map((record) => (
        <Tile
          avatar={getProfilePic(record.dp)}
          key={record.id}
          id={record.id}
          hideButtonsOnDesktop={false}
          buttons={getButtons?.(record)}
          records={[
            { content: record.name },
            {
              content:
                getJobTitle(record.industry, record.job_title, code) ??
                "No Job title",
            },
            {
              title: `${
                DATA_ADVERTISEMENT_HISTORY_STATUS.find(
                  (item) => item.id === type
                )?.label
              } On`,
              content:
                dateFormat(record.timestamp, {
                  timeStyle: "medium",
                  dateStyle: "long",
                }) ?? "",
            },
            {
              content:
                DATA_APPLYJOB_TYPES.find(
                  (type) => type.id === record.apply_type
                )?.label ?? "",
            },
          ]}
        />
      ))}
    </Stack>
  );
};

export interface Result {
  id: number;
  apply_type: number;
  timestamp: string;
  industry: string;
  job_title: string;
  job_id: number;
  dp: string;
  name: string;
}
