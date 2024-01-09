import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

const EditDescription = ({
  description,
  id,
  editDescriptionMutation,
  onCancel,
  setIsChangingData,
}) => {
  const [_description, setDescription] = useState(description);
  const { t } = useTranslation();

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  const handleSubmit = async (e) => {
    setIsChangingData(true);
    e.preventDefault();
    try {
      const res = await editDescriptionMutation.mutateAsync({
        description: _description,
        id,
      });
      setIsChangingData(false);
      onCancel();
    } catch (error) {
      setIsChangingData(false);
      onCancel();
    }
  };
  return (
    <Box>
      <Typography
        sx={{ fontWeight: "600", fontSize: "1.2rem", marginBottom: "1rem" }}
      >
        {t("dashboard.incoming_orders.card5.title")}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={9}
        placeholder=" اكتب هنا"
        required
        value={_description}
        onChange={handleDescriptionChange}
        InputProps={{
          sx: {
            borderRadius: "1rem",
          },
        }}
      />
      <Box
        sx={{
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(0, 0, 0, 0.12)",
          margin: "2rem 4rem",
        }}
      ></Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          gap: "1rem ",
          marginInline: "auto",
          flexWrap: "wrap",
          marginTop: "2rem",
        }}
      >
        <Button
          onClick={handleSubmit}
          type="submit"
          sx={{
            fontWeight: "600",
            borderRadius: "8px",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "var(--main-color)",
            color: "white",
            "&:hover": {
              backgroundColor: "#0b7b5a",
              color: "white",
            },
          }}
        >
          {t("dashboard.outgoing_requests.submit_btn")}
        </Button>
        <Button
          sx={{
            fontWeight: "600",
            borderRadius: "8px",

            border: "1px solid var(--main-color)",
            minWidth: "186px",
            padding: "0.75rem 2.5rem",
            height: "50px",
            backgroundColor: "white",
            color: "var(--main-color)",
            "&:hover": {
              backgroundColor: "#e5f9f4",
            },
          }}
          onClick={onCancel}
        >
          {t("dashboard.outgoing_requests.cancel_btn")}
        </Button>
      </Box>
    </Box>
  );
};

export default EditDescription;
