import React, { useState } from "react";
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
import StepperBussines from "./components/StepperBussines";
import { useSpring, animated } from "react-spring";
const DataNumbers = [
  { number: 4000, title: "مكنب مسجل على المنصة", icon: Home },
  { number: 180, title: "  مدينة ومحافظة نغطيها ", icon: Location2 },
  { number: 2000000, title: "   ضيوف موثوقين  ", icon: Gust },
  { number: 500, title: "    مضيف لديهم حجوزات  ", icon: Users },
];

const BussinesMainPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const user_type_bussines =
    localStorage.getItem("user_type") === "bussines" ? true : false;

  const AnimatedNumbers = DataNumbers.map((ele, index) => {
    const props = useSpring({
      number: ele.number,
      from: { number: 0 },
    });

    return (
      <div key={index}>
        <div className="numbers_box">
          <div className="internal">
            <div className="white_circle">
              <img src={ele.icon} alt={`icon-${index}`} />
            </div>
            <animated.p className="number_title">
              {props.number.interpolate((val) => `${Math.floor(val)} +`)}
            </animated.p>
            <p className="number_subtitle">{ele.title}</p>
            <div className="border-white">
              <span className="span_white">
                <img
                  src={BackWhite}
                  className="img_white"
                  alt={`back-white-${index}`}
                />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="main_box_bussines">
        <p className="welcomeParagraph">أهلا وسهلا بك في مكتب الأعمال </p>
        {user_type_bussines ? (
          <Link to="/addoffice" className="add_office_link">
            أضف عقارك
          </Link>
        ) : (
          <p className="add_office_link">
            يرجى تسجيل الدخول كأعمال لتتمكن من أضافة مكتبك
          </p>
        )}
      </div>
      <div className="howadd_container">
        <p className="how_title">كيف تستضيف؟</p>
        <StepperBussines />
        {/* <div className="stepimgContainer">
          <img src={Step} alt="step" className="imgStep" />
        </div> */}
      </div>
      <div className="maktab_numbers_div">
        <h1 className="maktab_title">أرقام مكتب</h1>
        <div className="d-flex space_between">{AnimatedNumbers}</div>
      </div>
      {/* mobile app */}
      {/* <div className="mobileAppContainer">
        <img src={MobileBg} alt="mobile_bg" className="mobile_bg" />

        <p className="titleMobile">تطبيق مكتب أعمال</p>
        <p className="mobile_sub_title">منصة شاملة لإدارة مكتبك مجاناً</p>
        <div className="divMobileApps">
          <img src={GooglePlayWhite} className="img1" alt="android" />
          <img src={AppStoreWhite} className="img1" alt="appstore" />
        </div>
      </div> */}
      <div className="mobileContainer2">
        <div>img</div>
        <div className="appDownlaodContiner">
          <p className="titleApp">حمل التطبيق الاّن</p>
          <div className="barPurple"></div>
          <p>
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem
          </p>
          <div className="d-flex m-5 justify-center ">
            <img src={GooglePlayWhite} className="img1 ml-5" alt="android" />
            <img src={AppStoreWhite} className="img1" alt="appstore" />
          </div>
        </div>
      </div>

      {/* last Section */}
      <div className={styles.imgContainerAbor}>
        <div className={styles.divImgContent}>
          <p className={styles.headingStyle}>{t("about_us.tryhostig")}</p>
          <p className={styles.maktabParagraph}>{t("about_us.maktab")}</p>
          <p className={styles.addoffice}>{t("about_us.addoffice")}</p>
          {user_type_bussines ? (
            <Link to="/addoffice" className={styles.registerofficeBtn}>
              {t("about_us.reg_office")}
            </Link>
          ) : (
            <p className={styles.registerofficeBtn}>
              يرجى تسجيل الدخول كأعمال لتتمكن من أضافة مكتبك
            </p>
          )}
        </div>
        <img src={Home1} className={styles.imgStyle} />
      </div>
    </>
  );
};

export default BussinesMainPage;
