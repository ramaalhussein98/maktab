import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Box, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "../../../../assets/css/CarsouelHomeFilter.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteBtn from "../../../../ui/FavoriteBtn";
import { DefaultImage, Home1 } from "../../../../assets/images";
import { useLocation, useNavigate } from "react-router-dom";

const AdSlider = () => {
  // const homeImages = ad.gallery;
  const location = useLocation().pathname;
  const homeImages = [{ src: Home1 }];
  const [currentSlide, setCurrentSlide] = useState();
  const [isHovered, setIsHovered] = useState(false);
  const isAdMapCardComponent = location.split("/").includes("map");
  const [imagesLoaded, setImagesLoaded] = useState(false);
  console.log(isAdMapCardComponent);

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  useEffect(() => {
    const checkImagesLoaded = () => {
      const images = document.querySelectorAll("img");
      let loadedCount = 0;
      images.forEach((image) => {
        if (image.complete) {
          loadedCount++;
        } else {
          image.addEventListener("load", () => {
            loadedCount++;
            if (loadedCount === images.length) {
              setImagesLoaded(true);
            }
          });
        }
      });
      if (loadedCount === images.length) {
        setImagesLoaded(true);
      }
    };

    if (window) {
      window.addEventListener("load", checkImagesLoaded);
    }

    return () => {
      if (window) {
        window.removeEventListener("load", checkImagesLoaded);
      }
    };
  }, []);
  const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        className={styles.custom_prevv_button}
        onClick={onClick}
        sx={{
          display:
            window.innerWidth < 768 || (isHovered && currentSlide > 0)
              ? "flex"
              : "none",
        }}
      >
        <KeyboardArrowLeftIcon />
      </Box>
    );
  };

  const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
      <Box
        className={styles.custom_nextt_button}
        onClick={onClick}
        sx={{
          display:
            window.innerWidth < 768 ||
            (isHovered && currentSlide < homeImages.length - 1)
              ? "flex"
              : "none",
        }}
      >
        <KeyboardArrowRightIcon />
      </Box>
    );
  };
  // const navigate = useNavigate();
  // const handleAdClick = (ad) => {
  //   navigate(`/details/${ad.id}`, { state: { ad } });
  // };

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
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
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
      }}
    >
      {imagesLoaded ? (
        <Slider {...settings}>
          {homeImages.length === 0 ? (
            <div
              className={
                isAdMapCardComponent
                  ? styles.customSlideMap
                  : styles.customSlide
              }
              style={{
                height: isAdMapCardComponent ? "200px !important" : "310px",
              }}
            >
              <img
                src={DefaultImage}
                alt="default"
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
            </div>
          ) : (
            homeImages.map((image, index) => (
              <div
                key={index}
                className={
                  isAdMapCardComponent
                    ? styles.customSlideMap
                    : styles.customSlide
                }
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
                  className={
                    isAdMapCardComponent
                      ? styles.imgBorderMap
                      : styles.imageBorder
                  }
                  onLoad={handleImageLoad}
                />
              </div>
            ))
          )}
        </Slider>
      ) : (
        <p> loading</p>
      )}

      <FavoriteBtn />
    </Box>
  );
};

export default AdSlider;
