import { Button } from "@mui/material";
import React from "react";
import "../../../../../assets/css/filtermodal.css";

const OfficeType = ({ type, src }) => {
  return (
    <Button className="btn_type_office">
      <img src={src} className="img1" />
      <span className="span1">{type}</span>
    </Button>
  );
};

export default OfficeType;
