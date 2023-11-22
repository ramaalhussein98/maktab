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
import React, { useState } from "react";
import { Home1 } from "../../../assets/images";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import "../../../assets/css/myinfo.css";

const MyInfo = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedImage, setSelectedImage] = useState(null);
  const [membershipId, setMembershipId] = useState();
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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file && file.size <= 2 * 1024 * 1024) {
      setSelectedImage(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
    }
  };
  const handleMembershipTypeChange = (e) => {
    setMembershipId(Number(e.target.value));
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const initialValues = {
    username: "",
    companyname: "",
    deskname: "",
    email: "",
    neighborhood: "",
    city: "",
    nationalId: "",
    commercialID: "",
    phoneNumber: "",
    description: "",
    licenseLink: "",
    licenseNumber: "",
    // Add other initial values here
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("اسم المستخدم مطلوب"),
    companyname: Yup.string().required("اسم الشركة مطلوب"),
    deskname: Yup.string().required("اسم المكتب مطلوب"),
    email: Yup.string().required("الايميل  مطلوب"),
    neighborhood: Yup.string().required("الحي  مطلوب"),
    city: Yup.string().required("المدينة  مطلوبة"),
    nationalId: Yup.string().required("  رقم الوطني مطلوب"),
    commercialID: Yup.string().required("  رقم السجل التجاري  مطلوب"),
    phoneNumber: Yup.string().required("  رقم  الهاتف المحمول  مطلوب"),
    licenseLink: Yup.string().required("رابط الترخيص مطلوب"),
    licenseNumber: Yup.string().required("  رقم الرخصة مطلوب"),
    // Add other validations here
  });

  const handleLicenseChange = (e) => {
    setLicense(e.target.value);
    if (e.target.value === "no") {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleSubmit = (values) => {
    console.log("Form Values:", values);
  };
  // const handleData = () => {
  //   console.log("hi");
  // };
  return (
    <div style={{ overflowX: "hidden" }}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({
          errors,
          touched,
          setFieldValue,
          isSubmitting,
          isValid,
          values,
        }) => (
          <form>
            {/* this box image */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                textAlign: "center",
                alignItems: "center",
                marginBottom: "2rem",
              }}
            >
              <Button
                component="label"
                sx={{
                  width: "12rem",
                  height: "12rem",
                  border: selectedImage ? "none" : "1px dashed gray",
                  margin: "auto",
                  marginBottom: "1rem",
                  borderRadius: "50%",
                  color: "gray",
                  backgroundImage: selectedImage
                    ? `url(${selectedImage})`
                    : Home1,
                  // : `url(https://www.dashboard.aqartik.com/assets/images/users/logo/${userData?.image?.name})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <input
                  id="1"
                  //   id={userData?.image_id}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleImageUpload}
                />
                {selectedImage ? null : t("dashboard.personal_info.img_btn")}
              </Button>
              <Typography sx={{ color: "gray" }}>
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
              sx={{
                justifyContent: {
                  xs: "center",
                  md: "right",
                },
                margin: "0px",
                width: "100%",
              }}
            >
              <Grid item xs={10} md={12}>
                <label htmlFor="membershipType">
                  {" "}
                  {t("dashboard.personal_info.label12")}
                </label>
                <RadioGroup
                  // name={userData.type_id}
                  value={membershipId}
                  onChange={handleMembershipTypeChange}
                  sx={{
                    display: "flex",
                    marginTop: "1rem",
                    flexWrap: "wrap",
                    flexDirection: "row",
                  }}
                >
                  {memberships?.map((membership, index) => (
                    <FormControlLabel
                      key={membership.id}
                      value={membership.id}
                      control={<Radio sx={{ opacity: "0" }} />}
                      label={
                        lang === "ar" ? membership.ar_name : membership.en_name
                      }
                      sx={{
                        backgroundColor:
                          membershipId == membership.id
                            ? "var(--main-color)"
                            : "white",
                        color:
                          membershipId == membership.id ? "white" : "black",
                        border: "1px solid #cdcdcd",
                        flex: "1",
                        minWidth: "8rem",
                        marginBottom: "0.5rem",
                        marginLeft: "0",
                        marginRight: "0",
                        borderRadius: "0",
                        padding: "0.3rem",
                        position: "relative",
                        margin: "0px 5px",
                        borderRadius: "10px",
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
                {membershipId == 1 && (
                  <Grid item xs={10} md={6}>
                    <label htmlFor="companyname">
                      {" "}
                      {t("dashboard.personal_info.label3")}
                    </label>
                    <Field
                      type="text"
                      name="companyname"
                      className="inputsStyle"
                      style={{ width: "100%", display: "block" }}
                    />
                    <ErrorMessage
                      name="companyname"
                      component="div"
                      className="error"
                    />
                  </Grid>
                )}
                {membershipId == 5 && (
                  <Grid item xs={10} md={6}>
                    <label htmlFor="deskname">
                      {" "}
                      {t("dashboard.personal_info.label4")}
                    </label>
                    <Field
                      type="text"
                      name="deskname"
                      className="inputsStyle"
                      style={{ width: "100%", display: "block" }}
                    />
                    <ErrorMessage
                      name="deskname"
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
                  <label htmlFor="nationalId">
                    {" "}
                    {t("dashboard.personal_info.label8")}
                  </label>
                  <Field
                    type="text"
                    name="nationalId"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="nationalId"
                    component="div"
                    className="error"
                  />
                </Grid>
                {/* // )} */}
                {/* {(membershipId == 1 || membershipId == 6) && ( */}
                <Grid item xs={10} md={6}>
                  <label htmlFor="commercialID">
                    {t("dashboard.personal_info.label9")}
                  </label>
                  <Field
                    type="text"
                    name="commercialID"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="commercialID"
                    component="div"
                    className="error"
                  />
                </Grid>
                {/* )} */}
                <Grid item xs={10} md={6}>
                  <label htmlFor="phoneNumber">
                    {" "}
                    {t("dashboard.personal_info.label10")}
                  </label>
                  <Field
                    type="tel"
                    name="phoneNumber"
                    className="inputsStyle"
                    style={{ width: "100%", display: "block" }}
                  />
                  <ErrorMessage
                    name="phoneNumber"
                    component="div"
                    className="error"
                  />
                </Grid>
                <Grid item xs={10} md={6}>
                  <label htmlFor="description">
                    {" "}
                    {t("dashboard.personal_info.label11")}
                  </label>
                  <Field
                    component="textarea"
                    type="text"
                    name="description"
                    className="inputsStyle"
                    multiline
                    rows={5}
                    style={{ width: "100%", display: "block" }}
                  />
                </Grid>

                {membershipId != 4 && (
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
                          value="yes"
                          control={<Radio sx={{ opacity: "0" }} />}
                          label={t("dashboard.personal_info.license_btn1")}
                          sx={{
                            backgroundColor:
                              license === "yes"
                                ? "var(--green-color)"
                                : "white",
                            color: license === "yes" ? "white" : "black",
                            border: "1px solid #cdcdcd",

                            width: "8rem",
                            marginBottom: "0.5rem",
                            borderRadius: "2rem",
                            padding: "0.3rem",
                            position: "relative",
                            "& .MuiFormControlLabel-label": {
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              transform: "translate(-50%, -50%)",
                            },
                          }}
                        />
                        <FormControlLabel
                          value="no"
                          control={<Radio sx={{ opacity: "0" }} />}
                          label={t("dashboard.personal_info.license_btn2")}
                          sx={{
                            backgroundColor:
                              license === "no" ? "var(--main-color)" : "white",
                            color: license === "no" ? "white" : "black",
                            border: "1px solid #cdcdcd",

                            width: "8rem",
                            marginBottom: "0.5rem",
                            borderRadius: "2rem",
                            padding: "0.3rem",
                            position: "relative",
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
                            <label htmlFor="licenseNumber">
                              {t(
                                "dashboard.personal_info.license_modal_title2"
                              )}
                              *
                            </label>
                            <Field
                              type="text"
                              name="licenseNumber"
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
                            <Button
                              sx={{
                                border: "1px solid var(--green-color)",
                                color: "var(--green-color)",
                                padding: "0.5rem 2rem",
                                marginX: "0.3rem",
                              }}
                            >
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
                              onClick={handleCloseModal}
                              sx={{
                                border: "1px solid var(--main-color)",
                                color: "var(--main-color)",
                                padding: "0.5rem 2rem",
                                marginX: "0.3rem",
                              }}
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
              // type="submit"
              disabled={!isValid || isSubmitting}
              sx={{
                backgroundColor: "var(--green-color)",
                color: "white",
                marginY: "2rem",
                fontSize: "18px",
                padding: "0.5rem 2rem",
                display: "block",
                marginX: "auto",
                "&:hover": {
                  backgroundColor: "var(--green-color)",
                  color: "white",
                },
              }}
              onClick={() => handleSubmit(values)}
            >
              {t("dashboard.personal_info.main_btn")}
            </Button>
          </form>
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
            <Button
              sx={{
                border: "1px solid var(--green-color)",
                color: "var(--green-color)",
                padding: "0.5rem 2rem",
                marginX: "0.3rem",
              }}
            >
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
            <Button
              onClick={handleCloseModal}
              sx={{
                border: "1px solid var(--main-color)",
                color: "var(--main-color)",
                padding: "0.5rem 2rem",
                marginX: "0.3rem",
              }}
            >
              {t("dashboard.personal_info.license_modal_btn2")}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default MyInfo;
