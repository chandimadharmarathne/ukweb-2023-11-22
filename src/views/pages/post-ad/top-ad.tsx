import React, { FC, useEffect } from "react";
import { useParams } from "react-router-dom";
import Checkout from "../../../components/checkout-page";
import { getPaymentTypesForRole } from "../../../components/checkout-page/data";
import { AdType } from "../../../constants/input-data";
import { useAuthBackend } from "../../../hooks/backend";
import * as adService from "../../../services/ad-service";
import { useAuthentication } from "../../../store/providers/auth.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { currencyFormat } from "../../../utils/formatters/currency-format";
import { Response } from "../../../utils/utils.types";
import Loader from "../../loader/Loader";

const TopAdPage: FC = () => {
  const { invoice_id } = useParams();
  const { data, loading, error } = useAuthBackend<
    Response<{
      type: number;
      price: number;
    }>,
    Error
  >("/advertisement/pricing", {
    params: { type: AdType.Top },
  });

  const { addSnack, addError } = useSnackbar();
  const { role } = useAuthentication();

  useEffect(() => {
    if (error) addError?.(error.message);
  }, [error]);

  const makePayment = async (type: any, data: any) => {
    if (type === adService.PaymentTypes.CARD) {
      return await adService.pay({
        invoice_id,
        top_ad_type: data.selectedOption,
        advertisement_type: AdType.Top,
      });
    }

    if (type === adService.PaymentTypes.BANK) {
      const res = await adService.payWithReciept({
        invoice_id,
        top_ad_type: data.selectedOption,
        reciept: data[adService.PaymentTypes.BANK],
        advertisement_type: AdType.Top,
      });
      return addSnack?.({ severity: "success", message: res.result });
    }

    if (type === adService.PaymentTypes.PACKAGE) {
      const res = await adService.payWithPackage({
        invoice_id,
        top_ad_type: data.selectedOption,
        pkg_purchase_id: data[adService.PaymentTypes.PACKAGE],
        advertisement_type: AdType.Top,
      });
      return addSnack?.({ severity: "success", message: res.result });
    }
  };
  if (loading) return <Loader />;

  return (
    <Checkout
      title="Make Top Ad"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel"
      paymentTypes={getPaymentTypesForRole(role)}
      options={topAdTypes}
      price={currencyFormat(data?.result.price ?? 0)}
      onPay={makePayment}
      bannerImg="/assets/top-ad.png"
    />
  );
};

const topAdTypes = [
  { label: "Top up for 7 days", id: "top_7" },
  { label: "Top up for 14 days", id: "top_14" },
  { label: "Top up for 21 days", id: "top_21" },
];

export default TopAdPage;
