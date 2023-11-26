import { LinearProgress } from "@mui/material";
import React, { FC } from "react";

interface LoaderProps {
  loading?: boolean;
}

const Loader: FC<LoaderProps> = ({ loading = true }) => {
  if (!loading) return null;
  return <LinearProgress />;
};

export default Loader;
