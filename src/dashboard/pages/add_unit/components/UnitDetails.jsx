import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { Box, Divider, Typography } from "@mui/material";
import { Bed, Pool } from "../../../../assets/icons";
import { useTranslation } from "react-i18next";

const UnitDetails = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [unitName, setUnitName] = useState("");
  const [unitSpace, setUnitSpace] = useState();
  const [selectedBooleansProperties, setSelectedBooleansProperties] = useState(
    []
  );
  const category_bool = [
    {
      id: 1,
      bool_featurea: {
        id: 1,
        src: Bed,
        ar_name: "الميزة 1",
        en_name: "Feature 1",
      },
    },
    {
      id: 2,
      bool_featurea: {
        id: 2,
        src: Pool,
        ar_name: "الميزة 2",
        en_name: "Feature 2",
      },
    },
    // Add more items as needed
  ];
  const handlePropertyClick = (propertyId) => {
    const isInArray = selectedBooleansProperties.some(
      (item) => item.boolfeaturea_id === propertyId
    );

    let updatedProperties = [...selectedBooleansProperties];

    if (isInArray) {
      updatedProperties = updatedProperties.filter(
        (item) => item.boolfeaturea_id !== propertyId
      );
    } else {
      updatedProperties.push({ boolfeaturea_id: propertyId });
    }

    setSelectedBooleansProperties(updatedProperties);

    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedBooleansProperties: updatedProperties,
    }));
  };
  return (
    <div className="UnitDetailsContainer">
      <p className="UnitDetailsTitle">تفاصيل الوحدة</p>
      <div className="unitNameBox">
        <p className="unitName">اسم وحدتك</p>
        <input
          type="text"
          placeholder="ادخل اسم عقارك الذي سيظهر للضيوف"
          className="unitInput"
          value={unitName}
          onChange={(event) => setUnitName(event.target.value)}
        />
      </div>
      <Divider sx={{ marginY: "2rem" }} />
      <div className="unitNameBox">
        <p className="unitName"> مساحة عقارك</p>
        <div className="d-flex">
          <input
            type="number"
            placeholder=" المساحة"
            className="unitInput"
            style={{ width: "6rem" }}
            value={unitSpace}
            onChange={(event) => setUnitSpace(event.target.value)}
          />
          <span className="spanSquare">متر مربع</span>
        </div>
      </div>
      <Divider sx={{ marginY: "2rem" }} />
      <div className="unitNameBox">
        <p className="unitName"> مرافق عقارك الرئيسية</p>
        <Box
          sx={{
            display: "grid",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {category_bool.map((property) => (
            <Box
              key={property.id}
              onClick={() => handlePropertyClick(property.bool_featurea.id)}
              sx={{
                height: "100px",
                width: "100px",
                border: "1px solid gray",
                display: "flex",
                textAlign: "center",
                alignItems: "end",
                borderRadius: "12px",
                position: "relative",
                cursor: "pointer",
                padding: "10px 0px",
                marginBottom: "1rem",
                backgroundColor: selectedBooleansProperties.some(
                  (item) => item.boolfeaturea_id === property.bool_featurea.id
                )
                  ? "var(--green-color)"
                  : "transparent",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <img
                src={property.bool_featurea.src}
                alt="img"
                style={{
                  position: "absolute",
                  insetBlockStart: "15px",
                  insetInlineStart: "14px",
                  width: "36px",
                }}
              />
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  color: selectedBooleansProperties.some(
                    (item) => item.boolfeaturea_id === property.bool_featurea.id
                  )
                    ? "white"
                    : "black",
                }}
              >
                {lang === "ar"
                  ? property.bool_featurea.ar_name
                  : property.bool_featurea.en_name}
              </Typography>
              <input type="hidden" value={property.bool_featurea.id} />
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default UnitDetails;
