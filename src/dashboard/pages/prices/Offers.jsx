import { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  Paper,
  Typography,
  Switch,
  FormControlLabel,
  Divider,
  OutlinedInput,
} from "@mui/material";
import LeftDrawer from "./LeftDrawer";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";
import { useQueryHook } from "../../../hooks/useQueryHook";
import myAxios from "../../../api/myAxios";
import Select from "@mui/material/Select";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Loader from "../../../ui/Loader";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: green[600],
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: green[600],
  },
}));

const getData = async () => {
  const res = await myAxios.get("api/v1/user/offers");
  return res?.data?.data;
};

const Offers = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const {
    data: offers,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryHook(["down"], () => getData());
  const unitsPrices = JSON.parse(localStorage.getItem("searchData"))?.type_res;
  const [extractedOffers, setExtractedOffers] = useState([]);
  useEffect(() => {
    // Function to extract offers
    const extractOffers = () => {
      const offersArray = [];
      if (offers) {
        for (const mainObject of offers) {
          if (mainObject && mainObject?.units) {
            for (const unit of mainObject.units) {
              if (unit?.offers?.length > 0) {
                unit?.offers.forEach((offer) => {
                  // Extract the title and offer details
                  const offerDetails = {
                    title: unit?.title,
                    offer: offer,
                  };
                  offersArray.push(offerDetails);
                });
              }
            }
          }
        }
      }

      setExtractedOffers(offersArray);
    };
    // Call the function to extract offers
    extractOffers();
  }, [offers]); // Run the effect whenever dataArray changes

  const [selectedOffice, setSelectedOffice] = useState("");

  const [switchState, setSwitchState] = useState(true);

  const [open, setOpen] = useState(false);
  const [openType, setOpenType] = useState();

  // for edit functionality
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState();
  // for edit functionality

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenType(1);
    setOpen(isOpen);
  };

  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);
  };
  const [isStatusChanges, setIsStatusChanges] = useState(false);
  const handleSwitchChange = async (id, checked) => {
    setIsStatusChanges(true);
    console.log(id, checked);
    // You can include your Axios request here
    const res = await myAxios.post(`api/v1/user/offers/status_offices/${id}`);
    if (res.data.status === true) {
      setIsStatusChanges(false);
      await refetch();
    }
  };

  const handleDeleteOffer = (id) => {
    console.log(id);

    Swal.fire({
      title: lang === "ar" ? "هل انت متأكد؟" : "Are you sure?",
      text:
        lang === "ar"
          ? "انت على وشك حذف العرض"
          : "You are about to delete the offer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، متأكد" : "Yes, sure!",
      cancelButtonText: lang === "ar" ? "لا" : "No",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onRemove(id); // Call the onRemove function to delete the box
      }
    });
  };

  const onRemove = async (id) => {
    setIsStatusChanges(true);
    console.log(id);
    const res = await myAxios.delete(`api/v1/user/offers/delete_offices/${id}`);
    console.log(res);
    setIsStatusChanges(false);
    refetch();
  };

  const handleEdit = (offer) => {
    console.log(offer);
    setSelectedOffer(offer);
    // Find the selected unit
    const selectedUnit = offers.reduce((selected, ele) => {
      const unit = ele.units.find((unit) => unit.id == offer.offer.ads_id);
      return unit || selected;
    }, null);
    setSelectedUnit(selectedUnit);
    setOpenType(2);
    setOpen(true);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {(isRefetching || isStatusChanges) && <Loader />}
      <Box sx={{ padding: { xs: "0px", md: "20px" } }}>
        <span className="title_price"> {t("dashboard.pricesNav.link2")} </span>
        <Box
          className="d_flex_wrap"
          sx={{ marginY: "1rem", alignItems: "center" }}
        >
          <span className="font_bold">
            {t("dashboard.prices.chooseOffice")}
          </span>
          <FormControl
            sx={{ minWidth: 120, width: "250px", backgroundColor: "white" }}
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedOffice.id}
              onChange={handleOfficeChange}
              displayEmpty
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected) {
                  return selected.title;
                }
                return <em>اضغط لاختيار المكتب</em>;
              }}
              inputProps={{ "aria-label": "Without label" }}
              IconComponent={ArrowDropDownIcon} // Add this line
            >
              {offers.map((ele) => (
                <MenuItem key={ele.id} value={ele}>
                  {ele.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        {selectedOffice && (
          <Paper className="paper_style">
            <Box className="d_flex_space_between">
              <Typography className="title_price">
                {selectedOffice.title}
              </Typography>
              <button className="edit_btn" onClick={toggleDrawer(true)}>
                {t("dashboard.prices.add_new_offer")}
              </button>
            </Box>
            {extractedOffers.map((ele, i) => {
              const startDateString = ele.offer.start_date;
              const endDateString = ele.offer.end_date;
              const startDate = new Date(startDateString);
              const endDate = new Date(endDateString);
              const options = {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              };
              const formattedStartDate = new Intl.DateTimeFormat(
                "ar-EG",
                options
              ).format(startDate);
              const formattedEndDate = new Intl.DateTimeFormat(
                "ar-EG",
                options
              ).format(endDate);
              const status = ele.offer.status == 0 ? false : true;
              const result = `من ${formattedStartDate} الى ${formattedEndDate}`;
              return (
                <Paper className="paper_style" key={i}>
                  <Box className="d_flex_space_between">
                    <Typography className="font_bold">
                      {ele.offer.name}
                    </Typography>
                    <Box className="box_switch">
                      <div className="div1">
                        <span> {t("dashboard.prices.activation_status")}</span>
                        <FormControlLabel
                          control={
                            <GreenSwitch
                              dir="rtl"
                              checked={status}
                              onChange={(event) =>
                                handleSwitchChange(
                                  ele.offer.id,
                                  event.target.checked
                                )
                              }
                            />
                          }
                          sx={{
                            transform: "rotate(180deg) !important",
                          }}
                        />
                        {status ? (
                          <span style={{ color: "green" }}>
                            {t("dashboard.prices.active")}
                          </span>
                        ) : (
                          <span style={{ color: "gray" }}>
                            {" "}
                            {t("dashboard.prices.not_enabled")}
                          </span>
                        )}
                      </div>
                    </Box>
                  </Box>
                  <p className="font_gray">{result}</p>
                  <Box className="d_flex_wrap_details_offer">
                    <Box className="div1">
                      <p className="p1">
                        {t("dashboard.prices.discount_percentage")}
                      </p>
                      <div className="div11">
                        <span>{ele.offer.discount}</span>
                        <span>
                          {ele.offer.type_discount === "percent"
                            ? "%"
                            : lang === "ar"
                            ? "ريال"
                            : "SAR"}
                        </span>
                      </div>
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginX: "1rem" }}
                    />
                    <Box className="div1">
                      <p className="p1"> {t("dashboard.prices.applied_to")} </p>
                      <div className="div11">{ele.title}</div>
                    </Box>
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{ marginX: "1rem" }}
                    />
                    <Box className="div1">
                      <p className="p1"> {t("dashboard.prices.offer_days")} </p>
                      <div className="div11 flex">
                        {ele?.offer?.ads_prices.map((e, i) => {
                          const target = unitsPrices.find(
                            (element) => element?.id === e?.id
                          );
                          return (
                            <div key={i} className="px-2">
                              {target?.ar_name}
                            </div>
                          );
                        })}
                      </div>
                    </Box>
                  </Box>
                  <Divider />

                  <div className="div_edit_delete">
                    <button className="edit" onClick={() => handleEdit(ele)}>
                      {t("dashboard.outgoing_requests.edit_btn")}
                    </button>
                    <button
                      className="delete"
                      onClick={(e) => handleDeleteOffer(ele.offer.id)}
                    >
                      {t("dashboard.users_manage.delete_btn")}
                    </button>
                  </div>
                </Paper>
              );
            })}
          </Paper>
        )}
      </Box>
      {open && (
        <LeftDrawer
          selectedOffice={selectedOffice}
          open={open}
          toggleDrawer={toggleDrawer}
          selectedOffer={selectedOffer}
          openType={openType}
          selectedUnit={selectedUnit}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default Offers;
