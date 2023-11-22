import { Box, Paper, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";

const ReservaitonBox = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box className="box_padding">
        <Paper sx={{ width: "100%", padding: "20px" }}>
          <span style={{ fontSize: "15px", fontWeight: "800" }}>
            {t("details_page.details_tabs.calender_card.Bookingsummary")}
          </span>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span>ليلة واحدة × 360 {t("Rial")}</span>
            <span>360 {t("Rial")}</span>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <span>
              {" "}
              {t("details_page.details_tabs.calender_card.Servicefees")}
            </span>
            <span style={{ color: "rgba(0, 0, 0, 0.54)" }}>
              +39.6 {t("Rial")}
            </span>
          </Box>
        </Paper>
      </Box>
      <Box className="box_padding">
        <Box className="box_divder"></Box>
        <Box sx={{ marginTop: "10px" }}>
          <span style={{ fontSize: "15px", fontWeight: "500" }}>
            {" "}
            {t("details_page.details_tabs.calender_card.Discountcode")}
          </span>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              marginTop: "10px",
            }}
          >
            <TextField
              id="standard-textarea"
              hiddenLabel
              placeholder="مثال: KERE"
              multiline
            />
            <button
              style={{
                borderRadius: "4px",
                minWidth: "100px",
                marginRight: "20px",
                minHeight: "56px",
                backgroundColor: "#F5F5F5",
                fontWeight: "600",
              }}
            >
              {t("details_page.details_tabs.calender_card.apply")}
            </button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ReservaitonBox;
