import React, { FC, useEffect, useState } from "react";
import { useMediaQuery, styled, Theme } from "@mui/material";
import LoadingComponent from '../../components/loader';
import { useNavigate } from "react-router-dom";
import SalaryJob from "./salary-job";

interface HomePageProps { }

const StyledPage = styled("main")(({ theme }) => ({
  button: {
    position: 'relative',
    '&:not(.selected)': {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      textDecoration: 'none',
      color: 'black',
    },
    '&.selected': {
      //textDecoration: 'underline',
      color: 'black',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
    },
    '&:hover': {
      color: 'black',
      transform: 'scaleX(1)',
      // transformOrigin: 'bottom left',
      '&:before': {
        transform: 'scaleX(0)', // Disable the underline transition on hover over "New Jobs"
      },
    },
    '&:before': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      top : '20px',
      // bottom: '15px',
      height: '3px',
      backgroundColor: 'blue',
      transform: 'scaleX(0)',
      transformOrigin: 'center',
      transition: 'transform 0.3s ease',
    },
    '&.selected:before': {
      transform: 'scaleX(1)',
      transformOrigin: 'center',
    },
    '&:hover:before': {
      transform: 'scaleX(0)',
      transformOrigin: 'center',
    },
    '&:hover:after': {
      transform: 'scaleX(1)',
      transformOrigin: 'center',
    },
  },
}));

const HomePage: FC<HomePageProps> = () => {
  const [selectedButton, setSelectedButton] = useState('salaries');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [load, setLoad] = useState(true); // Set load to true initially to trigger useEffect
  const [showSalaryJob, setShowSalaryJob] = useState(false);

  const loaderConfig = {
    color: 'darkblue',
    size: 40,
    distance: 3,
  };

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    
    if (buttonName === "salaries") {
      setShowSalaryJob(true);
    } else if (buttonName === "newJobs") {
      setShowSalaryJob(false);
      navigate("/new-jobs");
    }
  };

  useEffect(() => {
    if (load) {
      handleButtonClick("salaries");
      setLoad(false);
    }
  }, [load]);

  return (
    <StyledPage>
      {load ? <LoadingComponent config={loaderConfig} /> : null}

      <div style={{
        marginTop:'100px',
        paddingBottom:'0px',
        paddingLeft:'10%',
        alignContent:'center',
        alignItems:'center',
        fontWeight:'bold'

      }}>
        <button 
          onClick={() => handleButtonClick('salaries')}
          className={selectedButton === 'salaries' ? 'selected' : ''}
        >
          Salaries
        </button>
        <button
          onClick={() => handleButtonClick('newJobs')}
          className={selectedButton === 'newJobs' ? 'selected' : ''}
        >
          New Jobs
        </button>
      </div>

      {showSalaryJob && <SalaryJob />}

    </StyledPage>
  );
};

export default HomePage;
