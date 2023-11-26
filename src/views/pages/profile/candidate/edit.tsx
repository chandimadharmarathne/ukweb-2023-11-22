import { Container, Stack, styled } from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { ChangeEvent, FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import CandidateDesktop from "../../../../components/candidate/desktop-view";
import CandidateMobile from "../../../../components/candidate/mobile-view";
import { StyledPaper } from "../../../../components/styled-common/paper";
import SubmitButton from "../../../../components/submit-button";
import { AdType } from "../../../../constants/input-data";
import { useToggle } from "../../../../hooks/toggle.hook";
import * as adService from "../../../../services/ad-service";
import { useMobile } from "../../../../store/providers/mobile-to-desktop-change.provider";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { types } from "../../post-ad";
import SelectAdType from "../../post-ad/select-ad-type";

const StyledPage = styled("main")(({ theme }) => ({
  background: grey["100"],
  ".toggle": {
    padding: theme.spacing(2),
  },

  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(3),
  },
}));

const CandidateEdit: FC = () => {
  const isMobile = useMobile();
  const [adType, setAdType] = useState<number>();
  const [showAdSelect, toggleShowAdSelect] = useToggle();
  const navigate = useNavigate();
  const { addSnack, addError } = useSnackbar();

  const onChangeType = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setAdType(parseInt(value));
  };
  const postAd = async () => {
    try {
      const res = await adService.postCandidateAd(adType);
      if (res.success) {
        toggleShowAdSelect();
        if (adType !== AdType.Free) {
          navigate(
            `/post-ad/${types.find((type) => type.id === adType)?.link}/${
              res.result?.invoiceId
            }`
          );
        } else {
          addSnack?.({
            severity: "success",
            message: "Ad successfully posted",
          });
        }
      }
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  return (
    <StyledPage>
      <Container>
        <Stack spacing={3}>
          <SubmitButton
            sx={{ alignSelf: "flex-end" }}
            onClick={toggleShowAdSelect}
          >
            Post as advertisement
          </SubmitButton>

          <SelectAdType
            type={adType}
            open={showAdSelect}
            onClose={toggleShowAdSelect}
            onSubmit={postAd}
            onTypeChange={onChangeType}
          />

          <StyledPaper elevation={0}>
            {isMobile ? (
              <CandidateMobile togglePostAdPopup={toggleShowAdSelect} />
            ) : (
              <CandidateDesktop togglePostAdPopup={toggleShowAdSelect} />
            )}
          </StyledPaper>
        </Stack>
      </Container>
    </StyledPage>
  );
};

export default CandidateEdit;
