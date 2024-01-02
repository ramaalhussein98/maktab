import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

const UnitCategory = ({ categories, dispatch, state }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleCategoryChange = (selectedCategory) => {
    dispatch({ type: "categoryId", categoryId: selectedCategory });
  };
  console.log(categories);
  return (
    <Box>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "16px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {t("dashboard.new_order.order_info.main_title")}
      </Typography>
      <Typography sx={{ fontWeight: "500", marginTop: "18px" }}>
        {t("dashboard.new_order.order_info.title")}
      </Typography>
      <Typography sx={{ color: "gray", marginTop: "4px" }}>
        {t("dashboard.new_order.order_info.desc")}
      </Typography>
      <Box
        sx={{
          marginBlockStart: "1rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem 10px",
        }}
      >
        {categories?.map((category) => (
          <Box
            key={category?.id}
            sx={{
              appearance: "none",
              border:
                state?.category_id === category.id
                  ? "3px solid var(--main-color)"
                  : "none",
              font: "inherit",
              margin: "0px",
              cursor: "pointer",
              outline: "transparent solid 4px",
              borderRadius: "12px",
              height: "100px",
              width: "100px",
              backgroundColor: "rgba(0, 0, 0, 0)",
              backgroundRepeat: "repeat",
              backgroundAttachment: "scroll",
              backgroundOrigin: "padding-box",
              backgroundClip: "border-box",
              backgroundSize: "100%",
              backgroundPosition: "80% 0%",
              transition: "all 200ms ease-in-out 0s",
              padding: "12px",
              willChange: "transform",
              overflow: "hidden",
              position: "relative",
              isolation: "isolate",
              backgroundImage: `linear-gradient(315deg, rgba(0, 0, 0, 0.6) 5%, rgba(255, 255, 255, 0) 90%), url(https://dashboard.maktab.sa/${category.icon}), radial-gradient(circle, rgb(49, 16, 131) 0%, rgb(90, 64, 155) 65%)`,
              "&:hover": {
                transform: "scale(1.02)",
                backgroundSize: "115%",
              },
            }}
            onClick={() => handleCategoryChange(category.id)}
          >
            <span
              style={{
                color: "rgb(255, 255, 255)",
                fontWeight: "500",
                fontSize: "18px",
              }}
            >
              {lang === "ar" ? category.ar_name : category.en_name}
            </span>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default UnitCategory;
