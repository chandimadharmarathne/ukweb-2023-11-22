import { FC } from "react";
import Footer from "./common/footer";
import NavBar from "./common/nav-bar";
import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

const MainLayout: FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{
      //display: "flex",
      width: "85%",
      margin: "auto",
      
    }}>

      <NavBar />
      
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
