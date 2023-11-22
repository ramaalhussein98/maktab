import React, { useState } from "react";
import FilterSkeleton from "../../../../../ui/FilterSkeleton";
import { Box, Button } from "@mui/material";
import { Filter, MapIcon, Search } from "../../../../../assets/icons";
import { Link, useLocation } from "react-router-dom";
import FilterSlick from "../FilterSlick";
import FilterModal from "../Modals/FilterModal";
import ListIcon from "@mui/icons-material/List";
import { useTranslation } from "react-i18next";

const FilterSection = () => {
  const { t } = useTranslation();
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const isLoading = false;
  const location = useLocation().pathname;
  const isMapPage = location.split("/").includes("map");
  const handleFilerModalOpen = () => {
    setOpenFilterModal(true);
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
          <FilterSlick />
        )}

        <Button className="filter_btn" onClick={handleFilerModalOpen}>
          <img src={Filter} alt="filter img" className="filter_btn_img" />
          {t("home.FilterModal.Filter_Factors")}
        </Button>
        <Box className="searchBox">
          <div className="searchBoxBorder">
            <span>
              <div className="addvistor">
                <input type="text" style={{ width: "100%" }} />
                <Box className="searchIcon">
                  <img src={Search} />
                </Box>
              </div>
            </span>
          </div>
        </Box>
        {/* button map */}
        {isMapPage ? (
          <Link to="/" className="mapButton">
            {t("displayMenu")}
            <ListIcon sx={{ color: "white", marginX: "5px" }} />
            {/* <img src={MapIcon} style={{ width: "16px" }} /> */}
          </Link>
        ) : (
          <Link to="/map" className="mapButton">
            {t("displayMap")}
            <img src={MapIcon} className="img1" style={{ width: "16px" }} />
          </Link>
        )}
      </div>
      <FilterModal
        openFilterModal={openFilterModal}
        setOpenFilterModal={setOpenFilterModal}
      />
    </>
  );
};

export default FilterSection;
