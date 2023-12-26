// Features.js
import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useTranslation } from "react-i18next";

const Features = ({ feature, selectedFeatures, setSelectedFeatures }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const handleFeatureToggle = () => {
    const isSelected = selectedFeatures?.includes(feature.id);

    if (isSelected) {
      setSelectedFeatures((prevFeatures) =>
        prevFeatures.filter((id) => id !== feature.id)
      );
    } else {
      setSelectedFeatures((prevFeatures) => [...prevFeatures, feature.id]);
    }
  };

  return (
    <FormGroup sx={{ width: "50% !important" }}>
      <FormControlLabel
        control={
          <Checkbox
            className="checkboxstyle"
            style={{
              color: "black",
              width: "40px",
            }}
            checked={selectedFeatures?.includes(feature?.id)}
            onChange={handleFeatureToggle}
          />
        }
        label={lang === "ar" ? feature?.ar_name : feature?.en_name}
      />
    </FormGroup>
  );
};

export default Features;
