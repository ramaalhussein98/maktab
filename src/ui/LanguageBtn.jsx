import React from "react";
import { useTranslation } from "react-i18next";
import { languageImg } from "../assets/icons";
import { Button } from "@mui/material";

const LanguageBtn = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  return (
    <Button onClick={toggleLanguage}>
      <img src={languageImg} alt="language" style={{ width: "16px" }} />
    </Button>
  );
};

export default LanguageBtn;
