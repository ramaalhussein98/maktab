import React from "react";
import styles from "../../../assets/css/home.module.css";
import { Typography, Container } from "@mui/material";
import { Home1, Home3, BG } from "../../../assets/images";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AboutUs = () => {
  const { t, i18n } = useTranslation();
  return (
    <>
      <Container>
        <p className={styles.headingStyle}> {t("about_us.aboutus")}</p>
        <p className={styles.pExplain}>
          الضرر/التلف المباشر: هو أي تلف أو خسارة يتكبدها المضيف بسبب سوء
          استخدام الضيف للمتلكات الموجودة داخل الوحدة السكنية المغطاة و يكون
          الضيف هو المتسبب المباشر إما بدفع، ضغط أو سحب أي من الممتلكات الموجودة
          داخل الوحدة السكنية يؤدي لكسرها أو تغير في هيأتها أو بسبب سقوط أداة
          حادة أو ساخنة على أي من الممتلكات الموجودة داخل الوحدة السكنية و ألا
          يكون التلف مترتب على تلف سابق لم تتم صيانته. إثبات قيمة الخسارة: أي
          مستند يثبت صحة مبلغ التعويض الذي يطالب به المضيف لتغطية قيمة الضرر و
          الخسارة، وقد يكون الإثبات بأي شكل من الأشكال التالية: فاتورة دفع.
          تسعيرة للخدمة/المنتج المطلوبة لتعويض الخسارة. رابط مباشر للمنتج من
          موقع التاجر الذي يوفر المنتج. الاحتيال: أي محاولة للتكسب المادي من
          برنامج حماية المضيف عن طريق تقديم مطالبات بالتعويض لخسائر مفتعلة من
          قبل المضيف أو لخسائر غير حقيقية لم تحدث على أرض الواقع. سياسة/شروط
          الحجز: أي شروط يضعها المضيف على الوحدات السكنية المعروضة التابعة له
          (مثل أوقات الدخول/الخروج، التدخين و الحيوانات الأليفة). الخسائر
          المغطاة: التلفيات والأضرار المادية المباشرة للممتلكات المضيف داخل
          الوحدة السكنية المغطاة و التي تسبب بها الضيف المغطى أو أحد زواره. الحد
          الأقصى للتعويض: الحد الأقصى للتعويض هو ما تساوي قيمته 5,000 ريال.
          الوحدة السكنية المغطاة: أي وحدة سكنية خاصة معروضة من قبل المضيف و
          تكون: مملوكة للمضيف. مستأجرة من قبل المضيف، مع أخذ الإذن من مالك
          العقار أو من ينوب عنه بتأجيرها بالباطن. الضيف المغطى: أي ضيف قام بحجز
          الوحدة السكنية المغطاة والإقامة بها خلال فترة حدوث الضرر أو الخسارة.
        </p>
      </Container>
      <div className={styles.imgContainerAbor}>
        <div className={styles.divImgContent}>
          {/* <img src={Home3} className={styles.imgStyle} /> */}
          <Typography className={styles.headingStyle}>
            {t("about_us.tryhostig")}
          </Typography>
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

export default AboutUs;
