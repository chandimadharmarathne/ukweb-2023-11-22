import React, { FC, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const HomeAdPage: FC = () => {
  const { invoice_id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useAuthBackend<
    Response<{
      type: number;
      price: number;
    }>,
    Error
  >("/advertisement/pricing", {
    params: { type: AdType.Home },
  });

  const { role } = useAuthentication();
  const { addSnack, addError } = useSnackbar();

  useEffect(() => {
    if (error) addError?.(error?.message);
  }, [error]);

  const makePayment = async (type: any, data: any) => {
    if (type === adService.PaymentTypes.CARD) {
      return await adService.pay({
        invoice_id,
        advertisement_type: AdType.Home,
      });
    }

    if (type === adService.PaymentTypes.BANK) {
      const res = await adService.payWithReciept({
        invoice_id,
        reciept: data[type],
        advertisement_type: AdType.Home,
      });
      return addSnack?.({ severity: "success", message: res.result });
    }

    if (type === adService.PaymentTypes.PACKAGE) {
      const res = await adService.payWithPackage({
        invoice_id,
        pkg_purchase_id: data[type],
        advertisement_type: AdType.Top,
      });
      return addSnack?.({ severity: "success", message: res.result });
    }
  };
  if (loading) return <Loader />;
  return (
    <Checkout
      title="Make Home Ad"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel"
      paymentTypes={getPaymentTypesForRole(role)}
      price={currencyFormat(data?.result.price ?? 0)}
      onPay={makePayment}
    />
  );
};

export default HomeAdPage;
