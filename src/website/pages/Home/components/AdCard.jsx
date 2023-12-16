import React, { useEffect, useState } from "react";
import "../../../../assets/css/ad_card.css";
import StarIcon from "@mui/icons-material/Star";
import AdSlider from "./AdSlider";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

const AdCard = ({ id }) => {
  const { t } = useTranslation();
  // const [isRendered, setIsRendered] = useState(false);

  // useEffect(() => {
  //   setIsRendered(true);
  // }, []);
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation().pathname;
  const isAdMapCardComponent = location.split("/").includes("map");
  const fullTitle = "   مكتب للإيجار في الرياض";
  // Get the first 25 characters of the title
  const truncatedTitle = fullTitle.slice(0, 38);
  // Add ellipsis (...) if the title was truncated
  const displayedTitle =
    truncatedTitle.length < fullTitle.length
      ? `${truncatedTitle}...`
      : truncatedTitle;
  return (
    <div
    // className="AdContainer"
    >
      <Link to="/details">
        <div
          className={
            isAdMapCardComponent
              ? "slider_img_container_auto"
              : "slider_img_container"
          }
        >
          <AdSlider />
        </div>
        <div className="card-content">
          <div className="d-flex">
            <div className="title">{displayedTitle} </div>
            <div className="d-flex">
              <StarIcon sx={{ fontSize: "16px" }} />
              5.0
            </div>
          </div>
          <div className="descrption"> الرياض</div>
          <div className="descrption">29 أكتوبر – 3 نوفمبر</div>
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
            <span>{t("day")}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default AdCard;
