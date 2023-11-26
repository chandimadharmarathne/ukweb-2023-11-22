import React, { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Checkout from "../../../../components/checkout-page";
import { getPaymentTypes } from "../../../../components/checkout-page/data";
import { useAuthBackend } from "../../../../hooks/backend";
import * as adService from "../../../../services/ad-service";
import { useSnackbar } from "../../../../store/providers/snackbar.provider";
import { currencyFormat } from "../../../../utils/formatters/currency-format";
import { Response } from "../../../../utils/utils.types";

interface BuyPackageProps {}

const BuyPackage: FC<BuyPackageProps> = () => {
  const { invoice_id } = useParams();
  const navigate = useNavigate();
  const { addError, addSnack } = useSnackbar();
  const { data } = useAuthBackend<Response<{ pkg_price: number }>>(
    ["/packages/pricing", invoice_id],
    { params: { invoice_id } }
  );

  const makePayment = async (type: any, data: any) => {
    if (type === adService.PaymentTypes.CARD) {
      await adService.pay({ invoice_id }, "/packages/payment/card");
      return;
    }

    if (type === adService.PaymentTypes.BANK) {
      const { success } = await adService.payWithReciept(
        { invoice_id, reciept: data[type] },
        "/packages/payment/bank"
      );
      if (success) {
        return addSnack?.({
          message: "Successfully Uploaded",
          severity: "success",
        });
      }
    }
    // if (res.success)
    //   addSnack?.({
    //     message: res.result,
    //     severity: "success",
    //   });
  };

  return (
    <Checkout
      title="Buy Package"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum facilisis leo vel"
      paymentTypes={getPaymentTypes(
        adService.PaymentTypes.BANK,
        adService.PaymentTypes.CARD
      )}
      price={currencyFormat(data?.result.pkg_price ?? 0)}
      onPay={makePayment}
    />
  );
};

export default BuyPackage;
