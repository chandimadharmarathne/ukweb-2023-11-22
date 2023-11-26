import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const UploadNICDialog = ({ open, handleClose,handle }:any) => {
  const [frontFile, setFrontFile] = useState<any>(null);
  const [backFile, setBackFile] = useState<any>(null);

  const handleFrontFileUpload = (event:any) => {
    setFrontFile(event.target.files[0]);
  };

  const handleBackFileUpload = (event:any) => {
    setBackFile(event.target.files[0]);
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fs", frontFile);
    formData.append("bs", backFile);

    // Do something with the FormData, e.g. send it to the server via axios
    
    handle(formData )
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Upload NIC</DialogTitle>
        <DialogContent>
          <input type="file" accept="image/*" onChange={handleFrontFileUpload} />
          <br />
          <input type="file" accept="image/*" onChange={handleBackFileUpload} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Upload</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UploadNICDialog;
