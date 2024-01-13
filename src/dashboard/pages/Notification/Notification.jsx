import React, { useState, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";

import Pagination from "../../../ui/Pagination";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../../ui/Loader";

import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useTranslation } from "react-i18next";

const columns = [
  { label: "معرف", width: "10%" },

  { label: "عنوان الاشعار", width: "20%" },
  { label: "وصف الاشعار", width: "40%" },
  { label: "الخيارات", width: "10%" },
];

const Notification = () => {
  // const { data, isLoading, get } = useDataFetcher();
  const { i18n } = useTranslation();
  const lang = i18n.language;

  // const {
  //   data: deleteData,
  //   isLoading: deleteisLoading,
  //   get: deleteGet,
  // } = useDataFetcher();

  const [NotiData, setNotiData] = useState([]);
  const [per_page, set_per_page] = useState();
  const [current_page, set_current_page] = useState(1);

  // useEffect(() => {
  //   get(`api/user/get_user_notifications?page=${current_page}`);
  // }, [current_page]);

  // useEffect(() => {
  //   if (data) {
  //     setNotiData(data.notifications.data);
  //   }
  // }, [data]);

  const [last_page, set_last_page] = useState();

  // useEffect(() => {
  //   if (data) {
  //     set_current_page(data.notifications.current_page);
  //     set_per_page(data.notifications.per_page);
  //     // setAds(data.ads.data);
  //     set_last_page(data.notifications.last_page);
  //   }
  // }, [data]);
  const containerRef = useRef(null);

  const handlePageChange = (event, new_page) => {
    const container = containerRef.current;
    container.scrollTop = 0;
    container.scrollIntoView({ behavior: "smooth" });
    set_current_page(new_page);
  };
  const DeleteNotification = (event, id) => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?",
      text:
        lang === "ar"
          ? "لايمكنك التراجع بعد التأكيد"
          : "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: lang === "ar" ? "الغاء" : "cancel",
      confirmButtonColor: "#14b183",
      cancelButtonColor: "#d33",
      confirmButtonText: lang === "ar" ? "تأكيد الحذف!" : "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log("DeleteNotification called with id:", id);
        if (id) {
          deleteGet(`api/user/delete_user_notification/${id}`);
          // console.log("Deleting notification with id:", id);
          setTimeout(() => {
            get(`api/user/get_user_notifications`);
          }, 1000);
        }
      }
    });
  };

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Box
        ref={containerRef}
        sx={{
          width: { xs: "100%", md: "100%", overflowX: "scroll" },
          // marginRight: { xs: "0", lg: "-40px" },
          backgroundColor: "white",
          padding: "1rem",
          borderRadius: "15px",
          margin: "auto",
        }}
      >
        <Box sx={{ minWidth: "500px", minHeight: "600px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom: "1px solid #eee",
              paddingY: "1rem",
            }}
          >
            {columns.map((column, index) => (
              <Typography
                key={index}
                sx={{
                  width: column.width,
                  textAlign: "center",
                  color: "var(--green-color)",
                }}
              >
                {column.label}
              </Typography>
            ))}
          </Box>

          {NotiData?.map((row, i) => (
            <Box
              key={row.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                paddingY: "1rem",
                borderBottom: "1px solid #eee",
              }}
            >
              <Typography sx={{ width: "10%", textAlign: "center" }}>
                {row.id}
              </Typography>

              <Typography sx={{ width: "20%", textAlign: "center" }}>
                {row.ar_title}
              </Typography>
              <Typography sx={{ width: "40%", textAlign: "center" }}>
                <Link
                  to={row.url}
                  style={{ color: "black", textDecoration: "none" }}
                >
                  {row.ar_body}
                </Link>
              </Typography>
              <Typography sx={{ width: "10%", textAlign: "center" }}>
                <DeleteIcon
                  sx={{ color: "red", cursor: "pointer" }}
                  onClick={(event) => DeleteNotification(event, row.id)}
                />
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Pagination
        handlePageChange={handlePageChange}
        current_page={current_page}
        per_page={per_page}
        last_page={last_page}
      />
    </>
  );
};

export default Notification;
