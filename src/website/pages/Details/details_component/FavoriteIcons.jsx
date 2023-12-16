import React, { useState, useEffect, useRef } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import useDataFetcher from "../../../../api/useDataFetcher ";
// import LogInModal from "../../../authentication/loginFolder/LogInModal";
// import { toast } from "react-hot-toast";
import { useNavigate } from "react-router";
import axios from "axios";
import { useTranslation } from "react-i18next";

const FavoriteIcons = ({ adInfo }) => {
  const userToken = localStorage.getItem("user_token");
  // const { data, isLoading, get } = useDataFetcher();
  const nav = useNavigate();
  const { i18n } = useTranslation();
  const lang = i18n.language;
  // const [isFavorite, setIsFavorite] = useState(adInfo?.is_fav);
  // this i will remove it later
  const [isFavorite, setIsFavorite] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const modalRef = useRef(null);

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
      // onClick={handleClickFavorite}
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
