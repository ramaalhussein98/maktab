import React, { useEffect, useState } from "react";
import { Button, Container, Box } from "@mui/material";
import {
  HomeImagesAdd,
  HomeDetails,
  HomeInformation,
  CatgouryAds,
  ConfimLocation,
  MapAds,
  HomeDescription,
  OfficeDetailsNumbers,
} from "./add_ads_components";
import Services from "./add_ads_components/services/Services";
import LicenseModal from "../add_ads_folder/add_ads_components/LicenseModal";
import AddFeatureComponent from "../add_ads_folder/add_ads_components/AddFeatureComponent";
import { useTranslation } from "react-i18next";
// import useDataFetcher from "../../../api/useDataFetcher ";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { LogoBlack, WhiteLogo } from "../../../assets/logos";
import AddLicensedAdvertising from "./add_ads_components/AddLicensedAdvertising";
import "../../../assets/css/addAds.css";
// import Loader from "../../../common/Loading/Loader";
// import { WhiteLogo } from "../../../assets/images";
// import LicenseModal from "./LicenseModal";

const Addads = ({ type = 0, ad = null }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;

  // const {
  //   data: sendFormData,
  //   isLoading: isLoadingSendForm,
  //   post,
  // } = useDataFetcher();

  //for getting the category information
  // const {
  //   data: info,
  //   isLoading: isInfoLoading,
  //   get: getInfo,
  // } = useDataFetcher();
  const isInfoLoading = false; // this i add it
  //declaring the important arrays
  const [type_aqar, set_type_aqar] = useState([]);
  const [type_res, set_type_res] = useState([]);
  const [interfaces, set_interfaces] = useState([]);
  const [category_bool, set_category_bool] = useState([]);
  const [category_quantity, set_category_quantity] = useState([]);
  const [mapData, setMapData] = useState({});

  // useEffect(() => {
  //   set_type_aqar(info?.type_aqar);
  //   set_type_res(info?.type_res);
  //   set_interfaces(info?.interfaces);
  //   set_category_bool(info?.categoryBool);
  //   set_category_quantity(info?.categoryQuantity);
  // }, [info]);

  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState();
  const [formData, setFormData] = useState({});
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [afterWidth, setAfterWidth] = useState(13.7); // Initial width of &:after
  const [error, setError] = useState(false);
  const [inputErrors, setInputErrors] = useState({});
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedType, setSelectedType] = useState();
  const [images, setImages] = useState([]);
  const [selectedCheckLicense, setSelectedCheckLicense] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [deletedImages, setDeletedImages] = useState([]);
  const [readyImages, setReadyImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState(formData.images || []);
  const [selectedImage, setSelectedImage] = useState(
    formData.thumbnail || null
  );
  const [thumbnail, setThumbnail] = useState();

  useEffect(() => {
    if (type === 1) {
      setFormData(ad);
      setReadyImages(ad.gallery);
    } else {
      setFormData({});
    }
  }, [type]);

  useEffect(() => {
    if (category_bool?.length > 0 && category_quantity?.length > 0) {
      step === 11 ? setIsLastStep(11) : setIsLastStep(null);
    } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
      step === 9 ? setIsLastStep(9) : setIsLastStep(null);
    } else {
      step === 10 ? setIsLastStep(10) : setIsLastStep(null);
    }
  }, [step, category_bool, category_quantity]);

  const [hasNextStep, setHasNextStep] = useState(false);

  useEffect(() => {
    setIsLicenseModalOpen(true);
  }, []);

  const handleOpenLicenseModal = () => {
    setIsLicenseModalOpen(true);
  };

  const handleCloseLicenseModal = () => {
    setIsLicenseModalOpen(false);
  };

  const hasPrevStep = step > 1;

  useEffect(() => {
    if (category_bool?.length > 0 && category_quantity?.length > 0) {
      if (step === 1) {
        if (
          formData.hasOwnProperty("category_aqar") &&
          formData.hasOwnProperty("title") &&
          formData?.title !== ""
        ) {
          setError(false);
        } else {
          setError(true);
        }
      } else if (step === 2) {
        if (
          formData.hasOwnProperty("inputValues") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar_id")
        ) {
          const allInputsFilled = Object.values(formData?.inputValues).every(
            (val) => val !== ""
          );
          const isInputsFour = Object.keys(formData?.inputValues).length >= 4;
          if (
            !allInputsFilled ||
            !isInputsFour ||
            formData?.type_aqar_id === "" ||
            formData?.advertiser_relationship === ""
          ) {
            setError(true);
          } else {
            setError(false);
          }
        } else {
          setError(true);
        }
      } else if (step === 3) {
        if (formData.hasOwnProperty("aqarCategoryQuantity")) {
          if (
            formData.aqarCategoryQuantity.length === category_quantity.length
          ) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 4) {
      } else if (step === 5) {
        if (formData.hasOwnProperty("description")) {
          if (formData.description !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 7) {
        if (
          formData.hasOwnProperty("interface_id") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_id !== "" &&
            formData.neighborhood !== "" &&
            formData.city !== "" &&
            formData.road !== ""
          ) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 8) {
        if (formData.hasOwnProperty("thumbnail")) {
          if (formData.thumbnail !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      }
    } else if (category_bool?.length > 0 && category_quantity?.length === 0) {
      if (step === 1) {
        if (
          formData.hasOwnProperty("category_aqar") &&
          formData.hasOwnProperty("title") &&
          formData?.title !== ""
        ) {
          setError(false);
        } else {
          setError(true);
        }
      } else if (step === 2) {
        if (
          formData.hasOwnProperty("inputValues") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar_id")
        ) {
          const allInputsFilled = Object.values(formData?.inputValues).every(
            (val) => val !== ""
          );
          const isInputsFour = Object.keys(formData?.inputValues).length >= 4;
          if (
            !allInputsFilled ||
            !isInputsFour ||
            formData?.type_aqar_id === "" ||
            formData?.advertiser_relationship === ""
          ) {
            setError(true);
          } else {
            setError(false);
          }
        } else {
          setError(true);
        }
      } else if (step === 4) {
        if (formData.hasOwnProperty("description")) {
          if (formData.description !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 6) {
        if (
          formData.hasOwnProperty("interface_id") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_id !== "" &&
            formData.neighborhood !== "" &&
            formData.city !== "" &&
            formData.road !== ""
          ) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 7) {
        if (formData.hasOwnProperty("thumbnail")) {
          if (formData.thumbnail !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      }
    } else if (category_bool?.length === 0 && category_quantity?.length > 0) {
      if (step === 1) {
        if (
          formData.hasOwnProperty("category_aqar") &&
          formData.hasOwnProperty("title") &&
          formData?.title !== ""
        ) {
          setError(false);
        } else {
          setError(true);
        }
      } else if (step === 2) {
        if (
          formData.hasOwnProperty("inputValues") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar_id")
        ) {
          const allInputsFilled = Object.values(formData?.inputValues).every(
            (val) => val !== ""
          );
          const isInputsFour = Object.keys(formData?.inputValues).length >= 4;
          if (
            !allInputsFilled ||
            !isInputsFour ||
            formData?.type_aqar_id === "" ||
            formData?.advertiser_relationship === ""
          ) {
            setError(true);
          } else {
            setError(false);
          }
        } else {
          setError(true);
        }
      } else if (step === 3) {
        if (formData.hasOwnProperty("aqarCategoryQuantity")) {
          if (
            formData.aqarCategoryQuantity.length === category_quantity.length
          ) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 4) {
        if (formData.hasOwnProperty("description")) {
          if (formData.description !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 6) {
        if (
          formData.hasOwnProperty("interface_id") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_id !== "" &&
            formData.neighborhood !== "" &&
            formData.city !== "" &&
            formData.road !== ""
          ) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 7) {
        if (formData.hasOwnProperty("thumbnail")) {
          if (formData.thumbnail !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      }
    } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
      if (step === 1) {
        if (
          formData.hasOwnProperty("category_aqar") &&
          formData.hasOwnProperty("title") &&
          formData?.title !== ""
        ) {
          setError(false);
        } else {
          setError(true);
        }
      } else if (step === 2) {
        if (
          formData.hasOwnProperty("inputValues") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar_id")
        ) {
          const allInputsFilled = Object.values(formData?.inputValues).every(
            (val) => val !== ""
          );
          const isInputsFour = Object.keys(formData?.inputValues).length >= 4;
          if (
            !allInputsFilled ||
            !isInputsFour ||
            formData?.type_aqar_id === "" ||
            formData?.advertiser_relationship === ""
          ) {
            setError(true);
          } else {
            setError(false);
          }
        } else {
          setError(true);
        }
      } else if (step === 3) {
        if (formData.hasOwnProperty("description")) {
          if (formData.description !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 5) {
        if (
          formData.hasOwnProperty("interface_id") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_id !== "" &&
            formData.neighborhood !== "" &&
            formData.city !== "" &&
            formData.road !== ""
          ) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      } else if (step === 6) {
        if (formData.hasOwnProperty("thumbnail")) {
          if (formData.thumbnail !== "") {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      }
    } else {
      if (step === 1) {
        if (
          formData.hasOwnProperty("category_aqar") &&
          formData.hasOwnProperty("title") &&
          formData?.title !== ""
        ) {
          setError(false);
        } else {
          setError(true);
        }
      }
    }
  }, [formData, step, category_quantity, category_bool]);

  const handleNext = () => {
    // Perform form validation
    // if (step === 1) {
    //   getInfo(`/api/deal/info/${formData?.category_aqar?.id}`);
    // }
    setStep(step + 1);

    if (category_bool?.length > 0 && category_quantity?.length > 0) {
      setAfterWidth(afterWidth + 9.0);
    } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
      setAfterWidth(afterWidth + 11.0);
    } else {
      setAfterWidth(afterWidth + 9.9);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      if (category_bool?.length > 0 && category_quantity?.length > 0) {
        setAfterWidth(afterWidth - 9.0);
      } else if (
        category_bool?.length === 0 &&
        category_quantity?.length === 0
      ) {
        setAfterWidth(afterWidth - 11.0);
      } else {
        setAfterWidth(afterWidth - 9.9);
      }
    }
  };

  const parseFormattedNumber = (formattedValue) => {
    if (!formattedValue) return NaN;

    // Remove thousand separators and any other non-numeric characters
    const cleanedValue = formattedValue.replace(/[^0-9.-]/g, "");

    // Parse the cleaned value into a number
    const number = parseFloat(cleanedValue);

    return isNaN(number) ? NaN : number;
  };

  const handleSubmit = async () => {
    if (type === 0) {
      const formDataSend = new FormData();

      setLoadingSubmit(true);
      const sendForm = new FormData();
      // Iterate through properties of formData and append each property to sendForm
      for (const property in formData) {
        if (formData.hasOwnProperty(property)) {
          sendForm.append(property, formData[property]);
        }
      }
      const requestBody = {};

      // Loop through each key-value pair in sendForm and add to requestBody
      for (const [key, value] of sendForm.entries()) {
        if (formData.category_aqar) {
          requestBody["category_id"] = formData.category_aqar.id;
        }
        if (formData.inputValues.price) {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.price
          );
          requestBody["price"] = formattedValue;
        }
        if (formData.inputValues.area) {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.area
          );
          requestBody["space"] = formattedValue;
        }
        if (formData.inputValues.height) {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.height
          );
          requestBody["height"] = formattedValue;
        }
        if (formData.inputValues.width) {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.width
          );
          requestBody["width"] = formattedValue;
        }
        if (formData.selectedLocation.lat) {
          requestBody["lat"] = formData.selectedLocation.lat;
        }
        if (formData.selectedLocation.lng) {
          requestBody["lng"] = formData.selectedLocation.lng;
        }

        if (formData.selectedLocation.zoom) {
          requestBody["zoom"] = formData.selectedLocation.zoom;
        }
        if (formData.aqarCategoryQuantity) {
          requestBody["QuantityAds"] = JSON.stringify(
            formData.aqarCategoryQuantity
          );
        }
        if (formData.selectedBooleansProperties) {
          requestBody["BoolfeatureaAds"] = JSON.stringify(
            formData.selectedBooleansProperties
          );
        }
        if (formData.images) {
        }
        requestBody[key] = value;
      }
      if (formData.images.length > 0) {
        // Append the entire array of selected files to the formData
        selectedImages.forEach((file) => {
          formDataSend.append("images[]", file);
        });
      }
      //   BoolfeatureaAds
      // QuantityAds
      const address =
        requestBody.city +
        ", " +
        requestBody.neighborhood +
        ", " +
        requestBody.road;
      for (const property in requestBody) {
        if (requestBody.hasOwnProperty(property)) {
          formDataSend.append(property, requestBody[property]);
        }
      }
      formDataSend.append("address", address);

      try {
        const response = await fetch(
          `https://www.dashboard.aqartik.com/api/deal/store?lang=${lang}`,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
            method: "POST",
            body: formDataSend,
          }
        );

        const data = await response.json();
        if (data.status === 1) {
          setLoadingSubmit(false);
          toast.success(data?.message);
          navigate("/userDashboard/myDeals");
        } else if (data.status === 0 && data.message === "401 Unauthorized") {
          setLoadingSubmit(false);
          toast.error(
            lang === "ar"
              ? "غير مصرح، يرجى تسجيل الدخول"
              : "unauthorized, please login again"
          );
          localStorage.removeItem("user_token");
          localStorage.removeItem("userId");
          localStorage.removeItem("userName");
          localStorage.removeItem("userMembership");
          localStorage.removeItem("userData");
          navigate("/");
        } else {
          setLoadingSubmit(false);
          toast.error(data?.message);
        }
      } catch (error) {
        console.error("Error sending FormData:", error);
        setLoadingSubmit(false);
      }
    } else if (type === 1) {
      const formDataSend = new FormData();

      // setLoadingSubmit(true);
      const sendForm = new FormData();
      // Iterate through properties of formData and append each property to sendForm
      for (const property in formData) {
        if (formData.hasOwnProperty(property)) {
          sendForm.append(property, formData[property]);
        }
      }
      const requestBody = {};

      for (const [key, value] of sendForm.entries()) {
        if (key === "category_aqar") {
          requestBody["category_id"] = formData.category_aqar.id;
        } else if (key === "inputValues.price") {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.price
          );
          requestBody["price"] = formattedValue;
        } else if (key === "inputValues.area") {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.area
          );
          requestBody["space"] = formattedValue;
        } else if (key === "inputValues.height") {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.height
          );
          requestBody["height"] = formattedValue;
        } else if (key === "inputValues.width") {
          const formattedValue = parseFormattedNumber(
            formData.inputValues.width
          );
          requestBody["width"] = formattedValue;
        } else if (key === "selectedLocation.lat") {
          requestBody["lat"] = formData.selectedLocation.lat;
        } else if (key === "selectedLocation.lng") {
          requestBody["lng"] = formData.selectedLocation.lng;
        } else if (key === "selectedLocation.zoom") {
          requestBody["zoom"] = formData.selectedLocation.zoom;
        } else if (key === "aqarCategoryQuantity") {
          requestBody["QuantityAds"] = JSON.stringify(
            formData.aqarCategoryQuantity
          );
        } else if (key === "selectedBooleansProperties") {
          requestBody["BoolfeatureaAds"] = JSON.stringify(
            formData.selectedBooleansProperties
          );
        } else {
          requestBody[key] = value;
        }
      }
      if (formData.images.length > 0) {
        // Append the entire array of selected files to the formData
        selectedImages.forEach((file) => {
          formDataSend.append("images[]", file);
        });
      }
      //   BoolfeatureaAds
      // QuantityAds
      const excludedKeys = [
        "images",
        "user",
        "gallery",
        "type_aqar",
        "category_aqar",
        "thumbnail",
        "interface_aqar",
        "inputValues",
        "selectedLocation",
        "BoolFeaturea",
      ];
      if (deletedImages.length > 0) {
        formDataSend.append("removed_images", deletedImages.join(","));
      }

      // Handle the thumbnail property separately
      const thumbnailValue = requestBody.thumbnail;

      if (thumbnailValue instanceof File) {
        formDataSend.append("thumbnail", thumbnailValue);
      } else if (
        typeof thumbnailValue === "object" &&
        thumbnailValue !== null
      ) {
        formDataSend.append("thumbnail", JSON.stringify(thumbnailValue));
      }
      for (const property in requestBody) {
        if (requestBody.hasOwnProperty(property)) {
          if (!excludedKeys.includes(property)) {
            // Check if the property is not in the excludedKeys array
            formDataSend.append(property, requestBody[property]);
          }
        }
      }

      try {
        const response = await fetch(
          `https://www.dashboard.aqartik.com/api/deal/update/${ad.id}`,
          {
            headers: {
              // "Content-Type": "multipart/form-data",
              authorization: `Bearer ${localStorage.getItem("user_token")}`,
            },
            method: "POST",
            body: formDataSend,
          }
        );

        const data = await response.json();
      } catch (error) {
        console.error("Error sending FormData:", error);
      }
    }
  };

  const renderStep = () => {
    //render both steps
    if (category_bool?.length === 0 && category_quantity?.length === 0) {
      switch (step) {
        case 1:
          return (
            <AddLicensedAdvertising
              selectedCheckLicense={selectedCheckLicense}
              setSelectedCheckLicense={setSelectedCheckLicense}
              licenseNumber={licenseNumber}
              setLicenseNumber={setLicenseNumber}
            />
          );
        case 2:
          return (
            <CatgouryAds
              formData={formData}
              setFormData={setFormData}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          );
        case 3:
          return isInfoLoading ? (
            "loading"
          ) : (
            <HomeInformation
              formData={formData}
              setFormData={setFormData}
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
              setError={setError}
              type_aqar={type_aqar}
              type_res={type_res}
            />
          );
        case 4:
          return isInfoLoading ? "loading" : <OfficeDetailsNumbers />;
        case 5:
          return isInfoLoading ? (
            "loading"
          ) : (
            <HomeDescription
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
            />
          );
        case 6:
          return isInfoLoading ? (
            "loading"
          ) : (
            <Services
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
            />
          );
        case 7:
          return isInfoLoading ? (
            "loading"
          ) : (
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
          return isInfoLoading ? (
            "loading"
          ) : (
            <ConfimLocation
              formData={formData}
              setFormData={setFormData}
              interfaces={interfaces}
              mapData={mapData}
              setError={setError}
              error={error}
            />
          );
        case 9:
          return isInfoLoading ? (
            "loading"
          ) : (
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
        // Render other steps...
        default:
          return null;
      }
    } else {
      switch (step) {
        default:
          return (
            <CatgouryAds
              formData={formData}
              setFormData={setFormData}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          );
      }
    }
  };

  return (
    <>
      {/* {loadingSubmit && <Loader />} */}
      <Box
        className="imgAddADsContainer"
        sx={{
          display: { xs: "none", lg: "block" },

          height: { xs: "calc(100vh - 125px)", md: "100vh" },
        }}
      >
        <img src={WhiteLogo} alt="logo" className="imgAddAds" />
      </Box>
      <Container
        sx={{ padding: { xs: "0" }, marginTop: { xs: "0rem", sm: "2rem" } }}
      >
        {/* {isLicenseModalOpen && (
          <LicenseModal
            isOpen={isLicenseModalOpen}
            onClose={handleCloseLicenseModal}
          />
        )} */}
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

export default Addads;
