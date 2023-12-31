import React, { useEffect, useRef, useState } from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  OverlayView,
  useJsApiLoader,
} from "@react-google-maps/api";

import { useTranslation } from "react-i18next";
import AdCard from "../../Home/components/AdCard";
import AdMapCard from "./AdMapCard";
import { Box } from "@mui/material";

const CustomMarker = ({ price, isActive, onClick }) => {
  const { t } = useTranslation();
  return (
    <div
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden",

        padding: "0px 8px",
        height: "35px",
        backgroundColor: isActive ? "var(--main-color)" : "rgb(255, 255, 255)",
        border: isActive
          ? "2px solid var(--main-color)"
          : "2px solid rgb(255, 255, 255)",
        color: isActive ? "white" : "rgb(0, 0, 0)",
        borderRadius: "20px",
        zIndex: isActive ? "20000" : "1",
        transform: "translate(-50%, -50%)",
        display: "flex",

        justifyContent: "center",

        alignItems: "center",
        fontWeight: "700",
        fontSize: "15px",
        fontFamily: "Tajawal",
        boxShadow: "rgba(0, 0, 0, 0.10) 0px 3px 6px",
      }}
    >
      <span>
        {price} {t("currency")}
      </span>
    </div>
  );
};
const MapCreate = (props) => {
  const [selectedAd, setSelectedAd] = useState(null);
  const mapRef = useRef(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk",
    // libraries: ['geometry', 'drawing'],
  });
  const locations = [
    { id: 1, lat: 24.7136, lng: 46.6753, price: "100" },
    { id: 2, lat: 26.3174, lng: 43.7759, price: "20000" },
    { id: 3, lat: 21.4858, lng: 39.1925, price: "300" },
    { id: 4, lat: 21.4225, lng: 39.8262, price: "400" },
    { id: 5, lat: 21.2703, lng: 40.4159, price: "500" },
  ];

  const {
    state,
    setLngZoom,
    setLatZoom,
    setMapZoom,
    isBoxVisible,
    setBoxVisible,
  } = props;
  const [mapLoaded, setMapLoaded] = useState(false);
  const [overlayViews, setOverlayViews] = useState([]);
  const [activeMarkerIndex, setActiveMarkerIndex] = useState(null);
  const [isMarkerClicked, setMarkerClicked] = useState(false);
  const [cityCenter, setCityCenter] = useState({
    lat: 24.633333,
    lng: 46.716667,
    zoom: 10,
  });

  const handleMapLoad = (map) => {
    setMapLoaded(true);
    mapRef.current = map;
  };

  useEffect(() => {
    if (mapLoaded) {
      // Create an array of overlayViews for the custom markers
      const loadedOverlayViews = locations.map((location, index) => (
        <>
          <OverlayView
            key={index}
            position={{ lat: location.lat, lng: location.lng }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <CustomMarker
              price={location.price}
              isActive={activeMarkerIndex === location.id}
              onClick={() => handleMarkerClick(location.id, location)}
            />
          </OverlayView>
        </>
      ));

      // Set the overlayViews state with the loaded overlayViews
      setOverlayViews(loadedOverlayViews);
    }
  }, [mapLoaded, activeMarkerIndex]);

  const handleMarkerClick = (id, loc) => {
    setActiveMarkerIndex(id);
    setMarkerClicked(true);
    setBoxVisible(true);
    setSelectedAd(id);
    setCityCenter({ lat: loc.lat, lng: loc.lng, zoom: loc.zoom });
    console.log(selectedAd);
  };

  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  // const cityCenter = {
  //   lat: state.lat,
  //   lng: state.lng,
  // };

  const mapOptions = {
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    styles: [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ],
  };
  const handleMapInteraction = () => {
    if (mapRef.current) {
      const newCenter = {
        lat: mapRef.current.getCenter().lat(),
        lng: mapRef.current.getCenter().lng(),
        zoom: mapRef.current.getZoom(),
      };
      //   setMapZoom(newCenter.zoom);
      //   setLngZoom(newCenter.lng);
      //   setLatZoom(newCenter.lat);
      // get(
      //   `api/deal/get_all_deal?lat=${newCenter.lat}&lng=${
      //     newCenter.lng
      //   }&PerPage=${5}`
      // );
      // Call your API with the newCenter data
      // You can use a library like Axios to make the API request
      // Example: sendToApi(newCenter);

      // Update the state to store the new center
      setCityCenter(newCenter);
    }
  };
  return (
    <>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={10}
          center={cityCenter}
          options={mapOptions}
          onLoad={handleMapLoad}
          onDragEnd={handleMapInteraction}
          onZoomChanged={handleMapInteraction}
        >
          {overlayViews}
        </GoogleMap>
      )}

      {isMarkerClicked && selectedAd && (
        <Box
          sx={{
            position: "absolute",
            top: { md: "53%" },
            bottom: { xs: "0px !important", md: "auto" },
            left: { xs: "calc(50%)", md: "calc(50% + 30px)" },
            transform: "translate(-50%, -50%)",
            width: { xs: "80%", md: "20rem" },
            zIndex: "1", // Ensure it's above the marker
          }}
        >
          <AdMapCard
            data={locations}
            isBoxVisible={isBoxVisible}
            setBoxVisible={setBoxVisible}
            activeMarkerIndex={activeMarkerIndex}
          />
        </Box>
      )}
    </>
  );
};

export default MapCreate;
