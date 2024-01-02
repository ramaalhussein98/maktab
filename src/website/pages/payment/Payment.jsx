import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
  Button,
} from "@mui/material";
import React from "react";
import "../../../assets/css/payment.css";
import { BackIcon } from "../../../assets/icons";
import { Link } from "react-router-dom";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  LocationTwo,
  Area,
  Star,
  Conditions,
  Refuend,
  Safe,
  Tamara_ar,
} from "../../../assets/icons";
import { Mada, MasterCard, Visa } from "../../../assets/images";
import VisaCard from "./VisaCard";

import PaymentCard from "./PaymentCard";
import PrivacyAndRules from "./PrivacyAndRules";
import PaymentXs from "./PaymentXs";
import { transform } from "lodash";
import { useTranslation } from "react-i18next";
import { t } from "i18next";
import CreditCard from "./CreditCard";

const officDetails = [
  { icon: Star, description: "8.4" },
  { icon: LocationTwo, description: "الرياض - حي القيروان" },
  { icon: Area, description: "مساحة الوحدة 320 م" },
  { icon: LocationTwo, description: "مخصص لعوائل فقط" },
];

const Payment = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  return (
    <>
      {/* this payment page for lg screens */}
      <Box sx={{ display: { xs: "none", md: "block" } }}>
        <Container>
          <Box className="payment_container">
            <Box className="payment_descrption">
              <Box className="paymenttitle">
                <Link to="/details">
                  <ChevronRightIcon
                    sx={{
                      transform:
                        lang === "en" ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </Link>
                <span>{t("paymentpage.Reviewandpayment")}</span>
              </Box>
              <Box className="paymendescriptionbox">
                <span className="payment_office_title">مكتب في الرياض</span>
                <span className="code"> كود الوحدة (225)</span>
              </Box>
              <Box className="more_description">
                <Box className="div_inside">
                  {officDetails.map((data, index) => (
                    <Box key={index} className="DetailsOffice">
                      <img src={data.icon} />
                      <span>{data.description}</span>
                    </Box>
                  ))}
                </Box>
              </Box>
              <Box className="divider"></Box>

              <Box className="divider"></Box>
              <PrivacyAndRules />
              <Box className="divider"></Box>

              {/* payment section */}
              <div className="paymentTitle">{t("paymentpage.payingoff")}</div>
              <div className="paymentRaioBox">
                <FormControl>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="all"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="all"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "black",
                            },
                          }}
                        />
                      }
                      label="دفع كامل المبلغ 399.60 "
                      sx={{ marginRight: "0px" }}
                    />
                    <FormControlLabel
                      value="part"
                      control={
                        <Radio
                          sx={{
                            "&.Mui-checked": {
                              color: "black",
                            },
                          }}
                        />
                      }
                      label="دفع جزء من المبلغ (عربون) 139.60 ريال"
                      sx={{ marginRight: "0px" }}
                    />
                  </RadioGroup>
                </FormControl>
                <span className="gray_span">
                  بإمكانك دفع باقي المبلغ لاحقاً من الموقع أو التطبيق، أو دفعه
                  نقداً عند المضيف
                </span>
              </div>
              <Box className="divider"></Box>

              {/* <VisaCard /> */}
              <CreditCard />

              {/* this for tamara */}
              {/* <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "20px",
                }}
              >
                <FormControlLabel
                  value="tamara"
                  control={
                    <Radio
                      sx={{
                        "&.Mui-checked": {
                          color: "black",
                        },
                      }}
                    />
                  }
                  sx={{ marginRight: "0px" }}
                />
                <div style={{ display: "flex", marginRight: "10px" }}>
                  <img src={Tamara_ar} />

                  <span>قسم فاتورتك على 3 دفعات بدون فوائد</span>
                </div>
              </div> */}
              {/* <span style={{ marginBottom: "20px" }}>
                ادفع جزء من المبلغ الان والباقي على حسب خطة الدفع بدون رسوم خفية
              </span> */}
              {/* <Box className="divider"></Box> */}
            </Box>
            <Box className="paymentCard">
              <PaymentCard />
            </Box>
          </Box>
          <Link to="/payment_done" className="paymentBtn">{t("paymentpage.Paynow")}</Link>
        </Container>
      </Box>
      {/* this payment page for sm screens */}
      <Box sx={{ display: { xs: "block", md: "none" } }}>
        <PaymentXs />
      </Box>
    </>
  );
};

export default Payment;
