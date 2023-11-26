import { Container, styled } from "@mui/material";
import React, { FC, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import slides from "../../../components/candidate/edit.data";
import sections from "../../../components/candidate/public-profile/sections.data";
import { Main } from "../../../components/styled-common/main";
import { StyledPaper } from "../../../components/styled-common/paper";
import Suggesstions from "../../../components/suggesstions";
import { UserType } from "../../../constants/input-data";
import useBackend from "../../../hooks/backend";
import { Profile } from "../../../services/profile-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useLanguage } from "../../../store/providers/lang.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import weirdGredient from "../../../themes/weird-gredient";
import { CustomRequestError } from "../../../utils/Axios";
import { Response } from "../../../utils/utils.types";
import NotFound from "../../errorPages/404";
import Loader from "../../loader/Loader";

const StyledPage = styled("main")(({ theme }) => ({
  padding: theme.spacing(3, 0),
  background: "#F8F8F8",
  zIndex: 1,
  "::before": { ...weirdGredient },
  [theme.breakpoints.down("md")]: {
    textAlign: "center",
  },
  ".avatar": {
    zIndex: 2,
    position: "relative",
    border: "5px solid #fff",
  },
  ".actions > button": {
    background: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
  [theme.breakpoints.down("md")]: {
    ".back-button": {
      position: "absolute",
      margin: "auto",
      width: "fit-content",
      bottom: theme.spacing(-2),
      left: 0,
      right: 0,
    },
    ".actions": {
      position: "absolute",
      top: 0,
      right: 0,
      margin: theme.spacing(1),
    },
  },
}));

const CandidateProfile: FC<{ me?: boolean }> = ({ me }) => {
  const { code } = useLanguage();
  const { id: candidateID } = useParams();
  const [params] = useSearchParams();
  const key = params.get("key");

  const { id: userID,adposted } = useAuthentication();
  const { addSnack } = useSnackbar();

  const id = me ? userID : candidateID;
  const navigate = useNavigate();

  const { data, error, loading } = useBackend<
    Response<Profile>,
    CustomRequestError
  >(["/profile", id], { params: { id } });

  useEffect(() => {
    if (userID === undefined || userID === null)
      addSnack?.({
        severity: "info",
        message: "You need to login to view full profile",
        onClick() {
          navigate("/login");
        },
      });
  }, []);

  if (error?.statusCode === 404) return <NotFound />;
  if (loading)
    return (
      <Main>
        <Loader />
      </Main>
    );

  return (
    <StyledPage>
      <Container style={{ position: "relative" }}>
        {sections.map((section) => {
          const Section = section.page ?? (() => null);
          const params = {
            id,
            token: key,
          };
          const search = new URLSearchParams(
            Object.entries(params).filter(([, value]) => !!value) as string[][]
          ).toString();

          return (
            <Section
              profile={data?.result}
              me={me}
              id={section.id}
              key={section.id}
              url={id ? `${section.id}?${search}` : section.id}
              label={
                slides.find((slide) => slide.id === section.id)?.label?.[code]
              }
            />
          );
        })}
        <StyledPaper>
          <Suggesstions type={UserType.CANDIDATE} amount={3} />
        </StyledPaper>
      </Container>
    </StyledPage>
  );
};

export default CandidateProfile;
