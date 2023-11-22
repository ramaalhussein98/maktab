import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "./i18n";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
  typography: {
    fontFamily: "Tajawal, sans-serif", // Replace 'Your Custom Font' with your desired font
  },
});
// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CacheProvider value={cacheRtl}> */}
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
    {/* </CacheProvider> */}
  </React.StrictMode>
);
