import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const EditFeatureComponent = ({ formData, setFormData, category_bool }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const [selectedBooleansProperties, setSelectedBooleansProperties] = useState(
    formData.selectedBooleansProperties || []
  );

  useEffect(() => {
    if (formData.BoolFeaturea && selectedBooleansProperties.length === 0) {
      setSelectedBooleansProperties(formData.BoolFeaturea);
    }
  }, []);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      selectedBooleansProperties,
    }));
  }, [selectedBooleansProperties]);

  const handlePropertyClick = (propertyId) => {
    const isInArray = selectedBooleansProperties.some(
      (item) => item.bool_featurea?.id === propertyId
    );

    if (isInArray) {
      setSelectedBooleansProperties(
        selectedBooleansProperties.filter(
          (item) => item.bool_featurea?.id !== propertyId
        )
      );
    } else {
      setSelectedBooleansProperties([
        ...selectedBooleansProperties,
        {
          bool_featurea: {
            id: propertyId,
          },
        },
      ]);
    }
  };
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
        مميزات العقار
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {category_bool.map((property) => (
          <Box
            key={property.id}
            onClick={() => handlePropertyClick(property.bool_featurea.id)}
            sx={{
              height: "100px",
              width: "100px",
              border: "1px solid green",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              borderRadius: "12px",
              cursor: "pointer",
              marginBottom: "1rem",
              backgroundColor:
                formData?.selectedBooleansProperties &&
                formData?.selectedBooleansProperties.some(
                  (item) => item.bool_featurea?.id === property.bool_featurea.id
                )
                  ? "var(--main-color)"
                  : "transparent",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                color:
                  formData?.selectedBooleansProperties &&
                  formData?.selectedBooleansProperties.some(
                    (item) =>
                      item.bool_featurea?.id === property.bool_featurea.id
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
    </Box>
  );
};

export default EditFeatureComponent;
