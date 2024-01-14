import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  IconButton,
  styled,
  Fade,
} from "@mui/material";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import {
  EditInformation,
  EditDescription,
  OrderCard,
  UnitImages,
} from "./components";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useState } from "react";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useMutationHook } from "../../../hooks/useMutationHook";
import myAxios from "../../../api/myAxios";
import UnitRoomDetails from "./components/UnitRoomDetails";
import EditFacilities from "./components/EditFacilities";
import EditFeatures from "./components/EditFeatures";
import EditComforts from "./components/EditComforts";
import Loader from "../../../ui/Loader";
import EditServices from "./components/EditServices";

const getData = async (paramId) => {
  const res = await myAxios.get(`api/v1/user/offices/${paramId}`);
  return res?.data?.data;
};
const editInfo = async ({ _title, id, space }) => {
  const res = await myAxios.post(`api/v1/user/offices/update_title/${id}`, {
    title: _title,
  });
  const res2 = await myAxios.post(`api/v1/user/offices/updateInfo/${id}`, {
    space,
  });
  return res;
};
const editDescription = async ({ description, id }) => {
  const res = await myAxios.post(
    `api/v1/user/offices/update_description/${id}`,
    {
      description,
    }
  );
  return res;
};

const changeSpecial = async ({ id }) => {
  const res = await myAxios.post(`api/v1/user/offices/make_special/${id}`);
  return res;
};

const deleteOffice = async ({ id }) => {
  const res = await myAxios.delete(`api/v1/user/offices/delete/${id}`);
  return res;
};

