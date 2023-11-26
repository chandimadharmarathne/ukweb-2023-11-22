import {
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { ALLOWED_FILE_TYPES } from "../../../constants/allowed-files";
import { DATA_EDU_LEVELS } from "../../../constants/input-data";
import useCandidateBackend from "../../../hooks/candidate-edit.hook";
import { useErrors } from "../../../hooks/error.hook";
import { useLanguage } from "../../../store/providers/lang.provider";
import { useSnackbar } from "../../../store/providers/snackbar.provider";
import { Credentials, InputField } from "../../../utils/auth-types";
import { toFormData } from "../../../utils/to-formdata";
import Loader from "../../../views/loader/Loader";
import RelatedDocument from "../../related-document";
import SubmitButton from "../../submit-button";
import { Page } from "../edit.data";
import { Response, Switches } from "../edit.types";
import Repeater, { BlockType } from "../repeat-block";
import { booleans, inputSections, otherInputs } from "./data";
import Section, { SectionType } from "./section";
import { Delete } from "@mui/icons-material";

const EduQualifications: Page = ({ id, updateCompleted }) => {
  const { code } = useLanguage();

  const { data, loading, submit } = useCandidateBackend<
    Response<SectionType | string> & { other: BlockType[] }
  >(id);

  const [basicInputs, setBasicInputs] = useState<Credentials>({});
  const [blocks, setBlocks] = useState<BlockType[]>([]);
  const [sections, setSections] = useState<SectionType>({});
  const [switches, setSwitches] = useState<Switches>({});
  const [docs, setDocs] = useState<{ [key: string]: File }>({});
  const { addError } = useSnackbar();

  const { checkErrors, updateError, hasErrors } = useErrors(
    [
      booleans,
      inputSections
        .map((sec) =>
          sec.inputs?.map((inp) => ({ ...inp, name: sec.id + inp.name }))
        )
        .flat() as InputField[],
    ].flat()
  );

  useEffect(() => {
    if (data) {
      // @ts-ignore
      setSections(data?.data);
      // @ts-ignore
      setBasicInputs(data?.data);
      setSwitches(data.switches);
    }
  }, [data]);

  const onChangeSwitch = (name: string) => (_: SyntheticEvent, on: boolean) => {
    setSwitches((prev) => ({ ...prev, [name]: on }));
  };
  const onEduLevelChange = (
    e: ChangeEvent<HTMLInputElement>,
    value: string
  ) => {
    setBasicInputs((prev) => ({ ...prev, [e.target.name]: value }));
    updateError(
      e.target.name,
      !!DATA_EDU_LEVELS.find((edu) => edu.id === parseInt(value))
    );
  };

  const updateSections =
    (id: string, name: string, validate: InputField["validator"]) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      updateError(id + name, validate?.(value));
      setSections((prev) => ({
        ...prev,
        [id]: {
          ...prev[id],
          [name]: value,
        },
      }));
    };
  const onResultSheetChange =
    (id: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      try {
        const file = e.target.files?.item(0);
        if (file) {
          if (ALLOWED_FILE_TYPES.includes(file.type))
            setDocs((prev) => ({ ...prev, [id]: file }));
          else throw new Error("Invalid File Type");
        }
      } catch (error: any) {
        addError?.(error.message);
      }
    };
  const update = async () => {
    try {
      checkErrors({ ...basicInputs, ...switches, ...sections });
      if (!basicInputs.edu_level)
        throw new Error("Select Highest Education Level");
      // if (!docs.ol && !docs.al && !data?.data.results)
      //   throw new Error("Upload at least one of your education result sheets");
      await submit(
        toFormData({
          data: { ...basicInputs, ...sections },
          switches,
          other: blocks,
          al: docs.al,
          ol: docs.ol,
        }),
        { headers: { "Content-Type": "multipart/formdata" } }
      );
      updateCompleted(true);
    } catch (error: any) {
      addError?.(error.message);
    }
  };
  if (loading) return <Loader />;

  return (
    <Stack paddingX={2}>
      <Section title="Highest Education Level">
        <RadioGroup
          aria-labelledby="Highest Education Level"
          name="edu_level"
          onChange={onEduLevelChange}
          value={basicInputs.edu_level ?? 0}
        >
          <Stack gap={{ xs: 0.2, md: 2 }} direction="row" flexWrap="wrap">
            {DATA_EDU_LEVELS.map((level) => (
              <FormControlLabel
                label={level.label}
                value={level.id}
                control={<Radio />}
                key={level.id}
              />
            ))}
          </Stack>
        </RadioGroup>
      </Section>

      {inputSections.map((section) => {
        const resultLink = (data?.data.results as SectionType)?.[section.id];
        return (
          <Section key={section.id} title={section.title}>
            <Stack spacing={1} direction={{ xs: "column", md: "row" }} mb={1}>
              {section.inputs?.map((input) => {
                const hasError = hasErrors(section.id + input.name);
                const Input = input.CustomComponent ?? TextField;

                return (
                  <Input
                    fullWidth
                    {...input.props}
                    error={hasError}
                    key={input.name}
                    name={input.name}
                    defaultValue={
                      (data?.data?.[section.id] as SectionType)?.[input.name]
                    }
                    onChange={updateSections(
                      section.id,
                      input.name,
                      input.validator
                    )}
                    helperText={
                      hasError ? section.errorHelps?.[input.name]?.[code] : ""
                    }
                  />
                );
              })}
            </Stack>
            <RelatedDocument
              type="upload_download"
              onChange={onResultSheetChange(section.id)}
              uploadedFile={docs[section.id]}
              title={`${section.title} Result sheet ${
                resultLink ? "(uploaded)" : ""
              }`}
              onDelete={() => {
                setDocs((prev:any) => ({ ...prev, [section.id]: undefined }));
           
              }}
            />


          
          </Section>
        );
      })}
      <Section title="Institution Details">
        <Repeater
          defaultBlocks={data?.other.map((block) => ({
            ...block,
            key: Math.random(),
          }))}
          inputs={otherInputs}
          errorHelps={{}}
          blockTitle={(block) => `${block.title} - ${block.institute}`}
          onChange={setBlocks}
        />
      </Section>

     
      <SubmitButton onClick={update} sx={{ alignSelf: { sm: "flex-end" } }}>
        Save Changes
      </SubmitButton>
    </Stack>
  );
};
export default EduQualifications;
