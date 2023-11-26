import { Delete, Download, UploadFile, Visibility } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ChangeEvent, FC, useState } from "react";
import { BACKEND_URL } from "../constants/config";

interface RelatedDocumentProps {
  title: string;
  src?: string;
  type?: "upload" | "download" | "upload_download";
  uploadedFile?: any;
  onChange?: (_e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
  onDelete?: () => void;
}

const RelatedDocument: FC<RelatedDocumentProps> = ({
  title,
  src,
  accept,
  onChange,
  uploadedFile,
  onDelete,
  type = "download",
}) => {
  const [downlaoded, setDownloaded] = useState<any>(false);

  const download = async (url1: any) => {
    try {
      const response = await fetch(url1);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.download = "image.jpg";
      a.href = url;
      a.click();
     // URL.revokeObjectURL(url);
      setDownloaded(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Stack
      direction={{ sm: "row", xs: "column" }}
      justifyContent="space-between"
      alignItems="center"
      bgcolor={grey["100"]}
      paddingY={2}
      paddingX={4}
      borderRadius={2}
    >
      <Typography paragraph color="secondary" fontWeight="400" marginBottom={0}>
        {title}
      </Typography>
      {type === "download" && (
        <a
          download={title}
          target="_blank"
          rel="noopener noreferrer"
          href={src}
        >
          <Button endIcon={<Download />}>Download</Button>
        </a>
      )}

      {type === "upload" && (
        <>
          <Button endIcon={<UploadFile />} component="label">
            <input type="file" accept={accept} hidden onChange={onChange} />
            {!!uploadedFile ? "Uploaded" : "Upload"}
          </Button>
        </>
      )}

      {type === "upload_download" && (
        <Stack spacing={1}>
          {!uploadedFile && (
            <Button endIcon={<UploadFile />} component="label">
              <input type="file" accept={accept} hidden onChange={onChange} />
              {!!uploadedFile ? "Uploaded" : "Upload"}
            </Button>
          )}

          {!!uploadedFile && (
            <Stack spacing={1}>
              <Button
                endIcon={<Visibility />}
                onClick={() => {
                  if (uploadedFile instanceof File) {
                    const url = URL.createObjectURL(uploadedFile);
                    window.open(url, "_blank");
                    setDownloaded(true);
                  } else {
                    let url1 = `${BACKEND_URL}/static/uploads/${uploadedFile}`;
                    window.open(url1, "_blank");
                  }
                }}
              >
                View
              </Button>

              <Button
                endIcon={<Delete />}
                onClick={() => {
                  onDelete?.();
                }}
              >
                Delete
              </Button>
            </Stack>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default RelatedDocument;