const Unit = () => {
  const paramsId = useParams().id;
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [isChangingData, setIsChangingData] = useState(false);
  const {
    data: unit,
    isLoading,
    refetch,
    isRefetching,
  } = useQueryHook(["unit", paramsId], () => getData(paramsId));

  const editInfoMutation = useMutationHook(editInfo, ["unit", paramsId]);

  const editDescriptionMutation = useMutationHook(editDescription, [
    "unit",
    paramsId,
  ]);

  const changeSpecialMutution = useMutationHook(changeSpecial, [
    "unit",
    paramsId,
  ]);
  const deleteMutation = useMutationHook(deleteOffice, ["unit", paramsId]);

  //start displaying edit components
  const [edditInfo, setEditInfo] = useState(false);
  const [descriptionEdit, setDescriptionEdit] = useState(false);
  const [filesEdit, setFilesEdit] = useState(false);
  const [editDetails, setEditDetails] = useState(false);
  const [editFacilities, setEditFacilities] = useState(false);
  const [editFeatures, setEditFeatures] = useState(false);
  const [editComforts, setEditComforts] = useState(false);
  const [editServices, setEditServices] = useState(false);
  const handleEditInformation = () => {
    setEditInfo(true);
  };
  const onCancel = () => {
    setEditInfo(!edditInfo);
  };
  const handleFilesEdit = () => {
    setFilesEdit(!edditInfo);
  };

  //end displaying edit components

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this box.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onRemove(id); // Call the onRemove function to delete the box
      }
    });
  };

  const onRemove = async (id) => {
    const toastId = toast.loading("processing...");
    try {
      const res = await deleteMutation.mutateAsync({
        id,
      });
      toast.update(toastId, {
        type: "success",
        render: res.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    } catch (error) {
      toast.update(toastId, {
        type: "error",
        // render: error.response.data.message,
        closeOnClick: true,
        isLoading: false,
        autoClose: true,
        closeButton: true,
        pauseOnHover: false,
      });
    }
  };

  const handleChangeStatus = async () => {
    Swal.fire({
      title: lang === "ar" ? "هل انت متأكد؟" : "Are you sure?",
      text:
        lang === "ar"
          ? "انت على وشك عرض / اخفاء وحدتك"
          : "You are about to show / hide your unit",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، متأكد" : "Yes, sure!",
      cancelButtonText: lang === "ar" ? "لا" : "No",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onChange(); // Call the onRemove function to delete the box
      }
    });
  };

  const onChange = async () => {
    setIsChangingData(true);
    const res = await myAxios.post(
      `api/v1/user/offices/update_status/${unit.id}`
    );
    setIsChangingData(false);
    refetch();
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {(isRefetching || isChangingData) && <Loader />}
      <Link
        to={"/dashboard/properties"}
        className="text-2xl font-semibold hover:bg-[#c20000ab] w-fit py-1 px-4 rounded-lg hover:text-white mb-5 block"
      >
        <KeyboardArrowRightIcon /> {unit?.title}
      </Link>
      <Box className="custom-grid-container1">
        <Box>
          <OrderCard>
            <Box className="custom-flex-container-space">
              <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {lang === "ar" ? "معلومات الوحدة" : "unit information"}
              </Typography>
              <Typography className="eitBtn" onClick={handleEditInformation}>
                {!edditInfo && t("dashboard.outgoing_requests.edit_btn")}
              </Typography>
            </Box>
            {edditInfo && (
              <Fade in={edditInfo}>
                <Box>
                  <EditInformation
                    title={unit.title}
                    editInfoMutation={editInfoMutation}
                    id={unit.id}
                    onCancel={onCancel}
                    categoryId={unit?.category_aqar?.id}
                    unitSpace={unit?.space}
                    setIsChangingData={setIsChangingData}
                  />
                </Box>
              </Fade>
            )}
            {!edditInfo && (
              <Fade in={!edditInfo}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography>
                      {t("dashboard.incoming_orders.card1.label1")}
                    </Typography>
                    <Typography>{unit?.title} </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  ></Box>
                  <Box className="custom-flex-container-space">
                    <Typography>
                      {lang === "ar" ? "كود الوحدة" : "unit code"}
                    </Typography>
                    <Typography>{unit?.ref_number} </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  ></Box>
                  <Box className="custom-flex-container-space">
                    <Typography>
                      {lang === "ar" ? "المساحة" : "space"}
                    </Typography>
                    <Typography>{unit?.space} </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "1rem",
                    }}
                  ></Box>
                </Box>
              </Fade>
            )}
          </OrderCard>
          <OrderCard sx={{ background: "#fff" }}>
            {descriptionEdit && (
              <Fade in={descriptionEdit}>
                <Box>
                  <EditDescription
                    description={unit?.description}
                    id={unit?.id}
                    editDescriptionMutation={editDescriptionMutation}
                    onCancel={() => {
                      setDescriptionEdit(false);
                    }}
                    setIsChangingData={setIsChangingData}
                  />
                </Box>
              </Fade>
            )}
            {!descriptionEdit && (
              <Fade in={!descriptionEdit}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {t("dashboard.incoming_orders.card5.title")}
                    </Typography>

                    <Typography
                      className="eitBtn"
                      onClick={() => {
                        setDescriptionEdit(true);
                      }}
                    >
                      {!descriptionEdit &&
                        t("dashboard.outgoing_requests.edit_btn")}
                    </Typography>
                  </Box>
                  <Typography>{unit?.description}</Typography>
                </Box>
              </Fade>
            )}
          </OrderCard>
          <OrderCard sx={{ background: "#fff" }}>
            {filesEdit && (
              <Fade in={filesEdit}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    {lang === "ar" ? "جميع الملفات" : "files"}
                  </Typography>
                  <UnitImages
                    images={unit.ads_files}
                    mainImage={unit.main_image}
                    id={unit.id}
                    refetch={refetch}
                    setIsChangingData={setIsChangingData}
                    onCancel={() => {
                      setFilesEdit(false);
                    }}
                  />
                </Box>
              </Fade>
            )}
            {!filesEdit && (
              <Fade in={!filesEdit}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {lang === "ar" ? "جميع الملفات" : "files"}
                    </Typography>

                    <Typography
                      className="eitBtn"
                      onClick={() => {
                        handleFilesEdit(true);
                      }}
                    >
                      {!descriptionEdit &&
                        t("dashboard.outgoing_requests.edit_btn")}
                    </Typography>
                  </Box>
                  <div className="flex flex-col gap-2">
                    <img
                      src={`https://dashboard.maktab.sa/${unit.main_image}`}
                      className="w-full h-[200px] rounded-xl"
                      alt=""
                    />
                    <div className="flex gap-2 items-start flex-wrap">
                      {unit.ads_files
                        .filter((ele) => ele.type_file === "image")
                        .map((ele, i) => (
                          <img
                            key={i}
                            src={`https://dashboard.maktab.sa/${ele.path}`}
                            alt=""
                            className="flex-[49%] flex-grow-0 h-[80px] rounded-lg object-cover"
                          />
                        ))}
                    </div>
                  </div>
                </Box>
              </Fade>
            )}
          </OrderCard>
        </Box>
        <Box>
          <OrderCard sx={{ background: "#fff" }}>
            <Box className="custom-flex-container-space">
              <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                {t("dashboard.incoming_orders.card3.title")}
              </Typography>
              <Typography className="eitBtn" onClick={handleChangeStatus}>
                {"تغيير"}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography>
                {" "}
                {t("dashboard.incoming_orders.card3.label1")}
              </Typography>

              {unit?.status == 0 ? (
                <Typography
                  sx={{
                    color: "rgb(244, 67, 54)",
                    fontWeight: "600",
                    marginBottom: "1rem",
                  }}
                >
                  غير معروض
                </Typography>
              ) : (
                <Typography className="eitBtn">معروض</Typography>
              )}
            </Box>
          </OrderCard>
          <OrderCard sx={{ background: "#fff" }}>
            {editDetails && (
              <Fade in={editDetails}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    {lang === "ar" ? " تفاصيل المكتب" : "Office Details"}
                  </Typography>
                  <UnitRoomDetails
                    onCancel={() => {
                      setEditDetails(false);
                    }}
                    details={unit.ads_details}
                    id={unit.id}
                    refetch={refetch}
                    setIsChangingData={setIsChangingData}
                  />
                </Box>
              </Fade>
            )}
            {!editDetails && (
              <Fade in={!editDetails}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {lang === "ar" ? " تفاصيل المكتب" : "Office Details"}
                    </Typography>

                    <Typography
                      className="eitBtn"
                      onClick={() => {
                        setEditDetails(true);
                      }}
                    >
                      {!editDetails &&
                        t("dashboard.outgoing_requests.edit_btn")}
                    </Typography>
                  </Box>
                  <div className="flex gap-4 flex-col ">
                    {unit.ads_details.map((ele, i) => (
                      <div key={i} className="flex justify-between ">
                        <span className="text-gray-500">
                          {lang === "ar" ? ele.ar_name : ele.en_name}
                        </span>
                        <span className="text-gray-500">
                          {ele.number_details}
                        </span>
                      </div>
                    ))}
                  </div>
                </Box>
              </Fade>
            )}
          </OrderCard>
          <OrderCard sx={{ background: "#fff" }}>
            {editFacilities && (
              <Fade in={editFacilities}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    {lang === "ar" ? " المرافق" : "facilities"}
                  </Typography>
                  <EditFacilities
                    facilities={unit.facilities}
                    onCancel={() => {
                      setEditFacilities(false);
                    }}
                    unitId={unit.id}
                    setIsChangingData={setIsChangingData}
                    refetch={refetch}
                  />
                </Box>
              </Fade>
            )}
            {!editFacilities && (
              <Fade in={!editFacilities}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {lang === "ar" ? " المرافق" : "facilities"}
                    </Typography>

                    <Typography
                      className="eitBtn"
                      onClick={() => {
                        setEditFacilities(true);
                      }}
                    >
                      {!descriptionEdit &&
                        t("dashboard.outgoing_requests.edit_btn")}
                    </Typography>
                  </Box>
                  <Typography>
                    {unit.facilities
                      .map((feature) =>
                        lang === "ar" ? feature.ar_name : feature.en_name
                      )
                      .join(", ")}
                  </Typography>
                </Box>
              </Fade>
            )}
          </OrderCard>
          <OrderCard sx={{ background: "#fff" }}>
            {editFeatures && (
              <Fade in={editFeatures}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    {lang === "ar" ? " المميزات" : "features"}
                  </Typography>
                  <EditFeatures
                    features={unit.features}
                    ads_features={unit.featurea_ads}
                    setIsChangingData={setIsChangingData}
                    unitId={unit.id}
                    onCancel={() => {
                      setEditFeatures(false);
                    }}
                    refetch={refetch}
                  />
                </Box>
              </Fade>
            )}
            {!editFeatures && (
              <Fade in={!editFeatures}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {lang === "ar" ? "المميزات" : "features "}
                    </Typography>

                    <Typography
                      className="eitBtn"
                      onClick={() => {
                        setEditFeatures(true);
                      }}
                    >
                      {!editFeatures &&
                        t("dashboard.outgoing_requests.edit_btn")}
                    </Typography>
                  </Box>
                  <Typography>
                    {unit.features
                      .map((feature) =>
                        lang === "ar" ? feature.ar_name : feature.en_name
                      )
                      .join(", ")}
                  </Typography>
                </Box>
              </Fade>
            )}
          </OrderCard>
          <OrderCard sx={{ background: "#fff" }}>
            {editComforts && (
              <Fade in={editComforts}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    {lang === "ar" ? " وسائل الراحة" : "comforts"}
                  </Typography>
                  <EditComforts
                    comforts={unit.comforts}
                    setIsChangingData={setIsChangingData}
                    onCancel={() => {
                      setEditComforts(false);
                    }}
                    refetch={refetch}
                    unitId={unit.id}
                  />
                </Box>
              </Fade>
            )}
            {!editComforts && (
              <Fade in={!editComforts}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {lang === "ar" ? "وسائل الراحة" : "comforts"}
                    </Typography>

                    <Typography
                      className="eitBtn"
                      onClick={() => {
                        setEditComforts(true);
                      }}
                    >
                      {!descriptionEdit &&
                        t("dashboard.outgoing_requests.edit_btn")}
                    </Typography>
                  </Box>
                  <Typography>
                    {unit?.comforts
                      .map((feature) =>
                        lang === "ar" ? feature.ar_name : feature.en_name
                      )
                      .join(", ")}
                  </Typography>
                </Box>
              </Fade>
            )}
          </OrderCard>
          {/* services section  */}
          <OrderCard sx={{ background: "#fff" }}>
            {editServices && (
              <Fade in={editServices}>
                <Box>
                  <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                    {lang === "ar" ? "الخدمات " : "Services  "}
                  </Typography>
                  <EditServices
                    services={unit?.services}
                    setIsChangingData={setIsChangingData}
                    onCancel={() => {
                      setEditServices(false);
                    }}
                    refetch={refetch}
                    unitId={unit.id}
                  />
                </Box>
              </Fade>
            )}
            {!editServices && (
              <Fade in={!editServices}>
                <Box>
                  <Box className="custom-flex-container-space">
                    <Typography sx={{ fontWeight: "600", fontSize: "1.2rem" }}>
                      {lang === "ar" ? "الخدمات الاضافية" : "more services"}
                    </Typography>

                    <Typography
                      className="eitBtn"
                      onClick={() => {
                        setEditServices(true);
                      }}
                    >
                      {!editServices &&
                        t("dashboard.outgoing_requests.edit_btn")}
                    </Typography>
                  </Box>
                  <Typography>
                    {unit?.services
                      .map((service) =>
                        lang === "ar" ? service.ar_name : service.en_name
                      )
                      .join(", ")}
                  </Typography>
                </Box>
              </Fade>
            )}
          </OrderCard>
        </Box>
      </Box>
    </>
  );
};

export default Unit;
