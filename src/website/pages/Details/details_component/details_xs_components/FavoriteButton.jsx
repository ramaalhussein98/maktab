import React, { useState } from "react";
import Button from "@mui/material/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import useDataFetcher from "../../../../../api/useDataFetcher ";

import { useTranslation } from "react-i18next";

import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import myAxios from "../../../../../api/myAxios";
// import LogInModal from "../../../../authentication/loginFolder/LogInModal";

const FavoriteButton = ({ adInfo }) => {
  const [isFavorite, setIsFavorite] = useState(adInfo?.is_fav);
  // const { data, isLoading, get } = useDataFetcher();
  const userToken = localStorage.getItem("user_token");
  const user_type_bussines =
    localStorage.getItem("user_type") === "bussines" ? true : false;
  const endpoint = user_type_bussines
    ? `/api/v1/user/favorites/add_fav_ads/${adInfo?.id}`
    : `/api/v1/ordinaries/favorites/add_fav_ads/${adInfo?.id}`;
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();

  const handleClick = async () => {
    if (!userToken) {
      // If no token, show the login modal
      toast.error("يرجى تسجيل الدخول");
    } else {
      const res = await myAxios.post(endpoint);

      if (res?.data?.status === true) {
        toast.success(res?.data?.message);
        setIsFavorite(!isFavorite);
        onClose();
      } else {
        toast.error(res?.data?.message);
      }
    }
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
