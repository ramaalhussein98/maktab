import React from "react";
import { Box, Skeleton } from "@mui/material";

const CardSkeleton = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: { xs: "89%", md: "100%" },
        margin: "auto",
      }}
    >
      <Skeleton
        variant="rectangular"
        height={290}
        sx={{
          width: { xs: "350px", md: "320px" },
          borderRadius: "12px",
          marginX: "auto",
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Skeleton sx={{ width: "10rem" }} />
          <Skeleton width="8rem" />
          <Skeleton sx={{ width: "5rem" }} />
          <Skeleton sx={{ width: "5rem" }} />
        </Box>
        <Skeleton width="3rem" height="2rem" />
      </Box>
    </Box>
  );
};

export default CardSkeleton;
