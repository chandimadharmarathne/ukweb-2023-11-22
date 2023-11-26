import { Button, Container, Grid, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PackageCard from "../../../components/package-card";
import useBackend from "../../../hooks/backend";
import * as adService from "../../../services/ad-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";

interface PackagesProps {}

const Packages: FC<PackagesProps> = () => {
  const { data, loading, error } = useBackend<Response<Package[]>, Error>(
    "/packages"
  );
  const { token } = useAuthentication();
  const { addError } = useSnackbar();
  const navigate = useNavigate();
  useEffect(() => {
    if (error) addError?.(error?.message ?? "Unknown error");
  }, [error]);

  const buy = (id: any) => async () => {
    if (!token) return navigate("/login");
    try {
      const res = await adService.buy(id);
      navigate(`buy/${res.invoice_id}`);
    } catch (error: any) {
      addError?.(error?.message);
    }
  };

  return (
    <main>
      <Container style={{ paddingBottom: 20 }}>
        <Loader loading={loading} />
        <Typography textAlign="center" variant="h1" color="primary">
          Packages
        </Typography>
        {!!token && (
          <Typography
            sx={{ display: "contents" }}
            component={Link}
            to="my"
            color="primary"
          >
            <Button
              sx={{
                textDecoration: "underline",
                width: "fit-content",
                margin: "auto",
                marginRight: 0,
              }}
            >
              My Packages
            </Button>
          </Typography>
        )}
        <Typography>
          <p>
            <i>jobwomen</i> offers multiple “Ad Packages” for both candidates and
            employers. Both types of users can use those ad packages when and
            where needed for FREE of charge. If they wish, they can go for PAID
            options as well, but it is not compulsory. Our packages are as
            follows:
          </p>
          <p>
            <strong>Top Ads</strong>: Top Ads are only displayed on the “ads
            page” and can use by clicking the “Top Ads” icon.
          </p>
          <p>
            <strong>Paid Ads</strong>: We offer few paid packages. For example,
            currently, we have a package worth Rs. 100/- and it contains 05 paid
            advertisements for a validity period of 10 days. We also offer a
            package containing 15 paid advertisements for Rs. 1000/- with a
            validity of 7 days. Depending on your needs, you are entitled to
            enjoy our paid options. Paid Ads are easily identifiable with the
            diamond icon displayed at the bottom of this option.
          </p>
          <p>
            <strong>Home Ads</strong>: Home Ads are displayed on both the “home
            page” as well as the “ads page” at the top. By clicking on it, you
            are simply allowed to create an “Ad.”
          </p>
          <p>
            The “Free Ads” option allows users to create advertisements free of
            charge at any time they wish.
          </p>
        </Typography>

        <Grid container spacing={2}>
          {data?.result.map((pkg) => (
            <Grid item md={4} xs={12} key={pkg.id}>
              <PackageCard
                amount={pkg.amount}
                type={pkg.type}
                onBuy={buy(pkg.id)}
                price={pkg.price}
                tag={pkg.name}
                features={pkg.details?.map((x) => ({ on: true, title: x }))}
                description={`Valid for ${pkg.duration} Days`}
              />
            </Grid>
          ))}
        </Grid>
        {!data?.result.length && !loading && (
          <Typography variant="h2" paragraph>
            No Packages
          </Typography>
        )}
      </Container>
    </main>
  );
};
export interface Package {
  id: number;
  name: string;
  type: number;
  amount: number;
  duration: number;
  price: number;
  hide: number;
  timestamp: string;
  details: string[];
}
export default Packages;
