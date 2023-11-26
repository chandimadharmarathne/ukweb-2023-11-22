import { authRequest } from "../../utils/Axios";
import { newTab } from "../../utils/new-tab";
import { toFormData } from "../../utils/to-formdata";
import { Response } from "../../utils/utils.types";

export enum PaymentTypes {
  CARD,
  BANK,
  PACKAGE,
}

export const pay = async (data: any, url = "/advertisement/payment/card") => {
  const validate = newTab("pay-window");
  try {
    const res = await authRequest<Response<any>>({
      url,
      method: "POST",
      data: {
        ...data,
        payment_type: PaymentTypes.CARD,
      },
    });

    validate(res?.result?.gateway?.redirect_url);

    return res;
  } catch (error) {
    validate(false);
    throw error;
  }
};

export const payWithReciept = async (
  data: any,
  url = "/advertisement/payment/bank"
) => {
  if (!data.reciept) throw new Error("Reciept not provided");

  const res = await authRequest<Response>({
    url,
    method: "POST",
    data: toFormData({
      ...data,
      payment_type: PaymentTypes.BANK,
    }),
    headers: {
      "Content-Type": "multipart/formdata",
    },
  });
  return res;
};

export const payWithPackage = async (
  data: any,
  url = "/advertisement/payment/package"
) => {
  return await authRequest<Response>({
    url,
    method: "POST",
    data,
  });
};

export interface CardResponse {
  status: number;
  message: string;
  data: Data;
  invoice_id: string;
}

export interface Data {
  ipg_transaction_id: string;
  amount: Amount;
  gateway: {
    redirect_url: string;
  };
}

export interface Amount {
  gross_amount: number;
  discount: number;
  handling_fee: number;
  net_amount: number;
  currency: string;
}
