import React, { useState, useEffect } from "react";
import { Box, Paper } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import "../../../../assets/css/box_filter.css";
// import "../../../../assets/css/layout.css";
import FilterItem from "./FilterItem";
import { BlackRed } from "../../../../assets/logos";
import { Link } from "react-router-dom";
import LoginButton from "../../../../ui/LoginButton";
import LanguageBtn from "../../../../ui/LanguageBtn";
const searchData = JSON.parse(localStorage.getItem("searchData"));
const OfficesFeatures = searchData?.featurea_ads;
const CatgoryData = searchData?.category_aqar;
const cityData = searchData?.cities;
const filterItems = [
  {
    title: "المكان",

    menu: [
      { id: "", ar_name: "اختر المكان" },
      ...(cityData ? cityData : []),
      // { id: 1, ar_name: "رياض", en_name: "Riyadh" },
      // { id: 2, ar_name: "جدة", en_name: "Makkah" },
    ],
  },
  {
    title: "النوع",

    menu: [
      { id: "", ar_name: "اختر النوع" },
      ...(CatgoryData ? CatgoryData : []),
    ],
  },
  {
    title: "السعر",

    menu: [
      { ar_name: "اختر السعر" }, // Placeholder item
      [100, 1000],
      [1000, 2000],
      [3000, 4000],
    ],
  },
];
const BoxFilter = ({ setFilter, refetch }) => {
  const [openFilter, setOpenFilter] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const isLoggedIn = localStorage.getItem("user_token") ? true : false;
  const handleFilterClick = (index) => {
    setOpenFilter((prev) => (prev === index ? null : index));
  };
  const handleMenuItemClick = (item, index) => {
    let selectedValue;

    if (Array.isArray(item)) {
      selectedValue = `${item[0]} - ${item[1]}`;
    } else {
      selectedValue = item.ar_name || item.city;
    }

    setSelectedFilters((prev) => ({
      ...prev,
      [index]: selectedValue,
    }));
    setOpenFilter(null);
  };
  const handleShowFilterRes = () => {
    setFilter("");
    setFilter((prevState) => {
      const filterParams = {};

      // Handle location
      if (
        selectedFilters[0] !== undefined &&
        selectedFilters[0] !== "" &&
        selectedFilters[0] !== "اختر المكان"
      ) {
        filterParams["exact[location.city]"] = selectedFilters[0];
      }

      // Handle category
      if (
        selectedFilters[1] !== undefined &&
        selectedFilters[1] !== "" &&
        selectedFilters[1] !== "اختر النوع"
      ) {
        filterParams["exact[category_aqar.ar_name]"] = selectedFilters[1];
      }

      // Handle price
      if (
        selectedFilters[2] !== undefined &&
        selectedFilters[2] !== "" &&
        selectedFilters[2] !== "اختر السعر"
      ) {
        filterParams["min[ads_prices.price]"] = encodeURIComponent(
          selectedFilters[2].split(" - ")[0]
        );
        filterParams["max[ads_prices.price]"] = encodeURIComponent(
          selectedFilters[2].split(" - ")[1]
        );
      }

      // Remove properties with undefined or empty values
      Object.keys(filterParams).forEach(
        (key) => filterParams[key] === undefined && delete filterParams[key]
      );

      return filterParams;
    });

    refetch();
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      className={isScrolled ? "boxScrolled" : ""}
      sx={{
        display: { xs: "none", md: "flex" },
        alignItems: "center",
        padding: "0px 70px",
      }}
    >
      {isScrolled && (
        <Box className="logo_box">
          <Link to="/">
            <img src={BlackRed} alt="logo" />
          </Link>
        </Box>
      )}
      <Box
        className="boxBorder"
        sx={{ marginBottom: isScrolled ? "1rem" : "0rem" }}
      >
        {filterItems?.map((item, index) => (
          <FilterItem
            key={index}
            title={item.title}
            // description={item.description}
            onClick={() => handleFilterClick(index)}
            isOpen={openFilter === index}
            menuItems={item.menu}
            selectedValue={selectedFilters[index]}
            handleMenuItemClick={(item) => handleMenuItemClick(item, index)}
          />
        ))}
        <Box className="search_box" onClick={handleShowFilterRes}>
          <SearchIcon
            sx={{
              fontSize: "1.5rem",
              color: "#fff",
              margin: "auto",
            }}
          />
        </Box>
      </Box>
      {isScrolled && (
        <Box className="d-flex">
          <LoginButton isLoggedIn={isLoggedIn} />

          <LanguageBtn />
        </Box>
      )}
    </Box>
  );
};

export default BoxFilter;
