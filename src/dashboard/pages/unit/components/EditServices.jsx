import { Box, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

import ServicesBox from "./ServicesBox";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useReducer, useState } from "react";
import myAxios from "../../../../api/myAxios";
const reducerFunc = (state, action) => {
  switch (action.type) {
    case "services":
      if (action.sub_type === "add") {
        return {
          ...state,
          services: [
            ...state.services,
            {
              generated_id: Math.floor(Math.random() * 100) + 1,
              ar_name: "",
              en_name: "",
              price: "",
              service_toggle: true,
              status: false,
            },
          ],
        };
      } else if (action.sub_type === "remove") {
        const updatedBoxes = [...state.services];
        updatedBoxes.splice(action.index, 1);
        return {
          ...state,
          services: updatedBoxes,
        };
      } else if (action.sub_type === "toggle") {
        const updatedBoxes = [...state.services];
        updatedBoxes[action.index].service_toggle = action.toggleNewVal;

        return {
          ...state,
          services: updatedBoxes,
        };
      } else if (action.sub_type === "changeService") {
        const updatedServices = [...state.services];
        const { name, value } = action;
        const indexToUpdate = action.index;

        if (indexToUpdate !== -1) {
          // Update the specific property
          updatedServices[indexToUpdate][name] = value;

          return {
            ...state,
            services: updatedServices,
          };
        }
      } else if (action.sub_type === "initialize") {
        const data = action.data;
        const initialServices = data.map((ele) => {
          return {
            id: ele.id,
            ar_name: ele.ar_name,
            en_name: ele.en_name,
            price: ele.price,
            service_toggle: false,
            status: ele.status == 0 ? false : true,
          };
        });

        return {
          services: initialServices,
        };
      }
      break;
  }
  throw Error("Unknown action: " + action.type);
};
const EditServices = ({
  services,
  onCancel,
  unitId,
  refetch,
  setIsChangingData,
}) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // const [deletedServices, setDeletedServices] = useState([]);
  // const [addedServices, setAddedServices] = useState([]);
  // const [readyServices, setReadyServices] = useState(services);
  const [state, dispatch] = useReducer(reducerFunc, { services: [] });
  // Function to add a new service box
  const addServiceBox = () => {
    dispatch({ type: "services", sub_type: "add" });
  };
  useEffect(() => {
    services?.length > 0 &&
      dispatch({ type: "services", sub_type: "initialize", data: services });
  }, [services]);

  // Function to remove a service box
  const removeServiceBox = (index) => {
    dispatch({ type: "services", sub_type: "remove", index });
  };

  // Function to toggle a service box
  const toggleServiceBox = (index) => {
    const toggleNewVal = !state?.services[index].service_toggle;
    dispatch({ type: "services", sub_type: "toggle", index, toggleNewVal });
  };

  const handleSubmit = async () => {
    setIsChangingData(true);

    const addData = new FormData();
    const editData = new FormData();

    state.services.map((ele, i) => {
      if ("id" in ele) {
        editData.append(`services[${i}][id]`, ele.id);
        editData.append(`services[${i}][ar_name]`, ele.ar_name);
        editData.append(`services[${i}][en_name]`, ele.en_name);
        editData.append(`services[${i}][status]`, ele.status);
        editData.append(`services[${i}][price]`, ele.price);
      } else {
        addData.append(`services[${i}][ar_name]`, ele.ar_name);
        addData.append(`services[${i}][en_name]`, ele.en_name);
        addData.append(`services[${i}][status]`, ele.status);
        addData.append(`services[${i}][price]`, ele.price);
      }
    });

    const res = await myAxios.post(
      `api/v1/user/offices/services/addToAds/${unitId}`,
      addData
    );
    const res2 = await myAxios.post(
      `api/v1/user/offices/services/updateToAds/${unitId}`,
      editData
    );
    setIsChangingData(false);
    await refetch();
    onCancel();
  };

  return (
    <>
      <div>
        <Typography>
          {lang === "ar" ? "  خدمات إضافية " : "Additional Services  "}
        </Typography>
        {state.services.map((serviceBox, index) => (
          <ServicesBox
            key={index}
            data={serviceBox}
            onRemove={() => removeServiceBox(index)}
            onToggle={() => toggleServiceBox(index)}
            index={index}
            dispatch={dispatch}
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "1rem ",
          marginInline: "auto",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{
            fontWeight: "600",
            borderRadius: "8px",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "var(--main-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "#0b7b5a",
              color: "white",
            },
          }}
        >
          {t("dashboard.outgoing_requests.submit_btn")}
        </Button>
        <Button
          sx={{
            fontWeight: "600",
            borderRadius: "8px",

            border: "1px solid var(--main-color)",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "white",
            color: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#e5f9f4",
            },
          }}
          onClick={onCancel}
        >
          {t("dashboard.outgoing_requests.cancel_btn")}
        </Button>
      </Box>
    </>
  );
};

export default EditServices;
