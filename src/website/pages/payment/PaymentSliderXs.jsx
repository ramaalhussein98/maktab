import React, { useEffect, useRef } from "react";
import "swiper/swiper-bundle.min.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Home1 } from "../../../assets/images";
import styles from "../../../assets/css/details.module.css";
import { Box } from "@mui/material";
import "../../../assets/css/paymentXs.css";

const PaymentSliderXs = () => {
  const images = [Home1];

  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();
    }
  }, [images]);

  return (
    <Box
      className={`swiper-container `}
      sx={{
        height: { xs: "240px", md: "290px" },
        width: { xs: "93%", md: "100%" },
        margin: { xs: "1rem auto", md: "0px" },

        overflow: "hidden",
        position: "relative",
        borderTopLeftRadius: { xs: "12px !important", md: "12px !important" },
        borderTopRightRadius: { xs: "12px !important", md: "12px !important" },
        borderBottomLeftRadius: { xs: "12px !important", md: "0px !important" },
        borderBottomRightRadius: {
          xs: "12px !important",
          md: "0px !important",
        },
      }}
    >
      <Swiper
        className="swiper-wrapper"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: styles.details_pagination_bullet,
          bulletActiveClass: styles.details_pagination_bullet_active,
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className={styles.centeredSlide}>
            <img
              src={image}
              className={styles.imgSlider}
              alt={`slider-${index}`} // added alt prop for accessibility
            />
          </SwiperSlide>
        ))}
        <Box
          className={`swiper-pagination ${styles.details_pagination}`}
          sx={{ display: "flex", justifyContent: "center" }}
        ></Box>
      </Swiper>
    </Box>
  );
};

export default PaymentSliderXs;
