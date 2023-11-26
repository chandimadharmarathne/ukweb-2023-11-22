import React, { FC, useEffect, useState } from "react";
import {
  Box,
  Divider,
  FormControl,
  InputLabel,
  Select,
  Stack,
  styled,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import { useSnackbar } from "../../store/providers/snackbar.provider";
import { useLanguage } from "../../store/providers/lang.provider";
import { useParams, useSearchParams } from "react-router-dom";

const FilterContainer = styled("aside")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "100%",
    maxWidth: 350,
  },
}));

export type FilterProps = {
  type: any;
  open: boolean;
  onClose: () => void;
  onToggle:(data:any) => void;
};
export type FilterType = {
  [key: string]: any;
};
const Filter: FC<FilterProps> = ({
  type,
  open,
  onClose,
  onToggle
}) => {
  const { code } = useLanguage();
  const { query } = useParams();
  const [params] = useSearchParams();
  const page = params.get("page") ?? "1";
  const [filter, setFilter] = useState<any>({});
  const { addError } = useSnackbar();
  const isDesktop = useMediaQuery<Theme>((theme) =>
  theme.breakpoints.up("lg")
);
  useEffect(()=>{
    onToggle(filter)
  },[filter])

  const updateFilter = <T,>(key: string) => (value: T) => {
    setFilter((prev:any) => ({ ...prev, [key]: value }));
    // localStorage.setItem("filter",JSON.stringify({
    //   ...filter,
    //   [key]: value 
    // }))
  };

  const clearFilter = () => {
    setFilter({});
  };

  const search = async () => {
    try {
      const formatted = {
        ...filter,
        job_type: getSelectedInList(filter.job_type ?? {}),
        gender: getSelectedInList(filter.gender ?? {}, true),
        industry: Object.entries(filter.industry ?? {}).map(([id, value]) => ({
          id,
          job_types: getSelectedInList(value as object),
        })),
      };

      // const result = await searchService.filterJob(type, formatted);
      
      onClose?.();
    } catch (error: any) {
      addError?.(error.message);
    }
  };

  const getSelectedInList = (obj: object, asInt = false) => {
    return Object.entries(obj)
      .filter(([, value]) => value)
      .map(([id]) => (asInt ? parseInt(id) : id));
  };

  const data = [
    {
      id: "location",
      label: {
        en: "Location",
        // Add translations for other languages as needed
      },
     
      
      options: [
       // {value:"Location",label:"Location"},
        { value: "canada", label: "Canada" },
        { value: "dubai", label: "Dubai" },
        { value: "england", label: "England" },
        { value: "romania", label: "Romania" },
        { value: "newZealand", label: "New Zealand" },
      ],
    },
    {
      id: "jobtypes",
      label: {
        en: "Job Types",
        // Add translations for other languages as needed
      },
      options:  [
        { value: "cleaner", label: "Cleaner" },
        { value: "careAssistant", label: "Care Assistant" },
        { value: "driver", label: "Driver" },
        { value: "factoryWorker", label: "Factory Worker" },
        { value: "farmWorker", label: "Farm Worker" },
        { value: "remoteWorking", label: "Remote Working" },
        { value: "retail", label: "Retail" },
      ]
      ,
    },
    // Add more filter sections as needed
  ];

  return (
    <FilterContainer>
      <Stack
        direction={"row"}
        paddingBottom={4}

       style={{
          marginLeft:isDesktop ? 35:0
      
       }}
        //marginTop={-2}
        // style={{
        //   marginLeft:isDesktop ? 10:0
        // }}
      >
        {data?.map((section:any) => (
          <Stack
            key={section.id}
            style={{
              //borderRadius:0,
              backgroundColor: "transparent",
              //padding: 15,
            }}
          >

            
       <FormControl fullWidth>
  {/* <InputLabel id="demo-simple-select-label">{String(section.label[code])}</InputLabel> */}
            <Select
            style={{
              borderRadius:0,
            }}
            placeholder={String(section.label[code])}
             //label={}
             //defaultValue={section.default}
              native
              value={filter[section.id] ?? ""}
              onChange={(event) => {
                updateFilter(section.id)(event.target.value);
              }}
              fullWidth
            >
              <option value="" key={""} label={section.label[code]} />
              {section.options.map((option:any) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
            </FormControl>
          </Stack>
        ))}
      </Stack>
    </FilterContainer>
  );
};

export default Filter;
