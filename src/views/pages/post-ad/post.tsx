import { Add } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Container,
  FormControlLabel,
  Grid,
  Stack,
  styled,
  Switch,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { types } from ".";
import { StyledBox } from "../../../components/candidate/overview";
import FormInput from "../../../components/input";
import RelatedDocument from "../../../components/related-document";
import { StyledPaper } from "../../../components/styled-common/paper";
import SubmitButton from "../../../components/submit-button";
import { ALLOWED_FILE_TYPES } from "../../../constants/allowed-files";
import { ALLOWED_TYPES } from "../../../constants/allowed-images";
import { AdType } from "../../../constants/input-data";
import { useDistrict } from "../../../hooks/district.hook";
import { useErrors } from "../../../hooks/error.hook";
import { useToggle } from "../../../hooks/toggle.hook";
import * as adService from "../../../services/ad-service";
import * as profileService from "../../../services/profile-service";
import { getAdCover } from "../../../services/profile-service";
import { useLanguage } from "../../../store/providers/lang.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Credentials, InputField } from "../../../utils/auth-types";
import { Switches } from "../job/[id]";
import {
  booleans,
  errorHelps,
  getEssentials,
  getOtherInputs,
  textareaFields,
} from "./post.data";
import SelectAdType from "./select-ad-type";
import Repeater, { BlockType } from "../../../components/candidate/repeat-block";
import {  referenceInputs1 } from "../../../components/cv-gen/sections";

type CreateAdPageProps = {
  defaults?: {
    data: Credentials;
    switches: Switches;
  };
  id?: string;
  editMode?: boolean;
};

