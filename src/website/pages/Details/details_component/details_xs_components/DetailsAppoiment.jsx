import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  MenuItem,
  Select,
} from "@mui/material";
import { Pen, Warning } from "../../../../../assets/icons";
import DateRange from "../DateRange";
import { useTranslation } from "react-i18next";

const DetailsAppoiment = ({adInfo}) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const dateRangeRef = useRef();
  const [selectedDates, setSelectedDates] = useState([]);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "var(--main-color)",
  });
  const singleDate = false;
  const [arrivalTime, setArrivalTime] = useState("15:00"); // Initialize arrival time
  const [departureTime, setDepartureTime] = useState("12:00"); // Initialize departure time
  const arrivalTimeOptions = ["15:00", "16:00"]; // i will replace it from back
  const departureTimeOptions = ["12:00", "21:00"]; // i will replace it from back

  const handleArrivalTimeChange = (event) => {
    setArrivalTime(event.target.value);
  };
  const handleDepartureTimeChange = (event) => {
    setDepartureTime(event.target.value);
  };

  const { t, i18n } = useTranslation();
  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };
  return (
    <>
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
          <Box
            sx={{
              display: "flex",
              color: "rgba(0, 0, 0, 0.54)",
              width: "9rem",
              fontSize: "15px",
            }}
            onClick={toggleCalendar}
          >
            <img
              src={Pen}
              alt="pen_img"
              style={{ width: "10px", marginLeft: "6px" }}
            />
            <span>
              {" "}
              {t("details_page.details_tabs.calender_card.change_the_date")}
            </span>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ width: "50%", marginY: "1rem" }}>
            <Typography
              sx={{ fontWeight: "500", marginBottom: "5px", fontSize: "14px" }}
            >
              {t("details_page.details_tabs.calender_card.date_of_arrival")}
            </Typography>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
              {dateRange.startDate.toLocaleDateString()}
            </Typography>
          </Box>
          <Box sx={{ width: "50%", marginY: "1rem" }}>
            <Typography
              sx={{ fontWeight: "500", marginBottom: "5px", fontSize: "14px" }}
            >
              {t("details_page.details_tabs.calender_card.departure_date")}
            </Typography>
            <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
              {dateRange.endDate.toLocaleDateString()}
            </Typography>
          </Box>
          {selectedDates.length > 0 && (
            <>
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
                {singleDate ? (
                  <Select
                    value={arrivalTime}
                    onChange={handleArrivalTimeChange}
                    sx={{ width: "95%" }}
                  >
                    {arrivalTimeOptions.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                    {/* Add more time options here */}
                  </Select>
                ) : (
                  <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
                    1:00 مساءً
                  </Typography>
                )}
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
                {singleDate ? (
                  <Select
                    value={departureTime}
                    onChange={handleDepartureTimeChange}
                    sx={{ width: "95%" }}
                  >
                    {departureTimeOptions.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                    {/* Add more time options here */}
                  </Select>
                ) : (
                  <Typography sx={{ color: "rgba(0, 0, 0, 0.54)" }}>
                    03:00 صباحا
                  </Typography>
                )}
              </Box>
            </>
          )}
        </Box>
        <Box sx={{ display: "flex", marginY: "1rem" }}>
          <img src={Warning} alt="warning" />
          <span
            style={{ fontSize: "14px", marginRight: "5px", marginLeft: "5px" }}
          >
            لغاء مجاني قبل وقت الوصول بـ 4 ايام
          </span>
        </Box>
      </Box>

      <div ref={dateRangeRef}>
        <Modal
          open={showCalendar}
          onClose={toggleCalendar}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <div style={{ position: "relative" }}>
            {showCalendar && (
              <DateRange
                showCalendar={showCalendar}
                setShowCalendar={setShowCalendar}
                dateRange={dateRange}
                singleDate={singleDate}
                setDateRange={setDateRange}
                selectedDates={selectedDates}
                setSelectedDates={setSelectedDates}
              />
            )}
          </div>
        </Modal>
      </div>
    </>
  );
};

export default DetailsAppoiment;
