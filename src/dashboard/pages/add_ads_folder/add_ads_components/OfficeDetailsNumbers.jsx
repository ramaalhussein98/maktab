// Main component
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import OfficeBoxNumbers from "./OfficeBoxNumbers";
import "../../../../assets/css/office_details.css";
import { Switch, Typography } from "@mui/material";
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

const OfficeDetailsNumbers = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showOffices, setShowOffices] = useState(true);
  const [showMeetingRooms, setShowMeetingRooms] = useState(true);

  // Toggle functions to control the switches
  const handleOfficesToggle = () => {
    setShowOffices(!showOffices);
  };

  const handleMeetingRoomsToggle = () => {
    setShowMeetingRooms(!showMeetingRooms);
  };

  return (
    <div>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "600",
          marginBottom: "16px",
          marginTop: "8px",
          fontSize: { xs: "1.2rem", md: "1.5rem" },
        }}
      >
        {lang === "ar" ? " تفاصيل المكتب" : "Office Details"}
      </Typography>
      <OfficeBoxNumbers
        title={lang === "ar" ? "الدور" : "Floors"}
        numbers={[
          t("dashboard.contract.groundfloor"),
          t("dashboard.contract.Peaks"),
          3,
          4,
        ]}
      />
      <OfficeBoxNumbers
        title={lang === "ar" ? "عمر العقار" : "RealEstate Age"}
        numbers={[1, 2, 3, 4]}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: "500" }}>
          {lang === "ar" ? " عدد المكاتب" : "Number Offices"}
        </span>
        <GreenSwitch
          className="Switch1"
          checked={showOffices} // set the value of the switch
          onChange={handleOfficesToggle} // handle the change of the switch
        />
      </div>

      {showOffices && (
        <OfficeBoxNumbers
          title={lang === "ar" ? " " : ""}
          numbers={[1, 2, 3, 4]}
        />
      )}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <span style={{ fontWeight: "500" }}>
          {lang === "ar" ? " غرف اجتماعات" : "Meeting Rooms"}
        </span>
        <GreenSwitch
          className="Switch1"
          checked={showMeetingRooms} // set the value of the switch
          onChange={handleMeetingRoomsToggle} // handle the change of the switch
        />
      </div>
      {showMeetingRooms && (
        <OfficeBoxNumbers
          title={lang === "ar" ? "  " : " "}
          numbers={[1, 2, 3, 4]}
        />
      )}
    </div>
  );
};

export default OfficeDetailsNumbers;
