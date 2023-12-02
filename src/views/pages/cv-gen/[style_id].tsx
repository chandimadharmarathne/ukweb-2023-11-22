import { Add, AddCircle, RemoveCircle } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Badge,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  RadioGroupProps,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
  useMediaQuery,
  Theme,
} from "@mui/material";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  FC,
  useEffect,
  useState,
  
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import { StyledBox } from "../../../components/candidate/overview";
import Repeater, {
  BlockType,
} from "../../../components/candidate/repeat-block";
import { SaveOptions } from "../../../components/cv-gen/save-options";
import Section from "../../../components/cv-gen/section";
import {
  eduInputs,
  extraCurricularInputs,
  getProfileInputs,
  otherInputs,
  professionalInputs,
  referenceInputs,
  skillsInputs,
} from "../../../components/cv-gen/sections";
import { Main } from "../../../components/styled-common/main";
import SubmitButton from "../../../components/submit-button";
import { ALLOWED_TYPES } from "../../../constants/allowed-images";
import { DATA_SKILL_LEVELS } from "../../../constants/input-data";
import { useErrors } from "../../../hooks/error.hook";
import { useToggle } from "../../../hooks/toggle.hook";
import { AuthenticationLayout } from "../../../layouts";
import * as cvService from "../../../services/cv-service";
import * as profileService from "../../../services/profile-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Credentials, InputField } from "../../../utils/auth-types";
import RegisterPage from "../../authPages/register";
import Loader from "../../loader/Loader";
import { DownloadCV } from "./download";
import { StyledPaper } from "../../../components/job-cards";
import CandidateMobile from "../../../components/candidate/mobile-view";
import CandidateDesktop from "../../../components/candidate/desktop-view";
import { useMobile } from "../../../store/providers/mobile-to-desktop-change.provider";
import { green, grey } from "@mui/material/colors";

interface CreateCVProps {

}
interface InitalProps {
  id: number
}

