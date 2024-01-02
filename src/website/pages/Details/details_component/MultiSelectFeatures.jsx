import React, { useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";

const MultiSelectFeatures = ({
  adInfo,
  selectedComfortOptions,
  setSelectedComfortOptions,
  handleComfortSelectChange,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const options = adInfo?.comforts?.map((comfort) => ({
    value: comfort?.id,
    label: lang === "ar" ? comfort?.ar_name : comfort?.en_name,
  }));

  return (
    <Select
      className="selectStyle"
      isMulti
      options={options}
      value={selectedComfortOptions}
      onChange={handleComfortSelectChange}
    />
  );
};

export default MultiSelectFeatures;
