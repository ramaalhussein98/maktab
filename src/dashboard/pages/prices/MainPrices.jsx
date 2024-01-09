import React, { useState } from "react";
import "../../../assets/css/prices.css";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Typography,
} from "@mui/material";
import { Home1 } from "../../../assets/images";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import myAxios from "../../../api/myAxios";
import { useQueryHook } from "../../../hooks/useQueryHook";
import Loader from "../../../ui/Loader";

const getData = async () => {
  const res = await myAxios.get("api/v1/user/offices/prices/all");
  return res?.data?.data;
};

const MainPrices = () => {
  const { t } = useTranslation();

  const {
    data: pricesData,
    isLoading,
    isError,
  } = useQueryHook(["prices"], () => getData());
  console.log(pricesData);

  if (isLoading) return <Loader />;
  return (
    <Box>
      <Typography className="title_price">
        {" "}
        {t("dashboard.pricesNav.link1")}
      </Typography>
      {pricesData?.map((ele) => (
        <MainPriceItem key={ele.id} mainName={ele.title} units={ele.units} />
      ))}
    </Box>
  );
};

const PriceCard = ({ img, editMode, name, prices2, setEditMode, id }) => {
  const unitPrices = JSON.parse(localStorage.getItem("searchData")).type_res;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  console.log(prices2);
  const [newArray, setNewArray] = useState(
    unitPrices?.map((item1) => {
      const correspondingItem = prices2.find(
        (item2) => item2?.type_res_id == item1?.id
      );
      console.log(correspondingItem);
      if (correspondingItem) {
        return {
          ...item1,
          price: correspondingItem.price,
          type_res_id: correspondingItem.type_res_id,
          id: correspondingItem.id,
        };
      } else {
        return { ...item1, price: "" };
      }
    })
  );
  console.log(newArray);

  const handleInputChange = (e, index) => {
    const updatedArray = [...newArray];
    updatedArray[index].price = e.target.value;
    setNewArray(updatedArray);
  };

  const handleSaveChanges = async () => {
    setEditMode(false); // Disable edit mode after saving

    const pricesData = new FormData();
    const pricesAdd = new FormData();

    newArray.forEach((ele, i) => {
      if ("type_res_id" in ele) {
        pricesData.append(`prices[${i}][id]`, ele.id);
        pricesData.append(`prices[${i}][type_res_id]`, ele.type_res_id);
        pricesData.append(`prices[${i}][price]`, ele.price);
        pricesData.append(`prices[${i}][status]`, 1);
      } else {
        pricesAdd.append(`prices[${i}][status]`, 1);
        pricesAdd.append(`prices[${i}][type_res_id]`, ele.id);
        pricesAdd.append(`prices[${i}][price]`, ele.price);
      }
    });

    const res = await myAxios.post(
      `api/v1/user/offices/prices/updateToAds/${id}`,
      pricesData
    );
    const res2 = await myAxios.post(
      `api/v1/user/offices/prices/addToAds/${id}`,
      pricesAdd
    );

    Swal.fire({
      title: "تم تعديل الأسعار",
      icon: "success",
    });
  };

  return (
    <Paper
      className="paper_style2 flex-[49%]"
      sx={{ padding: { xs: "10px !important", md: "24px !important" } }}
    >
      <Box className="d_flex_wrap">
        <Box className="container_img">
          <img src={img} alt="Home" />
        </Box>
        <Box className="container_days">
          <span className="title_price">{name}</span>
          <Box className="Box_days">
            {newArray?.map((price, index) => (
              <Box key={index}>
                <p className="font_bold">
                  {lang === "ar" ? price?.ar_name : price?.en_name}
                </p>
                <div className="space"></div>
                {editMode ? (
                  <input
                    className="font_gray_Input"
                    value={price?.price}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ) : (
                  <p className="font_gray">{[price.price]}</p>
                )}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      {editMode && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <button className="cancel_btn" onClick={() => setEditMode(false)}>
            {t("dashboard.outgoing_requests.cancel_btn")}
          </button>
          <button className="save_btn" onClick={handleSaveChanges}>
            {t("dashboard.outgoing_requests.submit_btn")}
          </button>
        </Box>
      )}
    </Paper>
  );
};

const MainPriceItem = ({ mainName, units }) => {
  const { t } = useTranslation();

  const [editMode, setEditMode] = useState(false);
  const handleEditClick = () => {
    setEditMode(true);
  };

  // const handleInputChange = (e, cardIndex, priceIndex) => {
  //   const newPrices = [...prices];
  //   newPrices[cardIndex][priceIndex] = e.target.value;
  //   setPrices(newPrices);
  // };

  return (
    <Box sx={{ padding: { xs: "5px", md: "20px" } }}>
      {/* this will repeat */}
      <Paper
        className="paper_style"
        sx={{ padding: { xs: "10px !important", md: "24px !important" } }}
      >
        <Box className="d_flex_space_between">
          <Typography className="title_price">{mainName}</Typography>
          <button className="edit_btn" onClick={handleEditClick}>
            {t("dashboard.outgoing_requests.edit_btn")}
          </button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          {units.map((ele) => (
            <PriceCard
              prices2={ele.ads_prices}
              key={ele.id}
              id={ele.id}
              img={Home1}
              setEditMode={setEditMode}
              day="33"
              name={ele.title}
              editMode={editMode}
            />
          ))}
        </Box>
      </Paper>
    </Box>
  );
};
export default MainPrices;
