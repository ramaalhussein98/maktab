import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-cropper";
import { Button, Modal, Box, Typography } from "@mui/material";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import CropIcon from "@mui/icons-material/Crop";
import styles from "../../../../assets/css/cropperImage.module.css";
import "cropperjs/dist/cropper.css";
import { useTranslation } from "react-i18next";

const CropeerImage = ({
  type,
  width,
  height,
  maxImages,
  hasBackground = true,
  formData,
  setFormData,
  setSelectedImages,
  setImages,
  selectedImage,
  setSelectedImage,
  thumbnail,
  setThumbnail,
}) => {
  const { t } = useTranslation();
  const [isImageSelected, setIsImageSelected] = useState();
  // Added hasBackground prop with default value
  const cropperRef = useRef(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const button = document.getElementById("cropper-button");
    if (button) {
      const hasImageBackground = button.style.backgroundImage !== "";
      button.style.color = hasImageBackground
        ? "var(--main-color)"
        : "rgb(118, 118, 118)";
    }
  }, [selectedImage]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (type === 1) {
      setSelectedImage(null);
    } else {
      setIsImageSelected(null);
    }
    setOpen(false);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (type === 1) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setSelectedImage(reader.result);
          handleOpen();
        };
        reader.readAsDataURL(file);
      }
    }
    if (type === 2) {
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setIsImageSelected(reader.result);

          handleOpen();
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleCrop = async () => {
    if (cropperRef.current) {
      const counter = 0;
      const croppedCanvas = cropperRef.current.cropper.getCroppedCanvas();
      if (croppedCanvas) {
        const croppedImageUrl = croppedCanvas.toDataURL();
        const webpBlob = await new Promise((resolve) => {
          croppedCanvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/webp",
            0.5
          ); // Adjust quality (0.0 to 1.0) as needed
        });

        const file = new File(
          [webpBlob],
          `croppedImage${counter}.webp`,
          {
            type: webpBlob.type,
          },
          0.5
        );

        if (type === 1) {
          setThumbnail(croppedImageUrl);
          setFormData((prevFormData) => ({
            ...prevFormData,
            thumbnail: file,
          }));
        }
        if (type === 2) {
          setImages((prev) => [...prev, croppedImageUrl]);
          setSelectedImages((prevImages) => [...prevImages, file]);
          setFormData((prevFormData) => ({
            ...prevFormData,
            images: prevFormData?.images
              ? [...prevFormData?.images, file]
              : [file], // Append new blob to the array
          }));
        }
      }
    }
    handleClose();
  };
  const inputRef = useRef(null);

  const handleChooseImage = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div dir="ltr">
      <Button
        id="cropper-button"
        sx={{
          border: "1px dashed gray",
          borderRadius: "12px",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          width: width || "100%",
          height: height || "200px",
          backgroundColor: "transparent",
          marginBottom: "1rem",

          "&:hover": {
            backgroundColor: "rgba(90, 64, 155, 0.04)",
          },
        }}
        style={{
          backgroundImage:
            hasBackground && thumbnail ? `url(${thumbnail})` : "none", // Set thumbnail as the background image if hasBackground is true
        }}
        onClick={handleChooseImage}
      >
        {hasBackground && thumbnail ? (
          <>
            <img
              src={
                `https://www.dashboard.aqartik.com/assets/images/deal/image/${formData?.thumbnail?.name}` ||
                thumbnail
              }
              alt="Selected Image"
              style={{ display: "none" }}
            />
            <Box
              sx={{
                borderRadius: "12px",
                padding: "1rem",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(10px)",
                backgroundColor: "transparent",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "var(--main-color)",
              }}
            >
              <AddAPhotoOutlinedIcon
                sx={{
                  width: "1.5em",
                  height: "1.5em",
                  marginRight: "0.5rem",
                }}
              />
              <Typography>{t("dashboard.property_images.edit_btn")}</Typography>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              borderRadius: "12px",
              padding: "1rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <AddAPhotoOutlinedIcon
              sx={{
                width: "1.5em",
                height: "1.5em",
                color: "rgb(118, 118, 118)",
                marginRight: "0.5rem",
              }}
            />
            <Typography
              sx={{
                color: "rgb(118, 118, 118)",
              }}
            >
              {t("dashboard.property_images.btn3")}
            </Typography>
          </Box>
        )}
      </Button>
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        style={{ display: "none" }}
        onChange={handleImageSelect}
      />
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backdropFilter: "blur(20px)",
            background: "rgba(255, 255, 255, 0.4)",
            borderRadius: "24px",
            p: 4,
            textAlign: "center",
          }}
        >
          {selectedImage || isImageSelected ? (
            <>
              <Cropper
                src={selectedImage || isImageSelected}
                style={{
                  height: "400px",
                  width: "100%",
                }}
                initialAspectRatio={16 / 9}
                guides={false}
                ref={cropperRef}
                viewMode={1}
                dragMode="move"
                background={false}
                className={`${styles.custom_cropper} custom_cropper`}
              />
              <Button
                sx={{
                  backgroundColor: "var(--main-color)",
                  color: "white",
                  marginTop: "1rem",
                  padding: "0.5rem 1rem",
                  "&:hover": {
                    backgroundColor: "#35846c",
                    color: "white",
                  },
                }}
                onClick={handleCrop}
              >
                <CropIcon sx={{ marginX: "0.3rem" }} />
                {t("dashboard.property_images.cut_btn")}
              </Button>
            </>
          ) : (
            ""
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CropeerImage;
