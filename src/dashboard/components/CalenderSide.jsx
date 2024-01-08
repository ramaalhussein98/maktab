// Import necessary components and styles
// import { Box, Divider, MenuItem, Select } from "@mui/material";

import { effect } from "@preact/signals-react";

const CalenderSide = ({
  mainOfficeSignal,
  handleSelectMainOffice,
  initialData,
}) => {
  // const {
  //   mainOffice,
  //   unit,
  //   priceType,
  //   handleSelectMainOffice,
  //   handleSelectPriceType,
  //   handleSelectUnit,
  //   initialData,
  // } = useCalendarContext();

  // effect(() => console.log(calendarData.value));
  effect(() => {
    console.log("rerender", mainOfficeSignal);
  });
  return (
    // <div className="flex flex-col w-[300px] gap-5 max-h-[calc(100vh-80px)] overflow-y-auto py-4">
    //   <Box sx={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
    //     <p style={{ fontWeight: "700", marginBottom: "1rem" }}>حدد العقار</p>
    //     <Select
    //       value={selectedProperty}
    //       onChange={handlePropertyChange}
    //       displayEmpty
    //       inputProps={{ "aria-label": "Without label" }}
    //       sx={{
    //         width: "100%",
    //         "& .MuiSelect-icon": {
    //           color: "black",
    //           display: "block !important",
    //         },
    //       }}
    //     >
    //       <MenuItem value="" disabled>
    //         اختر العقار
    //       </MenuItem>
    //       <MenuItem value="1">1</MenuItem>
    //       <MenuItem value="2">2</MenuItem>
    //     </Select>
    //   </Box>
    //   <Divider
    //     sx={{ marginY: "1rem", height: "1px", backgroundColor: "#eee" }}
    //   />
    //   <Box sx={{ width: "80%", marginTop: "1rem", margin: "auto" }}>
    //     <p style={{ fontWeight: "700", marginBottom: "1rem" }}>حدد الوحدة</p>
    //     <Select
    //       value={selectedUnit}
    //       onChange={handleUnitChange}
    //       displayEmpty
    //       inputProps={{ "aria-label": "Without label" }}
    //       sx={{
    //         width: "100%",
    //         "& .MuiSelect-icon": {
    //           color: "black",
    //           display: "block !important",
    //         },
    //       }}
    //     >
    //       <MenuItem value="" disabled>
    //         اختر الوحدة
    //       </MenuItem>
    //       <MenuItem value="1">1</MenuItem>
    //       <MenuItem value="2">2</MenuItem>
    //     </Select>
    //   </Box>
    // </div>
    <div>
      <br />
      <label>Main Office:</label>
      <select
        value={mainOfficeSignal.value?.id}
        onChange={(e) => handleSelectMainOffice(Number(e.target.value))}
      >
        <option value="0">Select Main Office</option>
        {initialData.map((office) => (
          <option key={office.id} value={office.id}>
            {office.title}
          </option>
        ))}
      </select>
      {/* {mainOfficeSignal.value?.id && (
        <div>
          <label>Unit:</label>
          <select
            value={selectedUnit.value ? selectedUnit.value.id : ""}
            onChange={(e) => handleSelectUnit(Number(e.target.value))}
          >
            <option value="0">Select Unit</option>
            {mainOfficeSignal.value?.units?.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label>Price Type:</label>
        <select
          value={priceType.value ? priceType.value.id : ""}
          onChange={(e) => handleSelectPriceType(Number(e.target.value))}
        >
          <option value="0">Select Price Type</option>
          {priceType?.value?.map((price) => (
            <option key={price.id} value={price.id}>
              {price.en_name}
            </option>
          ))}
        </select>
      </div> */}

      {/* Display the selected data or perform actions based on the selections */}
      {/* <div>
        <p>Selected Main Office: {mainOfficeSignal.value?.title}</p>
        <p>Selected Unit: {selectedUnit.value?.title}</p>
        <p>Selected Price Type: {selectedPrice.value?.price}</p>
      </div> */}
    </div>
  );
};

export default CalenderSide;
