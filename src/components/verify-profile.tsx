import { Box, Stack, SvgIconTypeMap, Tooltip, Typography } from "@mui/material";
import React, { FC, useState } from "react";
import { useToggle } from "../hooks/toggle.hook";
import * as profileService from "../services/profile-service";
import { useSnackbar } from "../store/providers/snackbar.provider";
import { Verified as VerifiedIcon } from "../utils/icons";
import SubmitButton from "./submit-button";
import UploadNICDialog from "./nic-upload";
import { useAuthentication } from "../store/providers/auth.provider";

const VerifyMe: FC = () => {
  const { addSnack } = useSnackbar();
  const [requested, toggleRequested] = useToggle();
  const [title, setTitle] = React.useState<string>();
  const [open,setOpen] = useState<any>(false)
  const { id: currentID, badge, role, token, adposted } = useAuthentication();
  React.useEffect(() =>{
    completed();
  })
  const completed =async() =>{
    const { result } = await profileService.status();
    if(result.completed){
      setTitle("Verify your profile")
    }else{
      setTitle("Complete your profile")
    }
  }
  const verify = async (data:any) => {
    try {
      const res = await profileService.verify(data);
      if (res.success) toggleRequested();
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };
  if (requested) return null;
  return (
    <>

    <UploadNICDialog open={open} handleClose={() => {
      setOpen(false)
  
    }} handle={(data:any) =>{
      verify(data)
      setOpen(false)
    }}    />
    
    {
      title && <Stack
      bgcolor={"white"}
      padding={2}
      borderRadius={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack direction="row" alignItems="center" spacing={2}>
        <VerifiedIcon color="primary" />
        <Box fontSize={{ xs: "0.8rem", sm: "1rem" }}>
          <Typography color="secondary" variant="h2" component="span">
            {title}
          </Typography>
          <Typography color="secondary">
            Please make {title}
          </Typography>
        </Box>
      </Stack>
      {
        title === "Verify your profile" &&
        <SubmitButton style={{ width: "fit-content" }} onClick={() =>{
          if(role === "employer"){

          }else{
            setOpen(true)
          }
         
        } }>
        Send Request
      </SubmitButton>
      }
    </Stack>
    }
    </>
  );
};

type VerifiedProps = {
  verified?: boolean;
} & SvgIconTypeMap<Record<string, any>, "svg">["props"];
export const Verified: FC<VerifiedProps> = ({ verified, ...props }) => {
  if (!verified) return null;

  return (
    <Tooltip title="Verified user">
      <VerifiedIcon
        color="info"
        sx={{ top: 5, position: "relative", pl: 0.5 }}
        {...props}
      />
    </Tooltip>
  );
};

export default VerifyMe;
