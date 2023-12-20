import { Box, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const RoomsOfficeNumbers = ({
  title,
  items,
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
      setSelectedItemOffice({ itemId, title, num: itemNum });
    } else if (title === t("home.FilterModal.Meetings")) {
      setSelectedItemMeeting({ itemId, title, num: itemNum });
    } else if (title === t("home.FilterModal.Bathrooms")) {
      setSelectedItemBathroom({ itemId, title, num: itemNum });
    }
  };

  // useEffect(() => {
  //   console.log("Selected items for", title, ":", selectedItem);
  // }, [selectedItem]);

  return (
    <Box>
      <span>{title}</span>
      <Box sx={{ display: "flex", margin: "1rem" }}>
        {items.map((item , index) => (
          <Button
            key={index}
            variant="contained"
            onClick={() => handleItemClick(title, item.id, item.num)}
            sx={{
              backgroundColor:
              selectedItemoffice.itemId === item.id
                ? "black"
                : selectedItemMeeting.itemId === item.id
                ? "black"
                : selectedItemBathroom.itemId === item.id 
                ? "black"
                : "transparent",
            color:
              selectedItemoffice.itemId === item.id
                ? "white"
                : selectedItemMeeting.itemId === item.id
                ? "white"
                : selectedItemBathroom.itemId === item.id 
                ? "white"
                : "inherit",
              marginRight: "8px",
              borderRadius: "24px !important",
              "&:hover": {
                backgroundColor: "black !important",
                color: "white !important",
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
