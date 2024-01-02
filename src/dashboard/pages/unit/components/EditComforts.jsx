import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import myAxios from "../../../../api/myAxios";

const EditComforts = ({ comforts, onCancel, unitId, refetch }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const unitsComforts = JSON.parse(localStorage.getItem("searchData"))?.comfort;
  const [deletedFeatures, setDeletedFeatures] = useState([]);
  const [addedFeatures, setAddedFeatures] = useState([]);
  const [readyFeatures, setReadyFeatures] = useState(comforts);
  console.log(comforts);
  const handlePropertyClick = (property) => {
    const founded = readyFeatures.findIndex((ele) => ele.id === property.id);
    if (founded > -1) {
      const updatedAdded = readyFeatures.filter(
        (ele) => ele?.id !== property?.id
      );
      const element = readyFeatures.find((el) => el.id === property.id);
      setReadyFeatures(updatedAdded);
      setDeletedFeatures([
        ...deletedFeatures,
        {
          id: element.id,
          comfort_id: element.pivot.id,
        },
      ]);
    } else {
      const founded = addedFeatures.findIndex((ele) => ele.id === property.id);
      if (founded > -1) {
        const updatedAdded = addedFeatures.filter(
          (ele) => ele?.id !== property?.id
        );
        // const element = addedFeatures.find((el) => el.id === property.id);
        setAddedFeatures(updatedAdded);
      } else {
        setAddedFeatures([...addedFeatures, property]);
      }
    }
  };

  const handleSubmit = async () => {
    const added = new FormData();
    addedFeatures.forEach((ele, i) => {
      added.append(`comforts[${i}][boolfeaturea_id]`, ele.id);
    });

    await myAxios.post(
      `/api/v1/user/offices/comforts/addToAds/${unitId}`,
      added
    );

    await myAxios.delete(`/api/v1/user/offices/comforts/delete/${unitId}`, {
      data: {
        comforts: deletedFeatures,
      },
    });

    await refetch();
  };
  return (
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
        {unitsComforts?.map((property) => (
          <Box
            key={property?.id}
            onClick={() => handlePropertyClick(property)}
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
              backgroundColor:
                readyFeatures?.some((item) => item.id === property?.id) ||
                addedFeatures?.some((item) => item.id === property?.id)
                  ? "var(--green-color)"
                  : "transparent",
              transition: "background-color 0.3s, color 0.3s",
            }}
          >
            {/* <img
              src={`https://dashboard.maktab.sa/${property?.icon}`}
              alt="img"
              style={{
                position: "absolute",
                insetBlockStart: "15px",
                insetInlineStart: "14px",
                width: "36px",
              }}
            /> */}
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                color:
                  readyFeatures?.some((item) => item.id === property?.id) ||
                  addedFeatures?.some((item) => item.id === property?.id)
                    ? "white"
                    : "black",
              }}
            >
              {lang === "ar" ? property?.ar_name : property?.en_name}
            </Typography>
            <input type="hidden" value={property?.id} />
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.12)",
          margin: "2rem 4rem",
        }}
      ></Box>
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
    </div>
  );
};

export default EditComforts;
