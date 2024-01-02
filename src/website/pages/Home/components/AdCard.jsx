import React, { useEffect, useState } from "react";
import "../../../../assets/css/ad_card.css";
import StarIcon from "@mui/icons-material/Star";
import AdSlider from "./AdSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
const typeResIdTextMapping = {
  1: "بالساعة",
  2: "يومي",
  3: "شهري",
  4: "سنوي",
};
const AdCard = ({ officeData }) => {
  const { t } = useTranslation();
  // console.log("officeData", officeData);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation().pathname;
  const isAdMapCardComponent = location.split("/").includes("map");
  const fullTitle = officeData?.title;
  function formatNumberWithCommas(number) {
    // Convert number to string and split by dot
    const parts = number.toString().split(".");

    // Take only the integer part (before the dot)
    const integerPart = parts[0];

    // Join the integer part with commas
    return integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  const highestPriceItem = officeData?.ads_prices?.reduce(
    (max, current) =>
      parseFloat(current.price) > parseFloat(max.price) ? current : max,
    officeData?.ads_prices[0]
  );
  // Get the first 25 characters of the title
  // const truncatedTitle = fullTitle.slice(0, 38);

  // const displayedTitle =
  //   truncatedTitle.length < fullTitle.length
  //     ? `${truncatedTitle}...`
  //     : truncatedTitle;
  const navigate = useNavigate();
  const handleAdClick = (officeData) => {
    navigate(`/details/${officeData?.id}`, { state: { officeData } });
  };
  return (
    <div
    // className="AdContainer"
    >
      <div>
        <div
          className={
            isAdMapCardComponent
              ? "slider_img_container_auto"
              : "slider_img_container"
          }
        >
          <AdSlider officeData={officeData} handleAdClick={handleAdClick} />
        </div>
        <div className="card-content" onClick={() => handleAdClick(officeData)}>
          <div className="d-flex">
            <div className="title">{fullTitle} </div>
            <div className="d-flex">
              <StarIcon sx={{ fontSize: "16px" }} />
              5.0
            </div>
          </div>
          <div className="descrption"> {officeData?.location?.address}</div>
          <div className="descrption">
            {[
              ...new Set(officeData?.ads_prices?.map((ele) => ele.type_res_id)),
            ].map((typeResId, index) => (
              <span key={index} className="spanPriceType">
                {" "}
                {typeResIdTextMapping[typeResId]}
              </span>
            ))}
          </div>
          <div className="price">
            {officeData?.ads_prices?.length > 0 && (
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
  );
};

export default AdCard;
