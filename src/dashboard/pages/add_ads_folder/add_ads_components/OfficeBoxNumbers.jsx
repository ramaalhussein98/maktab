// OfficeBoxNumbers.jsx
import { Box, Paper } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const OfficeBoxNumbers = ({ title, numbers }) => {
  const [showMoreNumberBox, setShowMoreNumberBox] = useState(false);
  const [selectedBox, setSelectedBox] = useState(null);
  const { t } = useTranslation();
  const handleBoxClick = (number, index) => {
    if (selectedBox === index) {
      setSelectedBox(null);
    } else {
      setSelectedBox(index);
    }
    if (showMoreNumberBox && index < 5) {
      setShowMoreNumberBox(false);
    }
    console.log(number);
  };

  return (
    <Box>
      <span style={{ fontWeight: "500" }}>{title}</span>
      <div className="BoxNumberDetails">
        {numbers.map((number, index) => (
          <Box
            key={index}
            onClick={() => handleBoxClick(number, index)}
            className={
              selectedBox === index ? "selectedBox BoxStyle" : "BoxStyle"
            }
          >
            {number}
          </Box>
        ))}
        <div style={{ position: "relative" }}>
          <Box
            className="BoxStyle moreBox"
            onClick={() => setShowMoreNumberBox(!showMoreNumberBox)}
          >
            {t("dashboard.contract.more")}
          </Box>
          {showMoreNumberBox && (
            <Paper className="moreNumberBox">
              {[6, 8, 9, "+10"].map((number, index) => (
                <div
                  key={index}
                  onClick={() => handleBoxClick(number, index + 5)}
                  className={
                    selectedBox === index + 5
                      ? "selectedBox BoxStyleMore"
                      : "BoxStyleMore"
                  }
                >
                  <Box sx={{ width: "100%" }}>{number}</Box>
                </div>
              ))}
            </Paper>
          )}
        </div>
      </div>
    </Box>
  );
};

export default OfficeBoxNumbers;
