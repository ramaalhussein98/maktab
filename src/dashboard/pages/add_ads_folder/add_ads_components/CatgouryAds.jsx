import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { House, SH } from "../../../../assets/images";

const mainCategories = [
  {
    en_name: "Furnished Office",
    ar_name: "مكتب مؤثث",
    id: "1",
    src: House,
  },
  {
    en_name: "Unfurnished Office",
    ar_name: "مكتب غير مؤثث",
    id: "2",
    src: SH,
  },
  {
    en_name: "Work Table",
    ar_name: "طاولة عمل",
    id: "3",
    src: SH, // You can add the source here if available
  },
  {
    en_name: "Mobile Office",
    ar_name: "مكتب متحرك",
    id: "4",
    src: SH, // Add the source here
  },
  {
    en_name: "Virtual Office",
    ar_name: "مكتب افتراضي",
    id: "5",
    src: SH, // Add the source here
  },
  {
    en_name: "Meeting Hall",
    ar_name: "قاعة اجتماعات",
    id: "6",
    src: SH, // Add the source here
  },
  {
    en_name: "Office for Sale",
    ar_name: "مكتب للتقبيل",
    id: "7",
    src: SH, // Add the source here
  },
];

const CatgouryAds = ({
  formData,
  setFormData,
  selectedCategoryId,
  setSelectedCategoryId,
  selectedType,
  setSelectedType,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [nameError, setNameError] = useState();

  const [selectedCatName, setSelectedCatName] = useState();
  const [selectedCatId, setSelectedCatId] = useState();

  const handleNameChange = (event) => {
    const inputValue = event.target.value;

    // Check if the input value contains only Arabic and English letters
    const pattern = /^[\u0600-\u06FF\sA-Za-z]+$/;
    const isValidInput = pattern.test(inputValue);

    // Check if the input value is empty or contains invalid characters
    if (inputValue.trim() !== "" && isValidInput) {
      setNameError(false);
    } else {
      setNameError(true);
    }

    setFormData((prevFormData) => ({ ...prevFormData, title: inputValue }));
  };

  // const handleCategoryChange = (selectedCategory, selectedName) => {
  //   setSelectedCatName(selectedName);
  //   if (selectedCategoryId === selectedCategory) {
  //     setSelectedCategoryId(null); // Unselect the category if it's already selected
  //   } else {
  //     setSelectedCategoryId(selectedCategory);
  //   }

  //   setSelectedType(""); // Reset the type when a new category is selected
  // };
  const handleCategoryChange = (selectedCategory) => {
    if (selectedCategoryId === selectedCategory) {
      setSelectedCategoryId(null); // Unselect the category if it's already selected
    } else {
      setSelectedCategoryId(selectedCategory);
    }

    setSelectedType(""); // Reset the type when a new category is selected
  };
  const handleTypeChange = (type) => {
    setSelectedType(type);
  };

  // useEffect(() => {
  //   if (!formData.categort_aqar) {
  //     if (selectedCatName && !selectedType) {
  //       const filtered = main_array.filter((item) => {
  //         return selectedCatName === item.en_name;
  //       });

  //       if (filtered.length > 0) {
  //         if (filtered.length > 0) {
  //           setFormData((prevFormData) => ({
  //             ...prevFormData,
  //             category_aqar: filtered["0"],
  //           }));
  //         }
  //       }
  //     } else if (selectedCatName && selectedType) {
  //       const filtered = main_array.filter((item) => {
  //         const [categoryName, forText, itemType] = item.en_name.split(" ");

  //         if (selectedType) {
  //           return (
  //             categoryName === selectedCatName.trim() &&
  //             forText.toLowerCase() === "for" &&
  //             itemType.toLowerCase() === selectedType.toLowerCase()
  //           );
  //         }

  //         return (
  //           categoryName === selectedCatName.trim() &&
  //           forText.toLowerCase() === "for"
  //         );
  //       });

  //       if (filtered.length > 0) {
  //         setFormData((prevFormData) => ({
  //           ...prevFormData,
  //           category_aqar: filtered["0"],
  //         }));
  //       }
  //     }
  //   }
  // }, [selectedCatName, selectedType]);

  // useEffect(() => {
  //   if (formData.category_aqar) {
  //     const selectedCatFullName = formData.category_aqar.en_name
  //       .toLowerCase()
  //       .split(" ");
  //     setSelectedCatId(
  //       categories.filter((item) =>
  //         item.en_name.toLowerCase().includes(selectedCatFullName["0"])
  //       )
  //     );
  //   }
  // }, [formData]);
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
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <label
          htmlFor="my-text-field"
          style={{ fontWeight: "500", marginBottom: "4px" }}
        >
          {t("dashboard.new_order.order_info.label1")}
        </label>
        <TextField
          id="my-text-field"
          type="text"
          value={formData.title || ""}
          onChange={handleNameChange}
          size="small"
          error={nameError}
          helperText={nameError ? "الرجاء ادخال اسم عقار صحيح" : ""}
          placeholder={t("dashboard.new_order.order_info.placeholder1")}
          sx={{
            width: "100%",
            borderRadius: "12px",
            textAlign: lang === "ar" ? "right" : "left",
            "&[readonly]": {
              backgroundColor: "lightgray",
              color: "darkgray",
            },
          }}
        />
        <Typography sx={{ fontWeight: "500", marginTop: "18px" }}>
          {t("dashboard.new_order.order_info.title")}
        </Typography>
        <Typography sx={{ color: "gray", marginTop: "4px" }}>
          {t("dashboard.new_order.order_info.desc")}
        </Typography>
      </Box>
      <Box
        sx={{
          marginBlockStart: "1rem",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "1rem 10px",
        }}
      >
        {mainCategories.map((category) => (
          <Box
            key={category.en_name}
            sx={{
              appearance: "none",
              border:
                selectedCategoryId === category.id
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
              backgroundImage: `linear-gradient(315deg, rgba(0, 0, 0, 0.6) 5%, rgba(255, 255, 255, 0) 90%), url(${category.src}), radial-gradient(circle, rgb(49, 16, 131) 0%, rgb(90, 64, 155) 65%)`,
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

export default CatgouryAds;
