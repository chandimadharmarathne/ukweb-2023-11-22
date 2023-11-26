import { Container, Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Main } from "../../../components/styled-common/main";
import Tile from "../../../components/tile";
import { UserType } from "../../../constants/input-data";
import { useAuthBackend } from "../../../hooks/backend";
import { getProfilePic } from "../../../services/profile-service";
import { dateFormat } from "../../../utils/formatters/date-format";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";

interface ProfileViewedProps {}

const ProfileViewed: FC<ProfileViewedProps> = () => {
  const { data, loading } =
    useAuthBackend<Response<Result[]>>("/profile/views");

  const navigate = useNavigate();
  const view = (id: any, type: UserType) => () => {
    if (type === UserType.CANDIDATE) return navigate(`/candidate/${id}`);
    if (type === UserType.EMPLOYER) return navigate(`/company/${id}`);
  };

  return (
    <Main>
      <Container>
        <Loader loading={loading} />
        <Paper elevation={0} className="paper">
          <Typography variant="h1" color="primary">
            People who viewed your profile
          </Typography>

          {/* <Typography textAlign="right" color="secondary" paddingBottom={2}>
            Showing 1 - 5 of 1366 requests
          </Typography> */}

          <Stack spacing={1}>
            {data?.result.map((req) => (
              <Tile
                avatar={getProfilePic(req.dp)}
                key={req.id}
                hideButtonsOnDesktop={false}
                records={[
                  { content: req.user_name },
                  { title: "Viewed on", content: dateFormat(req.timestamp) },
                ]}
                buttons={[
                  { label: "View Profile", onClick: view(req.user, req.role) },
                ]}
              />
            ))}
          </Stack>
        </Paper>
      </Container>
    </Main>
  );
};
export interface Result {
  id: number;
  user: number;
  user_name: string;
  dp: string;
  timestamp: string;
  role: UserType;
}
export default ProfileViewed;
