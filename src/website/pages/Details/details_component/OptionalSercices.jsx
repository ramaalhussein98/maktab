import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";

const optionalServices = [
  { id: 1, label: "خدمة النظافة", price: 200 },
  { id: 2, label: " وجبة غداء", price: 300 },
  { id: 3, label: " lorem ", price: 350 },
];
const OptionalSercices = ({ selectedServices, setSelectedServices }) => {
  const handleCheckboxOptionalServiceChange = (id) => {
    setSelectedServices((prevSelected) => {
      const isSelected = prevSelected.includes(id);
      if (isSelected) {
        return prevSelected.filter((serviceId) => serviceId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };
  console.log(selectedServices);
  return (
    <Accordion sx={{ boxShadow: "0" }}>
      <AccordionSummary className="card_details_Services">
        <div className="div_name_sevices">
          <span className="spantitle">خدمات إضافية (اختياري) </span>
        </div>
        <ExpandMoreIcon />
      </AccordionSummary>
      <AccordionDetails>
        {optionalServices.map((ele) => (
          <div key={ele.id} className="card_details_Services">
            <div>
              <Checkbox
                checked={selectedServices.includes(ele.id)}
                onChange={() => handleCheckboxOptionalServiceChange(ele.id)}
                sx={{
                  "&.Mui-checked": {
                    color: "black",
                  },
                }}
              />
              <span className="spantitle"> {ele.label}</span>
            </div>
            <span>{ele.price} ريال</span>
          </div>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default OptionalSercices;
