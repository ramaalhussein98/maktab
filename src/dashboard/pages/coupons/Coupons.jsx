import { useState } from "react";
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

const Coupons = () => {
  const { data: offers, isLoading } = useQueryHook(["down"], () => getData());

  console.log(offers);

  const [selectedOffice, setSelectedOffice] = useState("");

  const [switchState, setSwitchState] = useState(true);

  const [open, setOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const toggleDrawer = (isOpen) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(isOpen);
  };

  const handleOfficeChange = (event) => {
    setSelectedOffice(event.target.value);
  };

  const handleSwitchChange = (event) => {
    setSwitchState(event.target.checked);
  };

  const handleDeleteOffer = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this offer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onRemove(); // Call the onRemove function to delete the box
      }
    });
  };

  if (isLoading) return <Loader />;

  return (
    <>
      <Box sx={{ padding: { xs: "0px", md: "20px" } }}>
        <span className="title_price">
          {" "}
          {lang === "ar" ? "الكوبونات" : "coupons"}{" "}
        </span>
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
                {lang === "ar" ? "اضافة كوبون جديد" : "add new coupon"}
              </button>
            </Box>
            <Paper className="paper_style">
              <Box className="d_flex_space_between">
                <Typography className="font_bold">Stars Tech</Typography>
                <Box className="box_switch">
                  <div className="div1">
                    <span> {t("dashboard.prices.activation_status")}</span>
                    <FormControlLabel
                      control={
                        <GreenSwitch
                          dir="rtl"
                          checked={switchState}
                          onChange={handleSwitchChange}
                        />
                      }
                      sx={{
                        transform: "rotate(180deg) !important",
                        // "& .MuiSwitch-thumb": {
                        //   backgroundColor: "#4caf50",
                        // },
                      }}
                    />
                    {switchState ? (
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
              <p className="font_gray">
                من الاثنين, 16 أكتوبر 2023 الى الأربعاء, 18 أكتوبر 2023
              </p>
              <Box className="d_flex_wrap_details_offer">
                <Box className="div1">
                  <p className="p1">
                    {" "}
                    {t("dashboard.prices.discount_percentage")}
                  </p>
                  <div className="div11">10%</div>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: "1rem" }}
                />
                <Box className="div1">
                  <p className="p1"> {t("dashboard.prices.applied_to")} </p>
                  <div className="div11">rama</div>
                </Box>
                <Divider
                  orientation="vertical"
                  flexItem
                  sx={{ marginX: "1rem" }}
                />
                <Box className="div1">
                  <p className="p1"> {t("dashboard.prices.offer_days")} </p>
                  <div className="div11">
                    لكل أيام الإسبوع ما عدا (الثلاثاء و الاربعاء و الخميس و
                    الجمعة)
                  </div>
                </Box>
              </Box>
              <Divider />
              <div className="div_edit_delete">
                <button className="edit" onClick={toggleDrawer(true)}>
                  {t("dashboard.outgoing_requests.edit_btn")}
                </button>
                <button className="delete" onClick={handleDeleteOffer}>
                  {t("dashboard.users_manage.delete_btn")}
                </button>
              </div>
            </Paper>
          </Paper>
        )}
      </Box>
      <LeftDrawer
        selectedOffice={selectedOffice}
        open={open}
        toggleDrawer={toggleDrawer}
      />
    </>
  );
};

export default Coupons;
