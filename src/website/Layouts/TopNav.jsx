import React, { useState } from "react";
import "../../assets/css/layout.css";
import { Box, Button, Container, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import {
  LogoBig,
  LogoBlack,
  RedLogo,
  BlackRed,
  LogoUser,
} from "../../assets/logos";
import {
  Menu,
  User,
  languageImg,
  Filter,
  SearchGray,
  FilterSmall,
  Search,
} from "../../assets/icons";
import "../../assets/css/home.css";
import LanguageBtn from "../../ui/LanguageBtn";
import { FilterSlick } from "../pages/Home/components";
import FilterModal from "../pages/Home/components/Modals/FilterModal";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import LogInModal from "../../authentication/LogInModal";
import AddIcon from "@mui/icons-material/Add";
const TopNav = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [showloginBox, setShowLoginBox] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation();
  const isPaymentPage = location.pathname.includes("payment");
  const handleShowloginBox = () => {
    setShowLoginBox(!showloginBox);
  };
  const handleFilerModalOpen = () => {
    setOpenFilterModal(true);
  };
  const handleOpenModal = () => {
    // if (isLoggedIn) {
    //   setShowLogout((prev) => !prev);
    // } else {
    //   setOpenModal(true);
    // }
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const Links = [
    {
      ur: "/",
      title: "الرئيسية",
    },
    {
      ur: "/",
      title: "إعلانات مميزة",
    },
    {
      ur: "/about-us",
      title: " من نحن",
    },
    {
      ur: "/contact-us",
      title: "اتصل بنا",
    },
  ];
  return (
    <>
      <Box
        sx={{ position: "sticky", top: "0px", right: "0px", zIndex: "1000" }}
      >
        {/* this for larger Screens */}
        <Box className="topNavContainer">
          <Container
            sx={{
              maxWidth: "1400px !important",
              padding: { xs: "0px", md: "0px" },
            }}
          >
            <Box className="topNavContainerBox">
              <Box className="logoBox">
                <Box className="logo">
                  <Link to="/">
                    <img src={BlackRed} alt="logo" />
                  </Link>
                </Box>
                <ul className="navLinks">
                  {Links.map((item, index) => (
                    <Link key={item.title} to={item.ur}>
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </ul>
              </Box>
              <Box className="loginBox">
                <Box className="profileSection">
                  <Box className="displayoffice">
                    <Link to="/addoffice">
                      <span
                        className="displayOfficespan"
                        style={{
                          background: "linear-gradient(25deg,#700707,#ff4646)",
                          color: "white",
                          padding: "9px 15px",
                          borderRadius: "20px",
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <AddIcon />

                        {t("topNav.Addyouroffice")}
                      </span>{" "}
                    </Link>
                  </Box>
                  <Box className="profileBox" onClick={handleShowloginBox}>
                    <Button className="btn_profile">
                      <img src={Menu} style={{ width: "16px" }} />
                      <img
                        src={User}
                        style={{
                          width: "30px",
                          marginRight: lang === "ar" ? "16px" : "auto",
                          marginLeft: lang === "en" ? "16px" : "auto",
                        }}
                      />
                    </Button>
                    {showloginBox && (
                      <Paper className="loginPaperBox">
                        <ul className="ul1">
                          <li className="li1">
                            <Link to="/dashboard/home">
                              {t("topNav.controlPanel")}
                            </Link>
                          </li>
                          <li className="li1" onClick={handleOpenModal}>
                            {t("topNav.Login")}
                          </li>
                        </ul>
                      </Paper>
                    )}
                  </Box>
                  <LanguageBtn />
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
        {/* this for small Screens */}
        {!isPaymentPage && (
          <Box className="topSmallNavContainer">
            <Box className="smallBoxBorder" sx={{ minHeight: "47px" }}>
              <div className="searchBoxBorder">
                <span className="span1">
                  <div className="addvistor">
                    <input
                      type="text"
                      className="input1"
                      style={{ outline: "none" }}
                    />
                    <Box
                      className="searchIcon"
                      sx={{ position: "absolute", left: "0px" }}
                    >
                      <img src={Search} />
                    </Box>
                  </div>
                </span>
              </div>
            </Box>
            <Button
              className="FilterBtnSmall"
              onClick={handleFilerModalOpen}
              sx={{ top: "-3px" }}
            >
              <img src={FilterSmall} />
            </Button>
            <FilterModal
              openFilterModal={openFilterModal}
              setOpenFilterModal={setOpenFilterModal}
            />
          </Box>
        )}
      </Box>

      {/* LoginModal */}
      <LogInModal open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default TopNav;
