import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import "../../../../../assets/css/filtermodal.css";
const Features = ({ label, id, setSearchQuery, SearchParams, refetch }) => {
  return (
    <FormGroup sx={{ width: "50% !important" }}>
      <FormControlLabel
        id={id}
        control={
          <Checkbox
            style={{
              color: "black",
              width: "40px",
            }}
          />
        }
        label={label}
      />
    </FormGroup>
  );
};

export default Features;
