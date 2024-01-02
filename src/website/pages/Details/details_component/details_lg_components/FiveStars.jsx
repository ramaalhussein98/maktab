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

const FiveStars = ({ adInfo }) => {
  const userToken = localStorage.getItem("user_token");
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const [rating, setRating] = useState(0);
  // const { data, isLoading, post } = useDataFetcher();

  // useEffect(() => {
  //   if (adInfo?.can_rate !== true) {
  //     setRating(adInfo?.my_rate?.rate);
  //   }
  // }, [adInfo]);

  // const handleStarClick = async (selectedRating) => {
  //   if (adInfo?.can_rate !== true) {
  //     return;
  //   }
  //   setRating(selectedRating);
  //   const token = localStorage.getItem("user_token");
  //   const formData = new FormData();
  //   formData.append("rate", selectedRating);
  //   const res = await axios.post(
  //     `https://www.dashboard.aqartik.com/api/deal/rate_user/${adInfo?.id}`,
  //     formData,
  //     {
  //       headers: {
  //         authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   if (res.data.status === 1) {
  //     toast.success(lang === "ar" ? "تمت العملية بنجاح" : "done");
  //   } else if (
  //     data.data.status === 0 &&
  //     data.data.message === "401 Unauthorized"
  //   ) {
  //     toast.error(
  //       lang === "ar"
  //         ? "غير مصرح، يرجى تسجيل الدخول"
  //         : "unauthorized, please login again"
  //     );
  //     localStorage.removeItem("user_token");
  //     localStorage.removeItem("userId");
  //     localStorage.removeItem("userName");
  //     localStorage.removeItem("userMembership");
  //     localStorage.removeItem("userLocation");
  //     nav("/login");
  //   } else {
  //   }
  // };

  return (
    <Box sx={{ display: "flex", gap: 0 }}>
      {userToken ? (
        [1, 2, 3, 4, 5].map((star) => (
          <IconButton
            key={star}
            // onClick={() => handleStarClick(star)}
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
