import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import ContractTable from "./components/ContractTable";
import { Box, Paper, Typography } from "@mui/material";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

const Contracts = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const getAnimatedProps = (tabName) => {
    return {
      boxShadow:
        activeTab === tabName
          ? "0px 0px 10px 0px rgba(165, 163, 163, 0.75)"
          : "none",
      config: { tension: 180, friction: 12 },
      opacity: activeTab === tabName ? 1 : 0.8,
    };
  };

  const tabs = [
    {
      name: "tab1",
      text: t("dashboard.contarcts.numbercontracts"),
    },
    {
      name: "tab2",
      text: " العقود المقبولة",
    },
    {
      name: "tab3",
      text: "العقود المنتهية",
    },
    {
      name: "tab4",
      text: "قيد الانتظار ",
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom style={{ fontWeight: "700" }}>
        {t("dashboard.BillsNav.link2")}
      </Typography>
      <Box className="d_flex_spaceBetween contarctBoxes">
        {tabs.map((tab) => {
          const animatedProps = getAnimatedProps(tab.name);
          const AnimatedPaper = animated(Paper);

          return (
            <AnimatedPaper
              key={tab.name}
              className="divContract"
              onClick={() => handleTabChange(tab.name)}
              style={{
                boxShadow: animatedProps.boxShadow,
                opacity: animatedProps.opacity,
              }}
            >
              <p className="p1">{tab.text}</p>
              <b>1</b>
              <RequestPageIcon className="svg1" />
            </AnimatedPaper>
          );
        })}
      </Box>

      {activeTab === "tab1" && <ContractTable />}
      {activeTab === "tab2" && "2"}
      {activeTab === "tab3" && "3"}
      {activeTab === "tab4" && "4"}
    </Box>
  );
};

export default Contracts;
