import React from "react";
import "../../../../assets/css/ad_card.css";
import StarIcon from "@mui/icons-material/Star";
import AdSlider from "../../Home/components/AdSlider";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Box, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Home1 } from "../../../../assets/images";
import FavoriteBtn from "../../../../ui/FavoriteBtn";
const AdMapCard = ({
  data,
  isBoxVisible,
  setBoxVisible,
  activeMarkerIndex,
}) => {
  const handleBoxClose = () => {
    setBoxVisible(false);
  };

  if (!isBoxVisible) {
    return null; // Return null when the Box is not visible
  }
  // Find the ad that matches the activeMarkerIndex
  const activeAd = data.find((ad) => ad.id === activeMarkerIndex);
  if (!activeAd) {
    return null; // Return null if no matching ad is found
  }
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const fullTitle = " مكتب في الرياض";

  // Get the first 25 characters of the title
  const truncatedTitle = fullTitle.slice(0, 30);

  // Add ellipsis (...) if the title was truncated
  const displayedTitle =
    truncatedTitle.length < fullTitle.length
      ? `${truncatedTitle}...`
      : truncatedTitle;
  return (
    <>
      {/* this card for lg screens */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <div
          id={activeAd.id}
          style={{
            width: "20rem",
            backgroundColor: "white",
            position: "relative",
            borderRadius: "16px",
          }}
        >
          <CloseIcon
            style={{
              backgroundColor: "rgba(0,0,0,0.4)",
              borderRadius: "50%",
              position: "absolute",
              top: "20px",
              right: "20px",
              zIndex: "2000000000",
              color: "white",
              padding: "4px",
              cursor: "pointer",
            }}
            onClick={handleBoxClose}
          />
          <Link to="/details">
            <div
              className="slider-img-container"
              style={{ height: "200px !important", width: "100%" }}
            >
              <AdSlider />
            </div>

            <div className="card-content" style={{ padding: "10px" }}>
              <div className="d-flex">
                <div className="title">{displayedTitle} </div>

                <div className="d-flex">
                  <StarIcon sx={{ fontSize: "16px" }} />
                  5.0
                </div>
              </div>
              <div style={{ display: "Flex", gap: "10px" }}>
                <div className="price">
                  <span
                    style={{
                      fontWeight: "bold",
                      marginLeft: lang === "ar" ? "5px" : "0",
                      marginRight: lang === "en" ? "5px" : "0",
                    }}
                  >
                    $429
                  </span>
                  <span>اليوم</span>
                </div>
                <div className="descrption">29 أكتوبر – 3 نوفمبر</div>
              </div>
            </div>
          </Link>
        </div>
      </Box>
      {/* this card for sm screens */}
      <Box
        id={activeAd.id}
        className="adCardMapContainer"
        sx={{ display: { xs: "block", md: "none" } }}
      >
        <CloseIcon
          style={{
            backgroundColor: "rgba(0,0,0,0.4)",
            borderRadius: "50%",
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: "2000000000",
            color: "white",
            padding: "4px",
            cursor: "pointer",
          }}
          onClick={handleBoxClose}
        />
        <Box className="cardContainer">
          <Link to="/details">
            <Box style={{ display: "flex" }}>
              <img src={Home1} className="imgMapSmall" />
              <Box
                sx={{
                  paddingX: "10px",
                  fontSize: "14px !important",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <div>
                  <div className="title">{displayedTitle} </div>
                  <div
                    style={{ position: "absolute", top: "0px", left: "0px" }}
                  >
                    <FavoriteBtn />
                  </div>
                </div>
                <div className="descrption" style={{ color: "gray" }}>
                  29 أكتوبر – 3 نوفمبر
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="price">
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: lang === "ar" ? "5px" : "0",
                        marginRight: lang === "en" ? "5px" : "0",
                      }}
                    >
                      $429
                    </span>
                    <span>اليوم</span>
                  </div>
                  <div className="d-flex">
                    <StarIcon sx={{ fontSize: "16px" }} />
                    5.0
                  </div>
                </div>
              </Box>
            </Box>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default AdMapCard;
