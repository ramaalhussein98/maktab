import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const AdditionalServices = () => {
  return (
    <Accordion sx={{ boxShadow: "0" }}>
      <AccordionSummary className="card_details_Services">
        <div className="div_name_sevices">
          <span className="spantitle">إضافي </span>
          <span className="spantitle" style={{ color: "var(--main-color)" }}>
            (مطلوب)
          </span>
        </div>
        <ExpandMoreIcon />
      </AccordionSummary>
      <AccordionDetails>
        <div className="card_details_Services">
          <span className="spantitle">خدمات النظافة</span>
          <span>100 ريال</span>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default AdditionalServices;
