import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import "../../../../../assets/css/filtermodal.css";
import OfficeType from "../Filter_components/OfficeType";
import Features from "../Filter_components/Features";
import PriceSlider from "../Filter_components/PriceSlider";
import RoomsOfficeNumbers from "../Filter_components/RoomsOfficeNumbers";
import { useTranslation } from "react-i18next";

const FilterModal = ({
  openFilterModal,
  setOpenFilterModal,
  refetch,
  setFilter,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [range, setRange] = useState([0, 0]);
  const [officeTypeId, setOfficeTypeId] = useState();
  const [selectedItemoffice, setSelectedItemOffice] = useState({});
  const [selectedItemMeeting, setSelectedItemMeeting] = useState({});
  const [selectedItemBathroom, setSelectedItemBathroom] = useState({});
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedConfortFeatures, setSelectedConfortFeatures] = useState([]);

  // console.log(
  //   "office",
  //   selectedItemoffice,
  //   "met",
  //   selectedItemMeeting,
  //   "bath",
  //   selectedItemBathroom
  // );
  const searchData = JSON.parse(localStorage.getItem("searchData"));
  const OfficesFeatures = searchData?.featurea_ads;
  const CatgoryData = searchData?.category_aqar;
  const ConfirtData = searchData?.comfort;
  const officesRooms = searchData?.room_details;

  // console.log("selectedFeatures", selectedFeatures);
  // const OfficesFeatures = [
  //   { id: 1, label: "واي فاي" },
  //   { id: 2, label: "مطبخ " },
  //   { id: 3, label: "غسّالة " },
  //   { id: 4, label: "نشّافة " },
  // ];
  const LocationFeatures = [
    { id: 1, label: "مواقف سيارات " },
    { id: 2, label: " موقف سيارات عام" },
    { id: 3, label: " مواقف سيارات خاصة" },
  ];
  const OfficeRooms = [
    {
      id: 0,
      title: t("dashboard.Offices.offices"),
      items: [{ num: "بدون تحديد" }, { num: "1" }, { num: "2" }],
    },
    {
      id: 1,
      title: t("home.FilterModal.Meetings"),
      items: [{ num: "بدون تحديد" }, { num: "1" }, { num: "2" }],
    },
    {
      id: 2,
      title: t("home.FilterModal.Bathrooms"),
      items: [{ num: "بدون تحديد" }, { num: "1" }, { num: "2" }],
    },
  ];
  const handleFilerModalClose = () => {
    setOpenFilterModal(false);
  };
  // console.log("con", selectedConfortFeatures);
  const handleShowFilterRes = () => {
    setFilter((prevState) => {
      const filterParams = {
        ...prevState,
        "min[ads_prices.price]":
          range[0] !== null ? encodeURIComponent(range[0]) : undefined,
        "max[ads_prices.price]":
          range[1] !== null ? encodeURIComponent(range[1]) : undefined,
        "exact[category_aqar.id]":
          officeTypeId !== null ? officeTypeId : undefined,
        "in[ads_rooms.number][0]":
          selectedItemoffice?.num !== null ? selectedItemoffice.num : undefined,
        "in[ads_rooms.id][0]":
          selectedItemoffice?.itemId !== null
            ? selectedItemoffice.itemId
            : undefined,
        "in[ads_rooms.number][1]":
          selectedItemMeeting?.num !== null
            ? selectedItemMeeting.num
            : undefined,
        "in[ads_rooms.id][1]":
          selectedItemMeeting?.itemId !== null
            ? selectedItemMeeting.itemId
            : undefined,
        "in[ads_rooms.number][2]":
          selectedItemBathroom?.num !== null
            ? selectedItemBathroom.num
            : undefined,
        "in[ads_rooms.id][2]":
          selectedItemBathroom?.itemId !== null
            ? selectedItemBathroom.itemId
            : undefined,
        ...selectedFeatures.reduce((acc, featureId, index) => {
          acc[`in[featurea_ads.id][${index}]`] = featureId;
          return acc;
        }, {}),
        ...selectedConfortFeatures.reduce((acc, featureId, index) => {
          acc[`in[comforts.id.id][${index}]`] = featureId;
          return acc;
        }, {}),
        // ...selectedConfortFeatures.reduce((acc, featureId, index) => {
        //   acc[`in[featurea_ads.id][${index}]`] = featureId;
        //   return acc;
        // }, {}),
      };

      Object.keys(filterParams).forEach(
        (key) =>
          (filterParams[key] === undefined || filterParams[key] === "") &&
          delete filterParams[key]
      );

      return filterParams;
    });
    refetch();
    console.log("hi");
  };
  const handleDeleteFilterRes = () => setFilter({});
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
            <PriceSlider range={range} setRange={setRange} />
          </Box>
          {/* <Box className="price_div">
            <Typography className="filter_title">
              {" "}
              {t("home.FilterModal.rooms")}{" "}
            </Typography>
            {officesRooms?.map((ele, index) => (
              <RoomsOfficeNumbers
                key={index}
                id={ele.id}
                title={lang === "ar" ? ele.ar_name : ele.en_name}
                items={ele.ads_rooms}
                setFilter={setFilter}
                selectedItemoffice={selectedItemoffice}
                selectedItemMeeting={selectedItemMeeting}
                selectedItemBathroom={selectedItemBathroom}
                setSelectedItemMeeting={setSelectedItemMeeting}
                setSelectedItemOffice={setSelectedItemOffice}
                setSelectedItemBathroom={setSelectedItemBathroom}
              />
            ))}
          </Box> */}
          <Box className="price_div">
            <Typography className="filter_title">
              {" "}
              {t("home.FilterModal.office_type")}
            </Typography>
            <Box sx={{ display: "flex", width: "100%" }}>
              <OfficeType
                CatgoryData={CatgoryData}
                officeTypeId={officeTypeId}
                setOfficeTypeId={setOfficeTypeId}
              />
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
              {OfficesFeatures?.map((feature, index) => {
                return (
                  <Features
                    key={index}
                    feature={feature}
                    selectedFeatures={selectedFeatures}
                    setSelectedFeatures={setSelectedFeatures}
                    setFilter={setFilter}
                  />
                );
              })}
            </Box>
          </Box>
          <Box className="price_div">
            <Typography className="filter_title">
              {t("home.FilterModal.meansofcomfort")}
            </Typography>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                flexWrap: "wrap",
                marginY: "10px",
              }}
            >
              {ConfirtData?.map((feature, index) => {
                return (
                  <Features
                    key={index}
                    feature={feature}
                    selectedFeatures={selectedConfortFeatures}
                    setSelectedFeatures={setSelectedConfortFeatures}
                    setFilter={setFilter}
                  />
                );
              })}
            </Box>
          </Box>
          <Box className="boxBtnDeleteShow">
            <Button className="delete" onClick={handleDeleteFilterRes}>
              {t("home.FilterModal.delete_all")}
            </Button>
            <Button className="show" onClick={handleShowFilterRes}>
              {t("home.FilterModal.show_all")}
            </Button>
          </Box>
        </Box>
      </>
    </Modal>
  );
};

export default FilterModal;
