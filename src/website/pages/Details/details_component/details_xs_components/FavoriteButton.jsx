import React, { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import useDataFetcher from "../../../../../api/useDataFetcher ";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router";
// import LogInModal from "../../../../authentication/loginFolder/LogInModal";

const FavoriteButton = ({ adInfo }) => {
  const [isFavorite, setIsFavorite] = useState(adInfo?.is_fav);
  // const { data, isLoading, get } = useDataFetcher();
  const userToken = localStorage.getItem("user_token");
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleClick = () => {
    if (!userToken) {
      // If no token, show the login modal
      setShowLoginModal(true);
      return;
    } else {
      // If there is a token, toggle the favorite state and make the API request
      const token = localStorage.getItem("user_token");
      setIsFavorite(!isFavorite);

      const getData = async () => {
        const res = await axios.get(
          `https://www.dashboard.aqartik.com/api/deal/add_fav/${adInfo?.id}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (res.data.status === 1) {
          toast.success(lang === "ar" ? "تمت العملية بنجاح" : "done");
        } else if (
          res.data.status === 0 &&
          res.data.message === "401 Unauthorized"
        ) {
          toast.error(
            lang === "ar"
              ? "غير مصرح، يرجى تسجيل الدخول"
              : "unauthorized, please login again"
          );
          localStorage.removeItem("user_token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          localStorage.removeItem("userMembership");
          localStorage.removeItem("userLocation");
          nav("/login");
        } else {
        }
      };
      getData();
    }
  };
  const handleCloseModal = () => {
    setShowLoginModal(false);
  };
  return (
    <>
      <Button onClick={handleClick} sx={{ marginLeft: "-20px" }}>
        {isFavorite ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <FavoriteBorderIcon sx={{ color: "white" }} />
        )}
      </Button>

      {/* <LogInModal open={showLoginModal} onClose={handleCloseModal} /> */}
    </>
  );
};

export default FavoriteButton;
