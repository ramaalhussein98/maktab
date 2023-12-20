import React, { useContext, useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Menu,
  MenuItem,
  Button,
  TextField,
  Grid,
  styled,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import Select from "@mui/material/Select";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTranslation } from "react-i18next";
// import GeneralContext from "../../../context/generalContext";
import styles from "../../../assets/css/home.module.css";
import { toast, Toaster } from "react-hot-toast";
// import { useAxiosConfig } from "../../../context/AxiosContext ";

import myAxios from "../../../api/myAxios";

const StyledSelect = styled(Select)((props) => ({
  "& .MuiSelect-icon": {
    marginRight: props.lang === "ar" ? "auto" : "0",
    marginLeft: props.lang === "ar" ? "0" : "auto",
    left: props.lang === "ar" ? "5px !important" : "",
    right: props.lang === "en" ? "5px !important" : "",
  },
}));
const StyledBox = styled(Box)(({ theme }) => ({
  border: "1px dashed #630000",
  borderRadius: "50%",
  color: "#fff",
  fontSize: "25px",
  height: "75px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  transform: "translateY(-50%)",
  transition: ".5s",
  width: "75px",
  justifyContent: "center",
  "&:before": {
    background: "linear-gradient(326deg,#c72020,#cc0f0f,#2c0606)",
    borderRadius: "50%",
    bottom: "0",
    content: "''",
    left: 0,
    margin: "5px",
    position: "absolute",
    right: 0,
    top: 0,
    transition: ".5s",
    zIndex: "-1",
  },
}));
const ContactUs = () => {
  // const { axiosConfig } = useAxiosConfig();
  // const myAxios = axios.create(axiosConfig);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const settingData = JSON.parse(localStorage.getItem("settingData"));

  const { t, i18n } = useTranslation();
  const userToken = localStorage.getItem("user_token");

  const lang = i18n.language;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPhoneNumberValid = /^\d+$/.test(phoneNumber);

  const handleSendClick = () => {
    if (!userToken) {
      toast.error(
        i18n.language === "ar"
          ? "يجب تسجيل الدخول لإرسال الرسالة"
          : "You must be logged in to send a message"
      );
      return;
    }
    if (!name || !email || !phoneNumber || !subject || !message) {
      toast.error(
        i18n.language === "ar"
          ? "يرجى ملء جميع الحقول"
          : "Please fill in all fields"
      );
      return;
    }

    if (!isEmailValid || !isPhoneNumberValid) {
      toast.error(
        i18n.language === "ar"
          ? "يرجى إدخال قيم صحيحة"
          : "Please enter a valid values"
      );
      return;
    }

    const formData = {
      from_name: name,
      from_email: email,
      PhoneNumber: phoneNumber,
      details: subject,
      Message: message,
    };
    myAxios
      .post("api/v1/user/sendMail", formData)
      .then((response) => {
        if (response.data.status === true) {
          toast.success(
            i18n.language === "ar"
              ? "تم إرسال الرسالة بنجاح"
              : "Message sent successfully"
          );
        } else {
          toast.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error(
          i18n.language === "ar"
            ? "حدث خطأ أثناء إرسال الرسالة"
            : "An error occurred while sending the message"
        );
      });
  };

  return (
    <Box sx={{ marginTop: "4rem" }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            // color: "var(--main-color)",
            fontSize: { xs: "1.5rem", md: "2.2rem" },
            fontWeight: "bold",
          }}
        >
          {lang === "ar" ? "  أرسل لنا رسالة لأي استفسار" : "send message..."}
        </Typography>
        <div className={styles.barPurple}></div>
      </Box>
      <Grid container sx={{ maxWidth: "1200px", margin: "auto" }}>
        <Grid item xs={12} sm={6} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: "5rem",
              marginRight: "1rem",
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "row" }}>
              <StyledBox>
                <LocationOnIcon />
              </StyledBox>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: lang === "ar" ? "1rem" : "0rem",
                  marginLeft: lang === "en" ? "1rem" : "0rem",
                  marginTop: "-1.5rem",
                }}
              >
                <Typography
                  sx={{
                    color: "#0e314c",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {lang === "ar" ? "  العنوان " : " address"}
                </Typography>
                <Typography sx={{ color: "var(--main-color)" }}>
                  {lang === "ar"
                    ? settingData?.contact_t1_ar
                    : settingData?.contact_t1_en}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{ display: "flex", flexDirection: "row", marginTop: "2rem" }}
            >
              <StyledBox>
                <EmailIcon />
              </StyledBox>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: lang === "ar" ? "1rem" : "0rem",
                  marginLeft: lang === "en" ? "1rem" : "0rem",
                  marginTop: "-1.5rem",
                }}
              >
                <Typography
                  sx={{
                    color: "#0e314c",
                    fontSize: "22px",
                    fontWeight: "bold",
                  }}
                >
                  {lang === "ar" ? "  البريد الالكتروني" : " email"}
                </Typography>
                <Typography sx={{ color: "var(--main-color)" }}>
                  {settingData?.contact_t6}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={7}>
          <form>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: { xs: "90%", md: "100%" },
                margin: "auto",
              }}
            >
              <input
                className={styles.styleinput}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder={lang === "ar" ? "  الاسم  " : "Name "}
                sx={{ marginX: { xs: "auto", md: "8px" } }}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className={styles.styleinput}
                variant="outlined"
                margin="normal"
                fullWidth
                placeholder={
                  lang === "ar" ? "  البريد الالكتروني " : "email address"
                }
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                sx={{ marginX: { xs: "auto", md: "8px" } }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                width: { xs: "90%", md: "100%" },
                margin: "auto",
              }}
            >
              <input
                className={styles.styleinput}
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder={lang === "ar" ? " رقم الجوال " : "phonenumber"}
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                sx={{
                  marginX: { xs: "auto", md: "8px" },
                  "& input[type=number]": {
                    MozAppearance: "textfield",
                    WebkitAppearance: "textfield",
                    appearance: "textfield",
                  },
                }}
                required
              />
              <input
                className={styles.styleinput}
                variant="outlined"
                fullWidth
                margin="normal"
                placeholder={lang === "ar" ? " الموضوع " : "subject"}
                sx={{ marginX: { xs: "auto", md: "8px" } }}
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </Box>
            <Box
              sx={{
                width: { xs: "90%", md: "calc(100% - 16px)" },
                display: "block",
                marginX: "auto",
              }}
            >
              <textarea
                className={styles.textareae}
                variant="outlined"
                fullWidth
                multiline
                rows={5}
                margin="normal"
                placeholder={
                  lang === "ar" ? " نص الرسالة..." : "your text here..."
                }
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </Box>
            <Button
              sx={{
                color: "white",
                backgroundColor: "#4b4a4a",
                marginY: "1rem",
                // margin: { xs: "auto", md: "" },
                // marginLeft: lang === "en" ? { md: "auto !important" } : "",
                // marginRight: lang === "ar" ? { md: "auto !important" } : "",
                marginRight: lang === "ar" ? "auto" : "initial",
                marginLeft: lang === "en" ? "auto" : "initial",

                display: "block",
                padding: "10px 25px",
                marginBottom: "1rem",
                borderRadius: "20px",
                fontSize: "20px",

                "&:hover": {
                  color: "white",
                  backgroundColor: "#4b4a4a",
                },
              }}
              onClick={handleSendClick}
            >
              <SendIcon
                sx={{ transform: "rotate(220deg)", marginTop: "-5px" }}
              />
              {lang === "ar" ? " أرسال" : "send message"}
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
