import { Stack, SvgIconTypeMap, Typography } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React, { FC } from "react";
import { Section } from "./section";

export interface DetailSectionProps {
  title: string;
  data: { label: string; content?: any; width: number }[];
  icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, "svg">> & {
    muiName: string;
  };
}
const DetailSection: FC<DetailSectionProps> = ({ title, data, icon: Icon }) => {
  return (
    <Section elevation={0}>
      <Typography variant="h2">
        <Icon color="primary" fontSize="large" /> {title}
      </Typography>
      <Stack flexWrap="wrap" direction="row" spacing={0}>
        {data.map((item, i) => (
          <Typography
            key={i}
            paragraph
            className="card margin"
            width={{ xs: "100%", md: `calc(${item.width * 100}% - 1rem)` }}
          >
            <strong>{item.label} :</strong>
            {item.content ?? (
              <Typography component="span" color="secondary">
                Unavailable
              </Typography>
            )}
          </Typography>
        ))}
      </Stack>
    </Section>
  );
};

export default DetailSection;
