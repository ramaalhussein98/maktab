import React, { useState } from "react";
import { List, ListItem, ListItemText } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkIcon from "@mui/icons-material/Link";
import { useTranslation } from "react-i18next";

const SocailMedaiLinks = () => {
  const { t, i18n } = useTranslation();
  const [copied, setCopied] = useState(false);
  //   const encodedTitle = encodeURIComponent(adTitle);
  //   const encodedWindowUrl = encodeURIComponent(windowUrl);
  //   const whatsappShareLink = `https://wa.me/?text=${encodedTitle}%0A${encodedWindowUrl}`;
  const whatsappShareLink = "hi";
  // const formattedDate =
  // createdDate && createdDate.toLocaleString("en-US", options);
  const handleCopyLink = () => {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };
  return (
    <List
      sx={{
        zIndex: "1",
        position: "absolute",
        top: "0",
        right: i18n.language === "en" ? "0 !important" : "auto",
        left: i18n.language === "ar" ? "0px !important" : "auto",
        backgroundColor: "white",
        width: "14rem",
        boxShadow:
          "0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)",
      }}
      className="list-container"
    >
      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <a
          style={{
            color: "inherit",
            textDecoration: "none",
            width: "100%",
            display: "flex",
          }}
          href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <FacebookIcon />
          <ListItemText primary={t("details_page.facebook_share")} />
        </a>
      </ListItem>
      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <a
          style={{
            color: "inherit",
            textDecoration: "none",
            width: "100%",
            display: "flex",
          }}
          href={whatsappShareLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon />
          <ListItemText primary={t("details_page.whats_share")} />
        </a>
      </ListItem>

      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        <a
          style={{
            color: "inherit",
            textDecoration: "none",
            width: "100%",
            display: "flex",
          }}
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
            "Check out this link!"
          )}&url=${window.location.href}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <TwitterIcon />
          <ListItemText primary={t("details_page.twitter_share")} />
        </a>
      </ListItem>

      <ListItem
        sx={{
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
        onClick={handleCopyLink}
      >
        <LinkIcon />
        <ListItemText primary={t("details_page.copy_url")} />
      </ListItem>
    </List>
  );
};

export default SocailMedaiLinks;
