import React, { useState, useRef, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import CropeerImage from "./CropeerImage";
import DeleteIcon from "@mui/icons-material/Delete";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import myAxios from "../../../../api/myAxios";
// import Image from "next/image";

// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const UnitImages = ({
  images,
  mainImage,
  type = 1,
  onCancel,
  id,
  refetch,
  setIsChangingData,
}) => {
  const { t, i18n } = useTranslation();
  const [readyImages, setReadyImages] = useState(
    images?.filter((ele) => ele.type_file === "image")
  );
  const [selectedImage, setSelectedImage] = useState();

  const [thumbnail, setThumbnail] = useState(mainImage);
  const lang = i18n.language;
  const [selectedVideoFile, setSelectedVideoFile] = useState(
    images?.find((ele) => ele.type_file === "video")
  );
  const [selectedVideoFileId, setSelectedVideoFileId] = useState(
    images?.find((ele) => ele.type_file === "video")
  );
  const [_images, setImages] = useState([]);
  console.log(selectedVideoFileId);
  useEffect(() => {
    // Update the formData when selectedImages or selectedVideoFile changes
    if (selectedVideoFile) {
      // dispatch({ type: "video", value: selectedVideoFile });
      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   video: selectedVideoFile,
      // }));
    }
  }, [selectedVideoFile]);

  const handleDeleteImage = (index) => {
    setImages((prevImages) => {
      const updatedImages = [...prevImages];
      updatedImages.splice(index, 1);
      return updatedImages;
    });
  };

  const handleDeleteReadyImages = (index) => {
    Swal.fire({
      title: lang === "ar" ? "هل أنت متأكد؟" : "Are you sure?",
      text:
        lang === "ar"
          ? "أنت على وشك حذف العنصر"
          : "You are about to delete this box.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: lang === "ar" ? "نعم، احذف" : "Yes, delete it!",
      cancelButtonText: lang === "ar" ? "لا" : "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onRemove(index); // Call the onRemove function to delete the box
      }
    });
  };
  const onRemove = async (index) => {
    await myAxios
      .delete(`/api/v1/user/offices/deleteFiles/${id}`, {
        data: {
          file_id: index,
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          setReadyImages((prevImages) => {
            const updatedImages = prevImages.filter(
              (image) => image.id !== index
            );
            return updatedImages;
          });
        }
      });
  };
  const handleDeleteVideo = (index) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this box.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onVideoRemove(index); // Call the onRemove function to delete the box
      }
    });
  };

  const onVideoRemove = async (index) => {
    await myAxios
      .delete(`/api/v1/user/offices/deleteFiles/${id}`, {
        data: {
          file_id: index,
        },
      })
      .then((res) => {
        if (res.data.status === true) {
          setSelectedVideoFile(null);
          setSelectedVideoFileId(null);
          refetch();
        } else {
          setSelectedVideoFileId(null);
          setSelectedVideoFile(null);
          refetch();
        }
      });
  };

  const handleVideoSelect = (event) => {
    const file = event.target.files[0];
    const video = document.createElement("video");
    const reader = new FileReader();

    reader.onload = function () {
      video.src = URL.createObjectURL(file);

      video.addEventListener("loadedmetadata", function () {
        const duration = video.duration;

        if (duration > 30) {
          toast.error("لايمكن تجاوز عدد الثواني المسموح به");
          setSelectedVideoFile(null);
        } else {
          setSelectedVideoFile(file);
        }

        // Optionally, you can remove the video element from the DOM
        video.remove();
      });
    };
    reader.readAsDataURL(file);
  };

  const handleButtonClick = () => {
    document.getElementById("video-input").click();
    if (selectedVideoFile) {
      // Clear the selected video file
      setSelectedVideoFile(null);
    }
  };
  const handleSubmit = async () => {
    setIsChangingData(true);
    const updateFiles = new FormData();
    updateFiles.append("main_image", thumbnail.file);
    if (
      selectedVideoFileId &&
      typeof selectedVideoFile === "object" &&
      selectedVideoFile instanceof File
    ) {
      updateFiles.append("video[id]", selectedVideoFileId.id);
      updateFiles.append("video[video]", selectedVideoFile);
    }
    const addFiles = new FormData();
    _images.forEach((file) => {
      addFiles.append("images[]", file.file);
    });
    if (!selectedVideoFileId) {
      addFiles.append("video", selectedVideoFile);
    }
    await myAxios.post(`/api/v1/user/offices/updateFiles/${id}`, updateFiles);

    await myAxios.post(`/api/v1/user/offices/addFiles/${id}`, addFiles);
    setIsChangingData(false);

    await refetch();
    onCancel();
  };
  return (
    <Box>
      <Box sx={{ marginY: "14px", fontSize: "16px", fontWeight: "600" }}>
        <div className="flex justify-between items-center">
          <div>
            <Typography variant="label">
              {t("dashboard.property_images.label1")}
            </Typography>
            <Typography
              sx={{
                fontWeight: "400",
                fontSize: "16px",
                color: "rgb(118, 118, 118)",
              }}
            >
              {lang === "ar"
                ? "عدد الثواني المسموح بها 30 ثانية"
                : "The number of seconds allowed is 30 seconds"}
            </Typography>
          </div>
          {selectedVideoFileId && (
            <button
              onClick={() => handleDeleteVideo(selectedVideoFileId.id)}
              className="bg-red-500 text-white p-2 rounded-md text-sm"
            >
              {lang === "ar" ? "حذف الفيديو" : "delete video"}{" "}
            </button>
          )}
        </div>
        <Box>
          <input
            id="video-input"
            type="file"
            accept="video/*"
            onChange={handleVideoSelect}
            style={{ display: "none" }}
          />
          <Button
            onClick={handleButtonClick}
            sx={{
              minWidth: "64px",
              padding: "6px 8px",
              width: "100%",
              height: "200px",
              border: "1px dashed gray",
              marginY: "1rem",
            }}
          >
            {selectedVideoFile ? (
              typeof selectedVideoFile === "object" &&
              selectedVideoFile instanceof File ? (
                <video autoPlay style={{ width: "100%", height: "100%" }}>
                  <source src={URL.createObjectURL(selectedVideoFile)} />
                </video>
              ) : (
                <video autoPlay style={{ width: "100%", height: "100%" }}>
                  <source
                    src={`https://dashboard.maktab.sa/${selectedVideoFile?.path}`}
                  />
                </video>
              )
            ) : (
              <Box
                sx={{
                  color: "rgb(118, 118, 118)",
                  fontSize: "1rem",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <VideoCallIcon
                  sx={{
                    width: "1.5em",
                    height: "1.5em",
                    color: "rgb(118, 118, 118)",
                    display: "block",
                    margin: "auto",
                  }}
                />
                <Typography> {t("dashboard.property_images.btn1")} </Typography>
              </Box>
            )}
          </Button>
        </Box>

        <Typography variant="label">
          {" "}
          {t("dashboard.property_images.label2")}
        </Typography>

        <CropeerImage
          type={1}
          isFirstButton={true}
          setImages={setImages}
          setThumbnail={setThumbnail}
          thumbnail={thumbnail}
          selectedImage={selectedImage}
          noBackground={true}
          setSelectedImage={setSelectedImage}
        />

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <CropeerImage
            type={2}
            width="150px"
            height="120px"
            maxImages={8}
            hasBackground={false} // Set hasBackground prop to false
            setImages={setImages}
            noBackground={false}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />

          {_images.map((image, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "250px", sm: "150px" },
                height: "120px",
                borderRadius: "12px",
                overflow: "hidden",
                marginBottom: "1rem",
                position: "relative",
              }}
            >
              <Typography
                sx={{
                  position: "absolute",
                  top: "0rem",
                  left: "0rem",
                  color: "white",
                  padding: "0.2rem 0.4rem",
                  background: "rgba(0, 0, 0, 0.5)",
                  fontSize: "12px",
                  fontWeight: "600",
                  borderRadius: "12px 0px",
                  backgroundColor: "rgba(17, 17, 17, 0.47)",
                  width: "32px",
                  height: "24px",
                  textAlign: "center",
                }}
              >
                {index + 1}
              </Typography>

              <img
                key={index}
                src={image.show}
                alt={`Selected Image ${index}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <DeleteIcon
                sx={{
                  position: "absolute",
                  top: "0rem",
                  right: "0rem",
                  color: "white",
                  cursor: "pointer",
                  // zIndex: 1,
                  padding: "4px",
                  borderRadius: "0px 0px 0px 12px",
                  background:
                    "radial-gradient(at left bottom, rgba(255, 0, 0, 0.67) 0%, rgba(255, 0, 0, 0.2) 75%)",
                }}
                onClick={() => handleDeleteImage(index)}
              />
            </Box>
          ))}
        </Box>
      </Box>
      {type === 1 && (
        <>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "600",
              marginBottom: "24px",
              marginTop: "8px",
              fontSize: { xs: "1.2rem", md: "1.5rem" },
            }}
          >
            {" "}
            {lang === "ar" ? "الصور التي تم اضافتها" : "images that been added"}
          </Typography>
          <Box sx={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {readyImages.map((image, index) => (
              <Box
                key={index}
                sx={{
                  width: { xs: "200px", sm: "150px" },
                  height: "120px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  marginBottom: "1rem",
                  position: "relative",
                }}
              >
                <Typography
                  sx={{
                    position: "absolute",
                    top: "0rem",
                    left: "0rem",
                    color: "white",
                    padding: "0.2rem 0.4rem",

                    background: "rgba(0, 0, 0, 0.5)",
                    fontSize: "12px",
                    fontWeight: "600",
                    borderRadius: "12px 0px",
                    backgroundColor: "rgba(17, 17, 17, 0.47)",
                    width: "32px",
                    height: "24px",
                    textAlign: "center",
                  }}
                >
                  {index + 1}
                </Typography>

                <img
                  key={index}
                  src={`https://dashboard.maktab.sa/${image.path}`}
                  alt={`Selected Image ${index}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <DeleteIcon
                  sx={{
                    position: "absolute",
                    top: "0rem",
                    right: "0rem",
                    color: "white",
                    cursor: "pointer",
                    // zIndex: 1,
                    padding: "4px",
                    borderRadius: "0px 0px 0px 12px",
                    background:
                      "radial-gradient(at left bottom, rgba(255, 0, 0, 0.67) 0%, rgba(255, 0, 0, 0.2) 75%)",
                  }}
                  onClick={() => handleDeleteReadyImages(image.id)}
                />
              </Box>
            ))}
          </Box>
        </>
      )}
      <Box
        sx={{
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.12)",
          margin: "2rem 4rem",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "1rem ",
          marginInline: "auto",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{
            fontWeight: "600",
            borderRadius: "8px",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "var(--main-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "#0b7b5a",
              color: "white",
            },
          }}
        >
          {t("dashboard.outgoing_requests.submit_btn")}
        </Button>
        <Button
          sx={{
            fontWeight: "600",
            borderRadius: "8px",

            border: "1px solid var(--main-color)",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "white",
            color: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#e5f9f4",
            },
          }}
          onClick={onCancel}
        >
          {t("dashboard.outgoing_requests.cancel_btn")}
        </Button>
      </Box>
    </Box>
  );
};

export default UnitImages;
