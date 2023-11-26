import { Grid, Stack } from "@mui/material";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useErrors } from "../../../hooks/error.hook";
import { useLanguage } from "../../../store/providers/lang.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import {
  Credentials,
  ErrorHelps,
  ExtendedInputField,
  InputField,
} from "../../../utils/auth-types";
import FormInput from "../../input";
import SubmitButton from "../../submit-button";
import Block from "./block";

export type BlockType = Credentials<any> & { key: number };
interface RepeaterProps {
  inputs:
    | ExtendedInputField[]
    | ((_blocks: BlockType[]) => ExtendedInputField[]);
  errorHelps: ErrorHelps;
  onChange?: (_blocks: BlockType[]) => void;
  blockTitle?: (_block: BlockType) => string;
  disableEdit?: boolean;
  defaultBlocks?: BlockType[];
}

const Repeater: FC<RepeaterProps> = ({
  inputs,
  errorHelps,
  onChange,
  blockTitle,
  disableEdit,
  defaultBlocks,
}) => {
  const [blocks, setBlocks] = useState<BlockType[]>(
    () =>
      defaultBlocks?.map((block) => ({ ...block, key: Math.random() })) ?? []
  );
  const { addError } = useSnackbar();
  const [typingData, setTypingData] = useState<Credentials>({});
  const [editMode, setEditMode] = useState({
    key: 0,
    on: false,
  });

  const allInputs = typeof inputs === "function" ? inputs(blocks) : inputs;

  const { code } = useLanguage();
  const { checkErrors, hasErrors, updateError, clearErrors } =
    useErrors(allInputs);

  useEffect(() => {
    onChange?.(blocks);
  }, [blocks]);

  const updateTypingData =
    (name: string, validator: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      updateError(name, validator?.(value));
      setTypingData((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

  const toggleEditMode = (key = 0) =>
    setEditMode((prev) => ({ on: !prev.on, key }));

  const addBlock = () => {
    try {
      checkErrors();

      if (editMode.on) {
        setBlocks((prev) =>
          prev.map((block) =>
            block.key === editMode.key
              ? { ...typingData, key: editMode.key }
              : block
          )
        );
        toggleEditMode();
      } else
        setBlocks((prev) => [
          ...prev,
          {
            ...typingData,
            key: Date.now(),
          },
        ]);
      setTypingData({});
      clearErrors();
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  const onDelete = (key: number | string) => () => {
    setBlocks((prev) => prev.filter((block) => block.key !== key));
    if (editMode.on) setTypingData({});
  };

  const onEdit = (key: number) => () => {
    toggleEditMode(key);
    const block = blocks.find((block) => block.key === key);

    if (block) {
      setTypingData(block);
      for (const key in block) {
        updateError(key, true);
      }
    }
  };
  return (
    <Stack padding={2} spacing={2}>
      <Grid paddingY={2} container spacing={2}>
        {allInputs.map((input) => {
          const hasError = hasErrors(input.name);
          return (
            <Grid item xs={12} md={input.column ?? 12} key={input.name}>
              <FormInput
                input={input}
                error={hasError}
                value={typingData[input.name] ?? ""}
                onChange={updateTypingData(input.name, input.validator)}
                helperText={hasError ? errorHelps[input.name]?.[code] : ""}
              />
            </Grid>
          );
        })}
      </Grid>
      <SubmitButton
        onClick={addBlock}
        variant={editMode.on ? "outlined" : "contained"}
      >
        {editMode.on ? "Update" : "Add"}
      </SubmitButton>

      {blocks?.map((block) => (
        <Block
          editMode={editMode.on}
          text={blockTitle?.(block) ?? "Untitled Block"}
          key={block.key}
          onDelete={onDelete(block.key)}
          onEdit={disableEdit ? undefined : onEdit(block.key)}
        />
      ))}
    </Stack>
  );
};

export default Repeater;
