import React from "react";
import "../../../assets/css/bussines_main_page.css";
import { Link } from "react-router-dom";
import { Step } from "../../../assets/images";
import { BackWhite } from "../../../assets/icons";

const DataNumbers = [
  { number: 4000, title: "مكنب مسجل على المنصة" },
  { number: 180, title: "  مدينة ومحافظة نغطيها " },
  { number: "2,000,000", title: "   ضيوف موثوقين  " },
  { number: 500, title: "    مضيف لديهم حجوزات  " },
];

const BussinesMainPage = () => {
  return (
    <>
      <div className="main_box_bussines">
        <p className="welcomeParagraph">أهلا وسهلا بك في مكتب الأعمال </p>
        <Link to="/addoffice" className="add_office_link">
          أضف عقارك
        </Link>
      </div>
      <div className="howadd_container">
        <p className="how_title">كيف تستضيف؟</p>
        <div className="stepimgContainer">
          <img src={Step} alt="step" className="imgStep" />
        </div>
      </div>
      <div className="maktab_numbers_div">
        <h1 className="maktab_title">أرقام مكتب</h1>
        <div className="d-flex space_between">
          {DataNumbers.map((ele, index) => (
            <>
              <div className="numbers_box" key={index}>
                {/* map */}
                <div className="internal">
                  <div className="white_circle"></div>
                  <p className="number_title">{ele.number} + </p>
                  <p className="number_subtitle"> {ele.title}</p>
                <div className="border-white">
                  <span className="span_white">
                    <img src={BackWhite} className="img_white" />
                  </span>
                </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default BussinesMainPage;
