import { Stack, TextField } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import useCandidateBackend from "../../hooks/candidate-edit.hook";
import { Credentials } from "../../utils/auth-types";
import Loader from "../../views/loader/Loader";
import SubmitButton from "../submit-button";
import { Page } from "./edit.data";

const AboutMe: Page = ({ id, updateCompleted }) => {
  const { data, submit, loading } = useCandidateBackend<Credentials>(id);
  const [aboutMe, setAboutMe] = useState("");

  useEffect(() => {
    if (data) setAboutMe(data.about);
  }, [data]);

  const onChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAboutMe(e.target.value);
  };
  const submitData = async () => {
    if(!aboutMe || aboutMe?.length == 0){
     
    }else{
      await submit({ about: aboutMe });
      updateCompleted(!!aboutMe?.length);
    }
  };

  if (loading) return <Loader />;
  return (
    <Stack width="100%" spacing={2} alignItems={{ sm: "flex-end" }}>
      <TextField
       required
        multiline
        fullWidth
        rows={10}
        label="About Me"
        defaultValue={data?.about}
        onChange={onChange}
        error = {aboutMe?.length == 0}
      />
      <SubmitButton onClick={submitData}>Save Changes</SubmitButton>
    </Stack>
  );
};

export default AboutMe;
