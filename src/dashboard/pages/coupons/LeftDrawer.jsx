import React, { useEffect, useRef, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import "../../../assets/css/LeftDrawer.css";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Chip,
  Divider,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DateRange from "../../../website/pages/Details/details_component/DateRange";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import myAxios from "../../../api/myAxios";
import { useQueryHook } from "../../../hooks/useQueryHook";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, selectedUnits, theme) {
  return {
    fontWeight:
      selectedUnits.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const LeftDrawer = ({ open, toggleDrawer, selectedOffice }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedPriceValue, setSelectedPriceValue] = useState("نسبة");
  const pricesType = JSON.parse(localStorage.getItem("searchData"))?.type_res;

  const [selectedDays, setSelectedDays] = useState([]);

  const dateRangeRef = useRef(null);
  const excludedBoxRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState([]);
  const [showCalendar, setShowCalendar] = useState(false);

  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
    color: "var(--main-color)",
  });

  const singleDate = false;
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  console.log(selectedDays);
  const handleDayClick = (day) => {
    console.log(day);
    if (day == 0) {
      setSelectedDays([0]);
    } else {
      if (selectedDays.find((ele) => ele == day)) {
        setSelectedDays(selectedDays.filter((d) => d != day));
      } else {
        if (selectedDays == 0) {
          setSelectedDays([day]);
        } else {
          setSelectedDays([...selectedDays, day]);
        }
      }
    }
  };

  const handleSelectPriceChange = (event) => {
    setSelectedPriceValue(event.target.value);
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

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
  };

  useEffect(() => {
    const startDateText = dateRange.startDate.toLocaleDateString();
    const endDateText = dateRange.endDate.toLocaleDateString();
    setStartDate(dateRange.startDate.toLocaleDateString());
    setEndDate(dateRange.endDate.toLocaleDateString());
    const newText = ` من ${startDateText} إلى ${endDateText}`;
    const element = document.getElementById("dateBtnText");
    if (element) {
      element.innerHTML = newText;
    }
  }, [dateRange]);

  const theme = useTheme();

  const [selectedUnits, setSelectedUnits] = useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedUnits(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [numberCount, setNumberCount] = useState();
  return (
    <>
      <div>
        <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
          <div
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            className="DrawerWidth"
          >
            <div className="DrawerTitleDiv">
              <span>
                {lang === "ar" ? "اضافة كوبون جديد" : "add new coupon"}
              </span>
              <button onClick={toggleDrawer(false)}>
                <CloseIcon />
              </button>
            </div>
          </div>
          <Divider />

          {/* this for offer name  */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">{lang === "ar" ? "الكود" : "code"} </p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={lang === "ar" ? "كود الكوبون" : "coupon code"}
              className="input_style"
            />
            <Divider />
          </div>
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">{lang === "ar" ? "الكود" : "code"} </p>
            <input
              type="number"
              value={numberCount}
              onChange={(e) => setNumberCount(e.target.value)}
              placeholder={lang === "ar" ? "كود الكوبون" : "coupon code"}
              className="input_style"
            />
            <Divider />
          </div>
          {/* this for select unit */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">
              {lang === "ar"
                ? " الوحدات التي تريد أن يطبق عليها الكوبون"
                : "unit that the coupon should apply "}
            </p>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={selectedUnits}
              className="input_style"
              sx={{
                width: "100%",
              }}
              onChange={handleChange}
              input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value.id} label={value.title} />
                  ))}
                </Box>
              )}
              MenuProps={MenuProps}
            >
              {selectedOffice?.units?.map((ele) => (
                <MenuItem
                  key={ele.id}
                  value={ele}
                  style={getStyles(ele, selectedUnits, theme)}
                >
                  {ele.title}
                </MenuItem>
              ))}
            </Select>

            <Divider />
          </div>
          {/* this for قيمة الخصم unit */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">
              {" "}
              {t("dashboard.prices.discountvalue")}
            </p>
            <div style={{ display: "flex", gap: "13px" }}>
              <select
                id="discount"
                name="discount"
                className="select_style"
                value={selectedPriceValue}
                onChange={handleSelectPriceChange}
                style={{ width: "60%" }}
              >
                <option value="نسبة">{t("dashboard.prices.percent")}</option>
                <option value="سعر">{t("dashboard.prices.price")}</option>
              </select>
              <div style={{ position: "relative", width: "100%" }}>
                <input
                  type="number"
                  placeholder={t("dashboard.prices.discountvalue")}
                  className="input_style"
                  style={{
                    appearance: "none",
                    WebkitAppearance: "none",
                    MozAppearance: "textfield",
                  }}
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                />
                {selectedPriceValue === "نسبة" ? (
                  <span className="percentSpan">%</span>
                ) : (
                  <span className="percentSpan">{t("Rial")}</span>
                )}
              </div>
            </div>

            <Divider />
          </div>
          {/* this for date   */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700"> {t("dashboard.prices.offerDate")}</p>
            <p className="p_gray_18">{t("dashboard.prices.offerapply")}</p>
            <div style={{ position: "relative" }} ref={excludedBoxRef}>
              <div className="dateBtnStyle" onClick={toggleCalendar}>
                <span id="dateBtnText">
                  {t("dashboard.prices.selectdate")}{" "}
                </span>
                <CalendarTodayIcon />
              </div>
              <p
                className="p_gray_18"
                style={{
                  fontSize: "12px",
                  marginTop: "10px",
                  marginBottom: "25px",
                }}
              >
                {t("dashboard.prices.selectunitirst")}
              </p>
            </div>
            <div
              ref={dateRangeRef}
              style={{
                position: "fixed",
                left: "0px",
                zIndex: "1",
                top: "60%",
              }}
            >
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
            <Divider />
          </div>
          {/* this for days   */}
          <div style={{ padding: "24px 24px 0px" }}>
            <p className="font_18_700">{t("dashboard.prices.offerdays")}</p>
            <div className="div_btns_days">
              <div className="div_btns_days">
                <button
                  className={
                    selectedDays.some((e) => e === 0)
                      ? "selectedDay button1"
                      : "button1"
                  }
                  onClick={() => handleDayClick(0)}
                >
                  {t("dashboard.prices.all")}
                </button>
                {pricesType.map((ele) => (
                  <button
                    key={ele.id}
                    className={
                      selectedDays.some((e) => e === ele.id)
                        ? "selectedDay button1"
                        : "button1"
                    }
                    onClick={() => handleDayClick(ele.id)}
                  >
                    {lang === "ar" ? ele.ar_name : ele.en_name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {/* this button submit cancel */}
          <div className="BoxBtnSubmit">
            <button className="submit"> {t("save")}</button>
            <button className="cancel" onClick={toggleDrawer(false)}>
              {t("cancel")}
            </button>
          </div>
        </Drawer>
      </div>
    </>
  );
};

export default LeftDrawer;
