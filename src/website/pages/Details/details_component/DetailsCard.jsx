import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography, Select, MenuItem } from "@mui/material";
import "../../../../assets/css/details_card.css";
import DateRange from "./DateRange";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import MultiSelectFeatures from "./MultiSelectFeatures";
import AdditionalServices from "../AdditionalServices";
import OptionalSercices from "./OptionalSercices";
import ReportModal from "../ReportModal";
import WarningIcon from "@mui/icons-material/Warning";
import ChatIcon from "@mui/icons-material/Chat";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const DetailsCard = ({ adInfo }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const handleAdClick = (adInfo) => {
    navigate(`/payment`, { state: { adInfo } });
  };
  const [toggleTask, setToggleTask] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDates, setSelectedDates] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
  const [singleDate, setSingleDate] = useState(true);
  const [modalReportOpen, setModalReportOpen] = useState(false);
  const dateRangeRef = useRef(null);
  const excludedBoxRef = useRef(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "var(--main-color)",
  });
  const [arrivalTime, setArrivalTime] = useState("15:00"); // Initialize arrival time
  const [departureTime, setDepartureTime] = useState("12:00"); // Initialize departure time
  const arrivalTimeOptions = ["15:00", "16:00"]; // i will replace it from back
  const departureTimeOptions = ["12:00", "21:00"]; // i will replace it from back
  const [selectedComfortOptions, setSelectedComfortOptions] = useState([]);

  const handleComfortSelectChange = (selectedValues) => {
    setSelectedComfortOptions(selectedValues);
  };
  const handleReportOpenModal = () => {
    setModalReportOpen(true);
  };

  const handleReportCloseModal = () => {
    setModalReportOpen(false);
  };
  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event.target.value);
  };
  const handleDepartureTimeChange = (event) => {
    setDepartureTime(event.target.value);
  };
  const handleSingleDateChange = () => {
    setSingleDate(true);
  };

  const handleMultiDateChange = () => {
    setSingleDate(false);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  const handleOutsideClick = (event) => {
    if (
      showCalendar &&
      !dateRangeRef.current.contains(event.target) &&
      !excludedBoxRef.current.contains(event.target)
    ) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showCalendar]);

  return (
    <>
      <Box className="card_container">
        <Box className="card_container_Box">
          <Box className="d_flex_justifu">
            <span>
              <span style={{ fontSize: "30px", color: "var(--main-color)" }}>
                400{" "}
              </span>
              {t("Rial")}
            </span>
            <span className="font_Gray">شهري/سنوي</span>
          </Box>
          <Box className="d_flex_justifu" sx={{ marginTop: "10px" }}>
            <Typography>
              {t("total")}
              <span className="font_Black_weight_700">444</span>
              {t("Rial")}
            </Typography>
            <Typography className="font_Gray">المدة/ 6أشهر</Typography>
          </Box>
        </Box>
        <Box className="box_divder"></Box>
        <div className="radio-buttons">
          <Box component="div" className="radio-button-container">
            <input
              type="radio"
              id="singleDate"
              value="singleDate"
              checked={singleDate}
              onChange={handleSingleDateChange}
              className="radio-button"
            />
            <label
              htmlFor="singleDate"
              className={`custom-radio ${singleDate ? "active" : ""}`}
            >
              <AccessAlarmIcon sx={{ marginX: "4px" }} />
              بالساعات
            </label>
          </Box>

          <Box component="div" className="radio-button-container">
            <input
              type="radio"
              id="multiDate"
              value="multiDate"
              checked={!singleDate}
              onChange={handleMultiDateChange}
              className="radio-button"
            />
            <label
              htmlFor="multiDate"
              className={`custom-radio ${!singleDate ? "active" : ""}`}
            >
              <CalendarMonthIcon sx={{ marginX: "4px" }} />
              شهري | سنوي
            </label>
          </Box>
        </div>
        <Box className="box_padding">
          <Box className="d_flex_spaceBetween">
            <span style={{ fontSize: "15px", fontWeight: "800" }}>
              {t("day")}
            </span>
            <span style={{ fontSize: "13px", color: "rgb(120, 120, 131)" }}>
              {t("details_page.details_tabs.calender_card.change_date")}
            </span>
          </Box>
          <Box className="Box_time">
            <Box className="Box_time_border">
              <Box sx={{ width: "100%", display: "flex" }} ref={excludedBoxRef}>
                <Box
                  sx={{
                    width: "50%",
                    padding: "5px",
                    position: "relative",
                    "&:after": {
                      content: "''",
                      position: "absolute",
                      rigth: i18n.language === "ar" ? "0px" : "100%",
                      // right: "0px",
                      bottom: "0px",
                      backgroundColor: "rgb(186, 189, 210)",
                      width: "0.5px",
                      height: "36px",
                    },
                  }}
                >
                  <span style={{ fontSize: "13px", color: "#4a4848" }}>
                    {t(
                      "details_page.details_tabs.calender_card.date_of_arrival"
                    )}
                  </span>
                  <input
                    type="text"
                    placeholder="Select date range"
                    onClick={toggleCalendar}
                    onChange={toggleCalendar}
                    value={`${dateRange.startDate.toLocaleDateString()} `}
                    style={{ width: "100%", cursor: "pointer" }}
                  />
                </Box>
                <Box sx={{ width: "50%", padding: "5px" }}>
                  <span style={{ fontSize: "13px", color: "#4a4848" }}>
                    {t(
                      "details_page.details_tabs.calender_card.departure_date"
                    )}
                  </span>
                  <input
                    type="text"
                    placeholder="Select date range"
                    onClick={toggleCalendar}
                    onChange={toggleCalendar}
                    value={` ${dateRange.endDate.toLocaleDateString()}`}
                    style={{ width: "100%", cursor: "pointer" }}
                  />
                </Box>
              </Box>
              <div ref={dateRangeRef}>
                {showCalendar && (
                  <DateRange
                    showCalendar={showCalendar}
                    setShowCalendar={setShowCalendar}
                    dateRange={dateRange}
                    setDateRange={setDateRange}
                    singleDate={singleDate}
                    selectedDates={selectedDates}
                    setSelectedDates={setSelectedDates}
                  />
                )}
              </div>
            </Box>
          </Box>
        </Box>
        <Box className="box_divder"></Box>
        {selectedDates.length > 0 && (
          <Box className="box_padding">
            <Box className="d_flex_spaceBetween">
              <Box sx={{ width: "50%", paddingRight: "8px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgb(120, 120, 131)",
                    fontWeight: "500",
                  }}
                >
                  وقت الوصول
                  <br />
                </span>
                {singleDate ? (
                  <Select
                    value={arrivalTime}
                    onChange={handleArrivalTimeChange}
                    sx={{ width: "100%" }}
                  >
                    {arrivalTimeOptions.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                    {/* Add more time options here */}
                  </Select>
                ) : (
                  <span style={{ fontWeight: "bold" }}>03:00 مساءا</span>
                )}
              </Box>
              <Box sx={{ width: "50%", paddingRight: "8px" }}>
                <span
                  style={{
                    fontSize: "13px",
                    color: "rgb(120, 120, 131)",
                    fontWeight: "500",
                  }}
                >
                  وقت المغادرة
                  <br />
                </span>
                {singleDate ? (
                  <Select
                    value={departureTime}
                    onChange={handleDepartureTimeChange}
                    sx={{ width: "100%" }}
                  >
                    {departureTimeOptions.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                    {/* Add more time options here */}
                  </Select>
                ) : (
                  <span style={{ fontWeight: "bold" }}>03:00 مساءا</span>
                )}
              </Box>
            </Box>
          </Box>
        )}
        <Box className="box_divder"></Box>
        <Box className="box_padding">
          {/* <p className="comfort_title">اختر اضافات للراحة في مكتبك</p> */}
          {/* <MultiSelectFeatures
          adInfo={adInfo}
          selectedComfortOptions={selectedComfortOptions}
          setSelectedComfortOptions={setSelectedComfortOptions}
          handleComfortSelectChange={handleComfortSelectChange}
        /> */}
          <AdditionalServices />
          <OptionalSercices
            selectedServices={selectedServices}
            setSelectedServices={setSelectedServices}
          />
        </Box>
        <Box className="box_divder"></Box>
        <Box className="box_padding">
          <button onClick={() => handleAdClick(adInfo)} className="btn_choose">
            {t("details_page.details_tabs.calender_card.choose")}
          </button>
          <Box
            sx={{
              textAlign: "center",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            {t("details_page.details_tabs.calender_card.pay_now")} 444{" "}
            {t("Rial")}
          </Box>
          <Box
            className="d_flex_spaceBetween"
            sx={{
              fontSize: "18px",
            }}
          >
            <span style={{ marginLeft: "5px" }}>
              يوم كامل × 400 {t("Rial")}
            </span>
            <span>400 {t("Rial")}</span>
          </Box>
          <Box
            className="d_flex_spaceBetween"
            sx={{
              marginY: "10px",
            }}
          >
            <Box>
              {" "}
              {t("details_page.details_tabs.calender_card.service_fees")}
              <button
                className="toggle_task"
                onClick={() => setToggleTask(!toggleTask)}
              >
                ?
              </button>
            </Box>
            <Box style={{ fontSize: "15px", color: "rgba(0, 0, 0, 0.54)" }}>
              +44 {t("Rial")}
            </Box>
          </Box>
          {toggleTask && (
            <Typography sx={{ fontSize: "12px" }}>
              {t("details_page.details_tabs.calender_card.help_us")}
            </Typography>
          )}
        </Box>
        <Box className="box_divder"></Box>
        <Box className="box_padding">
          <Box className="d_flex_spaceBetween">
            <span> {t("details_page.details_tabs.calender_card.total")}</span>
            <span>400 {t("currency")}</span>
          </Box>
        </Box>
      </Box>
      <div>
        <button
          className="chat_button"
          onClick={handleReportOpenModal}
          // disabled={!userToken && !adInfo?.can_report}
        >
          <WarningIcon
            sx={{
              color: "var(--green-color)",
              marginLeft: lang === "ar" && "15px",
              marginRight: lang === "en" && "15px",
            }}
          />
          {t("details_page.details_card.report_button")}
        </button>
        <button className="chat_button">
          <ChatIcon className="icon_style" />
          تواصل مع المكتب
        </button>
      </div>
      <ReportModal
        open={modalReportOpen}
        onClose={handleReportCloseModal}
        adID={adInfo?.id}
      />
    </>
  );
};

export default DetailsCard;