const GRID_GAP = 2;
const CreateAdPage: FC<CreateAdPageProps> = ({ defaults, editMode, id }) => {
  const { addSnack, addError } = useSnackbar();
  const [data, setData] = useState<Credentials<string>>({});
  const [cover, setCover] = useState<File | null>(null);
  const [docs, setDocs] = useState< any>({});
  const [showTypeSelect, toggleTypeSelect] = useToggle();
  const [adType, setAdType] = useState<any>();
  const districts = useDistrict(data.country);
  const { checkErrors, hasErrors, updateError } = useErrors(
    [
      getEssentials(data as any),
      getOtherInputs(data as any),
      textareaFields,
      booleans,
    ].flat()
  );
  const [switches, setSwitches] = useState<Switches>({
    food: false,
    accomodation: false,
  });

  const { code } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (defaults) {
      setData(defaults?.data);
      setDocs({["advertisements"]: defaults?.data?.related_document,["other"]: defaults?.data?.other_document })
      setSwitches(defaults?.switches);
      setAdType(defaults?.data?.advertisement_type);
      console.log("defaults?.data?.advertisement_type", defaults?.data?.advertisement_type,typeof defaults?.data?.advertisement_type)
    }
  }, []);

  const onChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdType(parseInt(value));
  };
  const [blocks, setBlocks] = useState<{ [key: string]: BlockType[] }>({});
  const onBlockChange = (id: string) => (blocks: BlockType[]) => {
    setBlocks((prev) => ({ ...prev, [id]: blocks }));
  };

  const updateData =
    (name: string, validate: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      updateError(name, validate?.(value));
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const onChangeSwitch = (name: string) => (_: any, on: boolean) => {
    setSwitches((prev) => ({ ...prev, [name]: on }));
    updateError(name, true);
  };
  const onCoverChange = (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.item(0);
      if (!file) throw new Error("No image selected");
      if (!ALLOWED_TYPES.includes(file?.type))
        throw new Error("Only .jpeg, .png, .gif, .webp allowed");
      setCover(file);
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const onDocsChange = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.item(0);
      if (!file) throw new Error("No file selected");
      if (!ALLOWED_FILE_TYPES.includes(file?.type))
        throw new Error("Only .jpg, .jpeg, .png, .pdf, .docx files allowed");
      setDocs((prev:any) => ({ ...prev, [id]: file }));
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  const togglePopup = async () => {
    try {
      checkErrors({
        ...data,
        ...switches,
      });
      const {
        result: { completed },
      } = await profileService.status();

      if (!completed)
        throw new Error("Complete your profile before Post an Ad");
      toggleTypeSelect();
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };
 //console.log("data", blocks)
  const submit = async () => {
    try {
      const res = await adService.post(
        {
          id,
          cover,
          switches,
          credentials: {...data,contact_name:blocks?.references[0]?.person,contact_number: blocks?.references[0]?.number},
          other: docs.other,
          advertisements: docs.advertisements,
        },
        adType,
        editMode
      );
      if (res.success) {
        toggleTypeSelect();

        if (editMode) {
          navigate("/");
          return addSnack?.({
            severity: "success",
            message: "Successfully edited",
          });
        }
        if (adType !== AdType.Free)
          return navigate(
            `/post-ad/${types.find((type) => type.id === adType)?.link}/${
              res.result?.invoiceId
            }`
          );

        navigate("/");
        addSnack?.({
          severity: "success",
          message: "Ad successfully posted",
        });
      }
    } catch (error: any) {
      toggleTypeSelect();
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  return (
    <StyledMain>
      <SelectAdType
        type={adType}
        open={showTypeSelect}
        onClose={togglePopup}
        onSubmit={submit}
        onTypeChange={onChangeType}
      />
      <Container>
        <Stack spacing={3}>
          <StyledPaper>
            <Grid container spacing={GRID_GAP}>
              <Grid item xs={12} display="flex" alignItems="center">
                <StyledBox>
                  <Badge
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    classes={{ badge: "badge" }}
                    badgeContent={
                      <FormControlLabel
                        className="button"
                        label={
                          <Tooltip title="Upload your ad Cover">
                            <Add fontSize="large" htmlColor="#fff" />
                          </Tooltip>
                        }
                        control={
                          <input
                            type="file"
                            name="pic"
                            id="pic"
                            hidden
                            accept="image/*"
                            onChange={onCoverChange}
                          />
                        }
                      />
                    }
                  >
                    <Avatar
                      variant="square"
                      style={{ height: 200, width: 200 }}
                      src={
                        cover
                          ? URL.createObjectURL(cover)
                          : editMode
                          ? getAdCover(defaults?.data.cover)
                          : undefined
                      }
                    />
                  </Badge>
                </StyledBox>
              </Grid>

              {getEssentials(data, districts).map((input) => {
                const hasError = hasErrors(input.name);

                return (
                  <Grid item xs={12} md={input.column ?? 12} key={input.name}>
                    <FormInput
                      error={hasError}
                      input={input}
                      onChange={updateData(input.name, input.validator)}
                      value={
                        input.formatter?.(data?.[input.name]) ??
                        data?.[input.name] ??
                        ""
                      }
                      helperText={
                        hasError ? errorHelps[input.name]?.[code] : undefined
                      }
                      style={{ background: grey["50"] }}
                      {...input.props}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </StyledPaper>
          <StyledPaper>
            <Stack spacing={2}>
              {textareaFields.map((input) => {
                const hasError = hasErrors(input.name);
                return (
                  <TextField
                    {...input.props}
                    error={hasError}
                    name={input.name}
                    multiline
                    fullWidth
                    key={input.name}
                    rows={5}
                    onChange={updateData(input.name, input.validator)}
                    helperText={hasError ? errorHelps[input.name]?.[code] : ""}
                    value={data?.[input.name] ?? ""}
                    style={{ background: grey["50"] }}
                  />
                );
              })}
            </Stack>
          </StyledPaper>

          <StyledPaper>
            <Typography paddingY={2} variant="h3" paragraph color="secondary">
              Other
            </Typography>
            <Grid container spacing={GRID_GAP}>
              {getOtherInputs(data).map((input) => {
                const hasError = hasErrors(input.name);
                return (
                  <Grid item xs={12} md={input.column ?? 12} key={input.name}>
                    <FormInput
                      {...input.props}
                      error={hasError}
                      input={input}
                      value={data?.[input.name] ?? ""}
                      onChange={updateData(input.name, input.validator)}
                      helperText={
                        hasError ? errorHelps[input.name]?.[code] : ""
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
            <Box
              bgcolor={grey["100"]}
              marginY={2}
              maxWidth={400}
              borderRadius={1}
            >
              <Stack padding={2}>
                {booleans.map((input) => (
                  <FormControlLabel
                    key={input.name}
                    label={String(input.props?.label)}
                    labelPlacement="start"
                    color="primary"
                    control={<Switch />}
                    style={{ justifyContent: "space-between" }}
                    onChange={onChangeSwitch(input.name)}
                    checked={!!switches?.[input.name] ?? false}
                  />
                ))}
              </Stack>
            </Box>
          </StyledPaper>
          <StyledPaper>
            <Typography paddingY={2} variant="h3" paragraph color="secondary">
                  Contact Persons
              </Typography>
            
            <Repeater
              errorHelps={{}}
              inputs={referenceInputs1}
              onChange={onBlockChange("references")}
              blockTitle={(block) => `${block.person} - ${block.company}`}
            />
        
          </StyledPaper>
          

          <StyledPaper>
            <Typography paddingY={2} variant="h3" paragraph color="secondary">
              Related Documents
            </Typography>
            <Stack spacing={1}>
              <RelatedDocument
                type="upload_download"
                title={`Advertisements ${docs.advertisements?.name ?? docs.advertisements ??  "Not Provided"}`}
                onChange={onDocsChange("advertisements")}
                uploadedFile={docs.advertisements}
                onDelete={() =>{
                  setDocs({...docs, advertisements: undefined})
                }}
             
                
              />
              <RelatedDocument
                type="upload_download"
                title={`Other ${docs.other?.name ?? docs.other ??  "Not Provided"}`}
                onChange={onDocsChange("other")}
                uploadedFile={docs.other}
                onDelete={() =>{
                  setDocs({...docs, other: undefined})
                }}
              />
            </Stack>
          </StyledPaper>
          <SubmitButton onClick={togglePopup} style={{ alignSelf: "flex-end" }}>
            Save & Publish
          </SubmitButton>
        </Stack>
      </Container>
    </StyledMain>
  );
};

const StyledMain = styled("main")(({ theme }) => ({
  padding: theme.spacing(5, 1),
  background: "#f1f1f1",
  ".paper": {
    padding: theme.spacing(5),
  },
  ".image > img": {
    width: "100%",
    height: "100%",
  },
}));
export default CreateAdPage;
