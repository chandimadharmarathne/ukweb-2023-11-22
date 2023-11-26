import { Backdrop, Box, Stack, Typography } from "@mui/material";
import React, { FC, Fragment, useState } from "react";
import SubmitButton from "../submit-button";

interface CookieWarnProps {}

const CookieWarn: FC<CookieWarnProps> = () => {
  const [accepted, setAccepted] = useState(() => {
    const raw = localStorage.getItem("@cookie_accepted");
    return raw ? !!JSON.parse(raw) : false;
  });

  const accept = () => {
    setAccepted(true);
    localStorage.setItem("@cookie_accepted", "true");
  };

  return (
    <Fragment>
      <Backdrop component="div" open={!accepted}>
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{
            position: "fixed",
            bottom: 0,
            bgcolor: "#fff",
            width: "100%",
            padding: (theme) => theme.spacing(1),
          }}
        >
          <Box>
            <Typography variant="h2" margin={0} paragraph>
              We use cookies
            </Typography>
            <Typography paragraph>
              Cookies help us deliver the best experience on our website. By
              using our website, you agree to the use of cookies.
            </Typography>
          </Box>
          <SubmitButton sx={{ alignSelf: "center" }} onClick={accept}>
            Accept
          </SubmitButton>
        </Stack>
      </Backdrop>
    </Fragment>
  );
};

export default CookieWarn;
