import { Delete, Edit } from "@mui/icons-material";
import { ButtonGroup, IconButton, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC } from "react";

interface BlockProps {
  text: string;
  onEdit?: () => void;
  onDelete?: () => void;
  editMode?: boolean;
}

const Block: FC<BlockProps> = ({ text, editMode, onDelete, onEdit }) => {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      bgcolor={grey["100"]}
      padding={1}
    >
      <Typography m={0} fontWeight="500" paragraph color="primary">
        {text}
      </Typography>

      <ButtonGroup>
        {onEdit && (
          <IconButton disabled={editMode} onClick={onEdit}>
            <Edit />
          </IconButton>
        )}
        <IconButton onClick={onDelete}>
          <Delete />
        </IconButton>
      </ButtonGroup>
    </Stack>
  );
};

export default Block;
