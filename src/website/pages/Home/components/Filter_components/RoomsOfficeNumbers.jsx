import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const RoomsOfficeNumbers = ({
  id,
  title,
  items,
  setFilter,
  setSelectedItemMeeting,
  setSelectedItemOffice,
  setSelectedItemBathroom,
  selectedItemoffice,
  selectedItemMeeting,
  selectedItemBathroom,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const handleItemClick = (title, itemId, itemNum) => {
    if (title === t("dashboard.Offices.offices")) {
      setSelectedItemOffice((prevSelectedItem) =>
        prevSelectedItem && prevSelectedItem.num === itemNum
          ? ""
          : { itemId, num: itemNum }
      );
    } else if (title === t("home.FilterModal.Meetings")) {
      setSelectedItemMeeting((prevSelectedItem) =>
        prevSelectedItem && prevSelectedItem.num === itemNum
          ? ""
          : { itemId, num: itemNum }
      );
    } else if (title === t("home.FilterModal.Bathrooms")) {
      setSelectedItemBathroom((prevSelectedItem) =>
        prevSelectedItem && prevSelectedItem.num === itemNum
          ? ""
          : { itemId, num: itemNum }
      );
    }
  };

  return (
    <Box>
      <span>{title}</span>
      <Box sx={{ display: "flex", margin: "1rem" }}>
        {items?.map((item, index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleItemClick(title, id, item.num)}
            sx={{
              backgroundColor:
                title === t("dashboard.Offices.offices") &&
                selectedItemoffice &&
                selectedItemoffice.num === item.num
                  ? "black"
                  : title === t("home.FilterModal.Meetings") &&
                    selectedItemMeeting &&
                    selectedItemMeeting.num === item.num
                  ? "black"
                  : title === t("home.FilterModal.Bathrooms") &&
                    selectedItemBathroom &&
                    selectedItemBathroom.num === item.num
                  ? "black"
                  : "transparent",
              color:
                title === t("dashboard.Offices.offices") &&
                selectedItemoffice &&
                selectedItemoffice.num === item.num
                  ? "white"
                  : title === t("home.FilterModal.Meetings") &&
                    selectedItemMeeting &&
                    selectedItemMeeting.num === item.num
                  ? "white"
                  : title === t("home.FilterModal.Bathrooms") &&
                    selectedItemBathroom &&
                    selectedItemBathroom.num === item.num
                  ? "white"
                  : "inherit",
              marginRight: "8px",
              borderRadius: "24px !important",
              "&:hover": {
                backgroundColor:
                  title === t("dashboard.Offices.offices") &&
                  selectedItemoffice &&
                  selectedItemoffice.num === item.num
                    ? "black !important"
                    : title === t("home.FilterModal.Meetings") &&
                      selectedItemMeeting &&
                      selectedItemMeeting.num === item.num
                    ? "black !important"
                    : title === t("home.FilterModal.Bathrooms") &&
                      selectedItemBathroom &&
                      selectedItemBathroom.num === item.num
                    ? "black !important"
                    : "white !important",
                color:
                  title === t("dashboard.Offices.offices") &&
                  selectedItemoffice &&
                  selectedItemoffice.num === item.num
                    ? "white !important"
                    : title === t("home.FilterModal.Meetings") &&
                      selectedItemMeeting &&
                      selectedItemMeeting.num === item.num
                    ? "white !important"
                    : title === t("home.FilterModal.Bathrooms") &&
                      selectedItemBathroom &&
                      selectedItemBathroom.num === item.num
                    ? "white !important"
                    : "inherit !important",
              },
            }}
          >
            {item.num}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default RoomsOfficeNumbers;
