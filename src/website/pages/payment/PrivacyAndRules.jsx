import { Box } from "@mui/material";
import React from "react";
import { Conditions, Refuend } from "../../../assets/icons";
import { useTranslation } from "react-i18next";
import "../../../assets/css/payment.css";

const PrivacyAndRules = () => {
  const { t } = useTranslation();
  return (
    <>
      <Box className="conditionsBox">
        <Box className="conditionsBox_rules">
          <img src={Refuend} />
          <span className="rules_title">
            {t("paymentpage.Cancellationandreturnspolicy")}
          </span>
        </Box>
        <Box className="rulesList">
          <span> {t("paymentpage.youCanCancel")} 2023/10/17</span>
        </Box>
      </Box>
      <Box className="conditionsBox">
        <span className="title1"> {t("paymentpage.Bookingpolicies")} </span>
        <Box className="conditionsBox_rules">
          <img src={Conditions} />
          <span className="rules_title">
            {t("paymentpage.bookingconditions")}
          </span>
        </Box>
        <ul className="rulesList">
          <li> {t("paymentpage.Cleaningtheplace")}</li>
        </ul>
      </Box>
    </>
  );
};

export default PrivacyAndRules;
