import React, { useEffect, useState } from "react";
import { Box, Typography, Switch, TextField, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

import { Bed, Pool } from "../../../../../assets/icons";
import ServicesBox from "./ServicesBox";
import AddIcon from "@mui/icons-material/Add";

const Services = ({ formData, setFormData }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [serviceBoxes, setServiceBoxes] = useState([
    {
      toggleServiceBox: true, // Initially set to true for the first box
    },
  ]);

  const [checkedTwo, setCheckedTwo] = useState(false);
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
  // Function to add a new service box
  const addServiceBox = () => {
    setServiceBoxes([...serviceBoxes, {}]);
  };

  // Function to remove a service box
  const removeServiceBox = (index) => {
    const updatedBoxes = [...serviceBoxes];
    updatedBoxes.splice(index, 1);
    setServiceBoxes(updatedBoxes);
  };

  // Function to toggle a service box
  const toggleServiceBox = (index) => {
    const updatedBoxes = [...serviceBoxes];
    updatedBoxes[index].toggleServiceBox =
      !updatedBoxes[index].toggleServiceBox;
    setServiceBoxes(updatedBoxes);
  };

  // useEffect(() => {
  //   if (formData.BoolFeaturea && selectedBooleansProperties.length === 0) {
  //     setSelectedBooleansProperties(formData.BoolFeaturea);
  //   }
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     selectedBooleansProperties,
  //   }));
  // }, []);

  // useEffect(() => {

  // }, [selectedBooleansProperties]);
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
  console.log(formData);
  return (
    <div>
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
          {lang === "ar" ? "الخدمات والمميزات" : "Services And Features"}
        </Typography>
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
                backgroundColor:
                  formData?.selectedBooleansProperties &&
                  formData?.selectedBooleansProperties.some(
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
                  color:
                    formData?.selectedBooleansProperties &&
                    formData?.selectedBooleansProperties.some(
                      (item) =>
                        item.boolfeaturea_id === property.bool_featurea.id
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
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography sx={{ fontWeight: "500" }}>
            {lang === "ar" ? "الخدمات " : "Services  "}
          </Typography>
        </Box>
      </Box>
      <Typography>
        {lang === "ar" ? "  خدمات إضافية " : "Additional Services  "}
      </Typography>
      {serviceBoxes.map((serviceBox, index) => (
        <ServicesBox
          key={index}
          onRemove={() => removeServiceBox(index)}
          onToggle={() => toggleServiceBox(index)}
        />
      ))}

      <Button
        onClick={addServiceBox}
        sx={{
          backgroundColor: "var(--green-color)",
          marginY: "1rem",
          "&:hover": {
            backgroundColor: "var(--green-color)",
            color: "white",
          },
        }}
      >
        <AddIcon sx={{ color: "white" }} />
      </Button>
    </div>
  );
};

export default Services;
