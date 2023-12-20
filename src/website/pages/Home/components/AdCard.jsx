import React, { useEffect, useState } from "react";
import "../../../../assets/css/ad_card.css";
import StarIcon from "@mui/icons-material/Star";
import AdSlider from "./AdSlider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

const AdCard = ({ officeData }) => {
  const { t } = useTranslation();
  // console.log("officeData", officeData);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation().pathname;
  const isAdMapCardComponent = location.split("/").includes("map");
  const fullTitle = officeData?.title;
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
      <div onClick={() => handleAdClick(officeData)}>
        <div
          className={
            isAdMapCardComponent
              ? "slider_img_container_auto"
              : "slider_img_container"
          }
        >
          <AdSlider officeData={officeData} />
        </div>
        <div className="card-content">
          <div className="d-flex">
            <div className="title">{fullTitle} </div>
            <div className="d-flex">
              <StarIcon sx={{ fontSize: "16px" }} />
              5.0
            </div>
          </div>
          <div className="descrption"> {officeData?.location?.address}</div>
          <div className="descrption">29 أكتوبر – 3 نوفمبر</div>
          <div className="price">
            <span
              style={{
                fontWeight: "bold",
                marginLeft: lang === "ar" ? "5px" : "0",
                marginRight: lang === "en" ? "5px" : "0",
              }}
            >
              {/* {officeData?.ads_prices?.price} */}
              155$
            </span>
            <span>{t("day")}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdCard;
