import React, { useState } from "react";
import "../../../assets/css/details_card.css";
import {
  Box,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import PaymentSlider from "./PaymentSlider";
import PaymentSliderXs from "./PaymentSliderXs";
import ReservaitonBox from "./reservaitonBox";

const PaymentCard = () => {
  const { t, i18n } = useTranslation();
  const [arrivalTime, setArrivalTime] = useState("15:00"); // Initialize arrival time
  const [departureTime, setDepartureTime] = useState("12:00"); // Initialize departure time
  return (
    <div className="card_container">
      <PaymentSliderXs />
      <Box className="card_container_Box">
        <b style={{ fontSize: "20px", color: "var(--main-color)" }}>400 </b>
        {t("Rial")}/ ليلة
        <Box sx={{ marginTop: "10px" }}>
          <Typography className="font_Gray">
            إجمالي
            <span className="font_Black_weight_700">444</span>
            {t("currency")}
          </Typography>
        </Box>
      </Box>
      <Box className="box_divder"></Box>
      <Box className="box_padding">
        <Box className="Box_time">
          <Box className="Box_time_border">
            <Box
              className="d_flex_spaceBetween"
              style={{ width: "100%", height: "100%" }}
            >
              <Box
                sx={{
                  width: "50%",
                  paddingRight: "8px",
                }}
              >
                <span className="myCustomText">
                  {t("details_page.details_tabs.calender_card.date_of_arrival")}
                  <br />
                </span>

                <span style={{ fontWeight: "bold" }}>03:00 مساءا</span>
              </Box>
              <Box
                sx={{
                  width: "50%",
                  paddingRight: "8px",
                }}
              >
                <span className="myCustomText">
                  {t("details_page.details_tabs.calender_card.departure_date")}
                  <br />
                </span>

                <span style={{ fontWeight: "bold" }}>03:00 مساءا</span>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box className="box_divder"></Box>
      <Box className="box_padding">
        <Box
          className="d_flex_spaceBetween"
          style={{ width: "100%", height: "100%" }}
        >
          <Box
            sx={{
              width: "50%",
              paddingRight: "8px",
            }}
          >
            <span className="myCustomText">
              {t("details_page.details_tabs.calender_card.time_of_arrival")}
              <br />
            </span>

            <span>03:00 مساءا</span>
          </Box>
          <Box
            sx={{
              width: "50%",
              paddingRight: "8px",
            }}
          >
            <span className="myCustomText">
              {t("details_page.details_tabs.calender_card.departure_time")}
              <br />
            </span>

            <span>03:00 مساءا</span>
          </Box>
        </Box>
      </Box>
      <Box className="box_divder"></Box>
      <Box style={{ textAlign: "center", padding: "1rem" }}>
        {t("details_page.details_tabs.calender_card.pay_now")} 139.60{" "}
        {t("Rial")}
      </Box>
      <ReservaitonBox />
    </div>
  );
};

export default PaymentCard;
