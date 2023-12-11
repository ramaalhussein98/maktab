import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useNavigate } from "react-router-dom";
const ChooseUnitModal = ({ open, onClose }) => {
  const units = [
    { id: 1, title: "استراحة حديقة الفن" },
    { id: 2, title: " حديقة الفن" },
  ];
  const nav = useNavigate();
  const handleNavigateAddUnitPage = (id, title) => {
    console.log(id);
    nav("/addunit", { state: { id, title } });
  };
  return (
    <Modal open={open} onClose={onClose}>
      <Box className="custom-box2">
        <div className="d-flex">
          <span className="choose_unit">حدد العقار</span>
          <CloseIcon onClick={onClose} />
        </div>
        {units.map((data) => (
          <Paper
            className="paper_unit_style"
            key={data.id}
            onClick={(event) => handleNavigateAddUnitPage(data.id, data.title)}
          >
            <span className="unit_title">{data.title}</span>
            <ChevronLeftIcon />
          </Paper>
        ))}
      </Box>
    </Modal>
  );
};

export default ChooseUnitModal;
