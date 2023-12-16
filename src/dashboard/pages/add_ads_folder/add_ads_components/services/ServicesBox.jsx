import { Box, Switch, TextField } from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import { useTranslation } from "react-i18next";
import { alpha, styled } from "@mui/material/styles";
import { green } from "@mui/material/colors";
import Swal from "sweetalert2";
import "./service.css";
const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "var(--green-color)",
    "&:hover": {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "var(--green-color)",
  },
}));

const label = { inputProps: { "aria-label": "Color switch demo" } };

const ServicesBox = ({ onRemove, onToggle }) => {
  const [nameInput, setNameInput] = useState("");
  const [identify, setIdentify] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [toggleServiceBox, setToggleServiceBox] = useState(true);
  const [checked, setChecked] = useState(false);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const handleChangeNameInput = (event) => {
    setNameInput(event.target.value);
  };
  const handleIdentifyChange = (event) => {
    setIdentify(event.target.value);
  };
  const handlePriceChange = (event) => {
    setPriceInput(event.target.value);
  };
  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
  };
  const handleDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to delete this box.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel",
      customClass: {
        confirmButton: "swal-confirm-button",
        cancelButton: "swal-cancel-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // User clicked "Yes, delete it!"
        onRemove(); // Call the onRemove function to delete the box
      }
    });
  };

  return (
    <Box>
      <Box sx={{ position: "relative", marginBottom: "1rem" }}>
        <input
          style={{
            width: "100%",
            backgroundColor: " #eee",
            padding: "10px 7px",
          }}
          value={nameInput}
        />
        <CloseIcon
          sx={{
            position: "absolute",
            left: "0px",
            top: "8px",
            color: "red",
            cursor: "pointer",
          }}
          onClick={handleDelete}
        />
        <MinimizeIcon
          sx={{
            position: "absolute",
            left: "24px",
            top: "0px",
            color: "blue",
            cursor: "pointer",
          }}
          onClick={() => {
            setToggleServiceBox(!toggleServiceBox);
            onToggle();
          }}
        />
      </Box>
      {toggleServiceBox && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "end",
            border: "1px solid #eee",
            padding: "10px",
          }}
        >
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="my-text-field"
              style={{ fontWeight: "500", marginBottom: "4px" }}
            >
              {t("dashboard.incoming_orders.card1.label1")}
            </label>
            <TextField
              id="my-text-field"
              type="text"
              onChange={handleChangeNameInput}
              value={nameInput}
              // value={formData.title || ""}
              //   onChange={handleNameChange}
              size="small"
              sx={{
                width: "96%",
                borderRadius: "12px",
                textAlign: lang === "ar" ? "right" : "left",
                "&[readonly]": {
                  backgroundColor: "lightgray",
                  color: "darkgray",
                },
              }}
            />
          </div>
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="identify"
              style={{ fontWeight: "500", marginBottom: "4px" }}
            >
              {t("dashboard.incoming_orders.card1.ID")}
            </label>
            <TextField
              id="identify"
              type="text"
              value={identify}
              onChange={handleIdentifyChange}
              //   value={formData.title || ""}
              //   onChange={handleNameChange}
              size="small"
              sx={{
                width: "96%",
                borderRadius: "12px",
                textAlign: lang === "ar" ? "right" : "left",
                "&[readonly]": {
                  backgroundColor: "lightgray",
                  color: "darkgray",
                },
              }}
            />
          </div>
          <div
            style={{ width: "50%", display: "flex", flexDirection: "column" }}
          >
            <label
              htmlFor="price"
              style={{ fontWeight: "500", marginBottom: "4px" }}
            >
              {t("dashboard.order_details.label1")}
            </label>
            <TextField
              id="price"
              type="text"
              value={priceInput}
              onChange={handlePriceChange}
              //   value={formData.title || ""}
              //   onChange={handleNameChange}
              size="small"
              sx={{
                width: "96%",
                borderRadius: "12px",
                textAlign: lang === "ar" ? "right" : "left",
                "&[readonly]": {
                  backgroundColor: "lightgray",
                  color: "darkgray",
                },
              }}
            />
          </div>
          <GreenSwitch
            className="Switch1"
            checked={checked}
            onChange={handleChange}
            sx={{
              "& .MuiSwitch-thumb": { backgroundColor: "#14b183 !important" },
            }}
            inputProps={{ "aria-label": "toggle switch" }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ServicesBox;
