import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../../../assets/css/addAds.css";
import { Box, Button, Container } from "@mui/material";
import { WhiteLogo } from "../../../assets/logos";
import {
  OfiicesNumberDetails,
  UnitDetails,
  UnitFeatures,
  UnitPrice,
} from "./components";

import { useTranslation } from "react-i18next";
import HomeDescription from "../add_ads_folder/add_ads_components/HomeDescription";
import {
  ConfimLocation,
  HomeImagesAdd,
  MapAds,
} from "../add_ads_folder/add_ads_components";

const AddUnit = () => {
  const location = useLocation();
  const { state } = location;
  const unitId = state && state.id;
  const unitTitle = state && state.title;
  console.log(unitTitle);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState();
  const [afterWidth, setAfterWidth] = useState(12.5);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [mapData, setMapData] = useState({});
  const [interfaces, set_interfaces] = useState([]);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [readyImages, setReadyImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState(formData.images || []);
  const [thumbnail, setThumbnail] = useState();
  const [selectedImage, setSelectedImage] = useState(
    formData.thumbnail || null
  );
  const type = 0;
  const hasPrevStep = step > 1;
  const handleNext = () => {
    setStep(step + 1);
    setAfterWidth(afterWidth + 12.2);

    // if (category_bool?.length > 0 && category_quantity?.length > 0) {
    //   setAfterWidth(afterWidth + 9.0);
    // } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
    //   setAfterWidth(afterWidth + 11.0);
    // } else {
    //   setAfterWidth(afterWidth + 9.9);
    // }
  };
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setAfterWidth(afterWidth - 12.2);
      // if (category_bool?.length > 0 && category_quantity?.length > 0) {
      //   setAfterWidth(afterWidth - 9.0);
      // } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
      //   setAfterWidth(afterWidth - 11.0);
      // } else {
      //   setAfterWidth(afterWidth - 9.9);
      // }
    }
  };
  const renderStep = () => {
    //render both steps

    switch (step) {
      case 1:
        return <UnitDetails />;
      case 2:
        return <OfiicesNumberDetails />;
      case 3:
        return <UnitFeatures />;
      case 4:
        return (
          <HomeDescription formData={formData} setFormData={setFormData} />
        );
      case 5:
        return <UnitPrice />;
      case 6:
        return (
          <HomeImagesAdd
            formData={formData}
            setFormData={setFormData}
            step={step}
            images={images}
            setImages={setImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            thumbnail={thumbnail}
            setThumbnail={setThumbnail}
            selectedImages={selectedImages}
            setSelectedImages={setSelectedImages}
            type={type}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
            readyImages={readyImages}
            setReadyImages={setReadyImages}
          />
        );
      case 7:
        return (
          <MapAds
            formData={formData}
            setFormData={setFormData}
            setError={setError}
            error={error}
            mapData={mapData}
            setMapData={setMapData}
          />
        );
      case 8:
        <ConfimLocation
          formData={formData}
          setFormData={setFormData}
          interfaces={interfaces}
          mapData={mapData}
          setError={setError}
          error={error}
        />;
      default:
        return null;
    }
  };
  return (
    <>
      <Box
        className="imgAddADsContainer"
        sx={{
          display: { xs: "none", lg: "block" },

          height: { xs: "calc(100vh - 125px)", md: "100vh" },
        }}
      >
        <img src={WhiteLogo} alt="logo" className="imgAddAds" />
        <p className="unitTiltle">تسجيل وحدة جديدة</p>
        <p className="unitTiltle2">للعقار: {unitTitle}</p>
      </Box>
      <Container
        sx={{ padding: { xs: "0" }, marginTop: { xs: "0rem", sm: "2rem" } }}
      >
        <Box
          className="addads-continer-box1"
          sx={{
            marginBlockStart: { xs: "0px", sm: "40px" },
            marginLeft: { lg: "1%" },
          }}
        >
          <Box sx={{ height: "100%" }}>
            <Box
              className="addads-continer-box2"
              sx={{
                borderRadius: { xs: "0", sm: "12px 12px 0px 0px" },
                paddingInline: { xs: "15px", md: "3%" },
                height: { xs: "100vh", sm: "calc(-40px + 100vh)" },
              }}
            >
              <Link
                to={"/"}
                style={{
                  textDecoration: "none",
                  color: "var(--green-color)",
                  textAlign: lang === "ar" ? "right" : "left",
                }}
              >
                {t("dashboard.contract.Backtomainpage")}
              </Link>

              {/* Render the current step */}
              {renderStep()}
            </Box>
            <Box
              className="addads-custom-container"
              sx={{
                "&:after": {
                  width: `${afterWidth}%`,
                },
              }}
            >
              <Box className="custom-inner-element ">
                <Box
                  className="custom-flex-reverse-container"
                  sx={{
                    gap: { xs: "18px", md: "1rem 70px" },
                  }}
                >
                  {/* Prev and Next buttons */}
                  {step >= 1 && (
                    <Button
                      className="button-prev"
                      onClick={handlePrev}
                      disabled={loadingSubmit || !hasPrevStep}
                      sx={{
                        color: hasPrevStep
                          ? "var(--green-color)"
                          : "rgba(0, 0, 0, 0.26))",

                        border: `1px solid ${
                          hasPrevStep
                            ? "var(--green-color)"
                            : "rgba(0, 0, 0, 0.12)"
                        }`,
                        pointerEvents: hasPrevStep ? "auto" : "none",
                        "&:hover": {
                          background: "rgb(255, 255, 255)",
                          color: hasPrevStep
                            ? "var(--green-color)"
                            : "rgba(0, 0, 0, 0.26)",
                          transform: hasPrevStep ? "scale(1.02)" : "none",
                          transition: "transform 0.2s ease-in-out",
                        },
                      }}
                    >
                      {t("dashboard.new_order.main_btn2")}
                    </Button>
                  )}
                  {!isLastStep && (
                    <Button
                      className="button-next"
                      onClick={handleNext}
                      // disabled={loadingSubmit || hasNextStep || error}
                    >
                      {t("dashboard.new_order.main_btn1")}
                    </Button>
                  )}
                  {isLastStep && (
                    <Button
                      className="button-last"
                      onClick={handleSubmit}
                      disabled={loadingSubmit || error}
                    >
                      {loadingSubmit
                        ? "Loading..."
                        : t("dashboard.new_order.main_btn3")}
                    </Button>
                  )}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AddUnit;
