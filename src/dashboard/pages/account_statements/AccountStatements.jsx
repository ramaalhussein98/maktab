import React, { useState } from "react";
import { Box, Divider, Paper, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useTranslation } from "react-i18next";
const AccountStatements = () => {
  const { t, i18n } = useTranslation();
  const [showEntireBox, setShowEntireBox] = useState(false);
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.down("md"));
  const rowTitles = [
    { width: "10%", label: t("dashboard.Accountstatements.date") },
    { width: "50%", label: t("dashboard.Accountstatements.Statement") },
    { width: "20%", label: t("dashboard.Accountstatements.Balance") },
    { width: "20%", label: t("dashboard.Invoices.theamount") },
  ];
  const rowsdata = [
    {
      date: { width: "10%", label: "12-11-2022" },
      statement: {
        width: "50%",
        label:
          "12-11-2022 إضافة مبلغ مدفوع لحجز مؤكد رقم 12345 - حديقة الفن -  قاعة مناسبات صغيرة",
      },
      balance: { width: "20%", label: "698.00" },
      amount: { width: "20%", label: "44666 " },
    },
    {
      date: { width: "10%", label: "12-11-2022" },
      statement: {
        width: "50%",
        label:
          "12-11-2022 إضافة مبلغ مدفوع لحجز مؤكد رقم 12345 - حديقة الفن -  قاعة مناسبات صغيرة",
      },
      balance: { width: "20%", label: "698.00" },
      amount: { width: "20%", label: "44666 " },
    },
    // Add more rows as needed
  ];
  const toggleMenu = () => {
    setShowEntireBox(true);
  };
  const toggleClose = () => {
    setShowEntireBox(false);
  };
  return (
    <div className="d_flex">
      {isXS ? (
        <div
          style={{
            position: "absolute",
            padding: "1rem",
            zIndex: "1",
            cursor: "pointer",
            right: "1rem",
            zIndex: "2",
          }}
        >
          {!showEntireBox && <FilterListIcon onClick={toggleMenu} />}
          {showEntireBox && <CloseIcon onClick={toggleClose} />}
        </div>
      ) : null}
      {!isXS || showEntireBox ? (
        <Box
          className="calender"
          sx={{
            width: { xs: "50% !important", md: "25% !important" },
            position: isXS ? "fixed !important" : "",
          }}
        >
          <p className="titleSelectPeriod" style={{ marginTop: "1rem" }}>
            {t("dashboard.Accountstatements.Latestaccountstatements")}
          </p>
          <select className="calenderSelect">
            <option>شهر نوفمبر 2022</option>
            <option>شهر اكتوبر 2022</option>
          </select>
        </Box>
      ) : null}
      <div style={{ width: "100%" }}>
        <Paper className="paperSatement">
          <Typography variant="h6" sx={{ marginY: "1rem" }}>
            {t("dashboard.Accountstatements.Monthly")} نوفمبر 2022
          </Typography>
          <div style={{ textAlign: "center" }}>
            <span className="font_gray">
              {" "}
              {t("from")} 01 نوفيلا {t("to")} 01 ديسمير
            </span>
            <div>
              <span>
                {" "}
                {t("dashboard.Accountstatements.balancefirstduration")}
              </span>
              <span className="font_bold">1500 {t("Rial")} </span>
              <span style={{ marginRight: "10px" }}>
                {" "}
                {t("dashboard.Accountstatements.balancelastduration")}
              </span>
              <span className="font_bold">1500 {t("Rial")} </span>
            </div>
          </div>
        </Paper>
        <Paper sx={{ width: { xs: "800px", md: "100%" } }}>
          <div
            style={{
              display: "flex",
              textAlign: "center",
            }}
          >
            {rowTitles.map((data, index) => (
              <div
                key={index}
                className="font_bold"
                style={{
                  width: data.width,
                  position: "relative",
                  padding: "1rem 10px",
                }}
              >
                {data.label}
                <span
                  style={{
                    content: '""',
                    position: "absolute",
                    width: "1px",
                    height: "100%",
                    backgroundColor: "#eee",
                    left: 0,
                    top: 0,
                  }}
                />
              </div>
            ))}
          </div>
          <Divider />
          <div
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
            }}
          >
            {rowsdata.map((data, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                }}
              >
                <div
                  style={{
                    width: data.date.width,
                    position: "relative",
                    padding: "1rem 10px ",
                  }}
                >
                  {data.date.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: data.statement.width,
                    position: "relative",
                    padding: "1rem 10px ",
                  }}
                >
                  {data.statement.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: data.balance.width,
                    position: "relative",
                    padding: "1rem 10px ",
                  }}
                >
                  {data.balance.label}
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
                <div
                  style={{
                    width: data.amount.width,
                    position: "relative",
                    padding: "1rem 10px ",
                    fontWeight: "600",
                    color: "var(--green-color)",
                  }}
                >
                  {data.amount.label} +
                  <span
                    style={{
                      content: '""',
                      position: "absolute",
                      width: "1px",
                      height: "100%",
                      backgroundColor: "#eee",
                      left: 0,
                      top: 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Paper>
        <Paper className="paperTotalPrice">
          <span className="font_bold" style={{ marginRight: "13rem" }}>
            {t("dashboard.Accountstatements.Totalaccountstatement")}
          </span>
          <span
            className="color_Green font_bold"
            style={{ marginRight: "13rem" }}
          >
            15000 {t("Rial")}
          </span>
        </Paper>
      </div>
    </div>
  );
};

export default AccountStatements;
