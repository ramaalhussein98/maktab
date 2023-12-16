import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../../../../../assets/css/filtermodal.css";
import OfficeType from "../Filter_components/OfficeType";
import Features from "../Filter_components/Features";
import PriceSlider from "../Filter_components/PriceSlider";

import { SmallHouses, Designs, Village } from "../../../../../assets/icons";
import RoomsOfficeNumbers from "../Filter_components/RoomsOfficeNumbers";
import { useTranslation } from "react-i18next";

const FilterModal = ({ openFilterModal, setOpenFilterModal }) => {
  const { t } = useTranslation();
  const OfficesType = [
    { type: "مكتب مستقل", src: SmallHouses },
    { type: "مكتب مشترك", src: Designs },
    { type: " قاعة اجتماعات", src: Village },
  ];
  const OfficesFeatures = [
    { id: 1, label: "واي فاي" },
    { id: 2, label: "مطبخ " },
    { id: 3, label: "غسّالة " },
    { id: 4, label: "نشّافة " },
  ];
  const LocationFeatures = [
    { id: 1, label: "مواقف سيارات " },
    { id: 2, label: " موقف سيارات عام" },
    { id: 3, label: " مواقف سيارات خاصة" },
  ];
  const OfficeRooms = [
    {
      title: t("dashboard.Offices.offices"),
      items: [
        { id: 0, num: "بدون تحديد" },
        { id: 1, num: "1" },
        { id: 2, num: "2" },
      ],
    },
    {
      title: t("home.FilterModal.Meetings"),
      items: [
        { id: 0, num: "بدون تحديد" },
        { id: 1, num: "1" },
        { id: 2, num: "2" },
      ],
    },
    {
      title: t("home.FilterModal.Bathrooms"),
      items: [
        { id: 0, num: "بدون تحديد" },
        { id: 1, num: "1" },
        { id: 2, num: "2" },
      ],
    },
  ];
  const handleFilerModalClose = () => {
    setOpenFilterModal(false);
  };
  return (
    <Modal
      open={openFilterModal}
      onClose={handleFilerModalClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <>
        <Box
          sx={{
            position: "absolute",
            top: { md: "50%" },
            bottom: { xs: "0px", md: "auto" },
            left: "50%",
            transform: { xs: " translateX(-50%)", md: "translate(-50%, -50%)" },
            width: { xs: "100%", md: 800 },
            bgcolor: "background.paper",
            boxShadow: 24,
            padding: "32px 0px",
            borderRadius: "12px",
            maxHeight: { xs: "85%", md: "650px" },
            overflowY: "auto",
            overflowX: "hidden !important",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            className="header_style"
          >
            {t("home.FilterModal.Filter_Factors")}
          </Typography>
          <Box className="price_div">
            <Typography className="filter_title">
              {t("home.FilterModal.price_range")}
            </Typography>
            <PriceSlider />
          </Box>
          <Box className="price_div">
            <Typography className="filter_title">
              {" "}
              {t("home.FilterModal.rooms")}{" "}
            </Typography>
            {OfficeRooms.map((ele, index) => (
              <RoomsOfficeNumbers
                key={index}
                title={ele.title}
                items={ele.items}
              />
            ))}
          </Box>
          <Box className="price_div">
            <Typography className="filter_title">
              {" "}
              {t("home.FilterModal.office_type")}
            </Typography>
            <Box sx={{ display: "flex", width: "100%" }}>
              {OfficesType.map((data, index) => {
                return (
                  <OfficeType key={index} type={data.type} src={data.src} />
                );
              })}
            </Box>
          </Box>
          <Box className="price_div">
            <Typography className="filter_title">
              {" "}
              {t("home.FilterModal.Features")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                marginY: "10px",
              }}
            >
              {OfficesFeatures.map((feature, index) => {
                return (
                  <Features key={index} id={feature.id} label={feature.label} />
                );
              })}
            </Box>
          </Box>
          <Box className="price_div">
            <Typography className="filter_title">
              {t("home.FilterModal.Accessibility_Features")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                marginY: "10px",
              }}
            >
              {LocationFeatures.map((feature, index) => {
                return (
                  <Features key={index} id={feature.id} label={feature.label} />
                );
              })}
            </Box>
          </Box>
          <Box className="boxBtnDeleteShow">
            <Button className="delete">
              {t("home.FilterModal.delete_all")}
            </Button>
            <Button className="show">{t("home.FilterModal.show_all")}</Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default FilterModal;
