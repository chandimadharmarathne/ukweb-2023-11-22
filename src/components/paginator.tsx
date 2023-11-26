import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import {
  Pagination as DefaultPagination,
  PaginationItem,
  PaginationProps,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

const Pagination: FC<PaginationProps> = ({ ...props }) => {
  return (
    <DefaultPagination
      color="secondary"
      {...props}
      renderItem={(item) => (
        <PaginationItem
          components={{
            previous: () => (
              <>
                <KeyboardArrowLeft />
                <Typography fontWeight="700">Back</Typography>
              </>
            ),
            next: () => (
              <>
                <Typography fontWeight="700">Next</Typography>
                <KeyboardArrowRight />
              </>
            ),
          }}
          {...item}
        />
      )}
    />
  );
};

export default Pagination;
