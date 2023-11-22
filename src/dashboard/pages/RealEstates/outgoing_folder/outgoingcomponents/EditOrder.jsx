import React, { useEffect, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Paper,
  Container,
} from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import {
  OrderInfo,
  OrderDetails,
  OrderRoomsNum,
  OrderLocation,
  OrderDescripton,
  OrderMap,
} from "../../../new_order_folder/new_order_components";

import { useTranslation } from "react-i18next";
// import useDataFetcher from "../../../../api/useDataFetcher ";

import OrderInputs from "../../../new_order_folder/new_order_components/OrderInputs";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Loader from "../../../../common/Loading/Loader";
import { toast } from "react-hot-toast";
import { LogoAds } from "../../../../../assets/images";

const EditOrder = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const ad = useLocation().state.ad;
  const nav = useNavigate();
  // const {
  //   data: sendFormData,
  //   isLoading: isLoadingSendForm,
  //   post,
  // } = useDataFetcher();

  //for getting the category information
  const {
    data: info,
    isLoading: isInfoLoading,
    get: getInfo,
  } = useDataFetcher();

  //declaring the important arrays
  const [type_aqar, set_type_aqar] = useState([]);
  const [type_res, set_type_res] = useState([]);
  const [interfaces, set_interfaces] = useState([]);
  const [category_bool, set_category_bool] = useState([]);
  const [category_quantity, set_category_quantity] = useState([]);
  const [mapData, setMapData] = useState({});

  useEffect(() => {
    set_type_aqar(info?.type_aqar);
    set_type_res(info?.type_res);
    set_interfaces(info?.interfaces);
    set_category_bool(info?.categoryBool);
    set_category_quantity(info?.categoryQuantity);
  }, [info]);

  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState();

  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (ad) {
      setFormData(ad);
    }
  }, [ad]);

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [afterWidth, setAfterWidth] = useState(14); // Initial width of &:after
  const [error, setError] = useState(false);
  const [inputErrors, setInputErrors] = useState({});

  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedType, setSelectedType] = useState();

  useEffect(() => {
    if (category_bool?.length > 0 && category_quantity?.length > 0) {
      step === 7 ? setIsLastStep(true) : setIsLastStep(false);
    } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
      step === 5 ? setIsLastStep(true) : setIsLastStep(false);
    } else {
      step === 6 ? setIsLastStep(true) : setIsLastStep(false);
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
          formData.hasOwnProperty("price") &&
          formData.hasOwnProperty("space") &&
          formData.hasOwnProperty("width") &&
          formData.hasOwnProperty("height") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar")
        ) {
          if (
            formData.price === "" ||
            formData.space === "" ||
            formData.width === "" ||
            formData.height === "" ||
            formData?.type_aqar.id === "" ||
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
          formData.hasOwnProperty("interface_aqar") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_aqar.id !== "" &&
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
          formData.hasOwnProperty("price") &&
          formData.hasOwnProperty("space") &&
          formData.hasOwnProperty("width") &&
          formData.hasOwnProperty("height") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar")
        ) {
          if (
            formData.price === "" ||
            formData.space === "" ||
            formData.width === "" ||
            formData.height === "" ||
            formData?.type_aqar.id === "" ||
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
          formData.hasOwnProperty("interface_aqar") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_aqar.id !== "" &&
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
          formData.hasOwnProperty("price") &&
          formData.hasOwnProperty("space") &&
          formData.hasOwnProperty("width") &&
          formData.hasOwnProperty("height") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar")
        ) {
          if (
            formData.price === "" ||
            formData.space === "" ||
            formData.width === "" ||
            formData.height === "" ||
            formData?.type_aqar.id === "" ||
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
          formData.hasOwnProperty("interface_aqar") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_aqar.id !== "" &&
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
          formData.hasOwnProperty("price") &&
          formData.hasOwnProperty("space") &&
          formData.hasOwnProperty("width") &&
          formData.hasOwnProperty("height") &&
          formData.hasOwnProperty("advertiser_relationship") &&
          formData.hasOwnProperty("type_aqar")
        ) {
          if (
            formData.price === "" ||
            formData.space === "" ||
            formData.width === "" ||
            formData.height === "" ||
            formData?.type_aqar.id === "" ||
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
          formData.hasOwnProperty("interface_aqar") &&
          formData.hasOwnProperty("neighborhood") &&
          formData.hasOwnProperty("city") &&
          formData.hasOwnProperty("road")
        ) {
          if (
            formData.interface_aqar.id !== "" &&
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
    if (step === 1) {
      getInfo(`/api/deal/info/${formData?.category_aqar?.id}`);
    }
    setStep(step + 1);

    if (category_bool?.length > 0 && category_quantity?.length > 0) {
      setAfterWidth(afterWidth + 14);
    } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
      setAfterWidth(afterWidth + 23);
    } else {
      setAfterWidth(afterWidth + 17.14);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      if (category_bool?.length > 0 && category_quantity?.length > 0) {
        setAfterWidth(afterWidth - 14);
      } else if (
        category_bool?.length === 0 &&
        category_quantity?.length === 0
      ) {
        setAfterWidth(afterWidth - 23);
      } else {
        setAfterWidth(afterWidth - 17.14);
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
        const formattedValue = parseFormattedNumber(formData.inputValues.price);
        requestBody["price"] = formattedValue;
      }
      if (formData.inputValues.area) {
        const formattedValue = parseFormattedNumber(formData.inputValues.area);
        requestBody["space"] = formattedValue;
      }
      if (formData.inputValues.height) {
        const formattedValue = parseFormattedNumber(
          formData.inputValues.height
        );
        requestBody["height"] = formattedValue;
      }
      if (formData.inputValues.width) {
        const formattedValue = parseFormattedNumber(formData.inputValues.width);
        requestBody["width"] = formattedValue;
      }
      if (formData.lat) {
        requestBody["lat"] = formData.lat;
      }
      if (formData.lng) {
        requestBody["lng"] = formData.lng;
      }
      if (formData.zoom) {
        requestBody["zoom"] = formData.zoom;
      }
      if (formData.aqarCategoryQuantity) {
        requestBody["QuantityRequest"] = JSON.stringify(
          formData.aqarCategoryQuantity
        );
      }
      if (formData.selectedBooleansProperties) {
        const newArrayOfObjects = formData.selectedBooleansProperties.map(
          (item) => {
            const id = item.bool_featurea.id;
            return { boolfeaturea_id: id };
          }
        );
        requestBody["BoolfeatureaRequest"] = JSON.stringify(newArrayOfObjects);
      }
      requestBody[key] = value;
    }
    //   BoolfeatureaAds
    // QuantityAds

    const excludedKeys = [
      "user",
      "type_aqar",
      "category_aqar",
      "interface_aqar",
      "inputValues",
      "selectedLocation",
      "BoolFeaturea",
      "aqarCategoryQuantity",
      "selectedBooleansProperties",
      "type_res",
    ];

    for (const property in requestBody) {
      if (requestBody.hasOwnProperty(property)) {
        if (!excludedKeys.includes(property)) {
          // Check if the property is not in the excludedKeys array
          formDataSend.append(property, requestBody[property]);
        }
      }
    }
    const address =
      requestBody.city +
      ", " +
      requestBody.neighborhood +
      ", " +
      requestBody.road;
    formDataSend.append("address", address);

    try {
      const response = await fetch(
        `https://www.dashboard.aqartik.com/api/real-estate-request/update/${ad.id}`,
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
        toast.success("تم تعديل بيانات الطلب بنجاح");
        nav("/userDashboard/orders/myOrders");
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
        nav("/");
      } else {
        setLoadingSubmit(false);
        toast.error(data?.message);
      }
    } catch (error) {
      console.error("Error sending FormData:", error);
      setLoadingSubmit(false);
    }
  };

  const renderStep = () => {
    //render both steps
    if (category_bool?.length > 0 && category_quantity?.length > 0) {
      switch (step) {
        case 1:
          return (
            <OrderInfo
              formData={formData}
              setFormData={setFormData}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          );
        case 2:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDetails
              formData={formData}
              setFormData={setFormData}
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
              setError={setError}
              type_aqar={type_aqar}
              type_res={type_res}
            />
          );
        case 3:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderRoomsNum
              formData={formData}
              setFormData={setFormData}
              categoryQuantity={category_quantity}
              setError={setError}
              error={error}
            />
          );
        case 4:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderInputs
              formData={formData}
              setFormData={setFormData}
              category_bool={category_bool}
            />
          );
        case 5:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDescripton
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
            <OrderMap
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
              mapData={mapData}
              setMapData={setMapData}
            />
          );
        case 7:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderLocation
              formData={formData}
              setFormData={setFormData}
              interfaces={interfaces}
              mapData={mapData}
              setError={setError}
              error={error}
            />
          );
        // Render other steps...
        default:
          return null;
      }
    } else if (category_bool?.length > 0 && category_quantity?.length === 0) {
      switch (step) {
        case 1:
          return (
            <OrderInfo
              formData={formData}
              setFormData={setFormData}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          );
        case 2:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDetails
              formData={formData}
              setFormData={setFormData}
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
              setError={setError}
              type_aqar={type_aqar}
              type_res={type_res}
            />
          );
        case 3:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderInputs
              formData={formData}
              setFormData={setFormData}
              category_bool={category_bool}
            />
          );

        case 4:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDescripton
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
            />
          );
        case 5:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderMap
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
              mapData={mapData}
              setMapData={setMapData}
            />
          );
        case 6:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderLocation
              formData={formData}
              setFormData={setFormData}
              interfaces={interfaces}
              mapData={mapData}
              setError={setError}
              error={error}
            />
          );
        // Render other steps...
        default:
          return null;
      }
    } else if (category_bool?.length === 0 && category_quantity?.length > 0) {
      switch (step) {
        case 1:
          return (
            <OrderInfo
              formData={formData}
              setFormData={setFormData}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          );
        case 2:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDetails
              formData={formData}
              setFormData={setFormData}
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
              setError={setError}
              type_aqar={type_aqar}
              type_res={type_res}
            />
          );
        case 3:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderRoomsNum
              formData={formData}
              setFormData={setFormData}
              categoryQuantity={category_quantity}
              setError={setError}
              error={error}
            />
          );

        case 4:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDescripton
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
            />
          );
        case 5:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderMap
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
              mapData={mapData}
              setMapData={setMapData}
            />
          );
        case 6:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderLocation
              formData={formData}
              setFormData={setFormData}
              interfaces={interfaces}
              mapData={mapData}
              setError={setError}
              error={error}
            />
          );
        // Render other steps...
        default:
          return null;
      }
    } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
      switch (step) {
        case 1:
          return (
            <OrderInfo
              formData={formData}
              setFormData={setFormData}
              selectedCategoryId={selectedCategoryId}
              setSelectedCategoryId={setSelectedCategoryId}
              selectedType={selectedType}
              setSelectedType={setSelectedType}
            />
          );
        case 2:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDetails
              formData={formData}
              setFormData={setFormData}
              inputErrors={inputErrors}
              setInputErrors={setInputErrors}
              setError={setError}
              type_aqar={type_aqar}
              type_res={type_res}
            />
          );

        case 3:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderDescripton
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
            />
          );
        case 4:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderMap
              formData={formData}
              setFormData={setFormData}
              setError={setError}
              error={error}
              mapData={mapData}
              setMapData={setMapData}
            />
          );
        case 5:
          return isInfoLoading ? (
            "loading"
          ) : (
            <OrderLocation
              formData={formData}
              setFormData={setFormData}
              interfaces={interfaces}
              mapData={mapData}
              setError={setError}
              error={error}
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
            <OrderInfo
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

  return loadingSubmit ? (
    ""
  ) : (
    // <Loader />
    <>
      <Box
        sx={{
          display: { xs: "none", lg: "block" },
          backgroundColor: "var(--main-color)",
          height: { xs: "calc(100vh - 125px)", md: "100vh" },
          position: "fixed",
          right: "0",
          top: " 0",
          width: "33%",
        }}
      >
        <img
          src={LogoAds}
          alt="logo"
          style={{
            width: "250px",
            top: "50%",
            position: "absolute",
            left: "50%",
            transform: "translate(-50% , -50%)",
          }}
        />
      </Box>
      {/* {loadingSubmit && <Loader />} */}
      <Container
        sx={{
          padding: { xs: "0" },
          marginTop: { xs: "0rem", sm: "2rem" },
        }}
      >
        {/* {isLicenseModalOpen && (
            <LicenseModal
              isOpen={isLicenseModalOpen}
              onClose={handleCloseLicenseModal}
            />
          )} */}
        <Box
          sx={{
            position: "relative",
            marginInline: "auto",
            marginBlockStart: { xs: "0px", sm: "40px" },
            maxWidth: "550px",
            marginLeft: { lg: "1%" },
          }}
        >
          <Box sx={{ height: "100%" }}>
            <Box
              sx={{
                borderRadius: { xs: "0", sm: "12px 12px 0px 0px" },
                paddingInline: { xs: "15px", md: "3%" },
                paddingBlock: "16px 112px",
                border: "1px solid rgb(220, 220, 220)",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 0px 8px 0px",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden auto",
                height: { xs: "100vh", sm: "calc(-40px + 100vh)" },
              }}
            >
              {/* Render the current step */}
              {renderStep()}
            </Box>
            <Box
              sx={{
                position: "absolute !important",
                insetBlockEnd: "0px",
                background: "grey",
                marginBlockStart: "1rem",
                isolation: "isolate",
                boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 3px",
                outline: "none",
                border: "0px solid",
                width: "100%",
                borderRadius: "12px 12px 0px 0px",
                "&:before": {
                  content: "''",
                  position: "absolute",
                  insetBlockStart: "-4px",
                  insetInlineStart: "0px",
                  height: "100%",
                  borderStartStartRadius: "16px",
                  borderStartEndRadius: "16px",
                  border: "4px solid #b0ebda",
                  transition: "all 300ms ease-in-out 0s",
                  width: "100%",
                  borderInline: "0px none",
                  borderBlockEnd: "0px none",
                  zIndex: "-2",
                },
                "&:after": {
                  content: "''",
                  position: "absolute",
                  insetBlockStart: "-4px",
                  insetInlineStart: "0px",
                  height: "100%",
                  width: `${afterWidth}%`, // Use dynamic width
                  borderStartStartRadius: "16px",
                  transition: "all 400ms ease-in-out 0s",
                  zIndex: "-1",
                  border: "4px solid var(--main-color)",
                  borderEndEndRadius: "16px",
                  borderInline: "0px none",
                  borderBlockEnd: "0px none",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  padding: { xs: "17px 0px" },
                  background: "rgb(255, 255, 255)",
                  borderRadius: "12px 12px 0px 0px",
                  display: "grid",
                  placeContent: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap-reverse",
                    gap: { xs: "18px", md: "1rem 70px" },
                    justifyContent: "center",
                  }}
                >
                  {/* Prev and Next buttons */}
                  {step >= 1 && (
                    <Button
                      onClick={handlePrev}
                      disabled={loadingSubmit || !hasPrevStep}
                      sx={{
                        fontWeight: "600",
                        height: "48px",
                        width: "160px",
                        background: "rgb(255, 255, 255)",
                        color: hasPrevStep
                          ? "var(--main-color)"
                          : "rgba(0, 0, 0, 0.26))",
                        borderRadius: "12px",
                        border: `1px solid ${
                          hasPrevStep
                            ? "var(--main-color)"
                            : "rgba(0, 0, 0, 0.12)"
                        }`,
                        pointerEvents: hasPrevStep ? "auto" : "none",
                        "&:hover": {
                          background: "rgb(255, 255, 255)",
                          color: hasPrevStep
                            ? "var(--main-color)"
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
                      onClick={handleNext}
                      disabled={loadingSubmit || hasNextStep || error}
                      sx={{
                        fontWeight: "600",
                        height: "48px",
                        width: "160px",
                        background: "var(--main-color)",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        "&:hover": {
                          background: "var(--main-color)",
                          color: "white",
                          transition: "transform 0.2s ease-in-out",
                        },
                      }}
                    >
                      {t("dashboard.new_order.main_btn1")}
                    </Button>
                  )}
                  {isLastStep && (
                    <Button
                      onClick={handleSubmit}
                      disabled={loadingSubmit}
                      sx={{
                        fontWeight: "600",
                        height: "48px",
                        width: "160px",
                        backgroundColor: "var(--main-color)",
                        color: "white",
                        borderRadius: "12px",
                        border: "1px solid rgba(0, 0, 0, 0.12)",
                        "&:hover": {
                          backgroundColor: "var(--main-color)",
                          color: "white",
                        },
                      }}
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

export default EditOrder;
