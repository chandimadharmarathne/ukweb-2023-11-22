import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useState } from "react";


const AvatarPopup = ({ avatarImage,closeModal,open }:any) => {


  

  return (
    <>
     <Dialog
        open={open}
        onClose={closeModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"View Image"}
        </DialogTitle>
        <DialogContent>
        <img src={avatarImage} />
        </DialogContent>
        
      </Dialog>
    
    </>
  );
};

export default AvatarPopup;
