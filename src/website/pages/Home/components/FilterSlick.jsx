import React, { useState } from "react";
import Slider from "react-slick";
import "../../../../assets/css/filter_slick.css";
import {
  SmallHouses,
  Designs,
  Village,
  Enough,
  North,
  Places,
  Cabin,
  PoolIcon,
  Trend,
  SpeacialViews,
} from "../../../../assets/icons";
import { Button } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const FilterData = [
  // { src: SmallHouses, label: "  بيوت صغيرة" },
  // { src: Designs, label: "   تصماميم " },
  // { src: Village, label: "   في الريف" },
  // { src: Places, label: "    قلاع" },
  // { src: Enough, label: "  مكاتب" },

  { src: SmallHouses, label: " مكتب مستقل" },
  { src: Designs, label: "  مكتب مؤثث" },
  { src: Village, label: "  مكتب مشترك" },
  { src: Enough, label: "   مكتب متحرك" },
  { src: North, label: "  مكتب افتراضي " },
  { src: Places, label: "  قاعة احتماعات " },
  // { src: Places, label: "   كراج " },

  // { src: PoolIcon, label: "  مسابح رائعة " },
  // { src: Trend, label: "  الأكثر رواجا " },
  // { src: SpeacialViews, label: " إطلالات خلابة  " },
];

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

const FilterSlick = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const handleDivClick = (index, label) => {
    console.log(`Clicked on: ${label}`);

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
            key={index}
            className={`filter_div ${index === activeIndex ? "active" : ""}`}
            onClick={() => handleDivClick(index, data.label)}
          >
            <img src={data.src} style={{ width: "24px", margin: "auto" }} />
            <span className="span1">{data.label}</span>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FilterSlick;
