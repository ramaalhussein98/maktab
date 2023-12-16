import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  RadioGroup,
  Typography,
  Radio,
  TextField,
  Modal,
  Link,
} from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { Home1 } from "../../../assets/images";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { myAxios } from "../../../api/myAxios";
import "../../../assets/css/myinfo.css";
import useDataFetcher from "../../../api/useDataFetcher ";
import { useStateContext } from "../../../context/userContext";
const MyInfo = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { user, setUser, updateUserInformation } = useStateContext();
  const [selectedImage, setSelectedImage] = useState(null);
  // const [membershipId, setMembershipId] = useState(user?.type?.id);
  const [license, setLicense] = useState("");
  const [isFormCompleted, setIsFormCompleted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memberships, setMemberShips] = useState([
    { id: 1, ar_name: "شركة", en_name: "Company" },
    { id: 2, ar_name: "مسوق", en_name: "Marketer" },
    { id: 3, ar_name: "مالك", en_name: "Owner" },
    { id: 4, ar_name: "باحث عن مكتب", en_name: "Office Seeker" },
    { id: 5, ar_name: "مكتب", en_name: "Office" },
  ]);
  const [imageFile, setImageFile] = useState();
  const { data, isLoading, error, get, post } = useDataFetcher();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file && file.size <= 2 * 1024 * 1024) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const initialValues = {
    type_id: user?.type?.id,
    username: user?.username,
    company_name: user?.company_name,
    office_name: user?.office_name,
    email: user?.email,
    neighborhood: user?.neighborhood,
    city: user?.city,
    IdNumber: user?.IdNumber,
    commercial_record: user?.commercial_record,
    phone: user?.phone,
    about: user?.about,
    licenseLink: user?.licenseLink,
    license_number: user?.license_number,

    // Add other initial values here
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .required("اسم المستخدم مطلوب")
      .min(3, "يجب على أقل ثلاث أحرف"),
    company_name: Yup.string().when("type_id", {
      is: 1, // type_id for Company
      then: Yup.string().required("اسم الشركة مطلوب"),
      otherwise: Yup.string(),
    }),
    office_name: Yup.string().when("type_id", {
      is: 5, // type_id for Office
      then: Yup.string().required("اسم المكتب مطلوب"),
      otherwise: Yup.string(),
    }),
    email: Yup.string()
      .required("الايميل  مطلوب")
      .email("يجب أن يكون بنية صحيحة"),
    neighborhood: Yup.string()
      .required("الحي  مطلوب")
      .min(3, "يجب على أقل ثلاث أحرف"),
    city: Yup.string().required("المدينة  مطلوبة"),
    IdNumber: Yup.string()
      .required("  رقم الوطني مطلوب")
      .min(6, "يجب على أقل ست أرقام"),
    commercial_record: Yup.string().required("  رقم السجل التجاري  مطلوب"),
    phone: Yup.string().required("  رقم  الهاتف المحمول  مطلوب"),
    licenseLink: Yup.string().required("رابط الترخيص مطلوب"),
    license_number: Yup.string().required("  رقم الرخصة مطلوب"),
    about: Yup.string().required().min(6, " يجب على الأقل 6 أحرف"),
  });

  const handleLicenseChange = (e) => {
    setLicense(e.target.value);
    if (e.target.value === "no") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = async (values) => {
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }
    try {
      const user_type_bussines =
        localStorage.getItem("user_type") === "bussines" ? true : false;
      if (user_type_bussines) {
        const res = await myAxios.post("/api/v1/user/profile", formData);
        console.log(res?.data.status);
        if (res.data.status === true) {
          updateUserInformation();
        }
      } else {
        const res = await myAxios.post("/api/v1/ordinaries/profile", formData);
        if (res.data.status === true) {
          updateUserInformation();
        }
      }
      // console.log(values);
      // setUser(res?.data?.data);
      // const updatedUserData = res?.data?.data;
      // localStorage.setItem("userData", JSON.stringify(updatedUserData));
      // console.log("Data posted successfully:", updatedUserData);
    } catch (err) {
      // Handle API call error
    }
  };

  return (
    <div style={{ overflowX: "hidden" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize={true}
        onSubmit={handleSubmit}
      >
        {({
          touched,
          setFieldValue,
          errors,
          isSubmitting,
          isValid,
          dirty,
          values,
        }) => (
          <Form>
            {/* this box image */}
            <Box className="boxImage">
              <Button
                className="BoxImageLabel"
                component="label"
                sx={{
                  border: selectedImage ? "none" : "1px dashed gray",
                  backgroundImage: selectedImage
                    ? `url(${selectedImage})`
                    : `url(https://dashboard.maktab.sa/${user?.image?.name})`,
                }}
              >
                <Field
                  id="1"
                  name="image"
                  //   id={userData?.image_id}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />

                {selectedImage ? null : t("dashboard.personal_info.img_btn")}
              </Button>
              <Typography className="color-gray">
                {t("dashboard.personal_info.title1")}
              </Typography>
              <Typography sx={{ color: "red" }}>
                {t("dashboard.personal_info.hint1")}
              </Typography>
            </Box>
            {/* this box radio btns */}
            <Grid
              item
              container
              spacing={2}
              className="GridStyle"
              sx={{
                justifyContent: {
                  xs: "center",
                  md: "right",
                },
              }}
            >
              <Grid item xs={10} md={12}>
                <label htmlFor="membershipType">
                  {" "}
                  {t("dashboard.personal_info.label12")}
                </label>
                <Field name="type_id">
                  {({ field }) => (
                    <RadioGroup
                      {...field}
                      // value={membershipId}
                      onChange={(e) => {
                        setFieldValue("type_id", +e.target.value);
                      }}
                      sx={{
                        display: "flex",
                        marginTop: "1rem",
                        flexWrap: "wrap",
                        flexDirection: "row",
                      }}
                    >
                      {memberships?.map((membership, index) => (
                        <FormControlLabel
                          className="RadioStyle"
                          key={membership.id}
                          value={membership.id}
                          control={<Radio sx={{ opacity: "0" }} />}
                          label={
                            lang === "ar"
                              ? membership.ar_name
                              : membership.en_name
                          }
                          sx={{
                            backgroundColor:
                              values.type_id === membership.id
                                ? "var(--main-color)"
                                : "white",
                            color:
                              values.type_id === membership.id
                                ? "white"
                                : "black",
                            marginTop: { xs: "1rem", md: "0rem" },
                            "& .MuiFormControlLabel-label": {
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                          name={`custom-radio-${index}`}
                        />
                      ))}
                    </RadioGroup>
                  )}
                </Field>
              </Grid>
              <Grid
                item
                container
                spacing={2}
                sx={{
                  justifyContent: {
                    xs: "center",
                    md: "right",
                  },
                }}
              >
                <Grid item xs={10} md={6}>
                  <label htmlFor="fullname">
                    {" "}
                    {t("dashboard.personal_info.label2")}
                  </label>

                  <Field
                    type="text"
                    name="username"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </Grid>
                {values.type_id == 1 && (
                  <Grid item xs={10} md={6}>
                    <label htmlFor="company_name">
                      {" "}
                      {t("dashboard.personal_info.label3")}
                    </label>
                    <Field
                      type="text"
                      name="company_name"
                      className="inputsStyle"
                      style={{ width: "100%", display: "block" }}
                    />
                    <ErrorMessage
                      name="company_name"
                      component="div"
                      className="error"
                    />
                  </Grid>
                )}
                {values.type_id == 5 && (
                  <Grid item xs={10} md={6}>
                    <label htmlFor="office_name">
                      {" "}
                      {t("dashboard.personal_info.label4")}
                    </label>
                    <Field
                      type="text"
                      name="office_name"
                      className="inputsStyle"
                      style={{ width: "100%", display: "block" }}
                    />
                    <ErrorMessage
                      name="office_name"
                      component="div"
                      className="error"
                    />
                  </Grid>
                )}
                <Grid item xs={10} md={6}>
                  <label htmlFor="email">
                    {" "}
                    {t("dashboard.personal_info.label5")}
                  </label>
                  <Field
                    type="text"
                    name="email"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <label htmlFor="city">
                    {" "}
                    {t("dashboard.personal_info.label6")}
                  </label>
                  <Field
                    type="text"
                    name="city"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage name="city" component="div" className="error" />
                </Grid>
                <Grid item xs={10} md={6}>
                  <label htmlFor="neighborhood">
                    {" "}
                    {t("dashboard.personal_info.label7")}
                  </label>
                  <Field
                    type="text"
                    name="neighborhood"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="neighborhood"
                    component="div"
                    className="error"
                  />
                </Grid>
                {/* {!(membershipId == 1 || membershipId == 6) && ( */}
                <Grid item xs={10} md={6}>
                  <label htmlFor="IdNumber">
                    {" "}
                    {t("dashboard.personal_info.label8")}
                  </label>
                  <Field
                    type="text"
                    name="IdNumber"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="IdNumber"
                    component="div"
                    className="error"
                  />
                </Grid>
                {/* // )} */}
                {/* {(membershipId == 1 || membershipId == 6) && ( */}
                <Grid item xs={10} md={6}>
                  <label htmlFor="commercial_record">
                    {t("dashboard.personal_info.label9")}
                  </label>
                  <Field
                    type="text"
                    name="commercial_record"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="commercial_record"
                    component="div"
                    className="error"
                  />
                </Grid>
                {/* )} */}
                <Grid item xs={10} md={6}>
                  <label htmlFor="phone">
                    {" "}
                    {t("dashboard.personal_info.label10")}
                  </label>
                  <Field
                    type="tel"
                    name="phone"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                    readOnly
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="error"
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <label htmlFor="about">
                    {" "}
                    {t("dashboard.personal_info.label11")}
                  </label>
                  <Field
                    component="textarea"
                    type="text"
                    name="about"
                    // className="inputsStyle"
                    multiline
                    rows={5}
                    style={{
                      width: "100%",
                      display: "block",
                      // height: "120px !important",
                      // overflow: "auto",
                    }}
                  />
                </Grid>

                {values.type_id != 4 && (
                  <Grid item xs={10} md={6}>
                    {/* this section for License */}
                    <Box sx={{ marginY: "2rem" }}>
                      <Typography sx={{ fontWeight: "bold" }}>
                        {t("dashboard.personal_info.license")}
                      </Typography>
                      <RadioGroup
                        name="license"
                        value={license}
                        onChange={handleLicenseChange}
                        sx={{ flexDirection: "row", marginTop: "1rem" }}
                      >
                        <FormControlLabel
                          className="secoundlabel"
                          value="yes"
                          control={<Radio sx={{ opacity: "0" }} />}
                          label={t("dashboard.personal_info.license_btn1")}
                          sx={{
                            backgroundColor:
                              license === "yes"
                                ? "var(--green-color)"
                                : "white",
                            color: license === "yes" ? "white" : "black",
                            "& .MuiFormControlLabel-label": {
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        />
                        <FormControlLabel
                          className="secoundlabel"
                          value="no"
                          control={<Radio sx={{ opacity: "0" }} />}
                          label={t("dashboard.personal_info.license_btn2")}
                          sx={{
                            backgroundColor:
                              license === "no" ? "var(--main-color)" : "white",
                            color: license === "no" ? "white" : "black",
                            "& .MuiFormControlLabel-label": {
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        />
                      </RadioGroup>
                      {license === "yes" && (
                        <>
                          <Box sx={{ marginY: "1rem" }}>
                            <label htmlFor="licenseLink">
                              {t(
                                "dashboard.personal_info.license_modal_title1"
                              )}
                              *
                            </label>
                            <Field
                              type="text"
                              name="licenseLink"
                              className="inputsStyle"
                              multiline
                              style={{ width: "100%", display: "block" }}
                            />
                            <ErrorMessage
                              name="licenseLink"
                              component="div"
                              className="error"
                            />
                          </Box>
                          <Box sx={{ marginY: "1rem" }}>
                            <label htmlFor="license_number">
                              {t(
                                "dashboard.personal_info.license_modal_title2"
                              )}
                              *
                            </label>
                            <Field
                              type="text"
                              name="license_number"
                              className="inputsStyle"
                              multiline
                              style={{ width: "100%", display: "block" }}
                            />
                            <ErrorMessage
                              name="licenseNumber"
                              component="div"
                              className="error"
                            />
                          </Box>
                        </>
                      )}
                      <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="modal-title"
                      >
                        <Box
                          className="BoxModalButtons"
                          sx={{
                            width: { xs: "300px", md: "500px" },
                          }}
                        >
                          <Typography>
                            {t("dashboard.personal_info.license_modal_desc")}
                          </Typography>
                          <Box sx={{ marginY: "1rem" }}>
                            <Button className="LicenseModalBtn">
                              <Link
                                href="https://eservicesredp.rega.gov.sa/auth/register"
                                sx={{
                                  textDecoration: "none",
                                  color: "var(--green-color)",
                                }}
                              >
                                {t(
                                  "dashboard.personal_info.license_modal_btn1"
                                )}
                              </Link>
                            </Button>
                            <Button
                              className="btnCloseModal"
                              onClick={handleCloseModal}
                            >
                              {t("dashboard.personal_info.license_modal_btn2")}
                            </Button>
                          </Box>
                        </Box>
                      </Modal>
                    </Box>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Button
              type="submit"
              // disabled={!(isValid && dirty)}
              className="buttonSubmit"
              sx={{
                "&:hover": {
                  backgroundColor: "var(--green-color)",
                  color: "white",
                },
              }}
              // onClick={() => handleSubmit(values)}
            >
              {t("dashboard.personal_info.main_btn")}
            </Button>
          </Form>
        )}
      </Formik>
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "300px", md: "500px" },
            bgcolor: "white",
            border: "2px solid transparent",
            borderRadius: "1rem",
            boxShadow: 24,
            textAlign: "center",
            p: 4,
          }}
        >
          <Typography>
            {t("dashboard.personal_info.license_modal_desc")}
          </Typography>
          <Box sx={{ marginY: "1rem" }}>
            <Button className="registerBtn">
              <Link
                href="https://eservicesredp.rega.gov.sa/auth/register"
                sx={{
                  textDecoration: "none",
                  color: "var(--green-color)",
                }}
              >
                {t("dashboard.personal_info.license_modal_btn1")}
              </Link>
            </Button>
            <Button onClick={handleCloseModal} className="closeButton">
              {t("dashboard.personal_info.license_modal_btn2")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyInfo;
