import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  styled,
  Fade,
  CircularProgress,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import Star from "../common_components/Star";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import OrderCard from "../common_components/OrderCard";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Map } from "../../../../assets/images";
import HourglassDisabledIcon from "@mui/icons-material/HourglassDisabled";

import {
  EditInformation,
  EditLocation,
  ShowHomeSatusModal,
  EditMap,
  EditDescription,
} from "./outgoingcomponents";

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
// import useDataFetcher from "../../../api/useDataFetcher ";
// import Loader from "../../../common/Loading/Loader";
import { toast } from "react-hot-toast";
// import PaginationAds from "../../../common/Pagination/PaginationAds";
import axios from "axios";
import Swal from "sweetalert2";
// import { useAxiosConfig } from "../../../context/AxiosContext ";
// import './Incoming.module.css'

const CircleIconButton = styled(IconButton)({
  borderRadius: "50%",
  backgroundColor: "#d4d4d4",
  color: "white",
  padding: "0px",
});
const CustomAccordion = styled(Accordion)({
  padding: "18px",
  borderRadius: "12px",
  boxShadow: "none",
  "&:not(:last-child)": {
    marginBottom: "24px",
  },

  "&::before": {
    display: "none",
  },
});
const CustomAccordionSummary = styled(AccordionSummary)({
  borderRadius: "12px",
});
const CustomAccordionDetails = styled(AccordionDetails)({
  borderRadius: "12px",
  padding: { xs: "0rem", md: "2rem" },
});
const googleMapsApiKey = "AIzaSyCUSxdxRLpvkegxpk9-82sUjCylgekfGUk";

