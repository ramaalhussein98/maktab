import React, { useState } from "react";
import FilterSection from "../Home/components/Filter_components/FilterSection";
import { Container } from "@mui/material";
import MapCreate from "./components/MapCreate";
import { useQueryHook } from "../../../hooks/useQueryHook";

const Map = () => {
  const [isBoxVisible, setBoxVisible] = useState(false);
  const [selectedAd, setSelectedAd] = useState();
  return (
    <>
      <Container
        sx={{
          maxWidth: "1400px !important",
          paddingX: { xs: "0px", sm: "24px" },
        }}
      >
        <FilterSection />
      </Container>
      <div style={{ height: "100vh" }}>
        <MapCreate
          isBoxVisible={isBoxVisible}
          setBoxVisible={setBoxVisible}
          setSelectedAd={setSelectedAd}
        />
      </div>
    </>
  );
};

export default Map;
