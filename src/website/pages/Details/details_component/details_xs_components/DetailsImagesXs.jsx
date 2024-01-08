import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "swiper/swiper.min.css";
import Swiper from "swiper";
import SwiperCore, { Pagination } from "swiper";
import styles from "../../../../../assets/css/details.module.css";
import { Box } from "@mui/material";
import lightGallery from "lightgallery";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import "lightgallery/css/lg-video.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

SwiperCore.use([Pagination]);

const DetailsImagesXs = ({ adInfo }) => {
  const images = adInfo?.ads_files;

  const galleryRef = useRef(null);
  useEffect(() => {
    const mySwiper = new Swiper(".swiper-container", {
      slidesPerView: 1,
      spaceBetween: 0,

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        bulletClass: styles.details_pagination_bullet,
        bulletActiveClass: styles.details_pagination_bullet_active,
      },
    });

    // Initialize LightGallery
    const gallery = lightGallery(galleryRef.current, {
      mode: "lg-fade",
      video: true,
    });
    return () => {
      gallery.destroy();
    };
  }, []);

  return (
    <Box>
      <Box className={`swiper-container ${styles.details_container}`}>
        <Box className="swiper-wrapper" ref={galleryRef}>
          {images?.map((image, index) => (
            <a
              key={index}
              data-src={`https://dashboard.maktab.sa/${image?.path}`}
              className={`swiper-slide ${styles.centeredSlide}`}
              // style={{ margin: "auto !important" }}
            >
              <img
                src={`https://dashboard.maktab.sa/${image?.path}`}
                className={styles.imgSlider}
              />
            </a>
          ))}
          {/* {adInfo.video ? (
              <a
                data-src={`https://www.dashboard.aqartik.com/assets/images/deal/video/${adInfo.video.name}`}
                className="swiper-slide"
              >
                <video
                  controls
                  style={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: "black",
                  }}
                >
                  <source
                    src={`https://www.dashboard.aqartik.com/assets/images/deal/video/${adInfo.video.name}`}
                    type="video/mp4"
                  />
                  Your browser does not support the video tag.
                </video>
              </a>
            ) : (
              ""
            )} */}
        </Box>
        <Box className={`swiper-pagination ${styles.details_pagination}`}></Box>
      </Box>
      <div id="lightgallery" style={{ display: "none" }}></div>
      {/* <Link to="/">
        <ChevronRightIcon
          sx={{
            position: "absolute",
            top: "6rem",
            right: "5px",
            color: "white",
            zIndex: "1",
          }}
        />
      </Link> */}
    </Box>
  );
};

export default DetailsImagesXs;
