import React, { useState, useEffect, useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
// import useDataFetcher from "../../../../api/useDataFetcher ";
// import LogInModal from "../../../authentication/loginFolder/LogInModal";
// import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";
import myAxios from "../../../../api/myAxios";

const FavoriteIcons = ({ adInfo }) => {
  const userToken = localStorage.getItem("user_token");
  const user_type_bussines =
    localStorage.getItem("user_type") === "bussines" ? true : false;
  // const { data, isLoading, get } = useDataFetcher();
  const nav = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [isFavorite, setIsFavorite] = useState(adInfo?.is_favourite);
  // this i will remove it later
  console.log("adInfo", adInfo);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const modalRef = useRef(null);
  const endpoint = user_type_bussines
    ? `/api/v1/user/favorites/add_fav_ads/${adInfo?.id}`
    : `/api/v1/ordinaries/favorites/add_fav_ads/${adInfo?.id}`;
  const handleClickFavorite = async () => {
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

  // const handleClickFavorite = () => {
  //   if (!userToken) {
  //     // If no token, show the login modal
  //     setShowLoginModal(true);
  //   } else {
  //     // If there is a token, toggle the favorite state and make the API request
  //     const token = localStorage.getItem("user_token");
  //     setIsFavorite(!isFavorite);

  //     const getData = async () => {
  //       const res = await axios.get(
  //         `https://www.dashboard.aqartik.com/api/deal/add_fav/${adInfo?.id}`,
  //         {
  //           headers: {
  //             authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (res.data.status === 1) {
  //         toast.success(lang === "ar" ? "تمت العملية بنجاح" : "done");
  //       } else if (
  //         res.data.status === 0 &&
  //         res.data.message === "401 Unauthorized"
  //       ) {
  //         toast.error(
  //           lang === "ar"
  //             ? "غير مصرح، يرجى تسجيل الدخول"
  //             : "unauthorized, please login again"
  //         );
  //         localStorage.removeItem("user_token");
  //         localStorage.removeItem("userId");
  //         localStorage.removeItem("userName");
  //         localStorage.removeItem("userMembership");
  //         localStorage.removeItem("userLocation");
  //         nav("/login");
  //       } else {
  //       }
  //     };
  //     getData();
  //   }
  // };

  const handleCloseModal = () => {
    setShowLoginModal(false);
  };

  return (
    <div
      onClick={handleClickFavorite}
      style={{ alignItems: "center", display: "flex" }}
    >
      {isFavorite ? (
        <FavoriteIcon sx={{ color: "red", cursor: "pointer" }} />
      ) : (
        <FavoriteBorderIcon
          sx={{ color: "black", marginLeft: "3px", cursor: "pointer" }}
        />
      )}

      {/* <LogInModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      /> */}
    </div>
  );
};

export default FavoriteIcons;
