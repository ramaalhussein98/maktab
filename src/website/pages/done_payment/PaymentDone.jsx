import React from "react";
import "../../../assets/css/payment_done.css";
import { BlackRed, LogoBig, RedLogo } from "../../../assets/logos";
import { Container, Divider } from "@mui/material";
import { LogoAds } from "../../../assets/images";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

const PaymentDone = () => {
  const dataInfoData = [
    {
      title: "معرف الحجز",
    },
  ];
  return (
    <>
      <Container>
        <div className="LogoConatinerAndThank">
          <div>
            <p>مرحبا بك راما</p>
            <p>شكرا لك على استخدام منصة مكتب</p>
            <p>ها هي معلومات الحجز بك</p>
          </div>
          <div>
            <p className="thankyouConatiner">شكرا لك على الحجز</p>
            <p className="thankyouConatinerParagarph">thank you for booking</p>
          </div>
          <div className="logoContainer">
            <img src={BlackRed} alt="logo" />
          </div>
        </div>
        <div className="informationConatiner">
          <p className="main_tilte">معلوماتك</p>
          <div className="border_div">
            <div className="infoDiv">
              <span className="span1Info">معرف الحجز</span>
              <span>02222222</span>
            </div>
            <Divider sx={{ marginY: "1rem" }} />
            <div className="infoDiv">
              <span className="span1Info">الاسم </span>
              <span>rama</span>
            </div>
            <Divider sx={{ marginY: "1rem" }} />
            <div className="infoDiv">
              <span className="span1Info">أنشئت في </span>
              <span>12-30-2023</span>
            </div>
            <Divider sx={{ marginY: "1rem" }} />
            <div className="infoDiv">
              <span className="span1Info"> تفاصيل الإيجار </span>
              <span>
                <span>
                  <FiberManualRecordIcon sx={{ width: "10px" }} /> وقت الخول وقت
                  الخروج 10-10-2024
                </span>
                <p>
                  <FiberManualRecordIcon sx={{ width: "10px" }} />
                  الكبار 1
                </p>
                <p>السعر الأساسي 500 ريال</p>
                <p>خدمة إضافية 1000ريال</p>
                <p>عمولة 0%</p>
                <p>69000 ريال</p>
              </span>
            </div>
            <Divider sx={{ marginY: "1rem" }} />
            <div className="infoDiv">
              <span className="span1Info"> معلوماتك: </span>
              <span>
                <p>dddddd</p>
                <p>ramaa.alhuusein@gmail.com</p>
                <p>9665555555</p>
              </span>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PaymentDone;
