import { useEffect, useState } from "react";
import Slider from "react-slick";
import "../../../../assets/css/filter_slick.css";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTranslation } from "react-i18next";
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button className="buttonNext" onClick={onClick}>
      <KeyboardArrowRightIcon sx={{ color: "black" }} />
    </Button>
  );
}
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <Button className="buttonPrev" onClick={onClick}>
      <KeyboardArrowLeftIcon sx={{ color: "black" }} />
    </Button>
  );
}

const FilterSlick = ({ refetch, setFilter }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeButton, setActiveButton] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  const filterData = JSON.parse(
    localStorage.getItem("searchData")
  )?.category_aqar;

  const handleDivClick = (index, label, id) => {
    // Toggle the active state based on the current state
    setActiveButton((prevId) => (prevId === id ? null : id));

    // Toggle the filter state based on the current state
    setFilter((prevState) => {
      const newFilter = { ...prevState };
      if (newFilter["exact[category_aqar.id]"] === id) {
        // If the category is already selected, remove it
        delete newFilter["exact[category_aqar.id]"];
      } else {
        // If the category is not selected, add it
        newFilter["exact[category_aqar.id]"] = id;
      }
      return newFilter;
    });

    refetch();

    // Toggle the active state based on the current state
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  const settings = {
    dots: false,
    centerMode: false,
    infinite: true,
    initialSlide: 4,
    speed: 500,
    rtl: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slick_container">
      <Slider {...settings}>
        {filterData?.map((data, index) => (
          <div
            id={data?.id}
            key={index}
            className={`filter_div ${
              activeButton === data.id ? "activeButton" : ""
            }`}
            // className={`filter_div ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDivClick(index, data.label, data.id)}
          >
            <img
              src={`https://dashboard.maktab.sa/${data?.icon}`}
              style={{ width: "24px", margin: "auto" }}
            />
            <span className="span1">
              {lang === "ar" ? data?.ar_name : data?.en_name}
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FilterSlick;
