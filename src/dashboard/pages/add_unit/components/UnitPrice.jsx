import React, { useState } from "react";
import { Switch } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";

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

const ArrayPrices = [
  { id: 1, title: "ساعة" },
  { id: 2, title: "يومي" },
  { id: 3, title: "اسبوعي" },
  { id: 4, title: "شهري" },
  { id: 5, title: "سنوي" },
];

const UnitPrice = () => {
  const [priceStates, setPriceStates] = useState(
    ArrayPrices.reduce((acc, price) => {
      acc[price.id] = { checked: false, value: "" };
      return acc;
    }, {})
  );

  const handleToggleSwitch = (id) => {
    setPriceStates((prevStates) => ({
      ...prevStates,
      [id]: {
        ...prevStates[id],
        checked: !prevStates[id].checked,
      },
    }));
  };

  const handleInputChange = (id, value) => {
    setPriceStates((prevStates) => ({
      ...prevStates,
      [id]: {
        ...prevStates[id],
        value,
      },
    }));
  };

  //   this i will send values to api
  const logValues = () => {
    console.log("Price States:", priceStates);
  };

  return (
    <>
      <div className="UnitDetailsContainer">
        <p className="UnitDetailsTitle">أسعار الوحدة</p>
        <span className="gary-color" style={{ width: "90%" }}>
          اكتب أسعار عقارك الأساسية تقدر تعدل الأسعار ونضيف عروض وخصومات لاحقا{" "}
        </span>
      </div>
      {ArrayPrices.map((data) => (
        <div key={data.id} className="CheckedBoxContainer">
          <p className="priceTitle">{data.title}</p>
          <input
            type="number"
            className="priceInput"
            value={priceStates[data.id].value}
            onChange={(e) => handleInputChange(data.id, e.target.value)}
          />
          <GreenSwitch
            className="Switch1"
            checked={priceStates[data.id].checked}
            onChange={() => handleToggleSwitch(data.id)}
          />
        </div>
      ))}
      {/* <button onClick={logValues}>Log Values</button> */}
    </>
  );
};

export default UnitPrice;
