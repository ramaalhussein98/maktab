import React, { useState } from "react";
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
const searchData = JSON.parse(localStorage.getItem("searchData"));
const FilterData = searchData?.category_aqar;
// console.log("FilterData", FilterData);
const FilterSlick = ({ setSearchQuery, SearchParams, refetch, setFilter }) => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeButton, setActiveButton] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const handleDivClick = (index, label, id) => {
    setActiveButton(id);
    // setSearchQuery((prev) => prev + `exact[category_aqar.id]=${id}`);
    setFilter((prevState) => ({
      ...prevState,
      "exact[category_aqar.id]": id,
    }));

    // SearchParams.append("exact[category_aqar.id]", id);
    refetch();

    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
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
        {FilterData.map((data, index) => (
          <div
            id={data.id}
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
              {lang === "ar" ? data.ar_name : data.en_name}
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FilterSlick;
