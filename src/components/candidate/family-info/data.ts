import {
  DATA_ALIVE_STATUS,
  DATA_MARITAL_STATUS,
} from "../../../constants/input-data";
import {
  Credentials,
  ErrorHelps,
  ExtendedInputField,
  InputField,
} from "../../../utils/auth-types";
import selectInput from "../../select-input";

export const getInputs = (credentials: Credentials) => {
  const isMarried = !!(
    DATA_MARITAL_STATUS.find(
      // @ts-ignore
      (status) => status.id === credentials.marital_status
    )?.label === "Married"
  );

  const inputs: ExtendedInputField[] = [
    {
      name: "ref_name",
      props: { label: "Reference's Name" },
      validator: () => true,
    },
    {
      name: "ref_post",
      props: { label: "Reference's Post" },
      validator: () => true,
    },
   
    {
      name: "ref_company",
      props: { label: "Reference's Company" },
      validator: () => true,
    },
   
  ];
  return inputs;
};

export const booleans: InputField[] = [
 
];

export const errorHelps: ErrorHelps = {};
