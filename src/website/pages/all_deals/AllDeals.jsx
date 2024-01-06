import React, { useState } from "react";

import FilterWithCards from "../Home/components/FilterWithCards";
import BoxFilter from "./components/BoxFilter";
import FilterSection from "../Home/components/Filter_components/FilterSection";
import { Container, Grid } from "@mui/material";
import AdCard from "../Home/components/AdCard";
import NoData from "../../../ui/NoData";
import { useTranslation } from "react-i18next";
import { MapIcon } from "../../../assets/icons";
import { useOfficeHook } from "../../../hooks/useOfficeHook";
import CardSkeleton from "../../../ui/CardSkeleton";

const AllDeals = () => {
  const { t, i18n } = useTranslation();
  const [toggleMapAds, setToggleMapAds] = useState(false);
  const [filter, setFilter] = useState({
    // "exact[category_aqar.id]": null,
    // "contains[title]": "",
    // "in[ads_rooms.number][0]": "",
    // "in[ads_rooms.id][0]": "",
    // "in[ads_rooms.number][1]": "",
    // "in[ads_rooms.id][1]": "",
    // "in[ads_rooms.number][2]": "",
    // "in[ads_rooms.id][2]": "",
    //     in[comforts.id][0]
    // in[comforts.id][1]
  });
  const {
    isLoading,
    isError,
    data = { data: [], totalPages: 0 },
    refetch,
    isRefetching,
  } = useOfficeHook({
    // page: page,
    filter: filter,
  });
  return (
    <>
      <BoxFilter refetch={refetch} setFilter={setFilter} />
      <FilterSection refetch={refetch} setFilter={setFilter} />
      <Container
        sx={{
          maxWidth: "1400px !important",
          padding: { xs: "0px", sm: "24px" },
          position: "relative",
        }}
      >
        {/* this ads section */}
        <div className="cards_container">
          {/* button map */}

          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              width: "100%",
              margin: { xs: "auto" },
            }}
          >
            {isLoading ? (
              Array.from({ length: 8 }, (_, index) => (
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{
                    paddingLeft: {
                      xs: "0px !important",
                      sm: "16px !important",
                    },
                  }}
                >
                  <CardSkeleton key={index} />
                </Grid>
              ))
            ) : data?.data.length > 0 ? (
              data?.data.map((ele, index) => (
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={4}
                  lg={3}
                  key={index}
                  sx={{
                    paddingLeft: {
                      xs: "0px !important",
                      sm: "16px !important",
                    },
                  }}
                >
                  <AdCard officeData={ele} />
                </Grid>
              ))
            ) : (
              <NoData />
            )}
          </Grid>

          {/* <Pagination data={paginationData} setPage={setpage} /> */}
          <div className="mapButtonWrapper">
            <button
              className="mapButton "
              onClick={() => setToggleMapAds(!toggleMapAds)}
            >
              {t("displayMap")}
              <img src={MapIcon} className="img1" style={{ width: "16px" }} />
            </button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AllDeals;