const OutGoingOrders = ({ userData, type = 0 }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  // const { axiosConfig } = useAxiosConfig();
  // const myAxios = axios.create(axiosConfig);
  const [stateLoading, setStateLoading] = useState();
  const [getDataState, setGetDataState] = useState(false);

  // const {
  //   data: CategoryData,
  //   isLoading: isLoadingCategoryData,
  //   get: getCategoryData,
  // } = useDataFetcher();

  const [myAds, setMyAds] = useState([]);

  const [per_page, set_per_page] = useState();
  const [current_page, set_current_page] = useState(1);
  const [last_page, set_last_page] = useState();
  const nav = useNavigate();
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [data, setData] = useState();

  // useEffect(() => {
  //   if (type === 0) {
  //     const token = localStorage.getItem("user_token");
  //     setIsLoadingData(true);
  //     const getData = async () => {
  //       const res = await axios.get(
  //         `https://www.dashboard.aqartik.com/api/user/get_user_deal?page=${current_page}`,
  //         {
  //           headers: {
  //             authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (res.data.status === 1) {
  //         setMyAds(res.data.ads.data);
  //         setIsLoadingData(false);
  //         setData(res.data);
  //       } else if (
  //         res.data.status === 0 &&
  //         res.data.message === "401 Unauthorized"
  //       ) {
  //         setIsLoadingData(false);
  //         toast.error(
  //           lang === "ar"
  //             ? "غير مصرح، يرجى تسجيل الدخول"
  //             : "unauthorized, please login again"
  //         );
  //         localStorage.removeItem("user_token");
  //         localStorage.removeItem("userId");
  //         localStorage.removeItem("userName");
  //         localStorage.removeItem("userMembership");
  //         localStorage.removeItem("userData");
  //         nav("/");
  //       } else {
  //       }
  //     };
  //     getData();
  //   } else if (type === 1) {
  //     const token = localStorage.getItem("user_token");
  //     setIsLoadingData(true);

  //     const getData = async () => {
  //       const res = await axios.get(
  //         `https://www.dashboard.aqartik.com/api/real-estate-request/get_all_requests?page=${current_page}`,
  //         {
  //           headers: {
  //             authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (res.data.status === 1) {
  //         setMyAds(res.data.requests.data);
  //         setData(res.data);
  //         setIsLoadingData(false);
  //       } else if (
  //         res.data.status === 0 &&
  //         res.data.message === "401 Unauthorized"
  //       ) {
  //         setIsLoadingData(false);
  //         toast.error(
  //           lang === "ar"
  //             ? "غير مصرح، يرجى تسجيل الدخول"
  //             : "unauthorized, please login again"
  //         );
  //         localStorage.removeItem("user_token");
  //         localStorage.removeItem("userId");
  //         localStorage.removeItem("userName");
  //         localStorage.removeItem("userMembership");
  //         localStorage.removeItem("userData");
  //         nav("/");
  //       } else {
  //       }
  //     };
  //     getData();
  //   } else if (type === 2) {
  //     const token = localStorage.getItem("user_token");
  //     setIsLoadingData(true);

  //     const getData = async () => {
  //       const res = await axios.get(
  //         `https://www.dashboard.aqartik.com/api/real-estate-request/get_all_requests?type=incoming&page=${current_page}`,
  //         {
  //           headers: {
  //             authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );
  //       if (res.data.status === 1) {
  //         setMyAds(res.data.requests.data);
  //         setData(res.data);
  //         setIsLoadingData(false);
  //       } else if (
  //         res.data.status === 0 &&
  //         res.data.message === "401 Unauthorized"
  //       ) {
  //         setIsLoadingData(false);
  //         toast.error(
  //           lang === "ar"
  //             ? "غير مصرح، يرجى تسجيل الدخول"
  //             : "unauthorized, please login again"
  //         );
  //         localStorage.removeItem("user_token");
  //         localStorage.removeItem("userId");
  //         localStorage.removeItem("userName");
  //         localStorage.removeItem("userMembership");
  //         localStorage.removeItem("userData");
  //         nav("/");
  //       } else {
  //       }
  //     };
  //     getData();
  //   }
  // }, [type, getDataState, current_page]);

  const [edditInfo, setEditInfo] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [edditLoc, setEditLoc] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [MapEdit, setMapEdit] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  // useEffect(() => {
  //   if (data) {
  //     if (type === 0) {
  //       if (data) setMyAds(data?.ads.data);
  //       set_current_page(data?.ads?.current_page);
  //       set_per_page(data?.ads?.per_page);
  //       set_last_page(data?.ads?.last_page);
  //     } else if (type === 1) {
  //       if (data) setMyAds(data?.requests.data);
  //       set_current_page(data?.requests?.current_page);
  //       set_per_page(data?.requests?.per_page);
  //       set_last_page(data?.requests?.last_page);
  //     } else if (type === 2) {
  //       if (data) setMyAds(data?.requests.data);
  //       set_current_page(data?.requests?.current_page);
  //       set_per_page(data?.requests?.per_page);
  //       set_last_page(data?.requests?.last_page);
  //     }
  //   }
  // }, [data]);
  const containerRef = useRef(null);

  const handlePageChange = (event, new_page) => {
    const container = containerRef.current;
    container.scrollTop = 0;
    container.scrollIntoView({ behavior: "smooth" });
    set_current_page(new_page);
  };
  const ad = "";

  // const handleChange = (panel, ad) => async (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  //   const number = panel.match(/\d+/)[0];

  //   if (number == ad.id) {
  //     setAdTime(ad?.lastUpdate);
  //   } else {
  //     setAdTime(null);
  //   }
  //   await getCategoryData(
  //     `https://www.dashboard.aqartik.com/api/deal/info/${ad.category_aqar.id}`
  //   );
  //   const apiKey = googleMapsApiKey;
  //   const lat = ad.lat; // Example latitude
  //   const lng = ad.lng; // Example longitude
  //   const zoom = ad.zoom; // Example zoom level
  //   const size = "400x400"; // Example size of the image

  //   setImageUrl(
  //     `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=${size}&markers=color:red%7Clabel:C%7C${lat},${lng}&key=${apiKey}`
  //   );
  // };

  const handleEditInformation = () => {
    setEditInfo(true);
  };

  const handleEditLocation = () => {
    setEditLoc(true);
  };

  const onCancel = () => {
    setEditInfo(!edditInfo);
  };
  // const onCancelMapEdit = () => {
  //   setMapEdit(!MapEdit);
  // };

  const handleCloseEditLocation = () => {
    setEditLoc(!edditLoc);
  };

  const handleCloseEditMap = () => {
    setMapEdit(!MapEdit);
  };

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleMapEdit = () => {
    setMapEdit(true);
  };

  // const handleSpecialAd = async (id) => {
  //   setStateLoading(true);

  //   try {
  //     const res = await myAxios.get(`/api/deal/make_deal_special/${id}`);
  //     if (res) {
  //       if (res.data.status) {
  //         setStateLoading(false);
  //         toast.success(res?.data?.message);
  //         setGetDataState((prev) => !prev);
  //       } else {
  //         setStateLoading(false);
  //         toast.error(res?.data?.message);
  //       }
  //     }
  //   } catch (err) {
  //     setStateLoading(false);
  //   }
  // };

  // const handleDeleteAd = async (id) => {
  //   Swal.fire({
  //     title: lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?",
  //     text:
  //       lang === "ar"
  //         ? "لايمكنك التراجع بعد التأكيد"
  //         : "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     cancelButtonText: lang === "ar" ? "الغاء" : "cancel",
  //     confirmButtonColor: "#14b183",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: lang === "ar" ? "تأكيد الحذف!" : "Yes, delete it!",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       const runFunction = async () => {
  //         if (type === 0) {
  //           setStateLoading(true);
  //           try {
  //             const res = await myAxios.get(`/api/deal/delete/${id}`);
  //             if (res.data.status === 1) {
  //               toast.success(lang === "ar" ? "تم الحذف بنجاح" : "done");
  //               setStateLoading(false);
  //               setGetDataState((prev) => !prev);
  //             }
  //           } catch (err) {}
  //         } else if (type === 1) {
  //           setStateLoading(true);
  //           try {
  //             const res = await myAxios.get(
  //               `/api/real-estate-request/delete/${id}`
  //             );
  //             if (res.data.status === 1) {
  //               toast.success(lang === "ar" ? "تم الحذف بنجاح" : "done");
  //               setStateLoading(false);
  //               setGetDataState((prev) => !prev);
  //             }
  //           } catch (err) {}
  //         }
  //       };
  //       runFunction();
  //     }
  //   });
  // };
  const [adTime, setAdTime] = useState(null);
  // const [currentTime, setCurrentTime] = useState(getUpdatedTime(adTime));
  const [userDateReached, setUserDateReached] = useState();
  // useEffect(() => {
  //   // Inside your useEffect
  //   if (adTime !== null) {
  //     const intervalId = setInterval(() => {
  //       const { timeDifferenceInSeconds } = getUpdatedTime(adTime);

  //       if (timeDifferenceInSeconds <= 0) {
  //         setUserDateReached(true);
  //         clearInterval(intervalId); // Stop the interval
  //         setCurrentTime(getUpdatedTime(adTime));
  //       } else {
  //         setUserDateReached(false);
  //         setCurrentTime(getUpdatedTime(adTime));
  //       }
  //     }, 1000); // Update every second

  //     return () => clearInterval(intervalId); // Cleanup on unmount
  //   }
  // }, [adTime]);

  // function getUpdatedTime(lastUpdate) {
  //   const currentDateTime = new Date();
  //   const lastUpdateTime = new Date(lastUpdate);
  //   const twentyFourHoursLater = new Date(lastUpdateTime);
  //   twentyFourHoursLater.setHours(lastUpdateTime.getHours() + 24);

  //   const timeDifferenceInSeconds = Math.floor(
  //     (twentyFourHoursLater - currentDateTime) / 1000
  //   );

  //   if (timeDifferenceInSeconds <= 0) {
  //     const formattedHours = 0;
  //     const formattedMinutes = 0;
  //     const formattedSeconds = 0;
  //     return {
  //       formattedHours,
  //       formattedMinutes,
  //       formattedSeconds,
  //       timeDifferenceInSeconds,
  //     };
  //   } else {
  //     const hours = Math.floor(timeDifferenceInSeconds / 3600);
  //     const minutes = Math.floor((timeDifferenceInSeconds % 3600) / 60);
  //     const seconds = timeDifferenceInSeconds % 60;

  //     const formattedHours = hours < 10 ? `0${hours}` : hours;
  //     const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  //     const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  //     return {
  //       formattedHours,
  //       formattedMinutes,
  //       formattedSeconds,
  //       timeDifferenceInSeconds,
  //     };
  //   }
  // }

  // const handleRefreshing = async (id) => {
  //   if (!userDateReached) return;
  //   setStateLoading(true);
  //   try {
  //     const res = await myAxios.get(`/api/deal/refresh_deal/${id}`);
  //     if (res) {
  //       setStateLoading(false);
  //       setGetDataState((prev) => !prev);
  //     }
  //   } catch (err) {
  //     setStateLoading(false);
  //   }
  // };

  // return isLoadingData || stateLoading ? (
  //   ""
  // ) : (
  // <Loader />
  return (
    <Box
      ref={containerRef}
      // sx={{ padding: { xs: "16px 5px", sm: "16px 56px" } }}
    >
      {/* <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "24px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {type === 0
          ? lang === "ar"
            ? "اعلاناتي"
            : "my ads"
          : type === 1
          ? lang === "ar"
            ? "الطلبات الصادرة"
            : "outgoing orders"
          : lang === "ar"
          ? "الطلبات الواردة"
          : "incoming orders"}
      </Typography> */}

      <>
        <Box className="outGoingclass">
          {/* {myAds.map((ad) => (
                 ))} */}
          <CustomAccordion
            // key={ad.id}
            TransitionProps={{ unmountOnExit: true }}
            // expanded={expanded === `panel${ad.id}`}
            // onChange={handleChange(`panel${ad.id}`, ad)}
          >
            <Box sx={{ paddingInline: "20px" }}>
              <CustomAccordionSummary
                expandIcon={
                  <CircleIconButton size="small">
                    <ExpandMoreIcon sx={{ fontSize: "2rem" }} />
                  </CircleIconButton>
                }
                // aria-controls={`panel${ad.id}-content`}
                // id={`panel${ad.id}-header`}
              >
                <Box className="custom-flex-container">
                  <div className="custom-flex-container2">
                    <Typography sx={{ fontSize: "24px", fontWeight: "700" }}>
                      {ad.title}
                      مكتب
                    </Typography>
                    {ad?.status === 0 ? (
                      <Typography
                        sx={{
                          color: "rgb(244, 67, 54)",
                          fontWeight: "600",
                          margin: "0px 16px",
                        }}
                      >
                        غير معروض
                      </Typography>
                    ) : (
                      <Typography
                        sx={{
                          color: "var(--green-color)",
                          fontWeight: "600",
                          margin: "0px 16px",
                        }}
                      >
                        معروض
                      </Typography>
                    )}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      marginTop: "4px",
                    }}
                  >
                    <Box onClick={() => handleSpecialAd(ad.id)}>
                      <div
                        style={{
                          alignItems: "center",
                          display: "flex",
                          cursor: "pointer",
                        }}
                      >
                        {Number(ad?.is_special) === 1 ? (
                          <StarIcon sx={{ color: "gold", fontSize: "2rem" }} />
                        ) : (
                          <StarBorderIcon className="staricon" />
                        )}
                      </div>
                    </Box>
                    <Box onClick={() => handleDeleteAd(ad.id)}>
                      <DeleteForeverIcon className="deleteicon" />
                    </Box>
                  </div>
                </Box>
              </CustomAccordionSummary>
            </Box>
            <CustomAccordionDetails>
              <Box className="custom-grid-container1">
                <Box>
                  <OrderCard>
                    <Box className="custom-flex-container-space">
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                      >
                        {t("dashboard.incoming_orders.card1.label1")}
                      </Typography>

                      {type !== 2 && (
                        <Typography
                          className="eitBtn"
                          onClick={handleEditInformation}
                        >
                          {!edditInfo &&
                            t("dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      )}
                    </Box>
                    {edditInfo && (
                      <Fade in={edditInfo}>
                        <Box>
                          <EditInformation
                            type={type}
                            // ad={ad}
                            onCancel={onCancel}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!edditInfo && (
                      <Fade in={!edditInfo}>
                        <Box>
                          <Box className="custom-flex-container-space">
                            <Typography>
                              {t("dashboard.incoming_orders.card1.label1")}
                            </Typography>
                            <Typography>{ad.title} مكتب</Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "1rem",
                            }}
                          >
                            <Typography>
                              {t("dashboard.incoming_orders.card1.label2")}
                            </Typography>
                            <Typography>
                              مكتب مشترك
                              {/* {lang === "ar"
                                ? ad.category_aqar.ar_name
                                : ad.category_aqar.en_name} */}
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    )}
                    <Box
                      className="custom-flex-container-space"
                      sx={{
                        marginTop: "1rem",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "600",
                          fontSize: "1.2rem",
                          marginTop: "1rem",
                        }}
                      >
                        {t("dashboard.incoming_orders.card2.title")}
                      </Typography>

                      {type !== 2 && (
                        <Typography
                          className="eitBtn"
                          onClick={handleEditLocation}
                        >
                          {!edditLoc &&
                            t("dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      )}
                    </Box>
                    {edditLoc && (
                      <Fade in={edditLoc}>
                        <Box>
                          <EditLocation
                            type={type}
                            ad={ad}
                            onCancel={handleCloseEditLocation}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                            // interfaces={CategoryData.interfaces}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!edditLoc && (
                      <Fade in={!edditLoc}>
                        <Box>
                          <Box className="custom-flex-container-space">
                            <Typography>
                              {t("dashboard.incoming_orders.card2.label1")}
                            </Typography>
                            <Typography>{ad.city} الرياض</Typography>
                          </Box>
                          <Box className="custom-flex-container-space">
                            <Typography>
                              {" "}
                              {t("dashboard.incoming_orders.card2.label2")}
                            </Typography>
                            <Typography>
                              {ad?.neighborhood} حي الزهور
                            </Typography>
                          </Box>
                          <Box className="custom-flex-container-space">
                            <Typography>
                              {lang === "ar" ? "الشارع" : "road"}
                            </Typography>
                            <Typography>{ad?.road} ....</Typography>
                          </Box>
                          <Box className="custom-flex-container-space">
                            <Typography>
                              {" "}
                              {t("dashboard.incoming_orders.card2.label3")}{" "}
                            </Typography>
                            <Typography>
                              {/* {lang === "ar"
                                ? ad?.interface_aqar?.ar_name
                                : ad?.interface_aqar?.en_name} */}
                              غربي
                            </Typography>
                          </Box>
                        </Box>
                      </Fade>
                    )}
                  </OrderCard>
                  <OrderCard>
                    {descriptionEdit && (
                      <Fade in={descriptionEdit}>
                        <Box>
                          <EditDescription
                            type={type}
                            // ad={ad}
                            onCancel={() => {
                              setDescriptionEdit(false);
                            }}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!descriptionEdit && (
                      <Fade in={!descriptionEdit}>
                        <Box>
                          <Box className="custom-flex-container-space">
                            <Typography
                              sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                            >
                              {t("dashboard.incoming_orders.card5.title")}
                            </Typography>

                            {type !== 2 && (
                              <Typography
                                className="eitBtn"
                                onClick={() => {
                                  setDescriptionEdit(true);
                                }}
                              >
                                {!descriptionEdit &&
                                  t("dashboard.outgoing_requests.edit_btn")}
                              </Typography>
                            )}
                          </Box>
                          <Typography>
                            {ad?.description}
                            مكتب في الرياض مكون غرفتين اجتماعات
                          </Typography>
                        </Box>
                      </Fade>
                    )}
                  </OrderCard>
                </Box>
                <Box>
                  <OrderCard>
                    <Box className="custom-flex-container-space">
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                      >
                        {t("dashboard.incoming_orders.card3.title")}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography>
                        {" "}
                        {t("dashboard.incoming_orders.card3.label1")}
                      </Typography>
                      {ad?.status === 0 ? (
                        <Typography
                          sx={{
                            color: "rgb(244, 67, 54)",
                            fontWeight: "600",
                            marginBottom: "1rem",
                          }}
                        >
                          غير معروض
                        </Typography>
                      ) : (
                        <Typography className="eitBtn">معروض</Typography>
                      )}
                    </Box>
                  </OrderCard>
                  <OrderCard>
                    <Box className="custom-flex-container-space">
                      <Typography
                        sx={{ fontWeight: "600", fontSize: "1.2rem" }}
                      >
                        {t("dashboard.incoming_orders.card4.title")}
                      </Typography>

                      {type !== 2 && (
                        <Typography className="eitBtn" onClick={handleMapEdit}>
                          {!MapEdit &&
                            t("dashboard.outgoing_requests.edit_btn")}
                        </Typography>
                      )}
                    </Box>
                    {MapEdit && (
                      <Fade in={MapEdit}>
                        <Box>
                          <EditMap
                            type={type}
                            // ad={ad}
                            onCancel={handleCloseEditMap}
                            setStateLoading={setStateLoading}
                            setGetDataState={setGetDataState}
                          />
                        </Box>
                      </Fade>
                    )}
                    {!MapEdit && (
                      <Fade in={!MapEdit}>
                        <Box sx={{ display: "flex" }}>
                          <Typography
                            sx={{
                              color: "rgb(132, 132, 132)",
                              width: "35%",
                            }}
                          >
                            {/* {ad?.city +
                              ", " +
                              ad?.neighborhood +
                              ", " +
                              ad?.road} */}
                          </Typography>
                          <Box className="map-image-container">
                            <img src={Map} alt="My " className="custom-image" />
                          </Box>
                        </Box>
                      </Fade>
                    )}
                  </OrderCard>
                  <OrderCard className={"edit"}>
                    <Link
                      to={
                        type === 0 ? "/EditAds" : type === 1 ? "/EditOrder" : ""
                      }
                      // state={{ ad: ad }}
                      style={{
                        textDecoration: "none",
                        color: "white",
                        backgroundColor: "var(--green-color)",
                        padding: "6px 12px",
                        borderRadius: "12px",
                      }}
                    >
                      {lang === "ar"
                        ? "تعديل كافة المعلومات"
                        : "edit all information"}
                    </Link>
                  </OrderCard>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {type === 0 && (
                  <>
                    {(() => {
                      return (
                        <Box className="custom-flex-column">
                          <p>
                            {lang === "ar"
                              ? "يمكنك التحديث بعد"
                              : "you can update after"}
                          </p>
                          <Box
                            sx={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                              flexDirection: lang === "ar" && "row-reverse",
                            }}
                          >
                            <span className="custom-badge">
                              {/* {currentTime.formattedHours} */}
                            </span>
                            <span className="custom-badge">
                              {/* {currentTime.formattedMinutes} */}
                            </span>
                            <span className="custom-badge">
                              {/* {currentTime.formattedSeconds} */}
                            </span>
                          </Box>
                          {userDateReached === true ? (
                            <Box
                              onClick={() => {
                                handleRefreshing(ad.id);
                              }}
                              className="custom-update-button"
                            >
                              <Typography>تحديث</Typography>
                              <RefreshIcon
                                sx={{
                                  cursor: "pointer",
                                  fontSize: "2rem",
                                }}
                              />
                            </Box>
                          ) : (
                            <Box
                              onClick={() => {
                                handleRefreshing(ad.id);
                              }}
                              className="custom-disabled-button"
                            >
                              <Typography>تحديث</Typography>
                              <RefreshIcon
                                sx={{
                                  cursor: "pointer",
                                  fontSize: "2rem",
                                }}
                              />
                            </Box>
                          )}
                        </Box>
                      );
                    })()}
                  </>
                )}
              </Box>
            </CustomAccordionDetails>
          </CustomAccordion>

          {/* {modalOpen && <ShowHomeSatusModal onClose={handleModalClose} />} */}
        </Box>
        {/* <PaginationAds
            handlePageChange={handlePageChange}
            current_page={current_page}
            per_page={per_page}
            last_page={last_page}
          /> */}
      </>
      {/* {myAds?.length > 0 ? (
      ) : (
        <Box
          sx={{
            width: { xs: "100%", md: "100%" },
            height: "400px",
            boxShadow: "1",
            backgroundColor: "white",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <HourglassDisabledIcon
            sx={{ fontSize: "2rem", marginBottom: "2rem" }}
          />
          <Typography sx={{ fontSize: "25px", color: "var(--main-color)" }}>
            {lang === "ar" ? "لا يوجد بيانات" : "there is no Ads"}
          </Typography>
        </Box>
      )} */}
    </Box>
  );
};

export default OutGoingOrders;
