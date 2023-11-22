import React, { useState } from "react";
import "../../../assets/css/visacard.css";
import {
  Box,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Mada, MasterCard, Visa } from "../../../assets/images";
import { Safe } from "../../../assets/icons";
import { useTranslation } from "react-i18next";

// const CardNumberInput = (props) => {
//   return (
//     <InputMask
//       mask={[
//         /\d/, /\d/, /\d/, /\d/, ' ',
//         /\d/, /\d/, /\d/, /\d, ' ',
//         /\d/, /\d/, /\d/, /\d,
//       ]}
//       placeholder="0000 0000 0000 0000"
//       guide={false}
//       {...props}
//     >
//       {(inputProps) => (
//         <TextField
//           {...inputProps}
//           variant="outlined"
//           label="Card Number"
//           fullWidth
//         />
//       )}
//     </InputMask>
//   );
// };

const VisaCard = () => {
  const [idNumber, setIdNumber] = useState();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const handleIdNumber = (event) => {
    setIdNumber(event.target.value);
  };
  const [cardNumber, setCardNumber] = useState("");
  // const handleCardNumberChange = (event) => {
  //   let formattedValue = event.target.value.replace(/\s/g, ""); // Remove spaces
  //   if (formattedValue.length > 16) {
  //     formattedValue = formattedValue.substr(0, 16); // Limit to 16 characters
  //   }
  //   formattedValue = formattedValue.replace(/(\d{4})/g, "$1 ").trim(); // Apply formatting
  //   setCardNumber(formattedValue);
  // };

  // const handleFocus = (e) => {
  //   if (cardNumber === "") {
  //     setCardNumber("____ ____ ____ ____");
  //   }
  // };

  // const handleBlur = (e) => {
  //   if (cardNumber === "____ ____ ____ ____") {
  //     setCardNumber("");
  //   }
  // };
  function handleInputChange(event) {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    let formattedValue = value.replace(/(\d{4})/g, "$1-"); // Add dashes after every 4 digits

    // Remove trailing dash if present
    if (formattedValue.charAt(formattedValue.length - 1) === "-") {
      formattedValue = formattedValue.slice(0, -1);
    }

    setIdNumber(formattedValue);
  }
  return (
    <>
      <FormControl sx={{ width: "100%", marginY: "20px" }}>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="card"
          name="radio-cash"
        >
          <div className="radio_label">
            <FormControlLabel
              value="card"
              control={
                <Radio
                  sx={{
                    "&.Mui-checked": {
                      color: "black",
                    },
                  }}
                />
              }
              sx={{
                marginRight: lang === "ar" ? "-2rem" : "0px",
                marginLeft: lang === "en" ? "-2rem" : "0px",
              }}
            />
            <span> {t("paymentpage.Paybycard")} </span>
          </div>
          <div className="visa_img_box">
            <div className="visa">
              <img src={Mada} />
              <div className="dot"></div>
              <img src={Visa} />
              <div className="dot"></div>
              <img src={MasterCard} />
            </div>
            <div className="cash">
              <img src={Safe} />
              <span>دفع آمن ومضمون 100%</span>
            </div>
          </div>
          <Box className="divider"></Box>
          <Box className="visacard">
            <Box className="IdNumber">
              <label className="labelVisaCard">رقم البطاقة</label>
              <TextField
                type="text"
                value={cardNumber}
                onChange={handleInputChange}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                maxLength={19} // Allow for 16 digits and 3 spaces
                variant="standard"
                placeholder=" 0000 0000 0000 0000"
                // onChange={handleCardNumberChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />

              {/* 
              <CardNumberInput /> */}
            </Box>
            <Box className="divider2"></Box>
            <Box className="data_cvv">
              <Box className="IdNumber">
                <label className="labelVisaCard"> تاريخ الانتهاء</label>
                <TextField
                  type="text"
                  variant="standard"
                  placeholder="سنة / شهر"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {/* <CardNumberInput /> */}
              </Box>
              <Box className="dividervertical"></Box>
              <Box className="IdNumber">
                <label className="labelVisaCard"> cvv </label>
                <TextField
                  type="text"
                  variant="standard"
                  placeholder=" 123"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                {/* <CardNumberInput /> */}
              </Box>
            </Box>
          </Box>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default VisaCard;
