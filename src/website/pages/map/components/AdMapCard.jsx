import React from "react";
import "../../../../assets/css/ad_card.css";
import StarIcon from "@mui/icons-material/Star";
import AdSlider from "../../Home/components/AdSlider";
import { Link, useNavigate } from "react-router-dom";
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
  const typeResIdTextMapping = {
    1: "بالساعة",
    2: "يومي",
    3: "شهري",
    4: "سنوي",
  };
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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const fullTitle = activeAd?.title;
  console.log("activeAd", activeAd);

  // Get the first 25 characters of the title
  const truncatedTitle = fullTitle.slice(0, 30);

  // Add ellipsis (...) if the title was truncated
  const displayedTitle =
    truncatedTitle.length < fullTitle.length
      ? `${truncatedTitle}...`
      : truncatedTitle;
  function formatNumberWithCommas(number) {
    // Convert number to string and split by dot
    const parts = number.toString().split(".");

    // Take only the integer part (before the dot)
    const integerPart = parts[0];

    // Join the integer part with commas
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const highestPriceItem = activeAd?.ads_prices?.reduce(
    (max, current) =>
      parseFloat(current.price) > parseFloat(max.price) ? current : max,
    activeAd?.ads_prices[0]
  );

  const handleAdClick = (officeData) => {
    navigate(`/details/${officeData?.id}`, { state: { officeData } });
  };
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
          <div>
            <div
              className="slider-img-container"
              style={{ height: "200px !important", width: "100%" }}
            >
              <AdSlider
                officeData={activeAd}
                isAdMapCardComponent="true"
                handleAdClick={handleAdClick}
              />
            </div>

            <div
              className="card-content"
              style={{ padding: "10px" }}
              onClick={() => handleAdClick(activeAd)}
            >
              <div className="d-flex">
                <div className="title">{displayedTitle} </div>

                <div className="d-flex">
                  <StarIcon sx={{ fontSize: "16px" }} />
                  5.0
                </div>
              </div>
              <div style={{ display: "Flex", justifyContent: "space-between" }}>
                <div className="descrption">{activeAd?.location?.address}</div>
                <div className="price">
                  {activeAd?.ads_prices?.length > 0 && (
                    <span
                      style={{
                        fontWeight: "bold",
                        marginLeft: lang === "ar" ? "5px" : "0",
                        marginRight: lang === "en" ? "5px" : "0",
                      }}
                    >
                      {formatNumberWithCommas(highestPriceItem?.price)}{" "}
                      {t("currency")}{" "}
                      {highestPriceItem?.type_res_id === "1"
                        ? "بالساعة"
                        : highestPriceItem?.type_res_id === "2"
                        ? "يومي"
                        : highestPriceItem?.type_res_id === "3"
                        ? "شهري"
                        : "سنوي"}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
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
          <div>
            <Box style={{ display: "flex" }}>
              <img
                src={`https://dashboard.maktab.sa/${activeAd?.main_image}`}
                className="imgMapSmall"
              />
              <Box
                onClick={() => handleAdClick(activeAd)}
                sx={{
                  paddingX: "10px",
                  fontSize: "14px !important",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  width: "100%",
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
                  {activeAd?.location?.address}
                </div>
                <div className="descrption">
                  {[
                    ...new Set(
                      activeAd?.ads_prices?.map((ele) => ele.type_res_id)
                    ),
                  ].map((typeResId, index) => (
                    <span key={index} className="spanPriceType">
                      {" "}
                      {typeResIdTextMapping[typeResId]}
                    </span>
                  ))}
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div className="price">
                    {activeAd?.ads_prices?.length > 0 && (
                      <span
                        style={{
                          fontWeight: "bold",
                          marginLeft: lang === "ar" ? "5px" : "0",
                          marginRight: lang === "en" ? "5px" : "0",
                        }}
                      >
                        {formatNumberWithCommas(highestPriceItem?.price)}{" "}
                        {t("currency")}{" "}
                        {highestPriceItem?.type_res_id === "1"
                          ? "بالساعة"
                          : highestPriceItem?.type_res_id === "2"
                          ? "يومي"
                          : highestPriceItem?.type_res_id === "3"
                          ? "شهري"
                          : "سنوي"}
                      </span>
                    )}
                  </div>
                  <div className="d-flex">
                    <StarIcon sx={{ fontSize: "16px" }} />
                    5.0
                  </div>
                </div>
              </Box>
            </Box>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default AdMapCard;
