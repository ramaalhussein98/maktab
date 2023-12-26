import React, { useState, useEffect, useRef } from "react";

import {
  Tabs,
  Tab,
  Box,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import DetailsTabContent from "./DetailsTabContent";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import Map from "../../../../../assets/images/map.jpg";

import DetailsFeaturesBox from "./DetailsFeaturesBox";
import FiveStars from "./FiveStars";
import { useTranslation } from "react-i18next";
// import LogInModal from "../../../../authentication/loginFolder/LogInModal";

const DetailsTabs = ({ adInfo }) =>
  //
  {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;
    const [selectedTab, setSelectedTab] = useState(0);
    const userToken = localStorage.getItem("user_token");
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const modalRef = useRef(null);

    const handleOpenLoginModal = () => {
      setShowLoginModal(true);
    };

    const handleTabChange = (event, newValue) => {
      setSelectedTab(newValue);
    };
    const closeModal = () => {
      setShowLoginModal(false);
    };
    useEffect(() => {
      if (selectedTab === 2) {
        if (!userToken) {
          setShowLoginModal(true);
        } else {
          setShowCommentForm(true);
        }
      } else {
        setShowCommentForm(false);
        setShowLoginModal(false);
      }
    }, [selectedTab, userToken]);
    // useEffect(() => {
    //   const handleClickOutsideModal = (event) => {
    //     // Check if the click occurred outside of the modal
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //       // Check if the click didn't occur on Tab 2
    //       const tab2Button = document.querySelector(
    //         ".MuiTabs-flexContainer .MuiButtonBase-root:nth-child(3)"
    //       );

    //       if (tab2Button && !tab2Button.contains(event.target)) {
    //         closeModal();
    //       }
    //     }
    //   };

    //   window.addEventListener("click", handleClickOutsideModal);

    //   return () => {
    //     window.removeEventListener("click", handleClickOutsideModal);
    //   };
    // }, []);

    const tabStyles = {
      color: "black",
      fontSize: { xs: "12px", md: "15px" },
      width: "33%",
      padding: { xs: "0 0.5rem", md: "0 3rem" },
      "&.Mui-selected": {
        backgroundColor: "var(--main-color)",
        color: "white",
        borderRadius: "25px",
        padding: { xs: "0 0.5rem", md: "0 3rem" },
      },
      "&::before": {
        content: '""',
        width: "4px",
        height: "4px",
        backgroundColor: "rgba(0, 0, 0, 0.16)",
        borderRadius: "50%",
        position: "absolute",
        top: "50%",
        right: "2px",
        transform: "translateX(50%)",
      },
      "&:last-child::before": {
        display: "none",
      },
    };
    const tabIndicatorStyles = {
      display: "none", // Hide the default tab indicator
    };

    return (
      <Box>
        <Box
          sx={{
            padding: "4px",
            border: "1px solid rgba(121, 141, 174, 0.16)",
            borderRadius: "30px",
            width: "100%",
            justifyContent: "space-evenly",
            display: "flex",
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            TabIndicatorProps={{
              style: tabIndicatorStyles,
            }}
            sx={{ width: "100%" }}
          >
            <Tab
              label={t("details_page.details_tabs.specifications_and_features")}
              sx={tabStyles}
            />
            <Tab
              label={t("details_page.details_tabs.location_and_map")}
              sx={tabStyles}
            />
            <Tab
              label={t("details_page.details_tabs.guest_reviews")}
              sx={tabStyles}
              onClick={() => {
                if (selectedTab !== 2 && !userToken) {
                  setShowLoginModal(true);
                }
                setSelectedTab(2);
              }}
            />
          </Tabs>
        </Box>
        <Box hidden={selectedTab !== 0}>
          <DetailsTabContent
            title={t("details_page.details_tabs.specifications_and_features")}
          />
          <DetailsFeaturesBox adInfo={adInfo} />
        </Box>
        <Box hidden={selectedTab !== 1}>
          <DetailsTabContent
            title={t("details_page.details_tabs.location_and_map")}
          />

          <Box
            sx={{
              width: "100%",
              objectFit: "cover",
              border: "1px solid transparent",
              borderRadius: "2rem",
            }}
          >
            <Link
              href={`https://www.google.com/maps/dir/My+Location/${adInfo?.location?.lat},${adInfo?.location?.lng}/@${adInfo?.location?.lat},${adInfo?.location?.lng},12z/data=!3m1!4b1?entry=ttu`}
              target="_blank"
            >
              <img
                src={Map}
                alt="mapImg"
                style={{ width: "100%", borderRadius: "2rem" }}
              />
            </Link>
          </Box>
        </Box>
        <Box hidden={selectedTab !== 2}>
          <DetailsTabContent
            title={t("details_page.details_tabs.guest_reviews")}
          />

          {showCommentForm && (
            <Box
              sx={{
                border: "1px solid #d2cdcd",
                padding: "1rem",
                width: "15rem",
                borderRadius: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold", color: "gray" }}>
                {t("details_page.details_tabs.guest_reviews_tab.review_title")}
                ..
              </Typography>
              <FiveStars
              adInfo={adInfo}
              />
            </Box>
          )}

          {/* <LogInModal
            open={showLoginModal}
            onClose={() => setShowLoginModal(false)}
          /> */}
        </Box>
      </Box>
    );
  };

export default DetailsTabs;
