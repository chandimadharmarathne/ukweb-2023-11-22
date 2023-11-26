import {
  Dialog,
  DialogContent,
  Stack,
  Typography,
  Box,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
} from "@mui/material";
import React, { FC, useState } from "react";
import { Link } from "react-router-dom";
import { DATA_APPLYJOB_TYPES } from "../../constants/input-data";
import * as searchService from "../../services/search-service";
import * as profileService from "../../services/profile-service";
import SubmitButton from "../submit-button";
import { useSnackbar } from "../../store/providers/snackbar.provider";

interface ApplyJobProps {
  show: boolean;
  onClose: () => void;
  id: string | number;
}

const ApplyJob: FC<ApplyJobProps> = ({ show, onClose, id }) => {
  const [successfullyApplied, setSuccessfullyApplied] = useState(false);
  const [cv, setCv] = useState<File>();
  const [selectedType, setSelectedType] = useState<number>(0);
  const { addError } = useSnackbar();

  const ApplyComponent =
    DATA_APPLYJOB_TYPES.find((type) => type.id === selectedType)?.Component ??
    (() => null);

  const handleRadioChange = (_: any, value: string) => {
    setSelectedType(parseInt(value));
  };

  const onCVChange = (cv: File) => {
    setCv(cv);
  };

  const applyNow = async () => {
    try {
      if (selectedType === 2 && !cv) throw new Error("Upload cv first");

      const { result } = await profileService.status();
      
      if (!result.completed)
        throw new Error("Complete your profile before apply for a job");

      const res = await searchService.applyJob(id, selectedType, cv);
      setSuccessfullyApplied(res.success);
    } catch (error: any) {
      addError?.(error.message);
      onClose();
    }
  };

  return (
    <Dialog open={show} onClose={onClose}>
      {successfullyApplied ? (
        <DialogContent>
          <Stack alignItems="center">
            <Typography
              maxWidth={500}
              fontWeight="700"
              textAlign="center"
              variant="h3"
              color="primary"
            >
              Your application has been sent successfully
            </Typography>
            <Box marginY={2}>
              <img
                src="/assets/top-ad.png"
                alt="successfully applied"
                height={250}
                width={250}
              />
            </Box>
            <Link to="/find-job">
              <Button variant="contained" style={{ alignSelf: "center" }}>
                Search More Jobs
              </Button>
            </Link>
          </Stack>
        </DialogContent>
      ) : (
        <>
          <DialogContent>
            <RadioGroup
              name="type"
              onChange={handleRadioChange}
              value={selectedType}
            >
              {DATA_APPLYJOB_TYPES.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={type.id}
                  control={<Radio />}
                  style={{ marginBlock: 5 }}
                  label={
                    <>
                      <Typography fontWeight="500">{type.title}</Typography>
                      {type.description && (
                        <Typography>{type.description}</Typography>
                      )}
                    </>
                  }
                />
              ))}
            </RadioGroup>
            {/* @ts-ignore */}
            <ApplyComponent cv={cv} onChange={onCVChange} />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <SubmitButton onClick={applyNow} style={{ width: "fit-content" }}>
              Apply
            </SubmitButton>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default ApplyJob;
