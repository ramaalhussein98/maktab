import {
  Box,
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Home1 } from "../../../assets/images";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import myAxios from "../../../api/myAxios";
import { useQueryHook } from "../../../hooks/useQueryHook";
import Loader from "../../../ui/Loader";

const getData = async () => {
  const res = await myAxios.get("api/v1/user/offices/my_units");
  return res?.data?.data;
};
const DownPrice = () => {
  const {
    data: downPayments,
    isLoading,
    isError,
    refetch,
  } = useQueryHook(["down"], () => getData());

  const { t } = useTranslation();
  const [office, setOffice] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [unit, setUnit] = useState("%");
  const [price, setPrice] = useState(50);
  console.log(office);

  useEffect(() => {
    if (office) {
      setPrice(office.down_payment);
      setUnit(office.type_down_payment);
    }
  }, [office]);

  const handleOfficeChange = (event) => {
    setOffice(event.target.value);
  };

  const handleEditClick = () => {
    setShowEdit(true);
  };
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  const handleSaveNewPrice = async () => {
    const data = new FormData();
    data.append("down_payment", price);
    data.append("type_down_payment", unit);
    data.append("id", office.id);

    const res = await myAxios.post("api/v1/user/offices/down_payment", data);
    if (res.data.status === true) {
      Swal.fire({
        title: "تم تعديل السعر",
        icon: "success",
      });
    }
    await refetch();
  };
  if (isLoading) return <Loader />;

  return (
    <Box sx={{ padding: "20px" }}>
      <span className="title_price">{t("dashboard.pricesNav.link3")} </span>
      <Box
        className="d_flex_wrap"
        sx={{ marginY: "1rem", alignItems: "center" }}
      >
        <span className="font_bold"> {t("dashboard.prices.chooseOffice")}</span>
        <FormControl
          sx={{ minWidth: 120, width: "250px", backgroundColor: "white" }}
        >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={office}
            onChange={handleOfficeChange}
            displayEmpty
            MenuProps={{
              getContentAnchorEl: null,
            }}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected) {
                return selected.title;
              }
              return <em>اضغط لاختيار المكتب</em>;
            }}
          >
            {downPayments?.map((ele, i) => (
              <MenuItem key={i} value={ele}>
                {ele.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {office ? (
        <Paper className="paper_style">
          <Box className="d_flex_space_between">
            <Typography className="title_price">{office.title}</Typography>
            {!showEdit && (
              <button className="edit_btn" onClick={handleEditClick}>
                {t("dashboard.outgoing_requests.edit_btn")}
              </button>
            )}
          </Box>
          <Paper className="paper_style">
            <Box className="d_flex_wrap">
              <Box className="container_img">
                <img src={Home1} alt="Home" />
              </Box>
              <Box className="flex_col_between">
                <Box className="title_125_700">{office.title}</Box>

                <Box> {t("dashboard.prices.The_required_deposit")}</Box>

                {showEdit ? (
                  <>
                    <Box sx={{ display: "flex", marginTop: "1rem" }}>
                      <Box className="changePriceBox">
                        <div className="price_percent_rial">
                          <input
                            value={price}
                            onChange={handlePriceChange}
                            style={{ outline: "none" }}
                          />
                          <span>{unit === "rial" ? "ر.س" : "%"}</span>
                        </div>
                      </Box>
                      <Box className="price_or_rial">
                        <button
                          className={
                            unit === "rial" ? "rial activePrice" : "rial"
                          }
                          onClick={() => handleUnitChange("rial")}
                        >
                          ريال
                        </button>
                        <button
                          className={
                            unit === "percent"
                              ? "percent activePrice"
                              : "percent"
                          }
                          onClick={() => handleUnitChange("percent")}
                        >
                          %
                        </button>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <p className="font_gray">
                    {price}
                    {unit === "rial" ? "ر.س" : "%"}
                  </p>
                )}
              </Box>
            </Box>
            {showEdit && (
              <>
                <Divider sx={{ marginY: "2rem" }} />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    flexDirection: { xs: "column", md: "row" },
                  }}
                >
                  <button className="save_btn" onClick={handleSaveNewPrice}>
                    {t("dashboard.outgoing_requests.submit_btn")}
                  </button>
                  <button
                    className="cancel_btn"
                    onClick={() => setShowEdit(false)}
                  >
                    {t("dashboard.outgoing_requests.cancel_btn")}
                  </button>
                </Box>
              </>
            )}
          </Paper>
        </Paper>
      ) : (
        ""
      )}
    </Box>
  );
};

export default DownPrice;
