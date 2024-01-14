import { Divider, Paper } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useRef, useEffect } from "react";

const PriceDetailsPaper = ({ setPriceDetails }) => {
  const priceRef = useRef();
  const prices = [
    { title: "رسوم تكيف", price: 100 },
    { title: "مطبخ", price: 200 },
  ];
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (priceRef.current && !priceRef.current.contains(event.target)) {
        // Clicked outside the PriceDetailsPaper, close it
        setPriceDetails(false);
      }
    };

    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleOutsideClick);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setPriceDetails]);
  return (
    <Paper ref={priceRef} className="PriceDetailsPaper">
      <div className="d-flex w-100 text-center">
        <CloseIcon
          className="cursor_pointer"
          onClick={() => setPriceDetails(false)}
        />
        <p className="title_price_details">تفاصيل السعر الإجمالي</p>
      </div>
      {prices.map((ele, index) => (
        <div key={index} className="d-flex justify-between mt-5 mb-5">
          <span>{ele.title}</span>
          <span>{ele.price} ر.س</span>
        </div>
      ))}
      <Divider sx={{ marginY: "1rem" }} />
      <div className="d-flex w-100 justify-between">
        <span>إجمالي السعر الأساسي</span>
        <span>7,000 ر.س</span>
      </div>
    </Paper>
  );
};

export default PriceDetailsPaper;
