import React from "react";
import "../../../assets/css/electronic_invoices.css";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import { QR } from "../../../assets/images";
import { RedLogo } from "../../../assets/logos";
const ElectronicInvoices = () => {
  return (
    <div>
      <div className="d-flex-justify-space ">
        <p className="details_title">تفاصيل الفاتورة</p>
        <div className="d-flex">
          <button className="btnBack">
            <ArrowBackIcon
              className="svgIcon"
              sx={{ transform: "rotate(180deg)" }}
            />
            رجوع
          </button>
          <button className="btnPrint">
            <LocalPrintshopIcon className="svgIcon" />
            طباعة
          </button>
          <button className="btnSent">
            <EmailIcon className="svgIcon" />
            إرسال
          </button>
        </div>
      </div>
      <div className="cantEditBills">
        بعد اعتمادها لا يمكنك حذف أو تعديل الفاتورة يمكنك الغاء الفاتورة كأشعار
      </div>
      <div className="d-flex-justify-space ">
        <div>
          <p>مكتب</p>
          <p>العنوان: حي الربوة</p>
          <p>الرقم الضريبي: #123444555</p>
          <p> رقم السجل التجاري:#123444555</p>
          <p>البريد الالكتروني: info@mail.com</p>
          <p>رقم الجوال : 096666666</p>
        </div>
        <div className="logoContainer">
          <img src={QR} className="img1" alt="qr_code" />
          <p>فاتورة الاشتراكات</p>
          <p className="green-weight">تم الدفع</p>
        </div>
        <div className="logoContainer">
          <img src={RedLogo} className="img1" alt="logo" />
        </div>
      </div>
      <div className="Bills-details-container">
        <span>فاتورة رقم :04555</span>
        <span>التاريخ: 01-01-2023</span>
        <span>رقم الجوال</span>
        <span>05555555555</span>
        <span></span>
      </div>
      <div className="d-flex">
        <div className="backgroundBox Gray1">اسم العميل</div>
        <div className="backgroundBox GrayLight">نجوم التقنية للمعلومات </div>
        <div className="backgroundBox Gray1"> نوع الفاتورة</div>
        <div className="backgroundBox GrayLight"> فاتورة ضريبة تفصيلية </div>
      </div>
      <div className="d-flex">
        <div className="backgroundBox Gray1"> العنوان</div>
        <div className="backgroundBox GrayLight">الرياض </div>
        <div className="backgroundBox Gray1"> الرقم الضريبي</div>
        <div className="backgroundBox GrayLight"> 023444 </div>
      </div>
      <div className="d-flex">
        <div className="backgroundBox Gray1"> حالة الفاتورة</div>
        <div className="backgroundBox GrayLight">مفعلة </div>
        <div className="backgroundBox Gray1">  تفاصيل الفاتورة</div>
        <div className="backgroundBox GrayLight"> lorem lorem lorem </div>
      </div>
    </div>
  );
};

export default ElectronicInvoices;
