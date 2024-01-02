import React, { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper";
import { Box, Button, useMediaQuery, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
import SwiperCore from "swiper";
import { AnimatePresence, motion } from "framer-motion";

import myAxios from "../../../../api/myAxios";

SwiperCore.use([Pagination]);
const AUTOPLAY_DELAY = 8000;
const SPRING_DURATION = 0.1;
const MEDIUM_BREAKPOINT = "md";

const Banner = () => {
  const [bannersData, setBannersData] = useState(
    JSON.parse(localStorage.getItem("bannersData"))
  );
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   // Simulate data loading time
  //   const delay = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000); // Adjust the delay time as needed

  //   return () => clearTimeout(delay); // Clear timeout on unmount
  // }, []);
  useEffect(() => {
    const getBannerData = async () => {
      try {
        const res = await myAxios.get("api/v1/user/settings/banners");
        console.log(res);
        if (res.data.status === true) {
          setBannersData(res?.data.data);
          localStorage.setItem("bannersData", JSON.stringify(res.data.data));
        }
      } catch (error) {
        console.error("Error fetching banner data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!bannersData) {
      getBannerData();
    }
  }, [bannersData]);

  const isXsScreen = useMediaQuery((theme) =>
    theme.breakpoints.down(MEDIUM_BREAKPOINT)
  );

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const swiperRef = useRef(null);

  const handleSlideChange = (swiper) => {
    setActiveSlideIndex(swiper.realIndex);
  };
  const handlePaginationDotClick = (index) => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
      setActiveSlideIndex(index);
    }
  };
  // useEffect(() => {
  //   setActiveSlideIndex(0);
  //   swiperRef.current.swiper.slideTo(0);
  // }, [i18n]);
  return (
    <Box sx={{ position: "relative", display: { xs: "none", md: "block" } }}>
      {isLoading ? ( // Show Skeleton when loading
        <Skeleton
          sx={{
            width: "100%",
            height: "800px",
            marginTop: "-12rem",
            marginBottom: "-9rem",
          }}
        /> // Adjust the dimensions as needed
      ) : (
        <>
          <Swiper
            dir={lang === "ar" ? "rtl" : "ltr"}
            key={i18n.language}
            className="mySwiper"
            ref={swiperRef}
            effect={"Cube"}
            pagination={false}
            autoplay={{
              delay: AUTOPLAY_DELAY,
            }}
            modules={[EffectFade, Autoplay, Pagination]}
            // pagination={{
            //   clickable: true,
            // }}
            onSlideChange={handleSlideChange}
            sx={{ position: "relative", marginTop: "11rem" }}
          >
            {bannersData &&
              bannersData.map((banner, index) => {
                return (
                  <SwiperSlide key={index}>
                    <Box
                      sx={{
                        "& img": {
                          width: "100%",
                          height: "500px !important",
                          objectFit: "cover",
                          position: "relative",
                        },
                      }}
                    >
                      <img
                        src={`https://dashboard.maktab.sa/${banner?.image}`}
                        alt={banner.ar_title}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </Box>
                    <AnimatePresence>
                      {activeSlideIndex === index && (
                        <motion.div key={index} classNames="slide">
                          <Box
                            sx={{
                              position: "absolute",
                              // top: "5rem",
                              top: { xs: "8rem", md: "8rem" },
                              textAlign: {
                                xs: " center",
                                md: lang === "ar" ? "right" : "left",
                              },
                              width: { xs: "100%", md: "50%" },

                              right: { md: lang === "ar" ? "5rem" : "" },
                              left: { md: lang === "ar" ? "" : "3rem" },

                              zIndex: "1000",
                              color: "white",
                            }}
                          >
                            <Box>
                              <motion.h3
                                style={{
                                  marginBottom: "1rem",
                                  fontSize: "30px",
                                  fontWeight: "bold",
                                }}
                                initial={
                                  !isXsScreen && {
                                    x: lang === "ar" ? 100 : -100,
                                  }
                                }
                                animate={
                                  !isXsScreen && {
                                    x: 0,
                                    transition: {
                                      delay: SPRING_DURATION,
                                      duration: SPRING_DURATION,
                                      type: "spring",
                                    },
                                  }
                                }
                                exit={
                                  !isXsScreen && {
                                    x: lang === "ar" ? -100 : 100,
                                  }
                                }
                              >
                                {lang === "ar"
                                  ? banner.ar_title
                                  : banner.en_title}
                              </motion.h3>
                            </Box>
                            <motion.p
                              style={{
                                width: { xs: "50%", md: "28rem" },
                                fontSize: { xs: "1rem", md: "16px" },
                                marginX: { xs: "auto", md: "0rem" },
                              }}
                              initial={
                                !isXsScreen && { x: lang === "ar" ? 150 : -150 }
                              }
                              animate={
                                !isXsScreen && {
                                  x: 0,
                                  transition: {
                                    delay: 0.3,
                                    duration: 0.2,
                                    type: "spring",
                                  },
                                }
                              }
                              exit={
                                !isXsScreen && { x: lang === "ar" ? -150 : 150 }
                              }
                            >
                              {lang === "ar"
                                ? banner.ar_description
                                : banner.en_description}
                            </motion.p>
                            <motion.div
                              initial={
                                !isXsScreen && { x: lang === "ar" ? 200 : -200 }
                              }
                              animate={
                                !isXsScreen && {
                                  x: 0,
                                  transition: {
                                    delay: 0.3,
                                    duration: 0.3,
                                    type: "spring",
                                  },
                                }
                              }
                              exit={
                                !isXsScreen && { x: lang === "ar" ? -200 : 200 }
                              }
                            >
                              {banner?.button_url != "null" && (
                                <Button
                                  variant="contained"
                                  href={banner.button_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  component="a"
                                  sx={{
                                    color: "rgb(255, 255, 255)",
                                    border: "2px solid white",
                                    minWidth: "250px",
                                    fontSize: "18px",
                                    marginTop: "48px",
                                    borderRadius: "24px",

                                    padding: "0.3rem 0.5rem",
                                    backgroundColor: "transparent",
                                    "&:hover": {
                                      backgroundColor: "white",
                                      color: "var( --main-color)",
                                    },
                                  }}
                                >
                                  {lang === "ar"
                                    ? banner.button_text_ar
                                    : banner.button_text_en}
                                </Button>
                              )}
                            </motion.div>
                          </Box>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </SwiperSlide>
                );
              })}
          </Swiper>
          <Box
            className="swiper-pagination"
            sx={{
              textAlign: "center",
              marginTop: "1rem",
              position: "absolute",
              zIndex: 2,

              left:
                lang === "ar"
                  ? { xs: "50%", md: "91%" }
                  : { xs: "50%", md: "7%" },
              bottom: { xs: "4rem", md: "4rem" },
              transform: { xs: "translate(-50%)" },
            }}
          >
            {/* Render pagination dots */}
            {bannersData &&
              bannersData.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    display: "inline-block",
                    width: activeSlideIndex === index ? "24px" : "9px",
                    height: "9px",
                    marginLeft: "4px",
                    borderRadius: activeSlideIndex === index ? "5px" : "50%",
                    backgroundColor:
                      activeSlideIndex === index ? "rgb(253, 205, 5)" : "white",
                    mx: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => handlePaginationDotClick(index)}
                />
              ))}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Banner;
