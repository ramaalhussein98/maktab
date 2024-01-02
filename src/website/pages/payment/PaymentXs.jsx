import React, { useState } from "react";
import "../../../assets/css/paymentXs.css";
import { Box, Button, Container, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link, useNavigate } from "react-router-dom";
import PaymentSliderXs from "./PaymentSliderXs";
import { Location, Star } from "../../../assets/icons";
import { useTranslation } from "react-i18next";
import PrivacyAndRules from "./PrivacyAndRules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ReservaitonBox from "./reservaitonBox";
import VisaCard from "./VisaCard";
import { CSSTransition } from "react-transition-group";
import CreditCard from "./CreditCard";
const PaymentXs = ({ officeData }) => {
  const { t, i18n } = useTranslation();
  const [showReservaitonBox, setShowReservaitonBox] = useState(false);
  const [showCashBox, setCashBox] = useState(false);
  const navigate = useNavigate();
  const handleAdClick = (officeData) => {
    navigate(`/details/${officeData?.adInfo?.id}`, { state: { officeData } });
  };
  return (
    <>
      <Box className="backContainer">
        {t("paymentpage.Reviewreservation")}
        <button onClick={() => handleAdClick(officeData)}>
          <ChevronRightIcon className="iconBack" />
        </button>
      </Box>
      <PaymentSliderXs />
      {/* title */}
      <Container sx={{ marginBottom: "10rem" }}>
        <span className="title_small"> Lorem Lorem Lorem </span>
        <Box className="Box_loc_des">
          <Box className="rate_loc">
            <Box className="d-flex">
              <img src={Star} style={{ width: "!5px" }} />
              <span className="spanGray">
                <b>8.6</b> (48 تقييم)
              </span>
            </Box>
            <Box className="d-flex">
              <img src={Location} />
              <span className="spanGray"> الرياض - حي المل</span>
            </Box>
          </Box>
          <Box className="price">
            <span>
              <span
                style={{
                  color: "var(--main-color)",
                  fontWeight: "700 !important",
                  fontSize: "19px",
                }}
              >
                1999 {t("Rial")}
              </span>
              <span> / ليلة </span>
            </span>
            <span>الإجمالي 220.89 {t("Rial")}</span>
          </Box>
        </Box>
        {/* 
        appoiment */}
        <Box
          sx={{
            padding: "12px",
            backgroundColor: "rgb(245, 245, 245)",
            borderRadius: "12px",
            boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 2px",
            marginY: "2rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography sx={{ fontSize: "17px", fontWeight: "700" }}>
                {t("details_page.details_tabs.calender_card.booking_details")}
              </Typography>
              <Typography
                sx={{
                  fontSize: "13px",
                  color: "rgba(0, 0, 0, 0.54)",
                  marginX: "10px",
                }}
              >
                (26 ليلة){" "}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Box sx={{ width: "50%", marginY: "1rem" }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  marginBottom: "5px",
                  fontSize: "14px",
                }}
              >
                {t("details_page.details_tabs.calender_card.date_of_arrival")}
              </Typography>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
                السبت، 21 أكتوبر
              </Typography>
            </Box>
            <Box sx={{ width: "50%", marginY: "1rem" }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  marginBottom: "5px",
                  fontSize: "14px",
                }}
              >
                {t("details_page.details_tabs.calender_card.departure_date")}
              </Typography>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
                الجمعة، 20 أكتوبر
              </Typography>
            </Box>
            <Box sx={{ width: "50%", marginY: "1rem" }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  marginBottom: "5px",
                  fontSize: "14px",
                }}
              >
                {t("details_page.details_tabs.calender_card.time_of_arrival")}
              </Typography>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
                11:00
              </Typography>
            </Box>
            <Box sx={{ width: "50%", marginY: "1rem" }}>
              <Typography
                sx={{
                  fontWeight: "500",
                  marginBottom: "5px",
                  fontSize: "14px",
                }}
              >
                {t("details_page.details_tabs.calender_card.departure_time")}
              </Typography>
              <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
                12:00
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* privacy */}
        <PrivacyAndRules />
      </Container>
      {/* box button fixed bottom */}
      <Box className="bottomBoxFixed">
        {!showCashBox && (
          <>
            <Button className="copoleteBtn" onClick={() => setCashBox(true)}>
              {t("details_page.details_tabs.calender_card.Completereservation")}
            </Button>
            <button
              className="appomentColclousionBtn"
              onClick={() => setShowReservaitonBox(true)}
            >
              {t("details_page.details_tabs.calender_card.Bookingsummary")}
              <ChevronLeftIcon
                sx={{ transform: "rotate(90deg)", marginX: "10px" }}
              />
            </button>
          </>
        )}
        {showCashBox && (
          <Button className="copoleteBtn"> {t("paymentpage.Paynow")} </Button>
        )}
      </Box>
      <>
        {showReservaitonBox && (
          <Box
            className="layoutBox"
            onClick={() => setShowReservaitonBox(false)}
          ></Box>
        )}
        <CSSTransition
          in={showReservaitonBox}
          timeout={300}
          classNames="slide-up"
          unmountOnExit
        >
          <Box className="BoxReservationXs slide-up">
            <ReservaitonBox />
          </Box>
        </CSSTransition>
      </>

      {showCashBox && (
        <Box className="layoutBox" onClick={() => setCashBox(false)}></Box>
      )}
      <CSSTransition
        in={showCashBox}
        timeout={300}
        classNames="slide-up"
        unmountOnExit
      >
        <Box className="BoxReservationXsCash slide-up">
          {/* <VisaCard /> */}
          <CreditCard />
        </Box>
      </CSSTransition>
    </>
  );
};

export default PaymentXs;
