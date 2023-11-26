import { Container, Grid, Typography } from "@mui/material";
import React, { FC } from "react";
import PackageCard, { MyPackage } from "../../../components/package-card";
import { Main } from "../../../components/styled-common/main";
import { useAuthBackend } from "../../../hooks/backend";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";

interface MyPackagesProps {}

const MyPackages: FC<MyPackagesProps> = () => {
  const { data, loading, error } = useAuthBackend<Response<MyPackage[]>, Error>(
    "/packages/my"
  );
  return (
    <Main>
      <Container>
        <Typography color="primary" variant="h1">
          My Packages
        </Typography>
        <Loader loading={loading} />

        <Grid container spacing={2}>
          {data?.result.map((pkg) => (
            <Grid item md={4} xs={12} key={pkg.pkg_id}>
              <PackageCard
                amount={10}
                type={0}
                price={pkg.pkg_price}
                tag={pkg.pkg_name}
                description={`${pkg.pkg_days_left} Days left`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Main>
  );
};

export default MyPackages;
