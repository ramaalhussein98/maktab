import React, { useState, useEffect } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
// import useDataFetcher from "../../../../api/useDataFetcher ";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import LogInModal from "../../../authentication/loginFolder/LogInModal";
import myAxios from "../../../../../api/myAxios";

const FiveStars = ({ adInfo }) => {
  const userToken = localStorage.getItem("user_token");
  const user_type_bussines =
    localStorage.getItem("user_type") === "bussines" ? true : false;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const [rating, setRating] = useState(0);
  const endpoint = user_type_bussines
    ? "api/v1/user/evaluations/save_to_ads"
    : "api/v1/ordinaries/evaluations/save_to_ads";

  useEffect(() => {
    if (adInfo?.can_rate !== true) {
      setRating(adInfo?.my_rate);
    }
  }, [adInfo]);

  const handleStarClick = async (selectedRating) => {
    // if (adInfo?.can_rate !== true) {
    //   return;
    // }
    setRating(selectedRating);
    const requestData = {
      rate: selectedRating,
      ads_id: adInfo?.id,
    };

    const res = await myAxios.post(endpoint, requestData);

    if (res?.data?.status === true) {
      toast.success(res?.data?.message);
    } else {
      toast.error(res?.data?.message);
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 0 }}>
      {userToken ? (
        [1, 2, 3, 4, 5].map((star) => (
          <IconButton
            key={star}
            onClick={() => handleStarClick(star)}
            color={
              adInfo?.user_rate !== null
                ? "disabled"
                : star <= rating
                ? "gold"
                : undefined
            }
          >
            {star <= rating ? (
              <StarIcon sx={{ color: "gold" }} />
            ) : (
              <StarBorderIcon />
            )}
          </IconButton>
        ))
      ) : (
        <Typography variant="body2">
          {lang === "ar"
            ? "يرجى تسجيل الدخول من أجل التقيم"
            : "Please login to rate."}
        </Typography>
      )}
    </Box>
  );
};

export default FiveStars;
