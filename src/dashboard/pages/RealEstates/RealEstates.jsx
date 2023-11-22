import React, { useState } from "react";
import "../../../assets/css/real_estate.css";
import { Button, Paper, Modal, Box, Typography } from "@mui/material";
import { Plus } from "../../../assets/icons";
import OutGoingOrders from "./outgoing_folder/OutGoingOrders";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RealEstates = () => {
  const [showAddoffice, setAddShowOffice] = useState(false);
  const [openModalAddOffice, setOpenModalAddOfice] = useState(false);
  const { t } = useTranslation();
  const handleAddOfficeModal = () => {
    setOpenModalAddOfice(true);
  };
  const handleClose = () => {
    setOpenModalAddOfice(false);
  };
  return (
    <>
      <Box className="offices">
        <p className="offices_tilte">{t("dashboard.Offices.offices")}</p>
        <Button
          className="add_office_btn"
          onClick={() => {
            setAddShowOffice(!showAddoffice);
          }}
        >
          <img src={Plus} alt="add" className="img1" />
          <span>{t("dashboard.Offices.Addanoffice")}</span>
        </Button>
      </Box>
      {showAddoffice && (
        <Paper className="office_option_list">
          <ul className="ul1">
            <li className="li1" onClick={handleAddOfficeModal}>
              {" "}
              <Link
              // to="/addoffice"
              >
                {t("dashboard.Offices.Newproperty")}
              </Link>
            </li>

            <li className="li1">{t("dashboard.Offices.unitbelong")}</li>
            <li className="li1">{t("dashboard.Offices.complete")}</li>
          </ul>
        </Paper>
      )}
      <Modal open={openModalAddOffice} onClose={handleClose}>
        <Box className="custom-box">
          <Typography>{t("dashboard.Offices.incomplete")}</Typography>
          <Typography className="complete_p">
            {t("dashboard.Offices.complete")}
          </Typography>
          <Typography>{t("dashboard.Offices.sure")}</Typography>
          <Box className="BoxReal">
            <Button className="custom-button-yes">
              <Link to="/addoffice">{t("dashboard.Offices.yesadd")}</Link>{" "}
            </Button>
            <Button className="custom-button-cancel">{t("cancel")}</Button>
          </Box>
        </Box>
      </Modal>
      {/* my ads  */}
      <OutGoingOrders />
    </>
  );
};

export default RealEstates;
