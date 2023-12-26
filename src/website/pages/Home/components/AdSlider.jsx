import React, { useEffect, useState } from "react";
// import React, { useEffect, useRef } from "react";
import "swiper/swiper.min.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Box, Typography } from "@mui/material";
import { Pagination, Navigation } from "swiper";

import styles from "../../../../assets/css/CarsouelHomeFilter.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBtn from "../../../../ui/FavoriteBtn";
import {
  DefaultImage,
  Home1,
  Home2,
  Home3,
  Home5,
  Home6,
} from "../../../../assets/images";
import { useLocation, useNavigate } from "react-router-dom";
// SwiperCore.use([Pagination]);
const AdSlider = ({ officeData, handleAdClick }) => {
  // const homeImages = ad.gallery;
  const location = useLocation().pathname;
  const [swiper, setSwiper] = useState(null);
  const ImagePath = { path: officeData?.main_image };
  const homeImages = [
    ImagePath,
    ...(officeData?.ads_files?.length > 0 ? officeData.ads_files : []),
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const isAdMapCardComponent = location.split("/").includes("map");

  console.log(isAdMapCardComponent);

  const CustomNextArrow = (props) => {
    const { onClick } = props;

    return (
      <Box
        className={styles.custom_nextt_button}
        onClick={handleNextClick}
        sx={{
          display:
            window.innerWidth < 768 ||
            (isHovered && swiper?.realIndex < homeImages.length - 1)
              ? "flex"
              : "none",
        }}
      >
        <KeyboardArrowRightIcon />
      </Box>
    );
  };
  const handleNextClick = (e) => {
    e.preventDefault();

    if (swiper) {
      swiper.slideNext();
    }
  };
  const handlePrevClick = (e) => {
    e.preventDefault();

    if (swiper) {
      swiper.slidePrev();
    }
  };

  const CustomPrevArrow = (props) => {
    return (
      <Box
        className={styles.custom_prevv_button}
        onClick={handlePrevClick}
        sx={{
          display:
            window.innerWidth < 768 || (isHovered && swiper?.realIndex > 0)
              ? "flex"
              : "none",
        }}
      >
        <KeyboardArrowLeftIcon />
      </Box>
    );
  };
  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: "relative",
        margin: { xs: "auto", lg: "0" },
        width: "100%",
        height: isAdMapCardComponent ? "200px !important" : "310px",
        direction: "ltr",
      }}
    >
      <Swiper
        onSwiper={setSwiper}
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        lazy="true"
        pagination={{
          clickable: true,
        }}
        navigation={{
          prevEl: ".custom_prevv_button",
          nextEl: ".custom_nextt_button",
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {homeImages.length > 0 &&
          homeImages.map((image, index) => (
            <SwiperSlide
              key={index}
              className={
                isAdMapCardComponent
                  ? styles.customSlideMap
                  : styles.customSlide
              }
              onClick={() => handleAdClick(officeData)}
            >
              <img
                src={`https://dashboard.maktab.sa/${image.path}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                className={
                  isAdMapCardComponent
                    ? styles.imgBorderMap
                    : styles.imageBorder
                }
              />
              <div className="swiper-lazy-preloader swiper-lazy-preloader-white"></div>
            </SwiperSlide>
          ))}
      </Swiper>

      <CustomPrevArrow onClick={handlePrevClick} />
      <CustomNextArrow onClick={handleNextClick} />
      <FavoriteBtn />
    </Box>
  );
};

export default AdSlider;
