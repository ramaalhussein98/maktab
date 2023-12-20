import React, { useEffect, useRef, useState } from "react";
import { Box, Container, Typography, Button, Grid } from "@mui/material";
import "../../../assets/css/details.css";
import { useTranslation } from "react-i18next";
import StarIcon from "@mui/icons-material/Star";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import IosShareIcon from "@mui/icons-material/IosShare";
import FavoriteIcons from "./details_component/FavoriteIcons";
import DetailsImages from "./details_component/details_lg_components/DetailsImages";
import DetailsCard from "./details_component/DetailsCard";
import DetailsTabs from "./details_component/details_lg_components/DetailsTabs";
import DetailsXsScreens from "./details_component/details_xs_components/DetailsXsScreens";
import SocailMedaiLinks from "./details_component/SocailMedaiLinks";
import AdCard from "../Home/components/AdCard";
import ChatIcon from "@mui/icons-material/Chat";
import { useParams } from "react-router";
import { useQueryHook } from "../../../hooks/useQueryHook";
import myAxios from "../../../api/myAxios";

const Details = () => {
  const { t } = useTranslation();
  const [isListOpen, setListOpen] = useState(false);
  const [isNewHome, setIsNewHome] = useState(false);
  const socialMediaLinksRef = useRef();
  const id = useParams().id;

  const getOfficeData = async () => {
    const res = await myAxios.get(`/api/v1/user/offices/${id}`);
    return res?.data?.data;
  };
  const { data, error, isError, isLoading, queryClient } = useQueryHook(
    "officeDetails",
    getOfficeData
  );
  const timestamp = data?.created_at;
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleDateString();
  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (
        socialMediaLinksRef.current &&
        !socialMediaLinksRef.current.contains(event.target)
      ) {
        setListOpen(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      // Clean up the event listener when the component unmounts
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);
  console.log(data);
  const filteredAds = [1, 2, 3, 4];
  return (
    <>
      {/* this section for md and above screens  */}
      <Box sx={{ display: { xs: "none", md: "block" }, marginTop: "2rem" }}>
        <Container
          sx={{
            maxWidth: "1400px !important",
            padding: { xs: "0px", sm: "24px" },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.5rem", md: "2.25rem" },
            }}
          >
            {data?.title}
          </Typography>
          <Box sx={{ display: "flex", marginY: "1rem" }}>
            <Box className="Box_ad_num">
              <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                {t("details_page.ad_num")}:
              </Typography>{" "}
              <Typography sx={{ marginX: "0.5rem", fontSize: "12px" }}>
                {/* {adInfo?.ref_number} */}
                {data?.ref_number}
              </Typography>
            </Box>
            <Box
              className="Box_ad_num"
              sx={{
                marginX: "0.3rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "12px" }}>
                {t("details_page.ad_date")}:
              </Typography>
              <Typography sx={{ marginX: "0.5rem", fontSize: "12px" }}>
                {formattedDate}
              </Typography>
            </Box>
          </Box>
          <Box
            className="d_flex_space_between"
            sx={{
              marginY: "2rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Typography
                sx={{
                  display: "flex",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <StarIcon
                  sx={{
                    color: "gold",
                    marginLeft: "3px",
                    fomtSize: "1.2rem",
                  }}
                />
                5
                {/* {adInfo?.user_rate === null
                    ? `(${0})`
                    : `(${adInfo?.user_rate})`} */}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: "var(--main-color)",
                    marginLeft: "3px",
                    fomtSize: "1.2rem",
                  }}
                />
                {data?.location?.address}
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <CropOriginalIcon
                  sx={{
                    color: "var(--main-color)",
                    marginLeft: "3px",
                    fomtSize: "1.2rem",
                  }}
                />
                {t("details_page.unit_area")}

                {data?.space}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "baseline",
                flexDirection: { xs: "column", md: "row" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  marginX: "0.3rem",
                  marginBottom: "4px",
                  fontSize: { xs: "13px", md: "15px" },
                }}
              >
                <FavoriteIcons
                //   adInfo={adInfo}
                ></FavoriteIcons>
                {t("details_page.fav_button")}
              </Box>

              <Button
                sx={{
                  color: "inherit",
                  marginX: "0.3rem",
                  position: "relative",
                  padding: "0",
                }}
                onClick={() => setListOpen(!isListOpen)}
                ref={socialMediaLinksRef}
              >
                <IosShareIcon sx={{ marginLeft: "3px" }} />
                {t("details_page.share_button")}
                {isListOpen && <SocailMedaiLinks />}
              </Button>
            </Box>
          </Box>
          <DetailsImages data={data} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: "1.5rem", md: "2.25rem" },
                }}
              >
                {t("details_page.details_title")}
              </Typography>
              <Typography sx={{ fontSize: { xs: "15px", md: "18px" } }}>
                {data?.description}
              </Typography>

              <Box
                className="d_flex_space_between"
                sx={{
                  padding: "23px 40px",
                  backgroundColor: "#eee",
                  borderRadius: "20px",
                  marginY: "2rem",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{
                      color: "red",
                      fontWeight: "bold",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {t("new")}
                  </Typography>
                  <Typography sx={{ fontSize: "18px" }}>
                    {t("Newly_added_office")}
                  </Typography>
                </Box>
                <Box sx={{ alignItems: "center", display: "flex" }}>
                  <StarIcon
                    sx={{ color: "#009fff", width: "3rem", height: "3rem" }}
                  />
                </Box>
              </Box>

              <DetailsTabs adInfo={data} />
            </Grid>
            <Grid item xs={12} md={4}>
              <DetailsCard />
              <button className="chat_button">
                <ChatIcon className="icon_style" />
                تواصل مع المكتب
              </button>
            </Grid>
          </Grid>
          {/* similar ads */}

          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: "bold",
                marginTop: "2rem",
                fontSize: { xs: "1.5rem", md: "2rem" },
                marginBottom: "1rem",
              }}
            >
              {t("details_page.similer_sec_title")}
            </Typography>
            <Box>
              <Grid
                container
                spacing={2}
                sx={{ justifyContent: "center", width: "100%" }}
              >
                {filteredAds?.map((ad, i) => (
                  <Grid
                    item
                    xs={10}
                    sm={6}
                    md={4}
                    lg={3}
                    key={i}
                    sx={{
                      paddingLeft: {
                        xs: "0px !important",
                        sm: "16px !important",
                      },
                    }}
                  >
                    <AdCard key={ad.id} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* this section page for xs screens */}
      <DetailsXsScreens adInfo={data} />
    </>
  );
};

export default Details;
