import { Box, Button } from "@mui/material";
import React, { useState } from "react";

const RoomsOfficeNumbers = ({ title, items }) => {
  const [selectedItemId, setSelectedItemId] = useState(null);
  const handleItemClick = (itemId) => {
    setSelectedItemId(itemId);
  };
  return (
    <Box>
      <span>{title}</span>
      <Box sx={{ display: "flex", margin: "1rem" }}>
        {items.map((item) => (
          <Button
            key={item.id}
            variant="contained"
            onClick={() => handleItemClick(item.id)}
            sx={{
              backgroundColor:
                selectedItemId === item.id ? "black" : "transparent",
              color: selectedItemId === item.id ? "white" : "inherit",
              marginRight: "8px",
              borderRadius: "24px !important",
              "&:hover": {
                backgroundColor: "white !important",
                color: "black !important",
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
