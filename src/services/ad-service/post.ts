import { Credentials, InputField } from "../../utils/auth-types";
import { authRequest } from "../../utils/Axios";
import { Errors } from "../../utils/errors";
import { toFormData } from "../../utils/to-formdata";
import { Response } from "../../utils/utils.types";
import { Switches } from "../../views/pages/job/[id]";

export const checkInputs = (
  allInputs: InputField[],
  allFilled: { [key: string]: any }
) => {
  const required = allInputs
    .filter((inp) => inp.props?.required)
    .map((inp) => {
      const filledInput = allFilled[inp.name];
      return {
        name: inp.props?.label,
        valid: typeof filledInput !== "undefined",
        inputError: filledInput === Errors.INPUT_ERROR,
      };
    });

  if (!required.every((inp) => inp.valid))
    throw new Error(
      "Required Inputs not provided: " +
        required.filter((inp) => !inp.valid).map((inp) => inp.name)[0]
    );

  const invalid = allInputs.map((inp) => {
    const filledInput = allFilled[inp.name];
    return {
      name: inp.props?.label,
      inputError: filledInput === Errors.INPUT_ERROR,
    };
  });

  if (invalid.some((inp) => inp.inputError))
    throw new Error(
      "Invalid Input: " + invalid.find((inp) => inp.inputError)?.name
    );
};

export interface Result {
  invoiceId: number;
  price: number;
}
type Data = {
  credentials: Credentials<string | number>;
  switches: Switches;
  cover?: File | null;
  id?: string;
  advertisements: File | null;
  other: File | null;
};
export const post = async (
  data: Data,
  advertisement_type?: number,
  editMode = false
) => {
  try {
    const res = await authRequest<Response<Result>>({
      url: "/advertisement",
      method: editMode ? "PATCH" : "POST",
      data: toFormData({
        data: { ...data.credentials, advertisement_type, id: data.id },
        switches: data.switches,
        cover: data.cover,
        advertisements: data.advertisements,
        other: data.other,
      }),
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
export const sendVacancy = async (candidate: number, ad: number) => {
  return await authRequest<Response>({
    url: "/jobs/vacancy",
    method: "POST",
    data: {
      id: candidate,
      advertisement: ad,
    },
  });
};
interface Args {
  apply_id: number;
  user_id: number;
  job_id: number;
  approve: boolean;
}
export const acceptVacancy = async (args: Args) => {
  return await authRequest<Response>({
    url: "/jobs/apply",
    method: "PATCH",
    data: args,
  });
};


export const adPrivatePublic = async (id: number, isPublic: any) => {
  return await authRequest<Response>({
    url: "/advertisment/visibility",
    method: "POST",
    data: {
      id,
      privet: isPublic,
    },
  });
};

export const postCandidateAd = async (advertisement_type?: number,days?:any) => {
  try {
    const res = await authRequest<Response<Result>>({
      url: "/advertisement",
      method: "POST",
      data: {
        advertisement_type,
        days

      },
    });

    return res;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
