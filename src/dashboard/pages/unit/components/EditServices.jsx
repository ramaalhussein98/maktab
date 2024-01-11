import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ServicesBox from "./ServicesBox";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";

const EditServices = ({
  services,
  onCancel,
  unitId,
  refetch,
  setIsChangingData,
}) => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const [deletedServices, setDeletedServices] = useState([]);
  const [addedServices, setAddedServices] = useState([]);
  const [readyServices, setReadyServices] = useState(services);
  console.log(readyServices);
  // const handlePropertyClick = (propertyId) => {
  //   dispatch({ type: "features", value: propertyId });
  // };

  // // Function to add a new service box
  // const addServiceBox = () => {
  //   dispatch({ type: "services", sub_type: "add" });
  // };

  // // Function to remove a service box
  // const removeServiceBox = (index) => {
  //   dispatch({ type: "services", sub_type: "remove", index });
  // };

  // // Function to toggle a service box
  // const toggleServiceBox = (index) => {
  //   const toggleNewVal = !state?.services[index].service_toggle;
  //   dispatch({ type: "services", sub_type: "toggle", index, toggleNewVal });
  // };
  // const handleComfortClick = (propertyId) => {
  //   dispatch({ type: "comfort", value: propertyId });
  // };

  return (
    <div>
      <Box>
        <Box sx={{ marginBottom: "1rem" }}>
          <Typography sx={{ fontWeight: "500" }}>
            {lang === "ar" ? "الخدمات " : "Services  "}
          </Typography>
        </Box>
      </Box>
      <Typography>
        {lang === "ar" ? "  خدمات إضافية " : "Additional Services  "}
      </Typography>
      {readyServices.map((serviceBox, index) => (
        <ServicesBox
          key={index}
          data={serviceBox}
          // onRemove={() => removeServiceBox(index)}
          // onToggle={() => toggleServiceBox(index)}
          index={index}
          // dispatch={dispatch}
        />
      ))}

      <Button
        onClick={addServiceBox}
        sx={{
          backgroundColor: "var(--green-color)",
          marginY: "1rem",
          "&:hover": {
            backgroundColor: "var(--green-color)",
            color: "white",
          },
        }}
      >
        <AddIcon sx={{ color: "white" }} />
      </Button>
    </div>
  );
};

export default EditServices;
