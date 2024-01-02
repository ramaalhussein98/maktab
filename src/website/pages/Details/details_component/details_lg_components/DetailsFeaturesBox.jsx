import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import HomeRooms from "./HomeRooms";

import Icons from "./Icons";
import CheckIcon from "@mui/icons-material/Check";

const DetailsFeaturesBox = ({ data }) => {
  console.log(data);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const filteredFeatures = data?.features || [];
  // const filteredFeatures =
  //   adInfo?.BoolFeaturea?.filter((feature) =>
  //     Icons.some((icon) => icon.en_name === feature.bool_featurea.en_name)
  //   ) || [];

  // const filteredQuantity =
  //   adInfo?.QuantityAds?.filter((feature) =>
  //     Icons.some((icon) => icon.en_name === feature.quantity_feature.en_name)
  //   ) || [];

  const [timeDifference, setTimeDifference] = useState(0);

  // useEffect(() => {
  //   // Calculate the time difference between adInfo.lastUpdate and the current time
  //   const lastUpdate = new Date(adInfo.lastUpdate).getTime();
  //   const currentTime = new Date().getTime();
  //   const timeDiffInSeconds = Math.floor((currentTime - lastUpdate) / 1000);

  //   setTimeDifference(timeDiffInSeconds);
  // }, [adInfo.lastUpdate]);

  const formatTime = (seconds) => {
    if (seconds < 60) {
      return t("details_page.time.seconds_ago", { count: seconds });
    } else if (seconds < 3600) {
      return t("details_page.time.minutes_ago", {
        count: Math.floor(seconds / 60),
      });
    } else if (seconds < 86400) {
      return t("details_page.time.hours_ago", {
        count: Math.floor(seconds / 3600),
      });
    } else {
      return t("details_page.time.days_ago", {
        count: Math.floor(seconds / 86400),
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: lang === "ar" ? "right" : "left",
        borderRadius: "8px",
        border: "1px solid #eee",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      {filteredFeatures.map((feature) => {
        // const matchingIcon = Icons.find(
        //   (icon) => icon.en_name === feature.bool_featurea.en_name
        // );
        // if (matchingIcon) {
        //   const sizedIcon = React.cloneElement(matchingIcon.icon, {
        //     sx: { fontSize: "20px !important" },
        //   });
        return (
          <>
            <HomeRooms
              key={feature.id}
              iconRoom={feature.icon}
              titleRoom={lang === "ar" ? feature?.ar_name : feature?.en_name}
              numRoom=""
              checkIcon={
                <CheckIcon
                  sx={{ color: "var(--main-color)", marginRight: "-10px" }}
                />
              }
            />
          </>
        );
      })}
      {/* {filteredQuantity.map((feature) => {
          const matchingIcon = Icons.find(
            (icon) => icon.en_name === feature.quantity_feature.en_name
          );
          if (matchingIcon) {
            const yearsText = lang === "ar" ? "سنة" : "years";
            const sizedIcon = React.cloneElement(matchingIcon.icon, {
              sx: { fontSize: "20px !important" },
            });

            return (
              <HomeRooms
                key={feature.id}
                iconRoom={sizedIcon}
                titleRoom={
                  lang === "ar"
                    ? feature.quantity_feature.ar_name
                    : feature.quantity_feature.en_name
                }
                numRoom={feature.quantity}
                checkIcon={
                  feature.quantity_feature.en_name === "Age of Real Estate"
                    ? yearsText
                    : ""
                }
              />
            );
          }
        })} */}

      {/* if there is update show it */}
      <Box sx={{ display: "flex", padding: "5px", alignItems: "center" }}>
        <Typography sx={{ marginX: "5px", minWidth: { md: "7rem" } }}>
          {t(
            "details_page.details_tabs.specifications_and_features_tab.last_update"
          )}
          :
        </Typography>
        <Typography sx={{ color: "gray", marginX: "5px" }}>
          {formatTime(timeDifference)}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailsFeaturesBox;
