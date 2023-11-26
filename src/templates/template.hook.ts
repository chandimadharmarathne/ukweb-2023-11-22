import React, { useMemo } from "react";
import { BlockType } from "../components/candidate/repeat-block";
import { Credentials } from "../utils/auth-types";

export type TemplateData = {
  credentials: Credentials<string>;
  blocks: {
    [key: string]: BlockType[];
  };
  picture?: string;
  dontSave?: boolean;
};

export type TemplateProps = TemplateData;

export type TemplatePage = React.ForwardRefExoticComponent<
  TemplateProps & React.RefAttributes<HTMLDivElement>
>;

export const useTemplate = (id: number) => {
  const Template = useMemo(
    () =>
      React.lazy<TemplatePage>(async () => {
        return await import(`./cv_${id}`);
      }),
    [id]
  );

  return Template;
};
