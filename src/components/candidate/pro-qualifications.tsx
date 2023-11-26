import { Checkbox, FormControlLabel, Stack } from "@mui/material";
import React, { useState } from "react";
import { FULL_NAME_REGEX } from "../../constants/regex";
import useCandidateBackend from "../../hooks/candidate-edit.hook";
import { useSnackbar } from "../../store/providers/snackbar.provider";
import {
  CustomComponentProps,
  ErrorHelps,
  ExtendedInputField,
} from "../../utils/auth-types";
import Loader from "../../views/loader/Loader";
import DatePicker from "../date-pick";
import SubmitButton from "../submit-button";
import { Page } from "./edit.data";
import Repeater, { BlockType } from "./repeat-block";

const ProQualifications: Page = ({ id, updateCompleted }) => {
  const defaults = {
    title: null,
    company: null,
    from: null,
    to: null,
    is_working: false,
  };
  const { addError } = useSnackbar();
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const { data, loading, submit } = useCandidateBackend<{ data: BlockType[] }>(
    id
  );

  const submitForm = async () => {
    try {
      
      await submit({
        data: blocks.map((block) => ({ ...defaults, ...block })),
      });
      updateCompleted(true);
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  if (loading) return <Loader />;

  return (
    <Stack>
      <Repeater
        inputs={inputs}
        errorHelps={errorHelps}
        blockTitle={(block) => `${block.title} - ${block.company}`}
        onChange={setBlocks}
        defaultBlocks={data?.data.map((block) => ({
          ...block,
          key: Math.random(),
        }))}
      />


      <SubmitButton onClick={submitForm} sx={{ alignSelf: { sm: "flex-end" } }}>
        Save Changes
      </SubmitButton>
    </Stack>
  );
};

const inputs: ExtendedInputField[] = [
  {
    name: "title",
    validator: (title) => {
      if(title?.length === 0){
        return true
      }
      else{
        return FULL_NAME_REGEX.test(title)
      }
    },
    props: {  label: "Title" },
  },
  {
    name: "company",
    validator: (company) => {
      if(company?.length === 0){
        return true
      }
      else{
        return FULL_NAME_REGEX.test(company)
      }
    },
    props: {  label: "Company" },
  },
  {
    name: "from",
    validator: () => true,
    column: 4,
    props: { label: "From", type: "date" },
    CustomComponent: ({
      onChange,
      label,
      value,
      required,
    }: CustomComponentProps) => {
      return (
        <DatePicker
          required={false}
          label={label}
          value={value}
          onChange={(value) => onChange({ target: { value } })}
        />
      );
    },
  },
  {
    name: "to",
    validator: () => true,
    column: 4,
    props: { label: "To", type: "date" },
    CustomComponent: ({ onChange, label, value }: CustomComponentProps) => {
      return (
        <DatePicker
          label={label}
          value={value}
          onChange={(value) => onChange({ target: { value } })}
        />
      );
    },
  },

  // {
  //   name: "Responsibilities",
  //   validator: () => true,
  //   column: 4,
  //   props: { label: "Responsibilities" },
  //   CustomComponent: ({ onChange, label, value }: CustomComponentProps) => {
  //     return (
  //      <Repeater  
  //       inputs={value}
  //       errorHelps={errorHelps}
  //       blockTitle={(block) => `${block.title} - ${block.company}`}
  //       onChange={
  //         (value) => onChange({ target: { value } })
  //       }
  //       defaultBlocks={value?.map((block:any) => ({
  //         ...block,
  //         key: Math.random(),
  //       }))}
  //       />
  //     );
  //   }
  // },
  {
    name: "is_working",
    validator: () => true,
    column: 4,
    props: { label: "Currently working here", defaultChecked: false },
    CustomComponent: ({
      onChange,
      label,
      name,
      value,
    }: CustomComponentProps) => (
      <FormControlLabel
        label={String(label)}
        control={<Checkbox checked={!!value} />}
        name={name}
        onChange={(_, checked) => onChange?.({ target: { value: checked } })}
      />
    ),
  },
];

const errorHelps: ErrorHelps = {};
export default ProQualifications;
