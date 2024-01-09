import React, { useContext } from "react";
// import { Box } from "@mui/material";
// import { Visa } from "../../assets";
// import { Logo } from "../../assets";
import { Box } from "@mui/system";
import { ThreeDots } from "react-loader-spinner";

const LoaderHome = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        position: "fixed",
        inset: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        zIndex: "10000000",
      }}
    >
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="#c20000"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </Box>
  );
};

export default LoaderHome;
