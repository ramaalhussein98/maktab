import React, { useState } from "react";
import FilterSkeleton from "../../../../../ui/FilterSkeleton";
import { Box, Button } from "@mui/material";
import { Filter, MapIcon, Search } from "../../../../../assets/icons";
import { Link, useLocation } from "react-router-dom";
import FilterSlick from "../FilterSlick";
import FilterModal from "../Modals/FilterModal";
import ListIcon from "@mui/icons-material/List";
import { useTranslation } from "react-i18next";

const FilterSection = ({
  refetch,
  setFilter,
  toggleMapAds,
  setToggleMapAds,
}) => {
  const { t } = useTranslation();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [inputSearch, setInputSearch] = useState();
  const isLoading = false;
  const location = useLocation().pathname;
  const isMapPage = location.split("/").includes("map");
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

  return (
    <>
      {/* filters section */}
      <div className="filters_container">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <FilterSkeleton key={index} />
          ))
        ) : (
          <FilterSlick refetch={refetch} setFilter={setFilter} />
        )}

        <Button
          className="filter_btn"
          sx={{ display: { xs: "none", md: "flex" } }}
          onClick={handleFilerModalOpen}
        >
          <img src={Filter} alt="filter img" className="filter_btn_img" />
          {t("home.FilterModal.Filter_Factors")}
        </Button>
        <Box
          className="searchBox"
          sx={{ display: { xs: "none", md: "block" } }}
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
        {/* button map */}
        {toggleMapAds ? (
          <button
            className="mapButton"
            onClick={() => setToggleMapAds(!toggleMapAds)}
          >
            {t("displayMenu")}
            <ListIcon sx={{ color: "white", marginX: "5px" }} />
          </button>
        ) : (
          <button
            className="mapButton"
            onClick={() => setToggleMapAds(!toggleMapAds)}
          >
            {t("displayMap")}
            <img src={MapIcon} className="img1" style={{ width: "16px" }} />
          </button>
        )}
      </div>
      <FilterModal
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
        refetch={refetch}
        setFilter={setFilter}
      />
    </>
  );
};

export default FilterSection;