const StyledPage = styled("main")(({ theme }) => ({
  marginTop: theme.spacing(7),
  background: "#fff",
  backgroundColor: "white",
  ".toggle": {
    padding: theme.spacing(2),
  },

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));
const CreateCV: FC<any> = (props: InitalProps) => {
  const { addSnack, addError } = useSnackbar();
  const { role, token } = useAuthentication();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint
  // const [adType, setAdType] = useState<number>();
  const [showAdSelect, toggleShowAdSelect] = useToggle();
  const [showRegisterPage, toggleRegisterPage] = useToggle();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({});
  const [blocks, setBlocks] = useState<{ [key: string]: BlockType[] }>({});
  const [picture, setPicture] = useState<string | null>(null);
  const [picFile, setPicFile] = useState<File>();
  const [expanded, setExpanded] = useState<boolean>(true);
  const [loading, toggleLoading] = useToggle(false);
  const [showSaveOptions, toggleSaveOptions] = useToggle(false);
  const [saveOption, setsaveOption] = useState<number>(SaveOptions.DONT_SAVE);
  console.log("props =>", props.id)
  const { checkErrors, hasErrors, updateError } = useErrors(
    [getProfileInputs(credentials), otherInputs].flat()
  );

  const isDesktop = useMediaQuery<Theme>((theme) =>
  theme.breakpoints.up("lg")
);

  // console.log("cred =>",credentials,blocks)
  // useEffect(() => {
  //   if (role === "candidate") updateCredentialsForCandidate();
  // }, []);

  // const updateCredentialsForCandidate = async () => {
  //   toggleLoading();
  //   try {
  //     const res = await profileService.getLoggedCandidateFullProfile();
  //     const credentials = {
  //       ...res.data_overview,
  //       ...res.data_info,
  //       about: res.data_about,
  //     };
  //     const blocks = {
  //       pro_info: res.data_qualifications,
  //       edu_info: res.data_education?.other,
  //     };
  //     // @ts-ignore
  //     setCredentials(credentials);
  //     // @ts-ignore
  //     setBlocks(blocks);
  //   } catch (error: any) {
  //     addError?.(error.message);
  //   }
  //   toggleLoading();
  // };

  const onSaveOption: RadioGroupProps["onChange"] = (e) => {
    setsaveOption(parseInt(e.target.value));
  };

  const handleChange = (_event: any, isExpanded: boolean) => {
    setExpanded(isExpanded);
  };

  const onBlockChange = (id: string) => (blocks: BlockType[]) => {
    setBlocks((prev) => ({ ...prev, [id]: blocks }));
  };

  const updateCredentials =
    (name: string, validate: InputField["validator"]) =>
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        updateError(name, validate?.(value));
        setCredentials((prev) => ({
          ...prev,
          [name]: value,
        }));

      };

  const onPictureChange: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      const pic = e.target.files?.[0];
      if (!pic) throw new Error("No File was selected");
      if (!ALLOWED_TYPES.includes(pic.type)) throw new Error("Invalid image");

      setPicture(URL.createObjectURL(pic));
      setPicFile(pic);
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  const validate = () => {
    try {
      if (!picture) throw new Error("Upload a Profile picture");
      checkErrors({ ...credentials });

      if (!blocks.pro_info.length)
        throw new Error("Add Professional Information");
      if (!blocks.edu_info.length)
        throw new Error("Add Educational  Information");
      if (!blocks.references.length) throw new Error("Add References");

      toggleSaveOptions();

    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const saveDetails = async () => {
    sessionStorage.setItem(
      "@cv-data",
      JSON.stringify({
        credentials,
        blocks,
        picture,
        dontSave: true,
      })
    );

  };
  const submit = async () => {

    await saveDetails();
    return navigate("download");


  };
  if (loading)
    return (
      <Main>
        <Loader />
      </Main>
    );

  return (
    <StyledPage>
      <Container>
        {/* <Dialog open={showSaveOptions} onClose={toggleSaveOptions}>
          <DialogContent>
            <Stack gap={1}>
              <RadioGroup
                name="option"
                value={saveOption}
                onChange={onSaveOption}
              >
                {!token && (
                  <FormControlLabel
                    value={SaveOptions.REGISTER}
                    control={<Radio />}
                    label="Register on jobwomen"
                  />
                )}
                <FormControlLabel
                  value={SaveOptions.SAVE_DETAILS}
                  control={<Radio />}
                  label="Save my details for future usage"
                />
                <FormControlLabel
                  value={SaveOptions.DONT_SAVE}
                  control={<Radio />}
                  label="Don't save my details"
                />
              </RadioGroup>
            </Stack>
            <DialogActions>
              <SubmitButton onClick={submit}>Generate</SubmitButton>
            </DialogActions>
          </DialogContent>
        </Dialog> */}
        {/* <Dialog
          open={showRegisterPage}
          onClose={toggleRegisterPage}
          fullWidth
          maxWidth="md"
        >
          <AuthenticationLayout>
            <RegisterPage
              viaCV
              details={{ credentials, blocks, pic: picFile }}
              defaults={{
                number: credentials.contact_number,
                full_name: [credentials.first_name, credentials.last_name].join(
                  " "
                ),
              }}
            />
          </AuthenticationLayout>
        </Dialog> */}
        {/* 
        <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>

          <StyledPaper elevation={1}>

            {
              isMobile ? <CandidateMobile togglePostAdPopup={toggleShowAdSelect} />
                :
                <CandidateDesktop togglePostAdPopup={toggleShowAdSelect} />
            }
            <SubmitButton style={{
              marginTop: 10,
              backgroundColor: green[300]
            }} disabled={!showSaveOptions} onClick={submit}>Generate</SubmitButton>

          </StyledPaper>
          <DownloadCV styleID={props.id} savedData={{
            credentials,
            blocks,
            picture,
            dontSave: true,
          }} viaSaved={true} />

        </Stack> */}




        <Grid container spacing={1}>
          <Grid item xs={12} md={8} lg={5}>
            <Stack spacing={2}>
              <Section title="Personal Info">
                <Grid container padding={2} spacing={2}>
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
                                onChange={onPictureChange}
                              />
                            }
                          />
                        }
                      >
                        <Avatar
                          style={{ height: 200, width: 200 }}
                          src={picFile ? URL.createObjectURL(picFile) : undefined}
                        />
                      </Badge>
                    </StyledBox>
                  </Grid>
                  {getProfileInputs(credentials).map((input) => {
                    const hasError = hasErrors(input.name);
                    const Input = input.CustomComponent ?? TextField;
                    return (
                      <Grid item xs={12} md={6} key={input.name}>
                        <Input
                          {...input.props}
                          error={hasError}
                          name={input.name}
                          fullWidth
                          value={credentials?.[input.name]}
                          onChange={updateCredentials(input.name, input.validator)}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
                <Accordion
                  expanded={expanded}
                  disableGutters
                  onChange={handleChange}
                  elevation={0}
                >
                  <AccordionSummary>
                    <Stack direction="row" spacing={1}>
                      {expanded ? (
                        <RemoveCircle color="primary" />
                      ) : (
                        <AddCircle color="primary" />
                      )}
                      <Typography>
                        {expanded ? "Show fewer Options" : "Show all options"}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container padding={2} spacing={2}>
                      {otherInputs(credentials)?.map((input: any) => {
                        const hasError = hasErrors(input.name);
                        const Input = input.CustomComponent ?? TextField;
                        return (
                          <Grid item xs={12} md={6} key={input.name}>
                            <Input
                              {...input.props}
                              error={hasError}
                              name={input.name}
                              fullWidth
                              value={credentials?.[input.name] ?? ""}
                              onChange={updateCredentials(
                                input.name,
                                input.validator
                              )}
                            />
                          </Grid>
                        );
                      })}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Section>
              <Section
                title="Professional Infomation"
                titleHelp="Add all the information about your Career"
              >
                <Repeater
                  errorHelps={{}}
                  inputs={professionalInputs}
                  defaultBlocks={blocks.pro_info}
                  onChange={onBlockChange("pro_info")}
                  blockTitle={(block) => `${block.title} - ${block.company}`}
                />
              </Section>
              <Section
                title="Educational Information"
                titleHelp="Add all the information about your Educational qualifications"
              >
                <Repeater
                  errorHelps={{}}
                  inputs={eduInputs}
                  defaultBlocks={blocks.edu_info}
                  onChange={onBlockChange("edu_info")}
                  blockTitle={(block) => `${block.title} - ${block.institute}`}
                />
              </Section>
              <Section
                title="Hobbies"
                titleHelp="Give a brief description here of the things you like to do"
              >
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  onChange={updateCredentials("hobbies", (_hobby) => true)}
                />
              </Section>
              <Section title="About Me">
                <TextField
                  multiline
                  rows={5}
                  fullWidth
                  defaultValue={credentials.about}
                  onChange={updateCredentials("about", (_about) => true)}
                />
              </Section>
              <Section title="Extracurricular Activities">
                <Repeater
                  errorHelps={{}}
                  inputs={extraCurricularInputs}
                  onChange={onBlockChange("extra_activities")}
                  blockTitle={(block) => block.description}
                />
              </Section>
              <Section title="Skills">
                <Repeater
                  errorHelps={{}}
                  inputs={skillsInputs}
                  onChange={onBlockChange("skills")}
                  blockTitle={(block) =>
                    `${block.skill} - ${DATA_SKILL_LEVELS.find(
                      (level) => level.id === block.skill_level
                    )?.label
                    }`
                  }
                />
              </Section>
              <Section title="References">
                <Repeater
                  errorHelps={{}}
                  inputs={referenceInputs}
                  onChange={onBlockChange("references")}
                  blockTitle={(block) => `${block.person} - ${block.company}`}
                />
              </Section>
{/* 
              <Stack direction="row" spacing={1} sx={{ alignSelf: "flex-end" }}>
                <SubmitButton onClick={validate} sx={{ width: "fit-content" }}>
                  Generate CV
                </SubmitButton> */}

                <Stack direction="row" spacing={1} sx={{ alignSelf: "flex-start" }}>
                <SubmitButton style={{
                  width:200,
                  marginLeft: isMobile ? 50: isDesktop ? 100 : 100,
                }} onClick={validate}>
                  Save Changes
                </SubmitButton>

                <SubmitButton style={{
                  // marginTop: 10,
                  backgroundColor: green[300],
                  width:100,
                  // height:50,
                }} disabled={!showSaveOptions} onClick={submit} >Generate</SubmitButton>
              </Stack>
            </Stack>

            {/* 
        <Stack spacing={2} direction={isMobile ? 'column' : 'row'}>

          <StyledPaper elevation={1}>

            {
              isMobile ? <CandidateMobile togglePostAdPopup={toggleShowAdSelect} />
                :
                <CandidateDesktop togglePostAdPopup={toggleShowAdSelect} />
            }
            <SubmitButton style={{
              marginTop: 10,
              backgroundColor: green[300]
            }} disabled={!showSaveOptions} onClick={submit}>Generate</SubmitButton>

          </StyledPaper>
          <DownloadCV styleID={props.id} savedData={{
            credentials,
            blocks,
            picture,
            dontSave: true,
          }} viaSaved={true} />

        </Stack> */}


          </Grid>
          <Grid item xs={12} md={4} lg={7}>
            <DownloadCV styleID={props.id} savedData={{
              credentials,
              blocks,
              picture,
              dontSave: true,
            }} viaSaved={true} />

          </Grid>

        </Grid>
      </Container>
    </StyledPage>
  );
};

export default CreateCV;
