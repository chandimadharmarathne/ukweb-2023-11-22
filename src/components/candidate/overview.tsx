import { Add } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  FormControlLabel,
  Grid,
  Stack,
  styled,
  Switch,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import {
  EMAIL_REGEX,
  FULL_NAME_REGEX,
  MOBILE_NUM_REGEX,
  URL_REGEX,
} from "../../constants/regex";
import { useAuthBackend } from "../../hooks/backend";
import useCandidateBackend from "../../hooks/candidate-edit.hook";
import { useErrors } from "../../hooks/error.hook";
import * as profileService from "../../services/profile-service";
import { getProfilePic } from "../../services/profile-service";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import {
  Credentials,
  ErrorHelps,
  ExtendedInputField,
  InputField,
} from "../../utils/auth-types";
import { Response as BasicResponse } from "../../utils/utils.types";
import Loader from "../../views/loader/Loader";
import { Data, DATA_FILTERS } from "../find-job/sections/industry.data";
import FormInput from "../input";
import selectInput from "../select-input";
import SubmitButton from "../submit-button";
import { Page } from "./edit.data";
import { Response, Switches } from "./edit.types";
import { useAuthentication } from "../../store/providers/auth.provider";

export const StyledBox = styled(Box)(() => ({
  ".badge": {
    bottom: 30,
    right: 30,
  },
  ".button": {
    backgroundColor: grey["700"],
    aspectRatio: "1 / 1",
    borderRadius: "50%",
    width: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

const Overview: Page = ({ id, updateCompleted }) => {
  const [credentials, setCredentials] = useState<Credentials>({});
  const [switches, setSwitches] = useState<Switches>({});
  const { code } = useLanguage();
  const { addSnack } = useSnackbar();
  const { data, loading, submit } = useCandidateBackend<Response>(id);

  const { checkErrors, updateError, hasErrors, addError } = useErrors(
    getInputs(credentials) as any
  );
  const { id: userID,adposted,role } = useAuthentication();
  // const {
  //   data: image,
  //   mutate,
  //   loading: dp_loading,
  // } = useAuthBackend<BasicResponse<{ dp: string }>>("/profile/dp");

  // useEffect(() => {
  //   if (data) {
  //     setCredentials(data.data);
  //     setSwitches(data.switches);
  //   }
  // }, [data]);

  const updateCredentials =
    (name: string, validate: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      console.log("value",validate?.(value))
      updateError(name, validate?.(value));
      setCredentials((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const onChangeSwitch = (name: string) => (_: SyntheticEvent, on: boolean) => {
    setSwitches((prev) => ({ ...prev, [name]: on }));
  };

  const submitForm = async () => {
    try {
      if (typeof credentials.other_links === "string") {
        // @ts-ignore
        credentials.other_links = [credentials.other_links];
      }
      checkErrors(credentials);
      await submit({
        switches,
        data: credentials,
      });
      updateCompleted(true);
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  const uploadProfilePic: ChangeEventHandler<HTMLInputElement> = async (e) => {
    try {
      const pic = e.target.files?.[0];
      if (!pic) return;
      const res = await profileService.profilePicUpload(pic);

      if (res.success) {
        // mutate(
        //   { success: res.success, result: { dp: res.dp } },
        //   { revalidate: true }
        // );
        addSnack?.({ severity: "success", message: "Successfully Uploaded" });
      }
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <StyledBox>
      <Badge
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        classes={{ badge: "badge" }}
        badgeContent={
          <FormControlLabel
            className="button"
            label={<Add fontSize="large" htmlColor="#fff" />}
            control={
              <TextField
                type="file"
                hidden
                style={{ display: "none" }}
                onChange={uploadProfilePic}
              />
            }
          />
        }
      >
        {/* <Avatar
          style={{ height: 200, width: 200 }}
          src={getProfilePic(image?.result.dp)}
        >
          {dp_loading ? (
            <CircularProgress hidden />
          ) : (
            data?.data.first_name?.[0]
          )}
        </Avatar> */}
      </Badge>

      <Grid container padding={2} spacing={2}>
        {getInputs(credentials).map((input) => {
          const hasError = hasErrors(input.name);
          return (
            <Grid item xs={12} md={input.column ?? 12} key={input.name}>
              <FormInput
                input={input}
                error={hasError}
                value={credentials?.[input.name] ?? ""}
                onChange={updateCredentials(input.name, input.validator)}
                helperText={hasError ? errorHelps[input.name]?.[code] : ""}
              />
            </Grid>
          );
        })}
      </Grid>

     

      <SubmitButton onClick={submitForm}>Save Changes</SubmitButton>
    </StyledBox>
  );
};

const getInputs = (credentials: Credentials) => {
  const genSelectables = (data: Data) => ({
    id: data.id,
    label: data.label.en,
  });
  const industries = DATA_FILTERS.map(genSelectables);

  const jobTitles =
    DATA_FILTERS.find((item) => item.id === credentials.industry)?.content?.map(
      genSelectables
    ) ?? [];

  const inputs: ExtendedInputField[] = [
    {
      name: "first_name",
      column: 6,
      validator: (name) => FULL_NAME_REGEX.test(name),
      props: { label: "First Name", required: true },
    },
    {
      name: "last_name",
      column: 6,
      validator: (name) => FULL_NAME_REGEX.test(name),
      props: { label: "Last Name", required: true },
    },
    {
      name: "industry",
      column: 6,
      dependancies: [industries],
      CustomComponent: selectInput(industries, credentials.industry),
      validator: (value) =>
        !!industries.find((industry) => industry.id === value),
      props: { label: "Industry", required: true },
    },
    {
      name: "job_title",
      column: 6,
      dependancies: [jobTitles],
      CustomComponent: selectInput(jobTitles, credentials.job_title),
      validator: (value) => !!jobTitles.find((job) => job.id === value),
      props: {
        label: "Job Title",
        disabled: !credentials.industry,
        required: true,
      },
    },
    {
      name: "contact_number",
      validator: (number) => MOBILE_NUM_REGEX.test(number),
      column: 6,
      props: { label: "Contact Number", required: true, disabled: false },
    },
    {
      name: "other_contact_number",
      validator: (number) => {
        if(number?.length === 0){
           return true
        }else{
          return MOBILE_NUM_REGEX.test(number)
        }
      },
      column: 6,
      props: { label: "Other Contact Number" },
    },
    {
      name: "email",
      validator: (email) => {
        if(email?.length === 0){
           return true
        }else{
          return EMAIL_REGEX.test(email)
        }
      },
      column: 6,
      props: { label: "Email"},
    },
    {
      name: "facebook_profile_url",
      validator: (link) => {
        
         if(link?.length === 0){
            return true
         }else{
          return URL_REGEX.test(link)
         }
          
      },
      props: { label: "Facebook Profile URL" },
    },
    {
      name: "linked_in_profile_url",
      validator: (link) => {
        
        if(link?.length === 0){
           return true
        }else{
         return URL_REGEX.test(link)
        }
         
     },
      props: { label: "Linked in Profile URL" },
    },
    {
      name: "other_links",
      validator: (link) => {
        
        if(link?.length === 0){
           return true
        }else{
         return URL_REGEX.test(link)
        }
         
     },
      props: { label: "Other links" },
    },
  ];
  return inputs;
};
const booleans: InputField[] = [
  {
    name: "visible_public",
    props: { label: "Contact details make visible to the public" },
  },
  {
    name: "visible_employer",
    props: { label: "Contact details make visible to the employers" },
  },
];

const errorHelps: ErrorHelps = {};

export default Overview;
