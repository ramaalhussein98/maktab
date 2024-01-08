import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  IconButton,
  // Link,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteButton from "./FavoriteButton";
import { Share } from "../../../../../assets/icons";
import DetailsImagesXs from "./DetailsImagesXs";
import DetailsXsTabs from "./DetailsXsTabs";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import PhoneIcon from "@mui/icons-material/Phone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SocailMedaiLinks from "../SocailMedaiLinks";

const DetailsXsScreens = ({ adInfo }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  //  adInfo = useLocation().state.ad;
  const navigate = useNavigate();
  const handleAdClick = (adInfo) => {
    navigate(`/payment`, { state: { adInfo } });
  };
  const [ShareListOpen, setShareListOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    const currentUrl = window.location.href;

    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  const handleOutsideClick = (event) => {
    if (
      !event.target.closest(".list-container") &&
      !event.target.classList.contains("share-button")
    ) {
      setShareListOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  // console.log(adInfo);
  // const adTitle = adInfo?.title;
  // const windowUrl = window.location.href;
  // const encodedTitle = encodeURIComponent(adTitle);
  // const encodedWindowUrl = encodeURIComponent(windowUrl);
  // const whatsappShareLink = `https://wa.me/?text=${encodedTitle}%0A${encodedWindowUrl}`;
  const whatsappShareLink = "hi";

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          // marginTop: "-9rem",
          overflow: "hidden",
        }}
      >
        <Box sx={{ paddingBottom: "60px" }}>
          {/* this for swiper slider */}
          <Box>
            <DetailsImagesXs adInfo={adInfo} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "15px",

              width: "100%",
              zIndex: "2",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <IconButton>
                <Link
                  to="/"
                  state={{
                    is_special: 1,
                  }}
                >
                  <ChevronRightIcon
                    sx={{
                      fontSize: "2rem",
                      transform:
                        lang === "ar" ? "rotate(0)" : "rotate(-180deg)",
                      color: "white",
                    }}
                  />
                </Link>
              </IconButton>
              <Box
                sx={{
                  // position: "absolute",
                  top: "4rem",
                  left: "5px",
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  marginLeft: "0px",
                  zIndex: "222222222",
                }}
              >
                <FavoriteButton
                // adInfo={adInfo}
                />
                <Box>
                  <Button onClick={() => setShareListOpen(!ShareListOpen)}>
                    {<img src={Share} alt="sharicon" />}
                  </Button>
                  {ShareListOpen && <SocailMedaiLinks />}
                </Box>
              </Box>
            </Box>
          </Box>

          {/* this Box for Tabs  */}
          <DetailsXsTabs adInfo={adInfo} />
        </Box>
      </Box>
      <Box
        sx={{
          position: "fixed",
          display: { xs: "flex", md: "none" },
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          bottom: "0px",
          right: "0px",
          left: "0px",
          maxWidth: "100%",
          height: "81px",
          backgroundColor: "white",
          boxShadow:
            "rgba(0, 0, 0, 0.81) 0px 2px 1px -1px,rgba(14, 8, 8, 0.14) 0px 1px 1px 0px,rgba(0, 0, 0, 0.47) 0px 1px 10px 0px",
          padding: "0px 25px",
          zIndex: "999",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <div>
            <span>SR690</span>{" "}
            <span style={{ color: "#626060 !important" }}>{t("day")}</span>
            <div style={{ color: "#626060  !important" }}>18-23 نوفمبر</div>
          </div>
        </Box>

        <Box sx={{ display: "flex" }}>
          <button
            onClick={() => handleAdClick(adInfo)}
            style={{
              backgroundColor: "var(--main-color)",
              color: "white",
              fontWeight: "700",
              padding: "10px 1.5rem",
              borderRadius: "5px",
            }}
          >
            {t("details_page.reservation")}
          </button>
        </Box>
      </Box>
    </>
  );
};

export default DetailsXsScreens;
