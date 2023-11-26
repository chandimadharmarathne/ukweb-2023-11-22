import { Diamond, Favorite, Share } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import * as React from "react";
import { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isCandidateCard, MiniCardProps, MiniCardProps1, StyledPaper } from ".";
import { AdType, DATA_ADVERTISEMENT_TYPES } from "../../constants/input-data";
import * as adService from "../../services/ad-service";
import * as profileService from "../../services/profile-service";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { DATA_INDUSTRY, getJobTitle } from "../find-job/sections/industry.data";
import { Verified } from "../verify-profile";
import { getCandidateMetaInfo, getJobMetaInfo, getJobMetaInfo1 } from "./meta-info";
import Swal from "sweetalert2";

const CompanyCard: FC<MiniCardProps1> = ({ card1 }) => {
  const { code } = useLanguage();
  const isCandidate = isCandidateCard(card1);
  const info =  getJobMetaInfo1(card1);
  const { addSnack } = useSnackbar();
  const { role } = useAuthentication();
  const navigate = useNavigate();
const [isSaved, setIsSaved] = React.useState(false);
  //console.log("role", role, isCandidate);

  const saveAd = async () => {
    try {
      const res = await adService.save(card1.id);
      if (res.success) {
        addSnack?.({
          severity: "success",
          message: "Ad Saved",
        });
        setIsSaved(true);
      }
    } catch (error: any) {
      addSnack?.({
        severity: "error",
        message: error.message,
      });
    }
  };

  const shareAd = async () => {
    if (isCandidate) {
      await navigator.share({
        title: card1.candidate_name,
        url: `/candidate/${card1.id}`,
      });
    } else {
      await navigator.share({
        title: card1.company_name,
        url: `/job/${card1.id}`,
      });
    }
  };
  return (
    <Card
      aria-role="region"
      aria-labelledby={String(card1.id)}
      sx={{
        mt: 1,
        position: "relative",
        borderColor: (theme) =>
          card1.advertisement_type === AdType.Home
            ? theme.palette.primary.main
            : "transparent",
        borderWidth: 2,
        borderStyle: "solid",
      }}
    >
      <Stack direction="row" spacing={2}>
        <Box
          style={{ aspectRatio: "1 / 1" }}
          sx={{
            width: "100%",
            maxWidth: { xs: "75px", sm: "200px" },
            minWidth: { xs: "50px" },
            maxHeight: { xs: "75px", sm: "200px" },
            minHeight: { xs: "50px" },
            m: 1,
          }}
        >
          <Link
            style={{ display: "contents" }}
            to={isCandidate ? `/candidate/${card1.id}` : `/job/${card1.id}`}
          >
            <CardMedia
              sx={{
                borderRadius: 3,
                width: "100%",
                height: "100%",
              }}
              component="img"
              alt={isCandidate ? card1.candidate_name : card1.company_name}
              src={ profileService.getProfilePic(card1.dp)
              
              }
            />
          </Link>
        </Box>
        <Stack spacing={1} sx={{ flex: 4 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: { xs: 1, sm: 4 },
            }}
          >
            <Box>
              <Link
                style={{ display: "contents" }}
                to={isCandidate ? `/candidate/${card1.id}` : `/job/${card1.id}`}
              >
                <Typography
                  variant="h3"
                  id={String(card1.id)}
                  color="secondary"
                  sx={(theme) => ({
                    [theme.breakpoints.down("md")]: {
                      fontSize: 20,
                    },
                    [theme.breakpoints.down("sm")]: {
                      whiteSpace: "nowrap",
                      maxWidth: "15ch",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    },
                  })}
                >
                  {card1.name}
                </Typography>
              </Link>
              <Typography variant="caption" color={grey["600"]}>
                {dateFormat(card1.timestamp, { dateStyle: "long" })}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", mr: 1 }}>
              <Box>
                <IconButton
                  title="Save ad"
                  aria-label="Save ad"
                  onClick={saveAd}
                >
                  <Favorite color={isSaved ? "success":"disabled"} />
                </IconButton>
              </Box>
              <Box>
                <IconButton
                  title="Share this job"
                  aria-label="Share this job"
                  onClick={shareAd}
                >
                  <Share color="disabled" />
                </IconButton>
              </Box>
            </Box>
          </Box>
          

          
        </Stack>
      </Stack>
      <Link
        style={{ display: "contents" }}
        to={isCandidate ? `/candidate/${card1.id}` : `/job/${card1.id}`}
      >
        <CardContent>
          <Stack spacing={1}>
            <Grid container rowSpacing={1} columnSpacing={0}>
              {info.map((record, i) => (
                <Grid item key={i} md={3} sm={4} xs={4}>
                  <Stack direction="row" spacing={0.5}>
                    <record.icon color="primary" fontSize="small" />
                    <Typography
                      fontSize={{ xs: 12, sm: 16 }}
                      color="secondary"
                      fontWeight={400}
                      sx={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "20ch",
                      }}
                    >
                      {record.label ?? "Invalid"}
                    </Typography>
                  </Stack>
                </Grid>
              ))}
            </Grid>
            <CardActions
              disableSpacing
              sx={{
                flexDirection: "row-reverse",
                justifyContent: "space-between",
              }}
            >
              
                <Button
                  component={Link}
                  to={`/company/${card1.id}`}
                  onClick={() => {
                   
                  }}
                >
                  View Company
                  {/* {!(role === "candidate" )? "Apply Now" : "View Job"} */}
                </Button>
          

              {DATA_ADVERTISEMENT_TYPES.find(
                (ad) => ad.id === card1.advertisement_type
              )?.paid && (
                <Tooltip title="Featured" arrow>
                  <Diamond htmlColor="#FF0000" />
                </Tooltip>
              )}
            </CardActions>
          </Stack>
        </CardContent>
      </Link>
    </Card>
  );
};

export default CompanyCard;
