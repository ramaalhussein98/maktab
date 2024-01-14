import React, { useEffect, useReducer, useState } from "react";
import { Button, Container, Box, CircularProgress } from "@mui/material";
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
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { WhiteLogo } from "../../../assets/logos";
import AddLicensedAdvertising from "./add_ads_components/AddLicensedAdvertising";
import "../../../assets/css/addAds.css";
import UnitPrice from "../add_unit/components/UnitPrice";
import myAxios from "../../../api/myAxios";
import { toast } from "react-toastify";

const reducerFunc = (state, action) => {
  switch (action.type) {
    case "license_number":
      return {
        ...state,
        license_number: action.value,
      };
    case "title":
      return {
        ...state,
        title: action?.title,
      };
    case "categoryId":
      return {
        ...state,
        category_id: action.categoryId,
      };
    case "inspector_name":
      return {
        ...state,
        viewer_name: action.value,
      };
    case "number_phone":
      return {
        ...state,
        viewer_phone: action.value,
      };
    case "advertiserRelationship":
      if (action.value !== "option3") {
        return {
          ...state,
          advertiser_relationship: action.value,
          advertiser_relationship_type: "",
        };
      } else {
        return {
          ...state,
          advertiser_relationship: action.value,
        };
      }
    case "advertiser_relationship_type":
      return {
        ...state,
        advertiser_relationship_type: action.value,
      };
    case "aqarTypeId":
      return {
        ...state,
        type_aqar_id: action.value,
      };
    case "width":
      return {
        ...state,
        width: action.value,
      };
    case "height":
      return {
        ...state,
        height: action.value,
      };
    case "area":
      return {
        ...state,
        area: action.value,
      };
    case "furnished":
      return {
        ...state,
        furnished: action.value,
      };
    case "details":
      if (action.data.type === "remove") {
        // Remove the object with the same en_name
        const updatedDetails = state.details.filter(
          (obj) => obj.en_name !== action.data.object.en_name
        );

        return {
          ...state,
          details: updatedDetails,
        };
      } else if (action.data.type === "add") {
        // Check if the array already contains an object with the same en_name
        const existingObjectIndex = state.details.findIndex(
          (obj) => obj.en_name === action.data.object.en_name
        );

        if (existingObjectIndex !== -1) {
          // If the object with the same en_name exists, update its values
          const updatedDetails = state.details.map((obj, index) => {
            if (index === existingObjectIndex) {
              return {
                ...obj,
                // Update the properties you want to change here
                status: action.data.object.status,
                number_details: action.data.object.number_details,
              };
            }
            return obj;
          });

          return {
            ...state,
            details: updatedDetails,
          };
        } else {
          // If the object with the same en_name doesn't exist, add it
          return {
            ...state,
            details: [...state.details, action.data.object],
          };
        }
      }
      break;
    case "description":
      return {
        ...state,
        description: action.value,
      };
    case "features": {
      const filteredArr = state.features.filter((e) => e !== action.value);

      const valueIsInArr = state.features.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...state,
          features: filteredArr,
        };
      } else {
        return {
          ...state,
          features: [...state.features, action.value],
        };
      }
    }
    case "comfort": {
      const filteredArr = state.comfort.filter((e) => e !== action.value);

      const valueIsInArr = state.comfort.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...state,
          comfort: filteredArr,
        };
      } else {
        return {
          ...state,
          comfort: [...state.comfort, action.value],
        };
      }
    }
    case "services":
      if (action.sub_type === "add") {
        return {
          ...state,
          services: [
            ...state.services,
            {
              id: Math.floor(Math.random() * 100) + 1,
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
      }
      break;
    case "mapClick":
      return {
        ...state,
        lat: action.clickedPosition.lat,
        lng: action.clickedPosition.lng,
        zoom: action.clickedPosition.zoom,
      };
    case "city":
      return {
        ...state,
        city: action.value,
      };
    case "neighborhood":
      return {
        ...state,
        neighborhood: action.value,
      };
    case "street":
      return {
        ...state,
        street: action.value,
      };
    case "interfaceId":
      return {
        ...state,
        interface_id: action.value,
      };
    case "prices":
      if (action.sub_type === "add") {
        const newPrices = action.array.map((ele) => {
          return {
            type_res_id: ele.id,
            status: false,
            price: "",
          };
        });
        return {
          ...state,
          prices: newPrices,
        };
      } else if (action.sub_type === "toggleStatus") {
        const updatedPrices = state.prices.map((price) => {
          if (price.type_res_id === action.id) {
            // Toggle the status for the matching id
            return {
              ...price,
              status: !price.status,
            };
          }
          return price;
        });

        return {
          ...state,
          prices: updatedPrices,
        };
      } else if (action.sub_type === "priceChange") {
        const updatedPrices = state.prices.map((price) => {
          if (price.type_res_id === action.id) {
            // Toggle the status for the matching id
            return {
              ...price,
              price: action.value,
            };
          }
          return price;
        });

        return {
          ...state,
          prices: updatedPrices,
        };
      }
      break;
    case "downPayment":
      return {
        ...state,
        down_payment: action.value,
      };
    case "thumbnail":
      return {
        ...state,
        thumbnail: action.value,
      };
    case "video":
      return {
        ...state,
        video: action.value,
      };
    case "images":
      return {
        ...state,
        images: [...state.images, action.value],
      };
    case "unit":
      return {
        ...state,
        type_down_payment: action.value,
      };
    case "facilities": {
      const filteredArr = state.facilities.filter((e) => e !== action.value);

      const valueIsInArr = state.facilities.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...state,
          facilities: filteredArr,
        };
      } else {
        return {
          ...state,
          facilities: [...state.facilities, action.value],
        };
      }
    }
  }

  throw Error("Unknown action: " + action.type);
};

