import { Diamond, MoreVert } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import React, { FC, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { isCandidateCard, MiniCardProps, StyledPaper } from ".";
import { AdType, DATA_ADVERTISEMENT_TYPES } from "../../constants/input-data";
import * as profileService from "../../services/profile-service";
import { useLanguage } from "../../store/providers/lang.provider";
import { dateFormat } from "../../utils/formatters/date-format";
import { ActionType } from "../../utils/utils.types";
import { DATA_INDUSTRY, getJobTitle } from "../find-job/sections/industry.data";
import { Verified } from "../verify-profile";
import { getCandidateMetaInfo, getJobMetaInfo } from "./meta-info";
import { adPrivatePublic } from "../../services/ad-service";

const MiniCard: FC<
  MiniCardProps & { actions?: ActionType[]; showButtons?: boolean }
> = ({ card, actions, showButtons = true }) => {
  const { code } = useLanguage();
  const isCandidate = isCandidateCard(card);
  const info = isCandidate ? getCandidateMetaInfo(card) : getJobMetaInfo(card);
  const hasImage = isCandidate ? !!card.display_picture : !!card.cover;
  const [visible, setVisible] = useState(card.visibile);
  return (
    <Card
      aria-labelledby={String(card.id)}
      style={{ maxWidth: 400 }}
      sx={{
        borderColor: (theme) =>
          card.advertisement_type === AdType.Home
            ? theme.palette.primary.main
            : "transparent",
        borderWidth: 2,
        borderStyle: "solid",
      }}
    >
      <Link
        style={{ display: "contents" }}
        to={isCandidate ? `/candidate/${card.id}` : `/job/${card.id}`}
      >
        <CardMedia
          sx={{
            objectFit: hasImage ? "cover" : "contain",
            maxHeight: 250,
            padding: !hasImage ? "5rem" : 0,
            aspectRatio: "4/3",
            bgcolor: (theme) =>
              !hasImage ? theme.palette.primary.main : undefined,
          }}
          height={200}
          width={350}
          alt={isCandidate ? card.candidate_name : card.company_name}
          component="img"
          src={
            (isCandidate
              ? profileService.getProfilePic(card.display_picture)
              : profileService.getAdCover(card.cover)) ??
            "/assets/logo-text.png"
          }
        />
      </Link>

      <CardContent style={{ position: "relative" }}>
        {actions?.length && <Actions actions={actions} />}
        <Stack spacing={1}>
          <Link
            style={{ display: "contents" }}
            to={isCandidate ? `/candidate/${card.id}` : `/job/${card.id}`}
          >
            <Typography
              variant="h3"
              color="secondary"
              maxWidth="20ch"
              id={String(card.id)}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {isCandidate ? card.candidate_name : card.job_title_description}
              <Verified verified={!!card.badge} />
            </Typography>
          </Link>
          <Typography variant="subtitle1" color={grey["600"]}>
            {dateFormat(card.published_on, { dateStyle: "long" })}
          </Typography>
          {isCandidate && (
            <Typography>
              Looking for job as{" "}
              <Typography
                fontWeight="700"
                color="primary"
                component="span"
                display="inline"
              >
                {getJobTitle(card.industry, card.job_title, code)}
              </Typography>
            </Typography>
          )}

          <StyledPaper elevation={0}>
            <Typography variant="subtitle1">
             
            </Typography>
          </StyledPaper>

          <Grid container rowSpacing={1} columnSpacing={0}>
            {info.map((record, i) => (
              <Grid item key={i} xs={6}>
                <Stack direction="row" spacing={2}>
                  <record.icon color="primary" />
                  <Typography
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
              justifyContent: "space-between",
              flexDirection: showButtons ? "row-reverse" : "row",
            }}
          >
            {showButtons &&
              (isCandidate ? (
                <Button component={Link} to={`/candidate/${card.id}`}>
                  View Profile
                </Button>
              ) : (
                <Button component={Link} to={`/job/${card.id}`}>
                  Apply Now
                </Button>
              ))}
            {DATA_ADVERTISEMENT_TYPES.find(
              (ad) => ad.id === card.advertisement_type
            )?.paid && (
              <Tooltip title="Featured" arrow>
                <Diamond htmlColor="#FF0000" />
              </Tooltip>
            )}
            <div>
              
              <Checkbox  checked={visible === 0 ?  true :false}  onChange={async (e) =>{
              let checked = e.target.checked;
              let value = checked ? 0 : 1;
              let res  = await adPrivatePublic(card.id, value);

              if(res.success){
                card.visibile = value;
                setVisible(value)
              }

            }}   />
            <label>{card.visibile === 0 ? "Public":"Private"}</label>
            </div>
          </CardActions>
        </Stack>
      </CardContent>
    </Card>
  );
};

const Actions: FC<{ actions: ActionType[] }> = ({ actions }) => {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((prev) => !prev);

  const morebutton = useRef<HTMLButtonElement>(null);
  return (
    <>
      <IconButton
        ref={morebutton}
        onClick={toggle}
        style={{ position: "absolute", right: 0, margin: "-5px 10px" }}
      >
        <MoreVert />
      </IconButton>

      <Menu
        open={open}
        anchorEl={morebutton.current}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
        onClose={toggle}
      >
        {actions?.map((action, i) => (
          <MenuItem key={i} onClick={action.onClick}>
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
export default MiniCard;
