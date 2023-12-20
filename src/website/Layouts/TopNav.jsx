import React, { useContext, useEffect, useState } from "react";
import "../../assets/css/layout.css";
import { Box, Button, Container, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

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
import LoginButton from "../../ui/LoginButton";
import LanguageBtn from "../../ui/LanguageBtn";
import { FilterSlick } from "../pages/Home/components";
import FilterModal from "../pages/Home/components/Modals/FilterModal";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import LogInModal from "../../authentication/LogInModal";
import AddIcon from "@mui/icons-material/Add";
import { Header } from "../../mainComponents/MainPageStyles";
import UserContext from "../../context/userContext";
import ChatContext from "../../context/chatContext";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import { ChatsHeader } from "../chat/ChatsHeader";
import { myAxios } from "../../api/myAxios";
import useDataFetcher from "../../api/useDataFetcher ";

const TopNav = ({ setIsUserSelected }) => {
  const isLoggedIn = localStorage.getItem("user_token") ? true : false;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const { data, isLoading, error, get, post } = useDataFetcher();
  const location = useLocation();
  const isPaymentPage = location.pathname.includes("payment");
  const { setIsChatOpen, showMessages, setShowMessages } =
    useContext(ChatContext);
  const { messagesCounter } = useContext(ChatContext);
  const { userNameContext } = useContext(UserContext);
  const [menuItems, setMenuItems] = useState([]);

  const handleFilerModalOpen = () => {
    setOpenFilterModal(true);
  };

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        // Check if menuItems are available in localStorage
        const cachedMenuItems = localStorage.getItem("menuItems");
        if (cachedMenuItems) {
          // If available, parse and set them in state
          setMenuItems(JSON.parse(cachedMenuItems));
        } else {
          // If not available, make the API call
          const response = await myAxios.get("api/v1/user/menus/getHeader");
          const fetchedMenuItems = response?.data.data;

          // Set the menu items in state
          setMenuItems(fetchedMenuItems);

          // Cache the menu items in localStorage for future use
          localStorage.setItem("menuItems", JSON.stringify(fetchedMenuItems));
        }
      } catch (error) {
        console.error("Error fetching menu data:", error);
      }
    };

    fetchMenuData();
  }, []);

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
                  {menuItems?.links?.map((item, index) => (
                    <Link key={item.id} to={item.link}>
                      <span>
                        {" "}
                        {lang === "ar" ? item.title_ar : item.title_en}
                      </span>
                    </Link>
                  ))}
                </ul>
              </Box>
              <Box className="loginBox">
                <Box className="profileSection">
                  <Box className="displayoffice">
                    {/* chat section */}
                    {/* <Header $dir={lang}>
                      <div className="messages-container">
                        {messagesCounter != 0 && messagesCounter !== null ? (
                          <span className="counter">{messagesCounter}</span>
                        ) : (
                          ""
                        )}
                        <ChatRoundedIcon
                          onClick={() => {
                            if (userNameContext && userNameContext !== "null") {
                              // Conditionally open the chat and toggle message display
                              setIsChatOpen(true);
                              setShowMessages((prev) => !prev);
                            } else {
                              // Navigate to the "/userDashboard/myInfo" route with a toast notification
                              nav("/dashboard/my_info");
                            }
                          }}
                          className="message-icon"
                          sx={{ display: "flex", justifyContent: "center" }}
                        />
                        {showMessages && (
                          <ChatsHeader
                            showMessages={showMessages}
                            setShowMessages={setShowMessages}
                            setIsUserSelected={setIsUserSelected}
                          />
                        )}
                      </div>
                    </Header> */}
                    {isLoggedIn && (
                      <Link to="/addoffice">
                        <span
                          className="displayOfficespan"
                          style={{
                            background:
                              "linear-gradient(25deg,#700707,#ff4646)",
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
                    )}
                    <Link to="/business">
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
                        مكتب أعمال
                      </span>
                    </Link>
                  </Box>
                  <LoginButton isLoggedIn={isLoggedIn} />

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
    </>
  );
};

export default TopNav;
