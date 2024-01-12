import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import styles from "../../../../../assets/css/confirmLocation.module.css";
import { toast } from "react-toastify";
// import useDataFetcher from "../../../../api/useDataFetcher ";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
const EditInformation = ({
  title,
  onCancel,
  editTitleMutation,
  id,
  categoryId,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [_title, setTitle] = useState(title);
  const categories = JSON.parse(
    localStorage.getItem("searchData")
  ).category_aqar;
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const handleTitleChange = (e) => {
    const value = e.target.value;
    setTitle(value);
  };
  console.log(selectedCategory);

  const handleInterfaceChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("storing...");
    try {
      const res = await editTitleMutation.mutateAsync({
        _title,
        id,
        selectedCategory,
      });
      onCancel();
      toast.update(toastId, {
        type: "success",
        render: res.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        // render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };
  return (
    <Box>
      <form>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography>{t("dashboard.incoming_orders.card1.label1")}</Typography>
          <TextField
            type="text"
            name="title"
            value={_title}
            onChange={handleTitleChange}
            sx={{
              maxWidth: "340px",
              width: { xs: "80%", md: "90%" },
              borderRadius: "12px !important",
            }}
            InputProps={{
              sx: {
                "& input": {
                  borderRadius: "12px !important",
                  padding: "13px 0.8rem",
                },
              },
            }}
          ></TextField>
        </Box>
        <Box sx={{ marginY: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              position: "relative",
            }}
          >
            <Typography>
              {lang === "ar" ? "نوع المكتب" : "office type"}
            </Typography>

            {/* <InputLabel
              sx={{
                color: "black",
                minWidth: { xs: "3rem", sm: "6rem" },
              }}
            >
              {lang === "ar" ? "الاتجاه" : "interface"}
            </InputLabel> */}
            <Select
              value={selectedCategory}
              onChange={handleInterfaceChange}
              label=""
              required
              IconComponent={ArrowDropDownIcon}
              className={`${styles.select} select`}
              classes={lang === "ar" && { icon: styles.selectIcon }}
              sx={{
                maxWidth: "340px",
                width: { xs: "80%", md: "90%" },
                paddingBlock: "5px",
                height: "48px",
                marginBlock: "4px 12px",
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    borderRadius: "1rem",
                  },
                },
              }}
            >
              {categories.map((category_item) => (
                <MenuItem
                  key={category_item.id}
                  value={category_item.id}
                  className={
                    selectedCategory === category_item.en_name
                      ? styles.selectedMenuItem
                      : ""
                  }
                >
                  {lang === "ar"
                    ? category_item.ar_name
                    : category_item.en_name}
                </MenuItem>
              ))}
            </Select>
          </div>
        </Box>
        <Box
          sx={{
            borderWidth: "0px 0px thin",
            borderStyle: "solid",
            borderColor: "rgba(0, 0, 0, 0.12)",
            margin: "2rem 4rem",
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            gap: "1rem ",
            marginInline: "auto",
            flexWrap: "wrap",
          }}
        >
          <Button
            type="submit"
            onClick={handleSubmit}
            sx={{
              fontWeight: "600",
              borderRadius: "8px",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "var(--main-color)",
              color: "white",
              "&:hover": {
                backgroundColor: "#0b7b5a",
                color: "white",
              },
            }}
          >
            {t("dashboard.outgoing_requests.submit_btn")}
          </Button>
          <Button
            sx={{
              fontWeight: "600",
              borderRadius: "8px",

              border: "1px solid var(--main-color)",
              minWidth: "186px",
              padding: "0.75rem 2.5rem",
              height: "50px",
              backgroundColor: "white",
              color: "var(--main-color)",
              "&:hover": {
                backgroundColor: "#e5f9f4",
              },
            }}
            onClick={onCancel}
          >
            {t("dashboard.outgoing_requests.cancel_btn")}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default EditInformation;
