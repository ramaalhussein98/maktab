import React from "react";
import { useLocation } from "react-router-dom";
import TopNav from "./TopNav";
import Footer from "./Footer";
import { useMediaQuery } from "@mui/material";

const Layout = ({ children }) => {
  const location = useLocation();

  const isMapPage = location.pathname.includes("map");
  const HomePage = location.pathname === "/";
  const isMediumScreen = useMediaQuery("(max-width:900px)") && !HomePage;
  return (
    <div>
      <TopNav />
      <main>{children}</main>
      {!isMapPage && !isMediumScreen ? <Footer /> : ""}
    </div>
  );
};

export default Layout;
