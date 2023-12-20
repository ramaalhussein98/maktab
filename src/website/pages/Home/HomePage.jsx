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
import FavoriteIcon from "@mui/icons-material/Favorite";

const HomePage = () => {
  const isCardLoading = false;
  const [openModal, setOpenModal] = useState(false);
  const location = useLocation().pathname;
  const isMapPage = location.split("/").includes("map");

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

  return (
    <>
      <Banner />
      <Container
        sx={{
          maxWidth: "1400px !important",
          padding: { xs: "0px", sm: "24px" },
          position: "relative",
        }}
      >
        {/* filters section */}
        <FilterSection />
        {/* this ads section */}
        <div className="cards_container">
          {/* button map */}
          <Box
            sx={{
              display: { xs: "block  !important", md: "none !important" },
              position: "fixed",
              bottom: "70px",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: "2",
            }}
          >
            {/* button map */}
            {isMapPage ? (
              <Link to="/" className="mapButton">
                القائمة
                <ListIcon sx={{ color: "white", marginX: "5px" }} />
                {/* <img src={MapIcon} style={{ width: "16px" }} /> */}
              </Link>
            ) : (
              <Link to="/map" className="mapButton">
                الخريطة
                <img src={MapIcon} className="img1" style={{ width: "16px" }} />
              </Link>
            )}
          </Box>
          <Grid
            container
            spacing={2}
            sx={{
              justifyContent: "center",
              width: "100%",
              margin: { xs: "auto" },
            }}
          >
            {isCardLoading
              ? Array.from({ length: 8 }, (_, index) => (
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
              : Array.from({ length: 8 }, (_, index) => (
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
                    <AdCard id={index} />
                  </Grid>
                ))}
          </Grid>
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
            <FavoriteIcon sx={{ color: " rgb(176, 176, 176) !important" }} />
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
            sx={{ color: " rgb(176, 176, 176) !important", marginTop: "-2px" }}
          />
          <p className="p1"> اتصل بنا</p>
        </Button>
      </Box>
      <LogInModal open={openModal} onClose={handleCloseModal} />
    </>
  );
};

export default HomePage;