const Addads = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const nav = useNavigate();
  const searchData = JSON.parse(localStorage.getItem("searchData"));
  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState();
  const [afterWidth, setAfterWidth] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [officeOptions, setOfficeOptions] = useState({
    categories: searchData?.category_aqar,
    type_res: searchData?.type_res,
    typeAqars: searchData?.type_aqars,
    officeFeatures: searchData?.featurea_ads,
    interfaces: searchData?.interface_aqars,
    comfort: searchData?.comfort,
  });
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [selectedCheckLicense, setSelectedCheckLicense] = useState("");
  const [deletedImages, setDeletedImages] = useState([]);
  const [readyImages, setReadyImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();

  const [stepsErrors, setStepErrors] = useState({});

  const [state, dispatch] = useReducer(reducerFunc, {
    license_number: "",
    title: "",
    category_id: "",
    viewer_name: "",
    viewer_phone: "",
    advertiser_relationship: "",
    advertiser_relationship_type: "",
    area: "",
    width: "",
    height: "",
    furnished: "",
    type_aqar_id: "",
    details: [],
    description: "",
    features: [],
    facilities: [],
    services: [],
    comfort: [],
    lat: "",
    lng: "",
    zoom: "",
    prices: [],
    down_payment: "",
    type_down_payment: "",
    city: "",
    neighborhood: "",
    street: "",
    interface_id: "",
    video: "",
    thumbnail: "",
    images: [],
  });

  //handling steps errors
  useEffect(() => {
    switch (step) {
      case 1:
        if (state.license_number.length === 7) {
          setError(false);

          setStepErrors((prev) => ({
            ...prev,
            license_number: "",
          }));
        } else {
          setError(true);
          setStepErrors((prev) => ({
            ...prev,
            license_number:
              lang === "ar"
                ? "رقم الرخصة يجب ان يتألف من 7 ارقام"
                : " license number should be equals to 7",
          }));
        }
        break;
      case 2:
        if (state.category_id.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        if (state.title.length <= 3) {
          setError(true);
          setStepErrors((prev) => ({
            ...prev,
            titleError:
              lang === "ar"
                ? "الاسم يجب على الاقل ان يكون مؤلف من 4 محارف"
                : "title should be at least 4 chars",
          }));
        } else {
          setError(false);
          setStepErrors((prev) => ({
            ...prev,
            titleError: "",
          }));
        }
        break;
      case 3:
        if (
          state.area.length === 0 ||
          state.width.length === 0 ||
          state.height.length === 0 ||
          state.advertiser_relationship.length === 0 ||
          state.advertiser_relationship.length === 0 ||
          state.furnished.length === 0 ||
          state.type_aqar_id.length === 0
        ) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 4:
        if (
          state.details &&
          Array.isArray(state.details) &&
          state.details.length >= 2
        ) {
          const targetId1 = "floors";
          const targetId2 = "office Age";
          const countMatchingIds = state.details.filter(
            (obj) => obj?.en_name === targetId1 || obj?.en_name === targetId2
          ).length;

          if (countMatchingIds >= 2) {
            setError(false);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
        break;
      case 5:
        if (state.description.length <= 7) {
          setError(true);
          setStepErrors((prev) => ({
            ...prev,
            descriptionError:
              lang === "ar"
                ? "الوصف يجب على الاقل ان يكون 8 محارف"
                : "description should be at least 8 chars",
          }));
        } else {
          setError(false);
          setStepErrors((prev) => ({
            ...prev,
            descriptionError: null,
          }));
        }
        break;
      case 7:
        if (state.lat.length === 0 || state.lng.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 8:
        if (Array.isArray(state.prices)) {
          const log = state.prices.filter((e) => e.status === true);
          if (log.length > 0) {
            const log2 = log.find((e) => e.price.length === 0);
            if (
              log2 ||
              state.viewer_phone.length === 0 ||
              state.viewer_name.length === 0
            ) {
              setError(true);
            } else {
              setError(false);
            }
          } else {
            setError(true);
          }
        } else {
          setError(false);
        }
        if (state.viewer_name.length <= 3) {
          setError(true);
          setStepErrors((prev) => ({
            ...prev,
            veiwerNameError:
              lang === "ar"
                ? "اسم المعاين على الاقل 4 محارف"
                : "veiwer name should be at least 4 chars",
          }));
        } else {
          setError(false);
          setStepErrors((prev) => ({
            ...prev,
            veiwerNameError: null,
          }));
        }
        if (state.viewer_phone.length < 10 || state.viewer_phone.length > 11) {
          setError(true);
          setStepErrors((prev) => ({
            ...prev,
            veiwerNumberError:
              lang === "ar"
                ? "رقم المعاين يجب ان يكون بين 10 الى 11 رقم"
                : "veiwer number should be at least 10 to 11 chars",
          }));
        } else {
          setError(false);
          setStepErrors((prev) => ({
            ...prev,
            veiwerNumberError: null,
          }));
        }
        break;
      case 9:
        if (
          state.city.length === 0 ||
          state.neighborhood.length === 0 ||
          state.street.length === 0 ||
          state.interface_id.length === 0
        ) {
          setError(true);
        } else {
          setError(false);
        }
        break;
      case 10:
        if (state.thumbnail.length === 0) {
          setError(true);
        } else {
          setError(false);
        }
        break;
    }
  }, [step, state]);

  useEffect(() => {
    step === 10 ? setIsLastStep(10) : setIsLastStep(null);
  }, [step]);

  const hasPrevStep = step > 1;

  const handleNext = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsSubmitting(false);
      setAfterWidth(afterWidth + 10);
    }, 800);
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setAfterWidth(afterWidth - 10);
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
    const createData = new FormData();
    createData.append("title", state.title);
    createData.append("license_number", state.license_number);
    createData.append("category_aqar_id", state.category_id);

    const updateInfo = new FormData();
    updateInfo.append("furnisher", state.furnished);
    updateInfo.append("space", parseFormattedNumber(state.area));
    updateInfo.append("height", parseFormattedNumber(state.height));
    updateInfo.append("width", parseFormattedNumber(state.width));
    updateInfo.append("type_aqar_id", state.type_aqar_id);
    updateInfo.append("advertiser_relationship", state.advertiser_relationship);
    if (state.advertiser_relationship_type) {
      updateInfo.append(
        "advertiser_relationship_type",
        state.advertiser_relationship_type
      );
    }

    const updateViewer = new FormData();
    updateViewer.append("viewer_name", state.viewer_name);
    updateViewer.append("viewer_phone", state.viewer_phone);

    const updateDownPayment = new FormData();
    updateDownPayment.append("down_payment", state.down_payment);
    updateDownPayment.append("type_down_payment", state.type_down_payment);

    const update_description = {
      description: state.description,
    };

    const updateLocation = {
      lat: state.lat,
      lng: state.lng,
      zoom: state.zoom,
      address: state.city + ", " + state.neighborhood + ", " + state.street,
      city: state.city,
      neighborhood: state.neighborhood,
      street: state.street,
    };

    const updateInterface = {
      interface_id: state.interface_id,
    };

    const pricesData = new FormData();
    state.prices?.map((e, i) => {
      pricesData.append(`prices[${i}][type_res_id]`, e.type_res_id);
      pricesData.append(`prices[${i}][price]`, Number(e.price));
      pricesData.append(`prices[${i}][status]`, e.status);
    });

    const detailsData = new FormData();
    state.details?.map((e, i) => {
      detailsData.append(`details[${i}][ar_name]`, e.ar_name);
      detailsData.append(`details[${i}][en_name]`, e.en_name);
      detailsData.append(
        `details[${i}][number_details]`,
        e.number_details === "أرضي" ? 0 : Number(e.number_details)
      );
      detailsData.append(`details[${i}][status]`, e.status);
    });

    const servicesData = new FormData();
    state.services?.map((e, i) => {
      servicesData.append(`services[${i}][ar_name]`, e.ar_name);
      servicesData.append(`services[${i}][en_name]`, e.en_name);
      servicesData.append(`services[${i}][status]`, e.service_toggle);
      servicesData.append(`services[${i}][price]`, e.price);
    });

    const featuresData = new FormData();
    state.features?.map((e, i) => {
      featuresData.append(`features[${i}][boolfeaturea_id]`, e);
    });

    const comfortData = new FormData();
    state.comfort?.map((e, i) => {
      comfortData.append(`comforts[${i}][comfort_id]`, e);
    });
    const facilitiesData = new FormData();
    state.facilities?.map((e, i) => {
      facilitiesData.append(`facilities[${i}][facility_id]`, e);
    });

    const filesData = new FormData();
    state.images.forEach((file) => {
      filesData.append("images[]", file);
    });
    filesData.append("main_image", state.thumbnail.file);
    if (state.video) {
      filesData.append("video", state.video);
    }
    await myAxios.post("api/v1/user/offices/create", createData).then((res) => {
      const id = res.data?.data?.id;
      myAxios.post(
        `/api/v1/user/offices/update_location/${id}`,
        updateLocation
      );
      myAxios.post(`/api/v1/user/offices/updateInfo/${id}`, updateInfo);
      myAxios.post(
        `/api/v1/user/offices/update_interface/${id}`,
        updateInterface
      );
      myAxios
        .post(`/api/v1/user/offices/add_unit/${id}`, createData)
        .then((res) => {
          const unitId = res.data?.data?.id;
          myAxios.post(`/api/v1/user/offices/updateInfo/${unitId}`, updateInfo);

          myAxios.post(
            `/api/v1/user/offices/prices/addToAds/${unitId}`,
            pricesData
          );
          myAxios.post(
            `/api/v1/user/offices/details/addToAds/${unitId}`,
            detailsData
          );
          if (servicesData) {
            myAxios.post(
              `/api/v1/user/offices/services/addToAds/${unitId}`,
              servicesData
            );
          }
          myAxios.post(
            `/api/v1/user/offices/features/addToAds/${unitId}`,
            featuresData
          );
          myAxios.post(
            `/api/v1/user/offices/comforts/addToAds/${unitId}`,
            comfortData
          );
          myAxios.post(
            `/api/v1/user/offices/facilities/addToAds/${unitId}`,
            facilitiesData
          );
          myAxios.post(
            `/api/v1/user/offices/updateViewer/${unitId}`,
            updateViewer
          );
          updateDownPayment.append("id", unitId);
          myAxios.post(`/api/v1/user/offices/down_payment`, updateDownPayment);
          myAxios.post(
            `/api/v1/user/offices/update_description/${unitId}`,
            update_description
          );
          myAxios.post(`/api/v1/user/offices/addFiles/${unitId}`, filesData);
        });
    });
    toast.success(
      lang === "ar" ? "تمت العملية بنجاح" : "operation completed successfully"
    );

    nav("/dashboard/properties");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddLicensedAdvertising
            selectedCheckLicense={selectedCheckLicense}
            setSelectedCheckLicense={setSelectedCheckLicense}
            state={state}
            dispatch={dispatch}
            stepsErrors={stepsErrors}
          />
        );
      case 2:
        return (
          <CatgouryAds
            categories={officeOptions.categories}
            dispatch={dispatch}
            state={state}
            stepsErrors={stepsErrors}
          />
        );
      case 3:
        return (
          <HomeInformation
            typeAqars={officeOptions.typeAqars}
            type_res={officeOptions.type_res}
            state={state}
            dispatch={dispatch}
          />
        );
      case 4:
        return <OfficeDetailsNumbers dispatch={dispatch} state={state} />;
      case 5:
        return (
          <HomeDescription
            state={state}
            dispatch={dispatch}
            stepsErrors={stepsErrors}
          />
        );
      case 6:
        return (
          <Services
            features={officeOptions.officeFeatures}
            state={state}
            comfort={officeOptions.comfort}
            dispatch={dispatch}
          />
        );
      case 7:
        return <MapAds state={state} dispatch={dispatch} />;
      case 8:
        return (
          <UnitPrice
            state={state}
            dispatch={dispatch}
            type={0}
            pricesTypes={officeOptions.type_res}
            stepsErrors={stepsErrors}
          />
        );
      case 9:
        return (
          <ConfimLocation
            state={state}
            dispatch={dispatch}
            interfaces={officeOptions.interfaces}
          />
        );
      case 10:
        return (
          <HomeImagesAdd
            step={step}
            images={images}
            setImages={setImages}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            deletedImages={deletedImages}
            setDeletedImages={setDeletedImages}
            readyImages={readyImages}
            setReadyImages={setReadyImages}
            state={state}
            dispatch={dispatch}
          />
        );
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
                      disabled={!hasPrevStep}
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
                      onClick={() => handleNext()}
                      disabled={error}
                    >
                      {isSubmitting ? (
                        <CircularProgress color="inherit" size={"30px"} />
                      ) : (
                        t("dashboard.new_order.main_btn1")
                      )}
                    </Button>
                  )}
                  {isLastStep && (
                    <Button
                      className="button-last"
                      onClick={() => handleSubmit()}
                      disabled={error}
                    >
                      {isSubmitting ? (
                        <CircularProgress color="inherit" size={"30px"} />
                      ) : (
                        t("dashboard.new_order.main_btn3")
                      )}
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
