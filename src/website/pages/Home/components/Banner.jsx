import React, { useState, useRef, useEffect } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Autoplay, Pagination } from "swiper";
import { Box, Button, useMediaQuery, Skeleton } from "@mui/material";
import { useTranslation } from "react-i18next";
// import useDataFetcher from "../../../../api/useDataFetcher ";
import SwiperCore from "swiper";
import { AnimatePresence, motion } from "framer-motion";
import { Home1, Home4, Home5 } from "../../../../assets/images";

const fakeBannersData = [
  {
    ar_title: "عنوان البنر 1",
    en_title: "Banner Title 1",
    ar_description: "وصف البنر 1",
    en_description: "Banner Description 1",
    button_url: "https://example.com",
    button_text_ar: "زر البنر 1",
    button_text_en: "Banner Button 1",
    image: { name: Home1 },
  },
  {
    ar_title: "عنوان البنر 2",
    en_title: "Banner Title 2",
    ar_description: "وصف البنر 2",
    en_description: "Banner Description 2",
    button_url: "https://example.com",
    button_text_ar: "زر البنر 2",
    button_text_en: "Banner Button 2",
    image: { name: Home4 },
  },
  // {
  //   ar_title: "عنوان البنر 3",
  //   en_title: "Banner Title 3",
  //   ar_description: "وصف البنر 3",
  //   en_description: "Banner Description 3",
  //   button_url: "https://example.com",
  //   button_text_ar: "زر البنر 3",
  //   button_text_en: "Banner Button 3",
  //   image: { name: Home5 },
  // },
  // Add more banner objects as needed
];
SwiperCore.use([Pagination]);
const AUTOPLAY_DELAY = 8000;
const SPRING_DURATION = 0.1;
const MEDIUM_BREAKPOINT = "md";

const Banner = () => {
  //   const { data, isLoading, error, get, post } = useDataFetcher();
  const [bannersData, setBannersData] = useState(fakeBannersData);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate data loading time
    const delay = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the delay time as needed

    return () => clearTimeout(delay); // Clear timeout on unmount
  }, []);
  //   useEffect(() => {
  //     setDataLoading(true);
  //     const storedData = localStorage.getItem("bannersData");
  //     if (storedData) {
  //       setBannersData(JSON.parse(storedData));
  //     } else {
  //       get("/api/settings/banners/all");
  //     }
  //     setDataLoading(false);
  //   }, []);

  //   useEffect(() => {
  //     if (data) {
  //       localStorage.setItem("bannersData", JSON.stringify(data.banners));
  //     }
  //   }, [data]);

  const isXsScreen = useMediaQuery((theme) =>
    theme.breakpoints.down(MEDIUM_BREAKPOINT)
  );
  //   useEffect(() => {
  //     const storedData = localStorage.getItem("bannersData");
  //     if (storedData) {
  //       setBannersData(JSON.parse(storedData));
  //     } else {
  //     }
  //   }, []);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
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
    <Box sx={{ position: "relative" }}>
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
                        src={banner.image.name}
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
