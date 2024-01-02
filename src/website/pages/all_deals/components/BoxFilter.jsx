import React, { useState } from "react";
import { Box, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../../../assets/css/box_filter.css";

const filterItems = [
  {
    title: "المكان",
    description: "البحث عن واجهات",
    menu: ["الرياض", "جدة", "مكة", "دمام"],
  },
  { title: "النوع", description: "البحث عن واجهات", menu: ["2", "l;jf1"] },
  { title: "السعر", description: "البحث عن واجهات", menu: ["2000", "3000"] },
];

const FilterItem = ({
  title,
  description,
  onClick,
  isOpen,
  menuItems,
  selectedValue,
  handleMenuItemClick,
}) => {
  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <Box className="d_flex_col" onClick={onClick}>
        <span className="font_bold_purble">{title}</span>
        <span className="font_gray">{selectedValue || description}</span>
      </Box>
      {isOpen && (
        <Paper elevation={3} className="paperContainer">
          {menuItems.map((item, index) => (
            <p
              key={index}
              className="menuSelect"
              onClick={() => handleMenuItemClick(item)}
            >
              {item}
            </p>
          ))}
        </Paper>
      )}
    </Box>
  );
};

const BoxFilter = () => {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});

  const handleFilterClick = (index) => {
    setOpenFilter((prev) => (prev === index ? null : index));
  };

  const handleMenuItemClick = (item, index) => {
    setSelectedValues((prev) => ({ ...prev, [index]: item }));
    setOpenFilter(null);
  };

  return (
    <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
      <Box className="boxBorder">
        {filterItems.map((item, index) => (
          <FilterItem
            key={index}
            {...item}
            onClick={() => handleFilterClick(index)}
            isOpen={openFilter === index}
            menuItems={item.menu}
            selectedValue={selectedValues[index]}
            handleMenuItemClick={(item) => handleMenuItemClick(item, index)}
          />
        ))}
        <Box className="search_box">
          <SearchIcon
            sx={{
              fontSize: "1.5rem",
              color: "#fff",
              margin: "auto",
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BoxFilter;
