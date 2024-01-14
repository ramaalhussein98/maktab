import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Box, Button, Divider, Paper } from "@mui/material";
import TranslateIcon from "@mui/icons-material/Translate";
import NotificationsIcon from "@mui/icons-material/Notifications";
import "../assets/css/language.css";
import { KSA, US } from "../assets/icons";

const NotificationsModal = () => {
  const { i18n } = useTranslation();
  const languageRef = useRef();
  const [showPaper, setShowPaper] = useState(false);
  const toggleshowPaper = () => {
    setShowPaper(!showPaper);
  };
  const toggleLanguage = () => {
    const currentLanguage = i18n.language;
    const newLanguage = currentLanguage === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    document.documentElement.lang = newLanguage;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setShowPaper(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <Box ref={languageRef} sx={{ position: "relative" }}>
      <Button onClick={toggleshowPaper}>
        <NotificationsIcon sx={{ color: "green" }} />
      </Button>
      {showPaper && (
        <Paper className="notificationsModal">
          <Box>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            vero velit sequi libero nulla est quos iure. At nam cum, excepturi
            corrupti atque dolorem repellendus omnis recusandae magni incidunt
            minus.
          </Box>
          <Divider sx={{ marginY: "8px" }} />
          <Box>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
            vero velit sequi libero nulla est quos iure. At nam cum, excepturi
            corrupti atque dolorem repellendus omnis recusandae magni incidunt
            minus.
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default NotificationsModal;
