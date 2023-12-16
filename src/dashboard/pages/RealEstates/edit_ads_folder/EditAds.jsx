import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import useDataFetcher from "../../../api/useDataFetcher ";
// import Loader from "../../../common/Loading/Loader";
import {
  EditHomeInformation,
  EditHomeDetails,
  EditConfimLocation,
  EditFeatureComponent,
  EditHomeDescription,
  EditHomeImagesAdd,
  EditMapAds,
  EditCatgouryAds,
} from "./edit_components";
import { WhiteLogo } from "../../../../assets/logos";
import AddLicensedAdvertising from "../../add_ads_folder/add_ads_components/AddLicensedAdvertising";
import {
  CatgouryAds,
  OfficeDetailsNumbers,
} from "../../add_ads_folder/add_ads_components";
import Services from "../../add_ads_folder/add_ads_components/services/Services";

const type = 1;

const EditAds = () => {
  // const ad = useLocation().state.ad;
  const ad = "";
  // this i will remove it and use above

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
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
  const isInfoLoading = false;
  // also i will remoove it
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
  const [selectedCheckLicense, setSelectedCheckLicense] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [images, setImages] = useState([]);
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
      step === 8 ? setIsLastStep(8) : setIsLastStep(null);
    } else {
      step === 9 ? setIsLastStep(9) : setIsLastStep(null);
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

  // useEffect(() => {
  //   if (category_bool?.length > 0 && category_quantity?.length > 0) {
  //     if (step === 1) {
  //       if (
  //         formData.hasOwnProperty("category_aqar") &&
  //         formData.hasOwnProperty("title") &&
  //         formData?.title !== ""
  //       ) {
  //         setError(false);
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 2) {
  //       if (
  //         formData.hasOwnProperty("price") &&
  //         formData.hasOwnProperty("space") &&
  //         formData.hasOwnProperty("width") &&
  //         formData.hasOwnProperty("height") &&
  //         formData.hasOwnProperty("advertiser_relationship") &&
  //         formData.hasOwnProperty("type_aqar")
  //       ) {
  //         if (
  //           formData.price === "" ||
  //           formData.space === "" ||
  //           formData.width === "" ||
  //           formData.height === "" ||
  //           formData?.type_aqar.id === "" ||
  //           formData?.advertiser_relationship === ""
  //         ) {
  //           setError(true);
  //         } else {
  //           setError(false);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 3) {
  //     } else if (step === 4) {
  //     } else if (step === 5) {
  //       if (formData.hasOwnProperty("description")) {
  //         if (formData.description !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 7) {
  //       if (
  //         formData.hasOwnProperty("interface_aqar") &&
  //         formData.hasOwnProperty("neighborhood") &&
  //         formData.hasOwnProperty("city") &&
  //         formData.hasOwnProperty("road")
  //       ) {
  //         if (
  //           formData.interface_aqar.id !== "" &&
  //           formData.neighborhood !== "" &&
  //           formData.city !== "" &&
  //           formData.road !== ""
  //         ) {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 8) {
  //       if (formData.hasOwnProperty("thumbnail")) {
  //         if (formData.thumbnail !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     }
  //   } else if (category_bool?.length > 0 && category_quantity?.length === 0) {
  //     if (step === 1) {
  //       if (
  //         formData.hasOwnProperty("category_aqar") &&
  //         formData.hasOwnProperty("title") &&
  //         formData?.title !== ""
  //       ) {
  //         setError(false);
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 2) {
  //       if (
  //         formData.hasOwnProperty("price") &&
  //         formData.hasOwnProperty("space") &&
  //         formData.hasOwnProperty("width") &&
  //         formData.hasOwnProperty("height") &&
  //         formData.hasOwnProperty("advertiser_relationship") &&
  //         formData.hasOwnProperty("type_aqar")
  //       ) {
  //         if (
  //           formData.price === "" ||
  //           formData.space === "" ||
  //           formData.width === "" ||
  //           formData.height === "" ||
  //           formData?.type_aqar.id === "" ||
  //           formData?.advertiser_relationship === ""
  //         ) {
  //           setError(true);
  //         } else {
  //           setError(false);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 4) {
  //       if (formData.hasOwnProperty("description")) {
  //         if (formData.description !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 6) {
  //       if (
  //         formData.hasOwnProperty("interface_aqar") &&
  //         formData.hasOwnProperty("neighborhood") &&
  //         formData.hasOwnProperty("city") &&
  //         formData.hasOwnProperty("road")
  //       ) {
  //         if (
  //           formData.interface_aqar.id !== "" &&
  //           formData.neighborhood !== "" &&
  //           formData.city !== "" &&
  //           formData.road !== ""
  //         ) {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 7) {
  //       if (formData.hasOwnProperty("thumbnail")) {
  //         if (formData.thumbnail !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     }
  //   } else if (category_bool?.length === 0 && category_quantity?.length > 0) {
  //     if (step === 1) {
  //       if (
  //         formData.hasOwnProperty("category_aqar") &&
  //         formData.hasOwnProperty("title") &&
  //         formData?.title !== ""
  //       ) {
  //         setError(false);
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 2) {
  //       if (
  //         formData.hasOwnProperty("price") &&
  //         formData.hasOwnProperty("space") &&
  //         formData.hasOwnProperty("width") &&
  //         formData.hasOwnProperty("height") &&
  //         formData.hasOwnProperty("advertiser_relationship") &&
  //         formData.hasOwnProperty("type_aqar")
  //       ) {
  //         if (
  //           formData.price === "" ||
  //           formData.space === "" ||
  //           formData.width === "" ||
  //           formData.height === "" ||
  //           formData?.type_aqar.id === "" ||
  //           formData?.advertiser_relationship === ""
  //         ) {
  //           setError(true);
  //         } else {
  //           setError(false);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 3) {
  //     } else if (step === 4) {
  //       if (formData.hasOwnProperty("description")) {
  //         if (formData.description !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 6) {
  //       if (
  //         formData.hasOwnProperty("interface_aqar") &&
  //         formData.hasOwnProperty("neighborhood") &&
  //         formData.hasOwnProperty("city") &&
  //         formData.hasOwnProperty("road")
  //       ) {
  //         if (
  //           formData.interface_aqar.id !== "" &&
  //           formData.neighborhood !== "" &&
  //           formData.city !== "" &&
  //           formData.road !== ""
  //         ) {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 7) {
  //       if (formData.hasOwnProperty("thumbnail")) {
  //         if (formData.thumbnail !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     }
  //   } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
  //     if (step === 1) {
  //       if (
  //         formData.hasOwnProperty("category_aqar") &&
  //         formData.hasOwnProperty("title") &&
  //         formData?.title !== ""
  //       ) {
  //         setError(false);
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 2) {
  //       if (
  //         formData.hasOwnProperty("price") &&
  //         formData.hasOwnProperty("space") &&
  //         formData.hasOwnProperty("width") &&
  //         formData.hasOwnProperty("height") &&
  //         formData.hasOwnProperty("advertiser_relationship") &&
  //         formData.hasOwnProperty("type_aqar")
  //       ) {
  //         if (
  //           formData.price === "" ||
  //           formData.space === "" ||
  //           formData.width === "" ||
  //           formData.height === "" ||
  //           formData?.type_aqar.id === "" ||
  //           formData?.advertiser_relationship === ""
  //         ) {
  //           setError(true);
  //         } else {
  //           setError(false);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 3) {
  //       if (formData.hasOwnProperty("description")) {
  //         if (formData.description !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 5) {
  //       if (
  //         formData.hasOwnProperty("interface_aqar") &&
  //         formData.hasOwnProperty("neighborhood") &&
  //         formData.hasOwnProperty("city") &&
  //         formData.hasOwnProperty("road")
  //       ) {
  //         if (
  //           formData.interface_aqar.id !== "" &&
  //           formData.neighborhood !== "" &&
  //           formData.city !== "" &&
  //           formData.road !== ""
  //         ) {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     } else if (step === 6) {
  //       if (formData.hasOwnProperty("thumbnail")) {
  //         if (formData.thumbnail !== "") {
  //           setError(false);
  //         } else {
  //           setError(true);
  //         }
  //       } else {
  //         setError(true);
  //       }
  //     }
  //   } else {
  //     if (step === 1) {
  //       if (
  //         formData.hasOwnProperty("category_aqar") &&
  //         formData.hasOwnProperty("title") &&
  //         formData?.title !== ""
  //       ) {
  //         setError(false);
  //       } else {
  //         setError(true);
  //       }
  //     }
  //   }
  // }, [formData, step, category_quantity, category_bool]);

  const handleNext = () => {
    // Perform form validation
    // if (step === 1) {
    //   getInfo(`/api/deal/info/${formData?.category_aqar?.id}`);
    // }
    setStep(step + 1);
    setAfterWidth(afterWidth + 11.0);

    // if (category_bool?.length > 0 && category_quantity?.length > 0) {
    //   setAfterWidth(afterWidth + 12.32);
    // } else {
    //   setAfterWidth(afterWidth + 13.7);
    // }
  };

  const handlePrev = () => {
    // Perform form validation
    // if (step === 1) {
    //   getInfo(`/api/deal/info/${formData?.category_aqar?.id}`);
    // }
    setStep(step - 1);

    // if (category_bool?.length > 0 && category_quantity?.length > 0) {
    //   setAfterWidth(afterWidth - 12.2);
    // } else if (category_bool?.length === 0 && category_quantity?.length === 0) {
    //   setAfterWidth(afterWidth - 17.2);
    // } else {
    //   setAfterWidth(afterWidth - 13.7);
    // }
  };
  // console.log(formData);

  const parseFormattedNumber = (formattedValue) => {
    if (!formattedValue) return NaN;

    const cleanedValue = formattedValue.toString().replace(/[^0-9.-]/g, "");

    // Parse the cleaned value into a number
    const number = parseFloat(cleanedValue);

    return isNaN(number) ? NaN : number;
  };
  const handleSubmit = async () => {
    if (type === 1) {
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

      for (const [key, value] of sendForm.entries()) {
        if (key === "category_aqar") {
          requestBody["category_id"] = formData.category_aqar.id;
        } else if (key === "price") {
          const formattedValue = parseFormattedNumber(formData.price);
          requestBody["price"] = formattedValue;
        } else if (key === "area") {
          const formattedValue = parseFormattedNumber(formData.area);
          requestBody["space"] = formattedValue;
        } else if (key === "height") {
          const formattedValue = parseFormattedNumber(formData.height);
          requestBody["height"] = formattedValue;
        } else if (key === "width") {
          const formattedValue = parseFormattedNumber(formData.width);
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
          const newArrayOfObjects = formData.selectedBooleansProperties.map(
            (item) => {
              const id = item.bool_featurea.id;
              return { boolfeaturea_id: id };
            }
          );
          requestBody["BoolfeatureaAds"] = JSON.stringify(newArrayOfObjects);
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
        "video",
      ];
      if (deletedImages.length > 0) {
        formDataSend.append("removed_images", JSON.stringify(deletedImages));
      }
      // if (deletedImages.length > 0) {
      //   // Append the entire array of selected files to the formData
      //   deletedImages.forEach((id) => {
      //     formDataSend.append("removed_images[]", id);
      //   });
      // }
      // Handle the thumbnail property separately
      const thumbnailValue = requestBody.thumbnail;

      if (thumbnailValue instanceof File) {
        formDataSend.append("thumbnail", thumbnailValue);
      }
      if (formData.video instanceof File) {
        formDataSend.append("video", formData.video);
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
        if (data.status === 1) {
          setLoadingSubmit(false);
          toast.success("تمت تعديل الإعلان بنجاح");
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
        }
      } catch (error) {
        setLoadingSubmit(false);
        toast.success("فشل في تعديل الاعلان");
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
            // should add EditCatgouryAds
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
            <EditHomeInformation
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
            <EditHomeDescription
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
            <EditMapAds
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
            <EditConfimLocation
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
            <EditHomeImagesAdd
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
            <EditCatgouryAds
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
                  color: "var(--main-color)",
                  textAlign: lang === "ar" ? "left" : "right",
                }}
              >
                الرئيسية
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
              <Box className="custom-inner-element">
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
                          ? "var(--main-color)"
                          : "rgba(0, 0, 0, 0.26))",

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

export default EditAds;
