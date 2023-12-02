import React, { FC, useEffect, useState } from "react";
import { useMediaQuery, styled, Theme } from "@mui/material";
import LoadingComponent from '../../components/loader';
import { useNavigate } from "react-router-dom";
import SalaryJob from "./salary-job";
import './../../index.css';

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
      top : '30px',
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

    // '&.t-text-style': {
    //   font-size: 
    // },
  },
}));

const HomePage: FC<HomePageProps> = () => {
  const [selectedButton, setSelectedButton] = useState('salaries');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [load, setLoad] = useState(true); // Set load to true initially to trigger useEffect
  const [showSalaryJob, setShowSalaryJob] = useState(false);
  const isDesktop = useMediaQuery<Theme>((theme) =>
  theme.breakpoints.up("lg")
);
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
        marginTop:'120px',
        // paddingTop:'20px'
        paddingBottom:'0px',
        marginBottom:'-25px',
        paddingLeft:isMobile ? '55%' : isDesktop ? '83%' : '84%',
        
        alignContent:'flex-end',
        alignItems:'center',
        fontWeight:'bold',
        paddingRight:0,
        // justifyContent:'right',
        // fontSize:'18px',
                
      }} className="t-text-style">
        <button 
          onClick={() => handleButtonClick('salaries')}
          className={selectedButton === 'salaries' ? 'selected' : ''}
        >
          <h3>Salaries</h3>
        </button>
        <button
          onClick={() => handleButtonClick('newJobs')}
          className={selectedButton === 'newJobs' ? 'selected' : ''}
        >
          <h3>New Jobs</h3>
        </button>
      </div>

      {showSalaryJob && <SalaryJob />}

    </StyledPage>
  );
};

export default HomePage;
