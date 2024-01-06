import { Link, useLocation } from "react-router-dom";
import LanguageBtn from "../../../ui/LanguageBtn";
import { Box, Button, Container, Grid } from "@mui/material";
import { AdCard } from "./components";
import "../../../assets/css/home.css";
import { Filter, Search, MapIcon, LoginSvgGray } from "../../../assets/icons";
import FilterModal from "./components/Modals/FilterModal";
import { useEffect, useState } from "react";
import FilterSkeleton from "../../../ui/FilterSkeleton";
import CardSkeleton from "../../../ui/CardSkeleton";
import Banner from "./components/Banner";
import FilterSection from "./components/Filter_components/FilterSection";
import LogInModal from "../../../authentication/LogInModal";
import PhoneIcon from "@mui/icons-material/Phone";
import StarIcon from "@mui/icons-material/Star";
import ListIcon from "@mui/icons-material/List";
import FavoriteIcon from "@mui/icons-material/Favorite";
import myAxios from "../../../api/myAxios";
import Pagination from "../../../ui/Pagination";
import { useQueryHook } from "../../../hooks/useQueryHook";
import { useOfficeHook } from "../../../hooks/useOfficeHook";
import NoData from "../../../ui/NoData";
import Map from "../map/Map";
import { useTranslation } from "react-i18next";
import Footer from "../../Layouts/Footer";

const HomePage = () => {
  const isCardLoading = false;
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation().pathname;
  const [page, setpage] = useState(1);
  const { t, i18n } = useTranslation();
  const [toggleMapAds, setToggleMapAds] = useState(false);

  const [toggleMapAdsClass, setToggleMapAdsClass] = useState(false);
  const [filter, setFilter] = useState({
    // "exact[category_aqar.id]": null,
    // "contains[title]": "",
    // "in[ads_rooms.number][0]": "",
    // "in[ads_rooms.id][0]": "",
    // "in[ads_rooms.number][1]": "",
    // "in[ads_rooms.id][1]": "",
    // "in[ads_rooms.number][2]": "",
    // "in[ads_rooms.id][2]": "",
    //     in[comforts.id][0]
    // in[comforts.id][1]
  });
  const {
    isLoading,
    isError,
    data = { data: [], totalPages: 0 },
    refetch,
    isRefetching,
  } = useOfficeHook({
    page: page,
    filter: filter,
  });

  const isMapPage = location.split("/").includes("map");

  const paginationData = {
    data: {
      currentPage: data?.current_page,
      lastPage: data?.last_page,
    },
  };

  const handleOpenModal = () => {
    // if (isLoggedIn) {
    //   setShowLogout((prev) => !prev);
    // } else {
    //   setOpenModal(true);
    // }
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  const handleToggleMapAds = () => {
    const element = document.querySelector(".numberAdsInMapContainer");
    if (element) {
      element.classList.toggle("slideUp");
    }
    setTimeout(() => {
      setToggleMapAds(!toggleMapAds);
    }, 500);
  };
  console.log("data pi", data);
  return (
    <>
      {!toggleMapAds ? (
        <div>
          <Banner />
          <Container
            sx={{
              maxWidth: "1400px !important",
              padding: { xs: "0px", sm: "24px" },
              position: "relative",
            }}
          >
            {/* filters section */}
            <FilterSection
              refetch={refetch}
              filter={filter}
              setFilter={setFilter}
              toggleMapAds={toggleMapAds}
              setToggleMapAds={setToggleMapAds}
            />
            {/* this ads section */}
            <div className="cards_container">
              {/* button map */}

              <Grid
                container
                spacing={2}
                sx={{
                  justifyContent: "center",
                  width: "100%",
                  margin: { xs: "auto" },
                }}
              >
                {isLoading ? (
                  Array.from({ length: 8 }, (_, index) => (
                    <Grid
                      item
                      xs={10}
                      sm={6}
                      md={4}
                      lg={3}
                      key={index}
                      sx={{
                        paddingLeft: {
                          xs: "0px !important",
                          sm: "16px !important",
                        },
                      }}
                    >
                      <CardSkeleton key={index} />
                    </Grid>
                  ))
                ) : data?.data.length > 0 ? (
                  data?.data.map((ele, index) => (
                    <Grid
                      item
                      xs={10}
                      sm={6}
                      md={4}
                      lg={3}
                      key={index}
                      sx={{
                        paddingLeft: {
                          xs: "0px !important",
                          sm: "16px !important",
                        },
                      }}
                    >
                      <AdCard officeData={ele} />
                    </Grid>
                  ))
                ) : (
                  <NoData />
                )}
              </Grid>
              {data?.data?.length > 20 ? (
                <Link to="all_deals" className="showMoreAds">
                  {" "}
                  المزيد من المكاتب
                </Link>
              ) : (
                ""
              )}
              {/* <Pagination data={paginationData} setPage={setpage} /> */}
              <div className="mapButtonWrapper">
                <button
                  className="mapButton "
                  onClick={() => setToggleMapAds(!toggleMapAds)}
                >
                  {t("displayMap")}
                  <img
                    src={MapIcon}
                    className="img1"
                    style={{ width: "16px" }}
                  />
                </button>
              </div>
            </div>
          </Container>
          <Box
            className="LoginBottomBox"
            sx={{ display: { xs: "flex !important", md: "none !important" } }}
          >
            <Button className="button1" onClick={handleOpenModal}>
              <img className="img1" src={LoginSvgGray} />
              <p className="p1">تسجيل الدخول</p>
            </Button>
            <Button className="button1">
              <Link to="dashboard/home">
                <FavoriteIcon
                  sx={{ color: " rgb(176, 176, 176) !important" }}
                />
                {/* <img className="img1" src={LoginSvgGray} /> */}
                <p className="p1"> المفضلة</p>
              </Link>
            </Button>
            <Button className="button1">
              <StarIcon sx={{ color: " rgb(176, 176, 176) !important" }} />
              <p className="p1"> إعلانات مميزة</p>
            </Button>
            <Button className="button1">
              {/* <img className="img1" src={LoginSvgGray} /> */}
              <PhoneIcon
                sx={{
                  color: " rgb(176, 176, 176) !important",
                  marginTop: "-2px",
                }}
              />
              <p className="p1"> اتصل بنا</p>
            </Button>
          </Box>
          <Footer />
        </div>
      ) : (
        <div>
          <FilterSection
            refetch={refetch}
            setFilter={setFilter}
            toggleMapAds={toggleMapAds}
            setToggleMapAds={setToggleMapAds}
          />
          <Map officesData={data?.data} />
        </div>
      )}
      <Box
        sx={{
          display: { xs: "block  !important", md: "none !important" },
          position: "fixed",
          bottom: "0px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: "2",
          width: "100%",
        }}
      >
        {/* button map */}
        {toggleMapAds && (
          <div className="numberAdsInMapContainer" onClick={handleToggleMapAds}>
            75 مكتبا
          </div>
        )}
      </Box>
      <LogInModal open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default HomePage;
