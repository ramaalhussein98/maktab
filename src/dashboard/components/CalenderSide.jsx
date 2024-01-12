import { Box, Divider, MenuItem, Select, TextField } from "@mui/material";
import { useContext } from "react";
import { CalendarContext } from "../context/calendarContext";
import { useTranslation } from "react-i18next";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const CalenderSide = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;

  const {
    initialData,
    mainOffice,
    selectedUnit,
    priceType,
    selectedPrice,
    handleSelectMainOffice,
    handleSelectPriceType,
    handleSelectUnit,
    selectedEndTime,
    selectedStartTime,
    setSelectedEndTime,
    setSelectedStartTime,
  } = useContext(CalendarContext);

  return (
    <>
      <div className="flex flex-col w-[300px] gap-5 max-h-[calc(100vh-80px)] overflow-y-auto py-4">
        <Box sx={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
          <p style={{ fontWeight: "700", marginBottom: "1rem" }}>حدد العقار</p>
          <Select
            value={mainOffice?.id}
            onChange={(e) => handleSelectMainOffice(Number(e.target.value))}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "100%",
              "& .MuiSelect-icon": {
                color: "black",
                display: "block !important",
              },
            }}
          >
            <MenuItem value="0" disabled>
              Select Main Office
            </MenuItem>
            {initialData?.map((office) => (
              <MenuItem key={office?.id} value={office?.id}>
                {office.title}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider
          sx={{ marginY: ".3rem", height: "1px", backgroundColor: "#eee" }}
        />
        <Box sx={{ width: "80%", marginTop: ".3rem", margin: "auto" }}>
          <p style={{ fontWeight: "700", marginBottom: "1rem" }}>حدد الوحدة</p>
          <Select
            value={selectedUnit ? selectedUnit.id : ""}
            onChange={(e) => handleSelectUnit(Number(e.target.value))}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "100%",
              "& .MuiSelect-icon": {
                color: "black",
                display: "block !important",
              },
            }}
          >
            <MenuItem value="0" disabled>
              Select Unit
            </MenuItem>
            {mainOffice?.units?.map((unit) => (
              <MenuItem key={unit.id} value={unit.id}>
                {unit.title}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider
          sx={{ marginY: ".3rem", height: "1px", backgroundColor: "#eee" }}
        />
        <Box sx={{ width: "80%", marginTop: ".3rem", margin: "auto" }}>
          <p style={{ fontWeight: "700", marginBottom: "1rem" }}>
            حدد نوع السعر
          </p>
          <Select
            value={selectedPrice ? selectedPrice.id : ""}
            onChange={(e) => handleSelectPriceType(Number(e.target.value))}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            sx={{
              width: "100%",
              "& .MuiSelect-icon": {
                color: "black",
                display: "block !important",
              },
            }}
          >
            <MenuItem value="0" disabled>
              Select Price Type
            </MenuItem>
            {priceType?.map((price) => (
              <MenuItem key={price.id} value={price.id}>
                {lang === "ar" ? price.ar_name : price.en_name}
              </MenuItem>
            ))}
          </Select>
        </Box>
        <Divider
          sx={{ marginY: ".3rem", height: "1px", backgroundColor: "#eee" }}
        />
        <Box sx={{ width: "80%", marginTop: ".3rem", margin: "auto" }}>
          <p style={{ fontWeight: "700", marginBottom: "1rem" }}>
            يرجى تحديد وقت الدخول
          </p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={selectedStartTime}
              onChange={(newValue) => setSelectedStartTime(newValue)}
              inputProps={{ "aria-label": "Without label" }}
            />
          </LocalizationProvider>
        </Box>
        <Divider
          sx={{ marginY: ".3rem", height: "1px", backgroundColor: "#eee" }}
        />
        <Box sx={{ width: "80%", marginTop: ".3rem", margin: "auto" }}>
          <p style={{ fontWeight: "700", marginBottom: "1rem" }}>
            يرجى تحديد وقت الخروج
          </p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              value={selectedEndTime}
              onChange={(newValue) => setSelectedEndTime(newValue)}
              inputProps={{ "aria-label": "Without label" }}
            />
          </LocalizationProvider>
        </Box>
      </div>
    </>
  );
};

export default CalenderSide;
