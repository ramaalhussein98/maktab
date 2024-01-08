import { useEffect, useReducer, useState } from "react";
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
import { HomeImagesAdd } from "../add_ads_folder/add_ads_components";
import { toast } from "react-toastify";
import myAxios from "../../../api/myAxios";
import UnitDetailsNumber from "./components/UnitDetailsNumber";

const reducerFunc = (unit, action) => {
  switch (action.type) {
    case "categoryId":
      return {
        ...unit,
        category_id: action.categoryId,
      };
    case "unit_rooms":
      if (action.sub_type === "increase") {
        console.log(action);
        const newArr = unit.unit_rooms.map((ele) => {
          if (ele.id === action.id) {
            return {
              ...ele,
              number: action.number + 1,
            };
          }
          return ele;
        });
        return {
          ...unit,
          unit_rooms: newArr,
        };
      } else if (action.sub_type === "decrease") {
        const newArr = unit.unit_rooms.map((ele) => {
          if (ele.id === action.id) {
            return {
              ...ele,
              number: action.number - 1,
            };
          }
          return ele;
        });
        return {
          ...unit,
          unit_rooms: newArr,
        };
      } else if (action.sub_type === "add") {
        const newArr = action.arr.map((ele) => {
          return {
            id: ele.id,
            number: 0,
            ar_name: ele.ar_name,
            en_name: ele.en_name,
          };
        });
        return {
          ...unit,
          unit_rooms: newArr,
        };
      }
      break;
    case "title":
      return {
        ...unit,
        title: action?.title,
      };
    case "inspector_name":
      return {
        ...unit,
        viewer_name: action.value,
      };
    case "number_phone":
      return {
        ...unit,
        viewer_phone: action.value,
      };
    case "area":
      return {
        ...unit,
        space: action.value,
      };
    case "description":
      return {
        ...unit,
        description: action.value,
      };
    case "features": {
      const filteredArr = unit.features.filter((e) => e !== action.value);

      const valueIsInArr = unit.features.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...unit,
          features: filteredArr,
        };
      } else {
        return {
          ...unit,
          features: [...unit.features, action.value],
        };
      }
    }
    case "comfort": {
      const filteredArr = unit.comfort.filter((e) => e !== action.value);

      const valueIsInArr = unit.comfort.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...unit,
          comfort: filteredArr,
        };
      } else {
        return {
          ...unit,
          comfort: [...unit.comfort, action.value],
        };
      }
    }
    case "facilities": {
      const filteredArr = unit.facilities.filter((e) => e !== action.value);

      const valueIsInArr = unit.facilities.indexOf(action.value);

      if (valueIsInArr > -1) {
        return {
          ...unit,
          facilities: filteredArr,
        };
      } else {
        return {
          ...unit,
          facilities: [...unit.facilities, action.value],
        };
      }
    }
    case "details":
      if (action.data.type === "remove") {
        // Remove the object with the same en_name
        const updatedDetails = unit.details.filter(
          (obj) => obj.en_name !== action.data.object.en_name
        );

        return {
          ...unit,
          details: updatedDetails,
        };
      } else if (action.data.type === "add") {
        // Check if the array already contains an object with the same en_name
        const existingObjectIndex = unit.details.findIndex(
          (obj) => obj.en_name === action.data.object.en_name
        );

        if (existingObjectIndex !== -1) {
          // If the object with the same en_name exists, update its values
          const updatedDetails = unit.details.map((obj, index) => {
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
            ...unit,
            details: updatedDetails,
          };
        } else {
          // If the object with the same en_name doesn't exist, add it
          return {
            ...unit,
            details: [...unit.details, action.data.object],
          };
        }
      }
      break;
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
          ...unit,
          prices: newPrices,
        };
      } else if (action.sub_type === "toggleStatus") {
        const updatedPrices = unit.prices.map((price) => {
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
          ...unit,
          prices: updatedPrices,
        };
      } else if (action.sub_type === "priceChange") {
        const updatedPrices = unit.prices.map((price) => {
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
          ...unit,
          prices: updatedPrices,
        };
      }
      break;
    case "downPayment":
      return {
        ...unit,
        down_payment: action.value,
      };
    case "thumbnail":
      return {
        ...unit,
        thumbnail: action.value,
      };
    case "video":
      return {
        ...unit,
        video: action.value,
      };
    case "images":
      return {
        ...unit,
        images: [...unit.images, action.value],
      };
    case "unit":
      return {
        ...unit,
        type_down_payment: action.value,
      };
  }

  throw Error("Unknown action: " + action.type);
};

