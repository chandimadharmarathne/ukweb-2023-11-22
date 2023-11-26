import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Theme,
  Typography,
  styled,
  useMediaQuery,
} from "@mui/material";
import { UserType } from "../../constants/input-data";
import useBackend from "../../hooks/backend";
import Loader from "../../views/loader/Loader";
import { JobCardProps } from "../job-cards";
import JobCard from "../job-cards/horizontal";
import Filter, { FilterType } from "./filter"; // Import Filter and its types together
import { Response } from "../../utils/utils.types";
import { Search, Tune } from "@mui/icons-material";
import dummyJobData from "./sections/industry.data";
import Pagination from "../paginator";
import { useQuery } from "@apollo/client";
import { GET_JOBS } from "../../query";
import client from "../../applo";
import FilterListIcon from '@mui/icons-material/FilterList';
//import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
//import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
//import Typography from '@mui/material/Typography';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const StyledMain = styled("main")(({ theme }) => {
  const borderRadius = 10;
  return {
    padding: theme.spacing(5, 0),
    marginTop: theme.spacing(8),
    ".searchbar": {
      background: theme.palette.background.default,
      borderRadius,
    },
    ".body": {
      margin: theme.spacing(3, 2),
      background: "#ffffff",
      borderRadius,
    },
    ".result": {
      padding: theme.spacing(2),
    },
    ".paginator": {
      paddingTop: theme.spacing(4),
      width: "fit-content",
      margin: "auto",
    },
    "searchbar":{
      borderRadius:0
    }
  };
});

type Props = {
  type: UserType;
  navigateLink: (query: string) => string;
  query?: string;
  url: string;
};

const FindUsers: FC<Props> = ({ type, query, navigateLink, url }) => {
  const [showFilter, setShowFilter] = useState(false);
  const [newQuery, setNewQuery] = useState(query ?? "");
  const [params] = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 600px)'); // Define your mobile breakpoint
  const page = params.get("page") ?? "1";

  const [newPage, setNewPage] = useState(1)
  const [jobData, setJobData] = useState<any>([])
  const { loading, error, data } = useQuery(GET_JOBS, {
    client: client
  })
  const [open,setOpen] = useState(false)
  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );
  const isTablet = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.between("sm", "md")
  );
  

  useEffect(() => {
    setJobData(data?.jobs?.slice(0, 3) ?? [])
  }, [data])
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuery(e.target.value);

    if (e.target.value.length > 0) {
      setJobData(data?.jobs?.filter((item: any) => item.location.includes(e.target.value) || item.job_key?.includes(e.target.value)))
    }
    else {
      setJobData(data?.jobs?.slice(0, 3))
    }
    setNewPage(1)
  };




  const toggleFilter = () => {
    setShowFilter((prev) => !prev);
  };
  const navigate = useNavigate();
  const handleSearch = () => {
    const newUrl = navigateLink(newQuery) + `?page=${page}`;

    // Perform any search-related actions here, such as updating the URL or triggering a search request.
  };
  const redirectToPage = (_: any, page: number) => {
    
   // console.log("page", page, jobData.length/3);

    if(jobData?.length/3 < page){
      setJobData(jobData?.slice(0,3))
      setNewPage(1)
    }
    else {
    setNewPage(data?.jobs?.length/3)
   // console.log("page", page, dummyJobData.length);

    // Calculate the correct start and end values
    const itemsPerPage = 3;
    const start = (page - 1) * itemsPerPage;
    const end = Math.min(start + itemsPerPage, data?.jobs?.length);

    console.log("duration", start, end);
    setJobData(data?.jobs?.slice(start, end));
    }
  };

  return (
    <StyledMain>
      <BootstrapDialog
        onClose={()=>{
          setOpen(false)
        }}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Filter By Location And Types
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={()=>{
            setOpen(false)
          }}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <br/>
        <Filter type={type} open={showFilter} onClose={toggleFilter} onToggle={(newQuery) =>{
          //  console.log("data =>",data)
             if(newQuery?.location && newQuery?.jobtypes){
               setJobData(data?.jobs?.filter((item:any) =>item.location=== newQuery?.location && item?.job_key === newQuery?.jobtypes


               ))
             }
             else if(newQuery?.location && !newQuery?.jobtypes){
               setJobData(data?.jobs?.filter((item:any) =>item.location=== newQuery?.location


             ))
          }else if(newQuery?.jobtypes && !newQuery?.location){
             setJobData(data?.jobs?.filter((item:any) =>item?.job_key === newQuery?.jobtypes))
          }
          else if(!newQuery?.location && !newQuery?.jobtypes){
            setJobData(data?.jobs.slice(0,3))
          }
          setNewPage(1)
          }} />
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </BootstrapDialog>
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          //spacing={2}
        >

         <div
         style={{
          display:'flex',
          flexDirection:"row",
          width:isDesktop ? "94.5%":"100%",
          marginLeft:isDesktop ? 25:isMobile ? 25:75,
          borderRadius:0,
          
          
         }}
         >

         
            {
              isMobile  && <Button onClick={() =>{
                setOpen(true)
              }} >
              <FilterListIcon/>
             </Button>
            }
             {
          !isMobile &&   <Filter type={type} open={showFilter} onClose={toggleFilter} onToggle={(newQuery) =>{
            console.log("data =>",newQuery)
             if(newQuery?.location && newQuery?.jobtypes){
               setJobData(data?.jobs?.filter((item:any) =>item.location=== newQuery?.location && item?.job_key === newQuery?.jobtypes


               ))
             }
             else if(newQuery?.location && !newQuery?.jobtypes){
               setJobData(data?.jobs?.filter((item:any) =>item.location=== newQuery?.location


             ))
          }else if(newQuery?.jobtypes && !newQuery?.location){
             setJobData(data?.jobs?.filter((item:any) =>item?.job_key === newQuery?.jobtypes))
          }
          else if(!newQuery?.location && !newQuery?.jobtypes){
            setJobData(data?.jobs?.slice(0,3))
          }

          }} />
         }

           <div style={{
            width:isDesktop? "90%":isMobile?"100%":"66%",
            borderRadius:0,
           }}>
           <TextField
              style={{
                width: isDesktop ? "100%":isMobile?"95%":"90%",
              }}
              //fullWidth
              variant="outlined"
              placeholder="Search your job"
              value={newQuery}
              onChange={onChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
           </div>
            </div>
          </Stack>
       
        <Stack
          direction={isMobile ? 'column' : 'row'}
          spacing={{ xs: 2, md: 3 }}
          padding={ isDesktop? "23px 3%": isMobile ?"10px 35px":"5px 45px"}
          marginLeft={isDesktop ? 0:isMobile ? 1:0}
          width="100%"
        >
          {/* Render your JobCards or other components here */}
          {jobData?.map((card: any) => (
            <JobCard card={card} key={card.id} />
          ))}


        </Stack>
        <Pagination
          count={Math.ceil(data?.jobs?.length / 3)}
          className="paginator"
          page={newPage}
          onChange={redirectToPage}
        />
      </Container>
    </StyledMain>
  );
};

export interface Result {
  pages: number;
  data: JobCardProps[];
}

export default FindUsers;
