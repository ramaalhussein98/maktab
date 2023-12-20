import React, { useEffect, useState } from "react";
import { Divider, Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import { useTranslation } from "react-i18next";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--green-color)",
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--green-color)",
  },
}));

const UnitPrice = ({ state, dispatch, pricesTypes }) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedUnit, setSelectedUnit] = useState("ر.س");

  useEffect(() => {
    dispatch({ type: "prices", sub_type: "add", array: pricesTypes });
  }, []);

  const handleToggleSwitch = (id) => {
    dispatch({ type: "prices", sub_type: "toggleStatus", id });
  };

  const handleInputChange = (id, value) => {
    dispatch({ type: "prices", sub_type: "priceChange", id, value });
  };

  const toggleUnit = () => {
    setSelectedUnit((prevUnit) => (prevUnit === "ر.س" ? "%" : "ر.س"));
  };

  useEffect(() => {
    const unit = selectedUnit === "ر.س" ? "percent" : "rial";
    dispatch({ type: "unit", value: unit });
  }, [selectedUnit]);

  return (
    <>
      <div className="UnitDetailsContainer">
        <p className="UnitDetailsTitle">أسعار الوحدة</p>
        <span className="gary-color" style={{ width: "90%" }}>
          اكتب أسعار عقارك الأساسية تقدر تعدل الأسعار ونضيف عروض وخصومات لاحقا{" "}
        </span>
      </div>
      {state?.prices.map((price) => {
        const matchedObj = pricesTypes.find(
          (ele) => ele.id === price.type_res_id
        );
        return (
          <div key={matchedObj.id} className="CheckedBoxContainer">
            <p className="priceTitle">
              {lang === "ar" ? matchedObj.ar_name : matchedObj?.en_name}
            </p>
            <input
              type="number"
              className="priceInput"
              value={price.price}
              onChange={(e) => handleInputChange(matchedObj.id, e.target.value)}
            />
            <GreenSwitch
              className="Switch1"
              checked={price.status}
              onChange={() => handleToggleSwitch(matchedObj.id)}
            />
          </div>
        );
      })}
      <Divider sx={{ marginY: "1rem" }} />
      {/* <button onClick={logValues}>Log Values</button> */}
      <div className="CheckedBoxContainer">
        <p className="priceTitle">العربون</p>
        <div className="raabon">
          <input
            type="number"
            value={state.down_payment}
            className="priceInput"
            onChange={(e) =>
              dispatch({ type: "downPayment", value: e.target.value })
            }
          />
          <span className="span1" onClick={toggleUnit}>
            {selectedUnit}
          </span>
        </div>
      </div>
    </>
  );
};

export default UnitPrice;
