import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ALLOWED_FILE_TYPES } from "../../constants/allowed-files";
import useCandidateBackend from "../../hooks/candidate-edit.hook";
import { useToggle } from "../../hooks/toggle.hook";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { Credentials, InputField } from "../../utils/auth-types";
import { SpecialPerson } from "../../utils/icons";
import { toFormData } from "../../utils/to-formdata";
import Loader from "../../views/loader/Loader";
import RelatedDocument from "../related-document";
import SubmitButton from "../submit-button";
import { Page } from "./edit.data";
import { Switches } from "./edit.types";

const RelatedDocuments: Page = ({ id, togglePostAdPopup,updateCompleted }) => {
  const { addSnack } = useSnackbar();
  const [completed, toggleCompleted] = useToggle(false);
  const [docs, setDocs] = useState<any>({});
  const [switches, setSwitches] = useState<Switches>({});
  const { data, loading, submit } =
    useCandidateBackend<Credentials<string | File>>(id);

  useEffect(() => {
    if (data) {
      setSwitches(
        // @ts-ignore
        Object.fromEntries(
          Object.entries(data).filter(([, value]) => typeof value === "boolean")
        )
      );

      
    }
    documents.map((doc) => {
      setDocs((prev:any) => ({ ...prev, [doc.id]: data?.[doc.id] }));
    });
  }, [data]);


  console.log("docs",docs)

  const onChangeDoc = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        if (ALLOWED_FILE_TYPES.includes(file.type))
          setDocs((prev:any) => ({ ...prev, [id]: file }));
        else throw new Error("Invalid File Type");
      }
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  const onChangeSwitch = (name: string) => (_: SyntheticEvent, on: boolean) => {
    setSwitches((prev) => ({ ...prev, [name]: on }));
  };

  const upload = async () => {
    try {
      await submit(
        toFormData({
          ...docs,
          ...switches,
        }),
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toggleCompleted(); // for popup
      
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  if (loading) return <Loader />;
    
  return (
    <Stack spacing={2}>
      {documents.map((doc) => (
        <RelatedDocument
          key={doc.id}
          title={`${doc.title} (${
            docs[doc.id]?.name ?? docs[doc.id] ?? "not Provided"
          })`}
          type="upload_download"
          onChange={onChangeDoc(doc.id)}
          uploadedFile={docs[doc.id]  }
          onDelete={() => {
            setDocs((prev:any) => ({ ...prev, [doc.id]: undefined }));
            

        
          }}
        />
      ))}
      
      <Stack padding={2}>
        {booleans.map((input) => (
          <FormControlLabel
            key={input.name}
            label={String(input.props?.label)}
            labelPlacement="start"
            color="primary"
            control={<Switch checked={!!switches?.[input.name]} />}
            style={{ justifyContent: "space-between", maxWidth: 500 }}
            onChange={onChangeSwitch(input.name)}
          />
        ))}
      </Stack>

      <SubmitButton onClick={upload} style={{ alignSelf: "flex-end" }}>
        Save Changes
      </SubmitButton>

      <Dialog open={completed} onClose={toggleCompleted}>
        <DialogContent>
          <Typography variant="h2" color="primary">
            Post Ad
          </Typography>
          <Typography paragraph color="secondary">
          If you click Post as an ad, this will  be visible to users. It will get responses, otherwise it won't show as an ad
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button
            component={Link}
            to={"/profile/me"}
            variant="outlined"
            startIcon={<SpecialPerson />}
            sx={{ mr: 1 }}
          >
            Not now
          </Button>
          <Button variant="contained" onClick={() =>{
            updateCompleted?.(true);
            togglePostAdPopup()
          }}>
            Post now
          </Button>
        </DialogActions>
      </Dialog>
    </Stack>
  );
};
const documents = [
  { id: "cover", title: "Cover Letter" },
  { id: "cv", title: "CV" },
  { id: "degree", title: "Degree Certificate" },
];

const booleans: InputField[] = [
  {
    name: "visible_public",
    props: { label: "Documents make visible to the public" },
  },
];

export default RelatedDocuments;