const AddUnit = () => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const searchData = JSON.parse(localStorage.getItem("searchData"));
  const unitsFacilities = JSON.parse(
    localStorage.getItem("searchData")
  ).facilities;
  const unitsFeatures = JSON.parse(
    localStorage.getItem("searchData")
  ).featurea_ads;
  const comfort = JSON.parse(localStorage.getItem("searchData")).comfort;
  const { state } = location;
  const officeId = state && state.id;
  const unitTitle = state && state.title;
  const category_id = state && state.category_id;

  const [unitsOptions, setUnitsOptions] = useState({
    categories: searchData?.category_aqar,
    type_res: searchData?.type_res,
    typeAqars: searchData?.type_aqars,
    officeFeatures: searchData?.features,
    interfaces: searchData?.interface_aqars,
    facilities: unitsFacilities,
    comfort,
    unitsFeatures,
  });

  const [unit, dispatch] = useReducer(reducerFunc, {
    category_id: "",
    title: "",
    ads_id: officeId,
    viewer_name: "",
    viewer_phone: "",
    description: "",
    space: "",
    features: [],
    facilities: [],
    prices: [],
    unit_rooms: [],
    down_payment: "",
    type_down_payment: "",
    video: "",
    thumbnail: "",
    comfort: [],
    images: [],
    details: [],
  });
  console.log(unit);
  const [step, setStep] = useState(1);
  const [isLastStep, setIsLastStep] = useState();
  const [afterWidth, setAfterWidth] = useState(16.7);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [readyImages, setReadyImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const hasPrevStep = step > 1;

  const handleNext = () => {
    setStep(step + 1);
    setAfterWidth(afterWidth + 16.7);
  };
  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
      setAfterWidth(afterWidth - 16.7);
    }
  };

  useEffect(() => {
    step === 6 ? setIsLastStep(6) : setIsLastStep(null);
  }, [step]);

  const handleSubmit = async () => {
    const createData = new FormData();
    createData.append("title", unit.title);
    createData.append("category_aqar_id", category_id);

    const updateInfo = new FormData();
    updateInfo.append("space", unit.space);

    const update_description = {
      description: unit.description,
    };

    const pricesData = new FormData();
    unit.prices?.map((e, i) => {
      pricesData.append(`prices[${i}][type_res_id]`, e.type_res_id);
      pricesData.append(`prices[${i}][price]`, Number(e.price));
      pricesData.append(`prices[${i}][status]`, e.status);
    });

    const detailsData = new FormData();
    unit.details?.map((e, i) => {
      detailsData.append(`details[${i}][ar_name]`, e.ar_name);
      detailsData.append(`details[${i}][en_name]`, e.en_name);
      detailsData.append(
        `details[${i}][number_details]`,
        e.number_details === "أرضي" ? 0 : Number(e.number_details)
      );
      detailsData.append(`details[${i}][status]`, e.status);
    });

    const servicesData = new FormData();
    unit.services?.map((e, i) => {
      servicesData.append(`services[${i}][ar_name]`, e.ar_name);
      servicesData.append(`services[${i}][en_name]`, e.en_name);
      servicesData.append(`services[${i}][status]`, e.service_toggle);
      servicesData.append(`services[${i}][price]`, e.price);
    });

    const featuresData = new FormData();
    unit.features?.map((e, i) => {
      featuresData.append(`features[${i}][boolfeaturea_id]`, e);
    });

    const comfortData = new FormData();
    unit.comfort?.map((e, i) => {
      comfortData.append(`comforts[${i}][comfort_id]`, e);
    });
    const facilitiesData = new FormData();
    unit.facilities?.map((e, i) => {
      facilitiesData.append(`facilities[${i}][facility_id]`, e);
    });

    const filesData = new FormData();
    unit.images.forEach((file) => {
      filesData.append("images[]", file);
    });
    filesData.append("main_image", unit.thumbnail.file);
    if (unit.video) {
      filesData.append("video", unit.video);
    }
    const updateViewer = new FormData();
    updateViewer.append("viewer_name", unit.viewer_name);
    updateViewer.append("viewer_phone", unit.viewer_phone);
    await myAxios
      .post(`/api/v1/user/offices/add_unit/${officeId}`, createData)
      .then((res) => {
        const unitId = res.data?.data?.id;
        myAxios.post(`/api/v1/user/offices/updateInfo/${unitId}`, updateInfo);

        myAxios.post(
          `/api/v1/user/offices/prices/addToAds/${unitId}`,
          pricesData
        );
        myAxios.post(
          `/api/v1/user/offices/updateViewer/${unitId}`,
          updateViewer
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
          `/api/v1/user/offices/facilities/addToAds/${unitId}`,
          facilitiesData
        );
        myAxios.post(
          `/api/v1/user/offices/comforts/addToAds/${unitId}`,
          comfortData
        );
        myAxios.post(
          `/api/v1/user/offices/update_description/${unitId}`,
          update_description
        );
        myAxios.post(`/api/v1/user/offices/addFiles/${unitId}`, filesData);
      });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <UnitDetails
            unit={unit}
            dispatch={dispatch}
            facilities={unitsOptions.facilities}
          />
        );
      case 2:
        return (
          <UnitDetailsNumber
            unit={unit}
            dispatch={dispatch}
            roomDetails={unitsOptions.roomDetails}
          />
        );
      case 3:
        return (
          <UnitFeatures
            unit={unit}
            dispatch={dispatch}
            comfort={comfort}
            features={unitsFeatures}
          />
        );
      case 4:
        return <HomeDescription state={unit} dispatch={dispatch} />;
      case 5:
        return (
          <UnitPrice
            state={unit}
            dispatch={dispatch}
            type={0}
            pricesTypes={unitsOptions.type_res}
          />
        );
      case 6:
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
            state={unit}
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
                      disabled={error}
                    >
                      {t("dashboard.new_order.main_btn3")}
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
