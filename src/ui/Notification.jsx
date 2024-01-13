import React, { useState, useEffect, useRef, useContext } from "react";
import { Box, Typography } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { isBefore, subDays } from "date-fns";
import Brightness1Icon from "@mui/icons-material/Brightness1";
import myAxios from "../api/myAxios";
import styles from "../assets/css/notification.module.css";

const Notification = ({}) => {
  const notificationRef = useRef(null);
  const notificationIconRef = useRef(null);
  const [openNotifivations, setOpenNotification] = useState(false);
  const [seenNotification, setseenNotification] = useState();

  // user_seen_notifications
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [notificationData, setNotificationData] = useState([]);
  // useEffect(() => {
  //   const isUser = localStorage.getItem("user_token") ? true : false;
  //   if (isUser) {
  //     setTimeout(() => {
  //       getNotiData("api/user/get_user_notifications");
  //     }, 2000);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (notiData) {
  //     setNotificationData(notiData);
  //     setseenNotification(!!notiData?.count > 0);
  //   }
  // }, [notiData]);

  const handleOpenNotification = () => {
    setOpenNotification(!openNotifivations);
    // get(`api/user/user_seen_notifications`);
    setseenNotification(false);
  };

  const handleOutsideClick = (event) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target) &&
      !notificationIconRef.current.contains(event.target)
    ) {
      setOpenNotification(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // const { isUserSelected, setIsUserSelected, setRecipientId } =
  //   useContext(ChatContext);

  const openChat = (e, not) => {
    const arTitle = not?.ar_title.toLowerCase();
    const wordToCheck = "رسالة";

    if (arTitle.includes(wordToCheck) && notType === "message") {
      e.preventDefault();
      const notType = JSON.parse(not.url).type;
      const notId = JSON.parse(not.url).user_id;
      // setIsUserSelected(true);
      // setRecipientId(notId);
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <NotificationsIcon
        ref={notificationIconRef}
        sx={{ fontSize: "28px", color: "var(--green-color)", marginTop: "5px" }}
        onClick={handleOpenNotification}
      />
      {seenNotification ? <Box className={styles.circle} /> : ""}
      {openNotifivations && (
        <Box
          ref={notificationRef}
          sx={{
            backgroundColor: "white",
            boxShadow: "5",
            minWidth: "20rem",
            textAlign: lang === "ar" ? "right" : "left",

            borderRadius: "1rem",
            zIndex: "10",
            position: "absolute",
            left: "-120px",
            top: " 3rem",
            overflow: "auto",
            height: "320px",
            padding: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                color: "black",
                padding: " 10px",
                fontWeight: "600",
              }}
            >
              {t("notifications.title")}
            </Typography>
            <Link
              to="/dashboard/notifications"
              style={{ textDecoration: "none" }}
            >
              <Typography sx={{ color: "var(--green-color)", marginX: "5px" }}>
                عرض الكل
              </Typography>
            </Link>
          </Box>

          {notificationData &&
            notificationData?.notifications?.data?.map((notification, i) => {
              const createdAt = new Date(notification.created_at);
              const now = new Date();
              const isMoreThanADayAgo = isBefore(createdAt, subDays(now, 1));

              return (
                Number(notification.seen) === 0 && (
                  <Box
                    key={notification.id}
                    sx={{ borderBottom: "1px solid #eee", padding: "0.5rem" }}
                  >
                    <a
                      onClick={(e) => openChat(e, notification)}
                      href={notification.url}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <Typography sx={{ color: "var(--green-color)" }}>
                        {lang === "ar"
                          ? notification.ar_title
                          : notification.en_title}
                      </Typography>
                      <Typography>
                        {lang === "ar"
                          ? notification.ar_body
                          : notification.en_body}
                      </Typography>
                      <Typography
                        sx={{
                          textAlign: "left",
                          color: "gray",
                          fontSize: "11px",
                        }}
                      >
                        {isMoreThanADayAgo
                          ? new Date(
                              notification.created_at
                            ).toLocaleDateString()
                          : new Date(
                              notification.created_at
                            ).toLocaleTimeString()}
                      </Typography>
                    </a>
                  </Box>
                )
              );
            })}
        </Box>
      )}
    </Box>
  );
};

export default Notification;
