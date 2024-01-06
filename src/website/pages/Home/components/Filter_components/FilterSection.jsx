import React, { useState, useEffect } from "react";
import FilterSkeleton from "../../../../../ui/FilterSkeleton";
import { Box, Button, Typography } from "@mui/material";
import { Filter, MapIcon, Search } from "../../../../../assets/icons";
import { Link, useLocation } from "react-router-dom";
import FilterSlick from "../FilterSlick";
import FilterModal from "../Modals/FilterModal";
import ListIcon from "@mui/icons-material/List";
import { useTranslation } from "react-i18next";

const FilterSection = ({
  filter,
  refetch,
  setFilter,
  toggleMapAds,
  setToggleMapAds,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [inputSearch, setInputSearch] = useState();
  const isLoading = false;
  const location = useLocation().pathname;
  const isMapPage = location.split("/").includes("map");
  const isAllDealsPage = location.split("/").includes("all_deals");

  const handleFilerModalOpen = () => {
    setOpenFilterModal(true);
  };
  const handleInputChange = (e) => {
    setFilter((prevState) => ({
      "contains[title]": inputSearch,
    }));
  };
  const handleInputBlur = () => {
    if (!inputSearch) {
      setFilter((prevState) => ({
        "contains[title]": "",
      }));
    }
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
    <>
      {/* filters section */}
      <div
        className={`filters_container ${
          isAllDealsPage && isScrolled ? "filter_continerScoreeld" : ""
        }`}
      >
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <FilterSkeleton key={index} />
          ))
        ) : (
          <FilterSlick
            refetch={refetch}
            setFilter={setFilter}
            isAllDealsPage={isAllDealsPage}
          />
        )}
        <div className="filter_btn_search_input_div">
          <Button className="filter_btn" onClick={handleFilerModalOpen}>
            <img src={Filter} alt="filter img" className="filter_btn_img" />
            <Typography sx={{ display: { xs: "none", md: "flex" } }}>
              {t("home.FilterModal.Filter_Factors")}
            </Typography>
          </Button>

          <Box
            className="searchBox"
            sx={{
              display: { xs: "flex", md: isAllDealsPage ? "none" : "block" },
            }}
          >
            <div className="searchBoxBorder">
              <span>
                <div className="addvistor">
                  <input
                    value={inputSearch}
                    type="text"
                    onChange={(event) => setInputSearch(event.target.value)}
                    onBlur={handleInputBlur}
                    style={{
                      width: "100%",
                      outline: "none",
                      backgroundColor: "transparent",
                    }}
                  />
                  <Box className="searchIcon" onClick={handleInputChange}>
                    <img src={Search} />
                  </Box>
                </div>
              </span>
            </div>
          </Box>
        </div>
        {/* button map */}
        {toggleMapAds ? (
          <Button
            className="mapButton"
            sx={{
              display: { xs: "none !important", md: "flex !important" },
            }}
            onClick={() => setToggleMapAds(!toggleMapAds)}
          >
            {t("displayMenu")}
            <ListIcon sx={{ color: "white", marginX: "5px" }} />
          </Button>
        ) : (
          <Button
            className="mapButton"
            sx={{
              display: { xs: "none !important", md: "flex !important" },
              marginRight: "20px !important",
            }}
            onClick={() => setToggleMapAds(!toggleMapAds)}
          >
            {t("displayMap")}
            <img src={MapIcon} className="img1" style={{ width: "16px" }} />
          </Button>
        )}
        {/* {isAllDealsPage && (
          <Link className="mapButton" to="/map">
            {" "}
            {t("displayMap")}
            <img src={MapIcon} className="img1" style={{ width: "16px" }} />
          </Link>
        )} */}
      </div>
      <FilterModal
        filter={filter}
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
        refetch={refetch}
        setFilter={setFilter}
      />
    </>
  );
};

export default FilterSection;
