import { useEffect, useRef, useState } from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  styled,
  Fade,
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
  EditMap,
  EditDescription,
} from "./outgoingcomponents";

import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useQueryHook } from "../../../../hooks/useQueryHook";
import myAxios from "../../../../api/myAxios";
import { useMutationHook } from "../../../../hooks/useMutationHook";

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

const getData = async (page) => {
  const res = await myAxios.get("api/v1/user/offices/me");
  return res;
};

const OutGoingOrders = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [page, setPage] = useState(1);

  const { data: offices } = useQueryHook(["myOffices", page], () =>
    getData(page)
  );

  // const restoreMutation = useMutationHook(restoreFunc, [
  //   "myOffices",
  //   page,
  // ]);

  const ad = "";

  //start displaying edit components
  const [edditInfo, setEditInfo] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [edditLoc, setEditLoc] = useState(false);
  const [MapEdit, setMapEdit] = useState(false);
  const handleEditInformation = () => {
    setEditInfo(true);
  };
  const handleEditLocation = () => {
    setEditLoc(true);
  };
  const onCancel = () => {
    setEditInfo(!edditInfo);
  };
  const handleCloseEditLocation = () => {
    setEditLoc(!edditLoc);
  };
  const handleCloseEditMap = () => {
    setMapEdit(!MapEdit);
  };
  const handleMapEdit = () => {
    setMapEdit(true);
  };
  //end displaying edit components

  const [userDateReached, setUserDateReached] = useState();
  return (
    <Box>
      <>
        <Box className="outGoingclass">
          {/* {offices.map((ad) => (
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
                    <Box onClick={() => console.log("make special")}>
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
                    <Box onClick={() => console.log("delete")}>
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

                      <Typography
                        className="eitBtn"
                        onClick={handleEditInformation}
                      >
                        {!edditInfo &&
                          t("dashboard.outgoing_requests.edit_btn")}
                      </Typography>
                    </Box>
                    {edditInfo && (
                      <Fade in={edditInfo}>
                        <Box>
                          <EditInformation
                            // ad={ad}
                            onCancel={onCancel}
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

                      <Typography
                        className="eitBtn"
                        onClick={handleEditLocation}
                      >
                        {!edditLoc && t("dashboard.outgoing_requests.edit_btn")}
                      </Typography>
                    </Box>
                    {edditLoc && (
                      <Fade in={edditLoc}>
                        <Box>
                          <EditLocation
                            ad={ad}
                            onCancel={handleCloseEditLocation}
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
                            // ad={ad}
                            onCancel={() => {
                              setDescriptionEdit(false);
                            }}
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

                            <Typography
                              className="eitBtn"
                              onClick={() => {
                                setDescriptionEdit(true);
                              }}
                            >
                              {!descriptionEdit &&
                                t("dashboard.outgoing_requests.edit_btn")}
                            </Typography>
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

                      <Typography className="eitBtn" onClick={handleMapEdit}>
                        {!MapEdit && t("dashboard.outgoing_requests.edit_btn")}
                      </Typography>
                    </Box>
                    {MapEdit && (
                      <Fade in={MapEdit}>
                        <Box>
                          <EditMap
                            // ad={ad}
                            onCancel={handleCloseEditMap}
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
                      to={""}
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
                            onClick={() => {}}
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
                            onClick={() => {}}
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
              </Box>
            </CustomAccordionDetails>
          </CustomAccordion>
        </Box>
      </>
    </Box>
  );
};

export default OutGoingOrders;
