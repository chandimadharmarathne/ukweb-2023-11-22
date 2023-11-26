import { Diamond, Favorite, MoreHoriz, MoreVert, Share } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Icon,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import SendIcon from '@mui/icons-material/Send';
import * as React from "react";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isCandidateCard, MiniCardProps, StyledPaper } from ".";
import { AdType, DATA_ADVERTISEMENT_TYPES } from "../../constants/input-data";
import * as adService from "../../services/ad-service";
import * as profileService from "../../services/profile-service";
import { useAuthentication } from "../../store/providers/auth.provider";
import { useLanguage } from "../../store/providers/lang.provider";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { DATA_INDUSTRY, getJobTitle } from "../find-job/sections/industry.data";
import { Verified } from "../verify-profile";
import { getCandidateMetaInfo, getJobMetaInfo } from "./meta-info";
import Swal from "sweetalert2";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import MessageIcon from '@mui/icons-material/Message';
import LaunchIcon from '@mui/icons-material/Launch';
import CvModal from "./cvModals";
import { NULL } from "sass";

let icons = [
  <SendIcon color='primary' />,
  <GroupAddIcon color="error" />,
  <MessageIcon color="secondary" />


]
const JobCard: FC<MiniCardProps> = ({ card }) => {
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState({})
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setIsOpen(true)
    setSelectedJob(card)
    setAnchorEl(null)
  };

  //   const { code } = useLanguage();
  //   const isCandidate = isCandidateCard(card);
  //   const info = isCandidate ? getCandidateMetaInfo(card) : getJobMetaInfo(card);
  //   const { addSnack } = useSnackbar();
  //   const { role } = useAuthentication();
  //   const navigate = useNavigate();
  // const [isSaved, setIsSaved] = React.useState(false);
  //console.log("role", role, isCandidate);

  // const saveAd = async () => {
  //   try {
  //     const res = await adService.save(card.id);
  //     if (res.success) {
  //       addSnack?.({
  //         severity: "success",
  //         message: "Ad Saved",
  //       });
  //       setIsSaved(true);
  //     }
  //   } catch (error: any) {
  //     addSnack?.({
  //       severity: "error",
  //       message: error.message,
  //     });
  //   }
  // };

  // const shareAd = async () => {
  //   if (isCandidate) {
  //     await navigator.share({
  //       title: card.candidate_name,
  //       url: `/candidate/${card.id}`,
  //     });
  //   } else {
  //     await navigator.share({
  //       title: card.company_name,
  //       url: `/job/${card.id}`,
  //     });
  //   }
  // };
  return (
    <>
      <CvModal data1={selectedJob} isOpen={isOpen} onRequestClose={() => {
        setIsOpen(false)
      }} />
      <Card
        aria-role="region"
        aria-labelledby={String(card.id)}
        sx={{

          mt: 1,
          position: "relative",
          borderColor: 'black',
          borderWidth: 2,
          borderStyle: "solid",
          boxShadow: '-moz-initial',
          backgroundColor: 'white',
          width: isMobile ? undefined : 400

        }}
      >

        <Stack direction={"row"} style={{
          justifyContent: 'space-between'

        }}>
          <Link
            style={{ display: "contents" }}
            // to={ `/job/${card.id}`}
            to={"#"}
          >
            <Typography
              variant="h5"
              id={String(card.id)}
              color="secondary"
              style={{
                margin: 10,
                fontWeight: 'bold'
                //textDecoration:'underline'
              }}
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

              {card.job_key[0].toLocaleUpperCase() + card.job_key.slice(1)}{" "}
            </Typography>
          </Link>
          <div>
            <IconButton
              aria-controls="menu"
              aria-haspopup="true"
              onClick={handleClick}
              style={{
                marginTop: 15,
              }}
            >
              <MoreVert />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}><IconButton style={{
                paddingRight: 3,
                fontSize: 16,
              }} >
                Apply 
                <LaunchIcon />

              </IconButton></MenuItem>

            </Menu>
          </div>
        </Stack>
        <Typography
          variant="body1"
          id={String(card.id)}
          color="secondary"
          style={{
            marginLeft: 15,
            marginTop: -10

          }}
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

          {card.company_name[0].toLocaleUpperCase() + card.company_name.slice(1)}{" "}
        </Typography>
        <Typography
          variant="body1"
          id={String(card.id)}
          color="secondary"
          style={{
            marginLeft: 15,
            marginTop: 0,
            //textAlign:isMobile ? 'center':'left'
          }}
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

          {card.location[0].toLocaleUpperCase() + card.location.slice(1)}{" "}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={5} sm={6}>

            <Typography style={{ textAlign: 'center' }} variant="subtitle1" fontSize={{ xs: 12, sm: 16 }}>
              {card?.price_range}
            </Typography>

          </Grid>
          <Grid item xs={5} sm={6}>

            <Typography style={{ textAlign: 'center' }} variant="subtitle1" fontSize={{ xs: 12, sm: 16 }}>
              {card?.roster}
            </Typography>

          </Grid>
          <Grid item xs={5} sm={6}>

            <Typography style={{ textAlign: 'center' }} variant="subtitle1" fontSize={{ xs: 12, sm: 16 }}>
              {card?.date_range}
            </Typography>

          </Grid>
          {
            card?.required_doc?.map((item: any) => (
              <Grid item xs={5} sm={6}>

                <Typography style={{ textAlign: 'center' }} variant="subtitle1" fontSize={{ xs: 12, sm: 16 }}>
                  {item}
                </Typography>

              </Grid>
            ))
          }
          {
            card?.features?.map((item: any, index: any) => (
              <Grid item xs={4} sm={4} style={{
                display: 'flex',

                justifyContent: 'center',
                alignItems: 'center',

              }} >


                <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', justifyContent: 'center' }}>

                  <Tooltip title={item}>
                    <Icon style={{ marginRight: isMobile ? '0px' : '5px' }}>{icons[index]}</Icon>
                  </Tooltip>
                  <Typography style={{
                    textAlign: isMobile ? 'center' : 'justify'
                  }} variant="body2" fontSize={{ xs: 12, sm: 13 }}>
                    {item}
                  </Typography>

                </div>



              </Grid>
            ))
          }

        </Grid>


        <ul>
          {
            card?.main_points?.map((item: any) => (
              <li>
                {item}
              </li>
            ))
          }
        </ul>

        <Typography variant="body2" fontSize={{ xs: 12, sm: 13 }} style={{ display: 'flex', alignItems: 'center', marginLeft: 2 }}>
          Posted {card?.published_on}+  days ago
        </Typography>
        <CardActions style={{ justifyContent: 'flex-end' }}>
          <Button variant="text" fullWidth>
            Apply on company site
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default JobCard;
