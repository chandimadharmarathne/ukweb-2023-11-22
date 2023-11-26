import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
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
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
    "searchbar": {
      borderRadius: 0
    }
  };
});

type Props = {
  type: UserType;
  navigateLink: (query: string) => string;
  query?: string;
  url: string;
};

const salaryInformation = [
  {
    job: "cleaner",
    location: "UAE",
    content: "How much does a Cleaner make in UAE?",
    topic: "Average base salary Data source tooltip for average base salary.",
    month: "AED 2175",
    year: "AED 30,699"
  },
  {
    job: "Driver",
    location: "UAE",
    content: "How much does a Driver make in UAE?",
    topic: "Average base salary Data source tooltip for average base salary.",
    month: "Per Month AED 2550 in UAE.",
    year: "Per year AED 35,617 in UAE."
  },

  {
    job: "Care assistant",
    location: "UAE",
    content: "How much does a Care Assistant make in UAE?",
    topic: "Average base salary Data source tooltip for average base salary.",
    month: "Per Month AED 5685 in UAE.",
    year: "Per year AED 80,270 in UAE."
  }
];

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
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up("lg")
  );
  const isTablet = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.between("sm", "md")
  );


  useEffect(() => {
    setJobData(salaryInformation.slice(0, 3) ?? [])
  }, [data])
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewQuery(e.target.value);

    if (e.target.value.length > 0) {
      setJobData(salaryInformation.filter((item: any) => item.location.includes(e.target.value) || item.job?.includes(e.target.value)))
    }
    else {
      setJobData(salaryInformation.slice(0, 3))
    }
    setNewPage(1)
  };

  //Create menu for salary guide
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedValue, setSelectedValue] = useState<string>('per month');


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuClick = (selectedItem: string) => {
    console.log('Selected:', selectedItem);
    setSelectedValue(selectedItem);
    handleClose();
  };
  useEffect(() => {

    // Additional actions when the selected value changes
    console.log(`Selected: ${selectedValue}`);
  }, [selectedValue]);




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

    if (jobData?.length / 3 < page) {
      setJobData(jobData?.slice(0, 3))
      setNewPage(1)
    }
    else {
      setNewPage(salaryInformation.length / 3)
      // console.log("page", page, dummyJobData.length);

      // Calculate the correct start and end values
      const itemsPerPage = 3;
      const start = (page - 1) * itemsPerPage;
      const end = Math.min(start + itemsPerPage, data?.jobs?.length);

      console.log("duration", start, end);
      setJobData(salaryInformation.slice(start, end));
    }
  };

  return (
    <StyledMain>
      <BootstrapDialog
        onClose={() => {
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
          onClick={() => {
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
          <br />
          <Filter type={type} open={showFilter} onClose={toggleFilter} onToggle={(newQuery) => {
            //  console.log("data =>",data)
            if (newQuery?.location && newQuery?.jobtypes) {
              setJobData(salaryInformation.filter((item: any) => item.location === newQuery?.location && item?.job === newQuery?.jobtypes


              ))
            }
            else if (newQuery?.location && !newQuery?.jobtypes) {
              setJobData(salaryInformation?.filter((item: any) => item.location === newQuery?.location


              ))
            } else if (newQuery?.jobtypes && !newQuery?.location) {
              setJobData(salaryInformation?.filter((item: any) => item?.job === newQuery?.jobtypes))
            }
            else if (!newQuery?.location && !newQuery?.jobtypes) {
              setJobData(salaryInformation?.slice(0, 3))
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
              display: 'flex',
              flexDirection: "row",
              width: isDesktop ? "96%" : "100%",
              marginLeft: isDesktop ? 25 : isMobile ? 25 : 75,
              borderRadius: 0,


            }}
          >


            {
              isMobile && <Button onClick={() => {
                setOpen(true)
              }} >
                <FilterListIcon />
              </Button>
            }
            {
              !isMobile && <Filter type={type} open={showFilter} onClose={toggleFilter} onToggle={(newQuery) => {
                console.log("data =>", newQuery)
                if (newQuery?.location && newQuery?.jobtypes) {
                  setJobData(salaryInformation?.filter((item: any) => item.location === newQuery?.location && item?.job === newQuery?.jobtypes


                  ))
                }
                else if (newQuery?.location && !newQuery?.jobtypes) {
                  setJobData(salaryInformation?.filter((item: any) => item.location === newQuery?.location


                  ))
                } else if (newQuery?.jobtypes && !newQuery?.location) {
                  setJobData(salaryInformation?.filter((item: any) => item?.job === newQuery?.jobtypes))
                }
                else if (!newQuery?.location && !newQuery?.jobtypes) {
                  setJobData(salaryInformation?.slice(0, 3))
                }

              }} />
            }

            <div style={{
              width: isDesktop ? "100%" : isMobile ? "100%" : "66%",
              borderRadius: 0,
            }}>
              <TextField
                style={{
                  width: isDesktop ? "100%" : isMobile ? "95%" : "90%",
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

        {
          jobData?.length > 0 && jobData.map((item: any, index: any) => (


            <Card key={index} style={{
              width: isDesktop ? "96%" : "100%",
              marginLeft: isDesktop ? "3.1%" : isMobile ? 2 : 7,
              borderRadius: 0,
              marginTop: 20,
              marginBottom: 20,
              alignContent: 'center',
              alignItems: 'center',

              boxShadow: "0px 0px 0px 0px rgb(0 0 0 / 0%)",
              border: "2px solid #E0E0E0",
              borderWidth: 2,
              backgroundColor: "#FFFFFF",
              padding: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <Typography variant="h6" style={{ // Title 
                marginLeft: isDesktop ? 25 : isMobile ? 25 : 75,
                marginTop: 8,
                marginBottom: 0,
                fontWeight: 700,
                fontSize: 28,
                color: '#000000',

              }}>
                {item?.job[0].toUpperCase() + item?.job?.slice(1)}
              </Typography>

              <Typography variant="body1" style={{ // question
                marginLeft: isDesktop ? 25 : isMobile ? 25 : 75,
                marginTop: 8,
                marginBottom: 20,
                fontWeight: 400,
                fontSize: 18,
                color: '#4f4e4d'
              }}>
                {item?.content}
              </Typography>

              <div style={{
                display: 'block',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                alignContent: 'center',
                border: '2px solid #e8e8e8',
                borderRadius: 5,
                padding: '10px',
                marginBottom: '20px',
                backgroundColor:'#e8e8e8'
              }}
              >
                <div style={{
                  color:'#4f4e4d',
                  paddingLeft:'25px'
                }}>
                  Avarage base salary?
                </div>
                
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>

                  <Typography
                    variant="body1"
                    style={{
                     
                      marginLeft: isDesktop ? 25 : isMobile ? 25 : 75,
                      marginTop: 0,
                      marginBottom: 0,
                      marginRight: 10,
                      fontWeight: "bold",
                      fontSize: 30,
                      color: '#000000',

                      //marginBottom: '20px',
                      alignContent: 'center',
                      alignItems: 'center',
                      
                    }}
                  >


                    {selectedValue === 'per month' ? item?.month : item?.year}


                  </Typography>

                  {selectedValue && (
                    <Typography variant="body1" style={{
                      marginTop: 10,
                      marginBottom: 10,
                      color: '#0000ff',
                      border: '1px solid #0000ff',
                      borderRadius: 5,
                      padding: '1px',
                      paddingLeft: '10px',
                      margin:0,
                      alignContent: 'center',
                      alignItems: 'center',
                      paddingTop: 0,
                      display: 'flex',
                      // flexDirection: 'row',
                      // justifyContent: 'space-between',
                    }}>
                      {selectedValue}
                      <div style={{
                        paddingTop: 0,
                        padding:0,
                        //paddingLeft: 10,
                        

                      }}>
                        <IconButton
                          aria-label="more"
                          aria-controls="menu"
                          aria-haspopup="true"
                          onClick={handleClick}
                          style={{ color: 'blue', padding:0 }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </div>
                    </Typography>
                  )}
                </div>

                <Menu
                  id="menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleMenuClick('per month')}>Per month</MenuItem>
                  <MenuItem onClick={() => handleMenuClick('per year')}>per year</MenuItem>
                </Menu>

                {/* <IconButton
                  aria-label="more"
                  aria-controls="menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <ExpandMoreIcon />
                </IconButton> */}




              </div>







              <Typography variant="body1" style={{ // description
                marginLeft: isDesktop ? 25 : isMobile ? 25 : 75,
                marginTop: 20,
                marginBottom: 20,
                fontSize: 18,
                color: '#000000',
                textAlign: "center",
                fontWeight: "bold"

              }}>
                {item?.topic}
              </Typography>

            </Card>
          ))
        }
      </Container>
    </StyledMain >
  );
};

export interface Result {
  pages: number;
  data: JobCardProps[];
}

export default FindUsers;
