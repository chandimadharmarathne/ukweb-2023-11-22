import { Button, Stack } from "@mui/material";
import * as React from "react";

interface ManualCVProps {
  cv?: File;
  onChange: (data: any) => void;
}

const ManualCV: React.FC<ManualCVProps> = ({ onChange, cv }) => {
  const onCVChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) onChange?.(file);
  };
  return (
    <Stack marginTop={2}>
      <Button variant="contained" sx={{ width: "fit-content" }}>
        <label htmlFor="cv-manual">{cv ? "Uploaded CV" : "Upload CV"}</label>
      </Button>
      <input type="file" onChange={onCVChange} id="cv-manual" hidden />
    </Stack>
  );
};

export default ManualCV;
