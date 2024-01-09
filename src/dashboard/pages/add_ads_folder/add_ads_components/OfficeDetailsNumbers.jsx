import { useState } from "react";
import { useTranslation } from "react-i18next";
import OfficeBoxNumbers from "./OfficeBoxNumbers";
import "../../../../assets/css/office_details.css";
import { Box, Switch, Typography } from "@mui/material";
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

const OfficeDetailsNumbers = ({ dispatch, state }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [showFloors, setShowFloors] = useState(true);
  const [showAge, setShowAge] = useState(true);
  const [showOffices, setShowOffices] = useState(true);
  const [showMeetingRooms, setShowMeetingRooms] = useState(true);
  const unitsFacilities = JSON.parse(
    localStorage.getItem("searchData")
  ).facilities;
  console.log(unitsFacilities);
  // Toggle functions to control the switches
  const handleOfficesToggle = (en_name) => {
    if (showOffices) {
      dispatch({
        type: "details",
        data: {
          type: "remove",
          object: {
            en_name: en_name,
          },
        },
      });
    }
    setShowOffices(!showOffices);
  };

  const handleMeetingRoomsToggle = (en_name) => {
    if (showMeetingRooms) {
      dispatch({
        type: "details",
        data: {
          type: "remove",
          object: {
            en_name: en_name,
          },
        },
      });
    }
    setShowMeetingRooms(!showMeetingRooms);
  };

  const handlePropertyClick = (propertyId) => {
    dispatch({ type: "facilities", value: propertyId });
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
        dispatch={dispatch}
        state={state}
        status={showFloors}
        ar_name="الدور"
        en_name="floors"
        numbers={[0, 1, 3, 4]}
      />
      <OfficeBoxNumbers
        dispatch={dispatch}
        state={state}
        ar_name="عمر العقار"
        status={showAge}
        en_name="office Age"
        title={lang === "ar" ? "عمر العقار" : "office Age"}
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
          {lang === "ar" ? " عدد المكاتب" : "offices numbers"}
        </span>
        <GreenSwitch
          className="Switch1"
          checked={showOffices} // set the value of the switch
          onChange={() => handleOfficesToggle("offices numbers")} // handle the change of the switch
        />
      </div>

      {showOffices && (
        <OfficeBoxNumbers
          dispatch={dispatch}
          ar_name="عدد المكاتب"
          status={showOffices}
          en_name="offices numbers"
          state={state}
          title={""}
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
          onChange={() => handleMeetingRoomsToggle("Meeting Rooms")} // handle the change of the switch
        />
      </div>
      {showMeetingRooms && (
        <OfficeBoxNumbers
          dispatch={dispatch}
          state={state}
          status={showMeetingRooms}
          ar_name="غرف اجتماعات"
          en_name="Meeting Rooms"
          title={""}
          numbers={[1, 2, 3, 4]}
        />
      )}
      <div className="unitNameBox">
        <p className="unitName"> مرافق عقارك الرئيسية</p>
        <Box
          sx={{
            display: "grid",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {unitsFacilities.map((property) => (
            <Box
              key={property.id}
              onClick={() => handlePropertyClick(property.id)}
              sx={{
                height: "100px",
                width: "100px",
                border: "1px solid gray",
                display: "flex",
                textAlign: "center",
                alignItems: "end",
                borderRadius: "12px",
                position: "relative",
                cursor: "pointer",
                padding: "10px 0px",
                marginBottom: "1rem",
                backgroundColor: state?.facilities.some(
                  (item) => item === property.id
                )
                  ? "var(--green-color)"
                  : "transparent",
                transition: "background-color 0.3s, color 0.3s",
              }}
            >
              <img
                src={`https://dashboard.maktab.sa/${property.icon}`}
                alt="img"
                style={{
                  position: "absolute",
                  insetBlockStart: "15px",
                  insetInlineStart: "14px",
                  width: "36px",
                }}
              />
              <Typography
                sx={{
                  width: "100%",
                  textAlign: "center",
                  color: state.facilities.some((item) => item === property.id)
                    ? "white"
                    : "black",
                }}
              >
                {lang === "ar" ? property.ar_name : property.en_name}
              </Typography>
              <input type="hidden" value={property.id} />
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
};

export default OfficeDetailsNumbers;
