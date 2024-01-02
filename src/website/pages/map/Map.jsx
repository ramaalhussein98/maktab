import React, { useState } from "react";
import FilterSection from "../Home/components/Filter_components/FilterSection";
import { Container } from "@mui/material";
import MapCreate from "./components/MapCreate";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useOfficeHook } from "../../../hooks/useOfficeHook";

const Map = ({ officesData }) => {
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState();
  const [page, setpage] = useState(1);
  const [filter, setFilter] = useState({
    // "exact[category_aqar.id]": null,
    // "contains[title]": "",
    // "in[ads_rooms.number][0]": "",
    // "in[ads_rooms.id][0]": "",
    // "in[ads_rooms.number][1]": "",
    // "in[ads_rooms.id][1]": "",
    // "in[ads_rooms.number][2]": "",
    // "in[ads_rooms.id][2]": "",
  });

  return (
    <>
      <Container
        sx={{
          maxWidth: "1400px !important",
          paddingX: { xs: "0px", sm: "24px" },
        }}
      >
        {/* <FilterSection /> */}
      </Container>
      <div style={{ height: "100vh" }}>
        <MapCreate
          officesData={officesData}
          isBoxVisible={isBoxVisible}
          setBoxVisible={setBoxVisible}
          setSelectedAd={setSelectedAd}
        />
      </div>
    </>
  );
};

export default Map;
