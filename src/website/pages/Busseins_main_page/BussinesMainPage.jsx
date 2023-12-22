import React from "react";
import "../../../assets/css/bussines_main_page.css";
import { Link } from "react-router-dom";
import { Step, MobileBg, Home1 } from "../../../assets/images";
import { BackWhite } from "../../../assets/icons";
import styles from "../../../assets/css/home.module.css";
import { useTranslation } from "react-i18next";
import {
  Home,
  Location2,
  Gust,
  Users,
  GooglePlayWhite,
  AppStoreWhite,
} from "../../../assets/icons";

const DataNumbers = [
  { number: 4000, title: "مكنب مسجل على المنصة", icon: Home },
  { number: 180, title: "  مدينة ومحافظة نغطيها ", icon: Location2 },
  { number: "2,000,000", title: "   ضيوف موثوقين  ", icon: Gust },
  { number: 500, title: "    مضيف لديهم حجوزات  ", icon: Users },
];

const BussinesMainPage = () => {
  const {t , i18n} = useTranslation()
  const lang = i18n.language
  return (
    <>
      <div className="main_box_bussines">
        <p className="welcomeParagraph">أهلا وسهلا بك في مكتب الأعمال </p>
        <Link to="/addoffice" className="add_office_link">
          أضف عقارك
        </Link>
      </div>
      <div className="howadd_container">
        <p className="how_title">كيف تستضيف؟</p>
        <div className="stepimgContainer">
          <img src={Step} alt="step" className="imgStep" />
        </div>
      </div>
      <div className="maktab_numbers_div">
        <h1 className="maktab_title">أرقام مكتب</h1>
        <div className="d-flex space_between">
          {DataNumbers.map((ele, index) => (
            <>
              <div className="numbers_box" key={index}>
                {/* map */}
                <div className="internal">
                  <div className="white_circle">
                    <img src={ele.icon} />
                  </div>
                  <p className="number_title">{ele.number} + </p>
                  <p className="number_subtitle"> {ele.title}</p>
                  <div className="border-white">
                    <span className="span_white">
                      <img src={BackWhite} className="img_white" />
                    </span>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
      {/* mobile app */}
      <div className="mobileAppContainer">
        <img src={MobileBg} alt="mobile_bg" className="mobile_bg" />

        <p className="titleMobile">تطبيق مكتب أعمال</p>
        <p className="mobile_sub_title">منصة شاملة لإدارة مكتبك مجاناً</p>
        <div className="divMobileApps">
          <img src={GooglePlayWhite} className="img1" alt="android" />
          <img src={AppStoreWhite} className="img1" alt="appstore" />
        </div>
      </div>

      {/* last Section */}
      <div className={styles.imgContainerAbor}>
        <div className={styles.divImgContent}>
          {/* <img src={Home3} className={styles.imgStyle} /> */}
          <p className={styles.headingStyle}>{t("about_us.tryhostig")}</p>
          <p className={styles.maktabParagraph}>{t("about_us.maktab")}</p>
          <p className={styles.addoffice}>{t("about_us.addoffice")}</p>
          <Link to="/addoffice" className={styles.registerofficeBtn}>
            {t("about_us.reg_office")}
          </Link>
        </div>
        <img src={Home1} className={styles.imgStyle} />
      </div>
    </>
  );
};

export default BussinesMainPage;
