import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  ThemeProvider,
  Typography,
  createTheme,
  Modal,
} from "@mui/material";
import { Link } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Map } from "../../../../../assets/images";
import { HomeSvg, Famiy, Location } from "../../../../../assets/icons";
import DetailsFeaturesBox from "../details_lg_components/DetailsFeaturesBox";
import CloseIcon from "@mui/icons-material/Close";
// import LogInModal from "../../../../authentication/loginFolder/LogInModal";
import FiveStars from "../details_lg_components/FiveStars";
import DetailsAppoiment from "./DetailsAppoiment";
import { useTranslation } from "react-i18next";

// Define your custom theme
const theme = createTheme({
  typography: {
    fontFamily: "'Tajawal', sans-serif",
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          fontSize: "17px",
          marginLeft: "5px",
          padding: "6px 8px",
          fontFamily: "'Tajawal', sans-serif !important",
        },

        textColorPrimary: {
          color: "black !important",
          fontFamily: "'Tajawal', sans-serif !important",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          color: "black",
          backgroundColor: "var(--main-color)",
          fontFamily: "'Tajawal', sans-serif !important",
        },
      },
    },
  },
});

const DetailsXsTabs = () =>
  // { adInfo }
  {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const [activeTab, setActiveTab] = useState(0);
    const [showMore, setShowMore] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const modalRef = useRef(null);
    const userToken = localStorage.getItem("user_token");

    const handleTabChange = (event, newValue) => {
      setActiveTab(newValue);
    };
    const toggleShowMore = () => {
      setShowMore(!showMore);
    };
    const closeModal = () => {
      setShowLoginModal(false);
    };
    useEffect(() => {
      if (activeTab === 2) {
        if (!userToken) {
          setShowLoginModal(true);
        } else {
        }
      } else {
        setShowLoginModal(false);
      }
    }, [activeTab, userToken]);
    // useEffect(() => {
    //   const handleClickOutsideModal = (event) => {
    //     // Check if the click occurred outside of the modal
    //     if (modalRef.current && !modalRef.current.contains(event.target)) {
    //       // Check if the click didn't occur on Tab 2
    //       const tab2Button = document.getElementById("tab2");

    //       if (tab2Button && !tab2Button.contains(event.target)) {
    //         closeModal();
    //       }
    //     }
    //   };

    //   window.addEventListener("click", handleClickOutsideModal);

    //   return () => {
    //     window.removeEventListener("click", handleClickOutsideModal);
    //   };
    // }, []);
    return (
      <>
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              paddingTop: "20px",
              borderTopLeftRadius: "25px",
              borderTopRightRadius: "25px",
              transform: "translateY(-20px)",
              backgroundColor: "rgb(255, 255, 255)",
              position: "relative",
              zIndex: "1",
              paddingLeft: "22px",
              paddingRight: "22px",
              color: "black",
            }}
          >
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{
                "& .MuiTabs-flexContainer": {
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
              }}
            >
              <Tab
                label={t(
                  "details_page.details_tabs.specifications_and_features"
                )}
                sx={{ fontSize: { xs: "12px", md: "17px" }, fontWeight: "700" }}
              />
              <Tab
                label={t("details_page.details_tabs.location_and_map")}
                sx={{ fontSize: { xs: "12px", md: "17px" }, fontWeight: "700" }}
              />
              <Tab
                id="tab2"
                label={t("details_page.details_tabs.guest_reviews")}
                onClick={() => {
                  if (activeTab !== 2 && !userToken) {
                    setShowLoginModal(true);
                  }
                  setActiveTab(2);
                }}
                sx={{ fontSize: { xs: "12px", md: "17px" }, fontWeight: "700" }}
              />
            </Tabs>
            <Box>
              {activeTab === 0 && (
                <Box sx={{ marginY: "2rem" }}>
                  {/* Content for the first tab (المواصفات والميزات) */}
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontSize: "17px", fontWeight: "700" }}>
                      مكتب في الرياض
                      {/* {adInfo?.title} */}
                    </Typography>
                    <Typography
                      sx={{
                        color: "black",
                        fontSize: "14px",
                        marginX: "5px",
                      }}
                    >
                      {" "}
                      11111
                      {/* ( {adInfo?.ref_number}) */}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      flexDirection: "column",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "row",
                        marginY: "5px",
                      }}
                    >
                      <StarIcon
                        sx={{
                          // marginLeft: "5px",
                          // marginRight: "-3px",
                          marginLeft: lang === "ar" ? "0px" : "9px",
                          color: "var(--main-color)",
                          fontSize: "1rem",
                        }}
                      ></StarIcon>
                      <Typography sx={{ color: "black" }}>
                        {/* {adInfo?.user_rate} {lang === "ar" ? "تقييم" : "rate"} */}
                        5.0
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginY: "5px",
                      }}
                    >
                      <img
                        src={Location}
                        alt="location"
                        style={{
                          marginLeft: lang === "ar" ? "9px" : "0px",
                          marginRight: lang === "en" ? "9px" : "0px",
                          width: "11px",
                        }}
                      />
                      <Typography sx={{ color: "black", fontSize: "15px" }}>
                        الرياض - قصور أل مقبل
                        {/* {adInfo.city} , {adInfo.neighborhood} , {adInfo.road} */}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        marginY: "5px",
                      }}
                    >
                      <img
                        src={HomeSvg}
                        alt="HomeSvg"
                        style={{
                          marginLeft: lang === "ar" ? "9px" : "0px",
                          marginRight: lang === "en" ? "9px" : "0px",
                          width: "13px",
                        }}
                      />
                      <Typography sx={{ color: "black", fontSize: "15px" }}>
                        200 م
                        {/* {lang === "ar"
                          ? "مساحة" + " " + adInfo?.space + " م"
                          : "unit area " + adInfo?.space + " M"} */}
                      </Typography>
                    </Box>
                  </Box>
                  <Typography
                    sx={{
                      fontWeight: "700",
                      fontSize: "17px",
                      marginTop: "25px",
                    }}
                  >
                    {t("details_page.details_title")}
                  </Typography>
                  <Typography
                    sx={{
                      color: "black",
                      fontSize: "15px",
                      whiteSpace: "pre-wrap",
                      // maxHeight: showMore ? "none" : "50px",
                      overflow: "hidden",
                      marginTop: "9px",
                    }}
                  >
                    مكتب شرقي الرياض راقي,مؤثث بالكامل مكون من اربع مكاتب وغرف
                    اجتماعات{/* {adInfo?.description} */}
                    {/* {showMore ? "قريبه من جميع الخدمات" : " ..."}
                  <Button onClick={toggleShowMore} sx={{ color: "black" }}>
                    {showMore
                      ? t("details_page.xs_less")
                      : t("details_page.xs_more")}
                  </Button> */}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: "1px",
                      marginBottom: "30px",
                      marginTop: "30px",
                      display: "flex",

                      justifyContent: "center",
                      "&::after": {
                        content: "''",
                        display: "block",
                        width: "285px",
                        height: "1px",
                        backgroundColor: "rgba(132, 132, 132, 0.16)",
                      },
                    }}
                  ></Box>
                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: "700",
                      marginBottom: "15px",
                    }}
                  >
                    {t("details_page.details_tabs.specifications_and_features")}
                  </Typography>
                  <DetailsFeaturesBox
                  //  adInfo={adInfo}
                  />
                  {/* this Box for calender  */}
                  <DetailsAppoiment />

                  {/* this details card */}
                  <Typography
                    sx={{ color: "var(--main-color)", marginTop: "1rem" }}
                  >
                    {lang === "ar" ? "معلومات المعلن" : "advertiser info"}
                  </Typography>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ marginLeft: "8px", fontWeight: "700" }}>
                      {t("details_page.details_card.advertiser_name")}:
                    </Typography>
                    <Typography>
                      rama
                      {/* {adInfo.user?.username} */}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Typography sx={{ marginLeft: "8px", fontWeight: "700" }}>
                      {t("details_page.details_card.advertiser_broker")}:
                    </Typography>
                    <Typography>
                      {" "}
                      {/* {t(`dashboard.order_details`)}مالك */}
                      {/* {t(
                        `dashboard.order_details.${adInfo?.advertiser_relationship}`
                      )} */}
                    </Typography>
                    {/* <Typography sx={{ marginLeft: "8px", marginY: "5px" }}>
                    {t("details_page.details_card.advertiser_broker") +
                      ": " +
                      t(
                        `dashboard.order_details.${adInfo?.advertiser_relationship}`
                      )}
                  </Typography> */}
                  </Box>
                </Box>
              )}
              {activeTab === 1 && (
                <Box>
                  <Typography sx={{ marginTop: "2rem" }}>
                    الرياض - قصور أل مقبل
                    {/* {adInfo?.city} , {adInfo?.neighborhood} , {adInfo?.road} */}
                  </Typography>
                  {/* <Button
                  sx={{ marginTop: "1rem", color: "black", fontWeight: "500" }}
                  // onClick={handleModalOpen}
                >
                  اضغط هنا لمعرفة الموقع التقريبي
                </Button> */}
                  {/* <Button sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "16px" }}>
                  {t("details_page.details_tabs.location_and_map_tab.desc")}
                </Button> */}
                  <Box sx={{ marginTop: "1rem" }}>
                    <Link
                      // href={`https://www.google.com/maps/dir/My+Location/${adInfo.lat},${adInfo.lng}/@${adInfo.lat},${adInfo.lng},12z/data=!3m1!4b1?entry=ttu`}
                      target="_blank"
                    >
                      <img
                        src={Map}
                        alt="map"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "20px",
                        }}
                      />
                    </Link>
                  </Box>
                </Box>
              )}
              {activeTab === 2 && (
                <>
                  {userToken && (
                    <Box
                      sx={{
                        border: "1px solid #d2cdcd",
                        padding: "1rem",
                        width: "15rem",
                        borderRadius: "1rem",
                        marginTop: "3rem",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", color: "gray" }}>
                        {t(
                          "details_page.details_tabs.guest_reviews_tab.review_title"
                        )}
                        ..
                      </Typography>

                      <FiveStars
                      // adInfo={adInfo}
                      />
                    </Box>
                  )}

                  {/* <LogInModal
                  open={showLoginModal}
                  onClose={() => setShowLoginModal(false)}
                /> */}
                </>
              )}
            </Box>
          </Box>
        </ThemeProvider>

        {/* this Modal for Location */}
        {/* <Modal
        open={openModal}
        onClose={handleModalClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 330,
            bgcolor: "background.paper",
            border: "2px solid white",
            borderRadius: "20px",
            boxShadow: 24,
            p: 0,
          }}
        >
          <Box sx={{ flex: "0 0 auto", margin: "0", padding: "16px 24px" }}>
            <Typography
              sx={{
                color: "var(--main-color)",
                textAlign: "center",
                fontWeight: "700",
              }}
            >
              تنبيه
            </Typography>
          </Box>
          <Box
            sx={{
              width: "100%",
              height: "1px",
              backgroundColor: "rgb(0, 0, 0)",
              opacity: " 0.1",
            }}
          ></Box>
          <Button
            onClick={handleModalClose}
            sx={{
              position: "absolute",
              left: "0px",
              top: "13.5px",
            }}
          >
            <CloseIcon sx={{ color: "var(--main-color)" }} />
          </Button>
          <Box
            sx={{ flex: "1 1 auto", padding: "8px 24px", overflowY: "auto" }}
          >
            <Typography sx={{ color: "rgba(0, 0, 0, 0.54)", fontSize: "18px" }}>
              سيظهر الآن الموقع التقريبي للمكان و ليس الموقع الدقيق علماً بأن
              معلومات الموقع الدقيقة ستظهر بعد تأكيد الحجز مباشرة
            </Typography>
          </Box>
          <Box
            sx={{
              flex: "0 0 auto",
              display: "flex",
              padding: "8px",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            {" "}
            <Link href="https://www.google.com/maps/dir/My+Location/24.8099167,46.6088413/@24.8100367,46.5387048,12z/data=!3m1!4b1?entry=ttu">
              <Button
                sx={{
                  height: "48px",
                  fontSize: "15px",
                  boxShadow:
                    "0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)",
                  fontWeight: "bold",
                  paddingRight: "18px",
                  borderRadius: "4px",
                  paddingLeft: "18px",
                  backgroundColor: "var(--main-color)",
                  color: "white",
                  "&:hover": {
                    backgroundColor: "var(--main-color)",
                    color: "white",
                  },
                }}
              >
                موافق
              </Button>
            </Link>
          </Box>
        </Box>
      </Modal> */}
      </>
    );
  };

export default DetailsXsTabs;
