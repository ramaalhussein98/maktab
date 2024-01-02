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
    if (itemId === 1) {
      setSelectedItemOffice((prevSelectedItem) =>
        prevSelectedItem && prevSelectedItem.num === itemNum
          ? ""
          : { itemId, num: itemNum }
      );
    } else if (itemId === 2) {
      setSelectedItemMeeting((prevSelectedItem) =>
        prevSelectedItem && prevSelectedItem.num === itemNum
          ? ""
          : { itemId, num: itemNum }
      );
    } else if (itemId === 3) {
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
            onClick={() => handleItemClick(title, id, item.number)}
            sx={{
              backgroundColor:
                id === 1 &&
                selectedItemoffice &&
                selectedItemoffice.num === item.number
                  ? "black"
                  : id === 2 &&
                    selectedItemMeeting &&
                    selectedItemMeeting.num === item.number
                  ? "black"
                  : id === 3 &&
                    selectedItemBathroom &&
                    selectedItemBathroom.num === item.number
                  ? "black"
                  : "transparent",
              color:
                id === 1 &&
                selectedItemoffice &&
                selectedItemoffice.num === item.number
                  ? "white"
                  : id === 2 &&
                    selectedItemMeeting &&
                    selectedItemMeeting.num === item.number
                  ? "white"
                  : id === 3 &&
                    selectedItemBathroom &&
                    selectedItemBathroom.num === item.number
                  ? "white"
                  : "inherit",
              marginRight: "8px",
              borderRadius: "24px !important",
              "&:hover": {
                backgroundColor:
                  id === 1 &&
                  selectedItemoffice &&
                  selectedItemoffice.num === item.number
                    ? "black !important"
                    : id === 2 &&
                      selectedItemMeeting &&
                      selectedItemMeeting.num === item.number
                    ? "black !important"
                    : id === 3 &&
                      selectedItemBathroom &&
                      selectedItemBathroom.num === item.number
                    ? "black !important"
                    : "white !important",
                color:
                  id === 1 &&
                  selectedItemoffice &&
                  selectedItemoffice.num === item.number
                    ? "white !important"
                    : id === 2 &&
                      selectedItemMeeting &&
                      selectedItemMeeting.num === item.number
                    ? "white !important"
                    : id === 3 &&
                      selectedItemBathroom &&
                      selectedItemBathroom.num === item.number
                    ? "white !important"
                    : "inherit !important",
              },
            }}
          >
            {item.number}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default RoomsOfficeNumbers;
