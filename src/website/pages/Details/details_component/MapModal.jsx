import { Box, Modal } from "@mui/material";
import {
  GoogleMap,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import React from "react";
import { LogoAds } from "../../../../assets/images";
import CloseIcon from "@mui/icons-material/Close";
const MapModal = ({ lat, lng, open, onClose }) => {
  console.log("lat", lat, "lng", lng);
  const cityCenter = { lat, lng };
  const mapStyles = {
    width: "100%",
    height: "100%",
  };
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
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk",
    // libraries: ['geometry', 'drawing'],
  });
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "100%", md: 480 },
          height: { xs: "100vh", md: "90vh" },
          bgcolor: "background.paper",
          boxShadow: 24,
        }}
      >
        <CloseIcon className="map_close_icon" onClick={onClose}></CloseIcon>
        <div className="map_center"> </div>
        {isLoaded && (
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={cityCenter}
            options={mapOptions}
          ></GoogleMap>
        )}
      </Box>
    </Modal>
  );
};

export default MapModal;
