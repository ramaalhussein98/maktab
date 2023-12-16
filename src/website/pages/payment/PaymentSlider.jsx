import React, { useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Home1, Home2, Home3 } from "../../../assets/images";
import styles from "../../../assets/css/CarsouelHomeFilter.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import "../../../assets/css/paymentslider.css";

const CustomPrevArrow = (props) => {
  const { onClick } = props;
  return (
    <Box className={styles.custom_prevv_button} onClick={onClick}>
      <KeyboardArrowLeftIcon />
    </Box>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  return (
    <Box className={styles.custom_nextt_button} onClick={onClick}>
      <KeyboardArrowRightIcon />
    </Box>
  );
};

const PaymentSlider = () => {
  const homeImages = [{ src: Home1 }, { src: Home2 }, { src: Home3 }];
  const [currentSlide, setCurrentSlide] = useState(0);
  const settings = {
    dots: true,
    rtl: true,
    appendDots: (dots) => <div className={styles.custom_dots}>{dots}</div>,
    customPaging: (i) => (
      <div
        className={`${styles.custom_dots} ${
          currentSlide === i ? styles.active_dot : ""
        }`}
      />
    ),
    beforeChange: (current, next) => setCurrentSlide(next),

    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    autoplaySpeed: 5000,
    // prevArrow: <CustomPrevArrow />,
    // nextArrow: <CustomNextArrow />,
  };

  return (
    <Box
      sx={{
        position: "relative",
        margin: { xs: "auto", lg: "0" },
        width: "375px",
        height: "312px",
      }}
    >
      <Slider {...settings}>
        {homeImages.length === 0 ? (
          <div className={styles.customSlide2}>
            <img
              src={DefaultImage}
              alt="default"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              className={styles.imageBorder}
            />
          </div>
        ) : (
          homeImages.map((image, index) => (
            <div
              key={index}
              className={styles.customSlide}
              // onClick={() => handleAdClick(ad)}
            >
              <img
                key={index}
                src={image.src}
                alt={`Slide ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                className={styles.imageBorder}
              />
            </div>
          ))
        )}
      </Slider>
    </Box>
  );
};

export default PaymentSlider;
