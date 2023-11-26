//  ERROR 500
import { Add } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Container,
  Grid,
  InputLabel,
  Stack,
  styled,
  TextField,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../../components/input";
import { StyledPaper } from "../../../../components/styled-common/paper";
import SubmitButton from "../../../../components/submit-button";
import { useAuthBackend } from "../../../../hooks/backend";
import { useCompanyEditBackend } from "../../../../hooks/company-edit.hook";
import { useDistrict } from "../../../../hooks/district.hook";
import { useErrors } from "../../../../hooks/error.hook";
import * as profileService from "../../../../services/profile-service";
import { useLanguage } from "../../../../store/providers/lang.provider";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { Credentials, InputField } from "../../../../utils/auth-types";
import { Response } from "../../../../utils/utils.types";
import Loader from "../../../loader/Loader";
import {
  errorHelps,
  essential,
  getCompanyInfo,
  otherInfo,
  profilePic,
  PROFILE_PICTURE_ID,
} from "./edit.data";
import { useAuthentication } from "../../../../store/providers/auth.provider";


const StyledMain = styled("main")(({ theme }) => ({
  padding: theme.spacing(5, 1),
  minHeight: "100vh",
  background: "#f1f1f1",
  ".paper": {
    padding: theme.spacing(5),
  },
  ".image > img": {
    width: "100%",
    height: "100%",
  },
}));

const GRID_GAP = 2;

const CompanyEditPage: FC = () => {
  const { data, loading, submit } = useCompanyEditBackend<Credentials>();
  const { data: dp, mutate } =
    useAuthBackend<Response<{ dp: string }>>("/profile/dp");
    const { name } = useAuthentication();
  const [credentials, setCredentials] = useState<Credentials>({});
  const { updateError, checkErrors, hasErrors } = useErrors(
    [essential, getCompanyInfo(credentials), otherInfo].flat()
  );

  const { code } = useLanguage();
  const navigate = useNavigate();
  const { addError, addSnack } = useSnackbar();
  const districts = useDistrict(credentials.country);

  useEffect(() => {
    if (data) setCredentials(data);
  }, [data]);
  

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

  const updateProfilePicture =
    (validate: InputField["validator"]) =>
    async (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (validate?.(file) && file) {
        const res = await profileService.profilePicUpload(file);
        if (res.success)
          addSnack?.({ severity: "success", message: "Successfully Uploaded" });
        return mutate(
          { success: res.success, result: { dp: res.dp } },
          { revalidate: true }
        );
      }
      addError?.("Entered File is invalid");
    };

  const submitData = async () => {
    try {
      checkErrors(credentials);
      await submit(credentials, undefined, () => navigate("/"));
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  useEffect(() => {
  
      setCredentials((prev) => ({...prev,company_name: name ?? credentials?.company_name}))
    
  },[name])

  if (loading)
    return (
      <StyledMain>
        <Loader />
      </StyledMain>
    );
  return (
    <StyledMain>
      <Container>
        <Stack spacing={3}>
          {/* <SubmitButton onClick={submitData} style={{ alignSelf: "flex-end" }}>
            Save Changes
          </SubmitButton> */}
          <StyledPaper elevation={0}>
            <Stack
              spacing={2}
              direction={{ md: "row", xs: "column" }}
              alignItems="flex-start"
            >
              <Badge
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                badgeContent={
                  <InputLabel
                    htmlFor={PROFILE_PICTURE_ID}
                    style={{
                      backgroundColor: grey["700"],
                      bottom: 30,
                      right: 30,
                      aspectRatio: "1 / 1",
                      padding: ".5rem",
                      borderRadius: "50%",
                    }}
                  >
                    <Add fontSize="large" htmlColor="#fff" />
                  </InputLabel>
                }
              >
                <Avatar
                  style={{ height: 200, width: 200 }}
                  src={profileService.getProfilePic(dp?.result.dp)}
                >
                  jobwomen
                </Avatar>
              </Badge>
              <Grid container spacing={GRID_GAP}>
                {essential.map((input) => {
                  const hasError = hasErrors(input.name);
                  return (
                    <Grid item xs={12} md={input.column ?? 12} key={input.name}>
                      <FormInput
                        {...input.props}
                        error={hasError}
                        input={input}
                        onChange={updateCredentials(
                          input.name,
                          input.validator
                        )}
                        value={credentials?.[input.name] ??  ""}
                        helperText={
                          hasError ? errorHelps[input.name]?.[code] : ""
                        }
                        style={{ background: grey["100"] }}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            </Stack>
          </StyledPaper>
          <StyledPaper elevation={0}>
            <Grid container spacing={GRID_GAP}>
              {getCompanyInfo(credentials, districts).map((input) => {
                const hasError = hasErrors(input.name);
                return (
                  <Grid item xs={12} md={input.column ?? 12} key={input.name}>
                    <FormInput
                      {...input.props}
                      error={hasError}
                      input={input}
                      value={credentials?.[input.name] ?? ""}
                      onChange={updateCredentials(input.name, input.validator)}
                      style={{ background: grey["100"] }}
                      helperText={
                        hasError ? errorHelps[input.name]?.[code] : ""
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </StyledPaper>

          <StyledPaper elevation={0}>
            <Grid container spacing={GRID_GAP}>
              {otherInfo.map((input) => {
                const hasError = hasErrors(input.name);
                return (
                  <Grid item xs={12} md={input.column ?? 12} key={input.name}>
                    <FormInput
                      {...input.props}
                      error={hasError}
                      input={input}
                      value={credentials?.[input.name] ?? ""}
                      onChange={updateCredentials(input.name, input.validator)}
                      style={{ background: grey["100"] }}
                      helperText={
                        hasError ? errorHelps[input.name]?.[code] : ""
                      }
                    />
                  </Grid>
                );
              })}
            </Grid>
          </StyledPaper>

          <TextField
            {...profilePic.props}
            name={profilePic.name}
            onChange={updateProfilePicture(profilePic.validator)}
          />

          <SubmitButton onClick={submitData} sx={{ alignSelf: "flex-end" }}>
            Save Changes
          </SubmitButton>
        </Stack>
      </Container>
    </StyledMain>
  );
};

export default CompanyEditPage;
