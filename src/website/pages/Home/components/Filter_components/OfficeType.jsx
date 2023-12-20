import { Button } from "@mui/material";
import React, { useState } from "react";
import "../../../../../assets/css/filtermodal.css";
import { useTranslation } from "react-i18next";

const searchData = JSON.parse(localStorage.getItem("searchData"));
const FilterData = searchData?.category_aqar;

const OfficeType = ({ officeTypeId, setOfficeTypeId }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (id) => {
    // Set the active button ID
    setActiveButton(id);
    setOfficeTypeId(id);
    // console.log("office type id", id);
    // setSearchQuery(`exact[category_aqar.id]=${id}`);
  };

  return (
    <div className="officeTypeContainer">
      {FilterData?.map((data, index) => (
        <Button
          id={data.id}
          key={index}
          className={`btn_type_office ${
            activeButton === data.id ? "activeButton" : ""
          }`}
          onClick={() => handleButtonClick(data.id)}
        >
          <img
            src={`https://dashboard.maktab.sa/${data?.icon}`}
            className="img1"
          />
          <span className="span1">
            {" "}
            {lang === "ar" ? data.ar_name : data.en_name}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default OfficeType;
