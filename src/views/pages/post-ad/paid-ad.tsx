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

interface FreeAdPageProps {}

const PaidAdPage: FC<FreeAdPageProps> = () => {
  const { invoice_id } = useParams();
  const { data, loading, error } = useAuthBackend<
    Response<{
      type: number;
      price: number;
    }>,
    Error
  >("/advertisement/pricing", {
    params: { type: AdType.Paid },
  });

  const { addSnack, addError } = useSnackbar();
  const { role } = useAuthentication();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) addError?.(error?.message ?? "Unknown error");
  }, [error]);

  const makePayment = async (type: any, data: any) => {
    if (type === adService.PaymentTypes.CARD) {
      return await adService.pay({
        invoice_id,
        advertisement_type: AdType.Paid,
      });
    }

    if (type === adService.PaymentTypes.BANK) {
      const res = await adService.payWithReciept({
        invoice_id,
        reciept: data[type],
        advertisement_type: AdType.Paid,
      });

      addSnack?.({ severity: "success", message: res.result });
      return;
    }

    if (type === adService.PaymentTypes.PACKAGE) {
      const res = await adService.payWithPackage({
        invoice_id,
        pkg_purchase_id: data[type],
        advertisement_type: AdType.Top,
      });
      addSnack?.({ severity: "success", message: res.result });
      return;
    }
  };

  if (loading) return <Loader />;
  return (
    <Checkout
      title="Make Paid Ad"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel"
      paymentTypes={getPaymentTypesForRole(role)}
      price={currencyFormat(data?.result.price ?? 0)}
      onPay={makePayment}
    />
  );
};

export default PaidAdPage;
