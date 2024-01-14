import React, { useState } from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SettingsIcon from "@mui/icons-material/Settings";

const billsContent = [
  {
    id: 1,
    column1: "#22222222",
    column2: "31-07-2023",
    column3: " 12030 ",
    column4: " 0 ",
    column5: "  مسددة",
    column6: <VisibilityIcon />,
    column7: <SettingsIcon />,
  },
  {
    id: 2,
    column1: "#22222222",
    column2: "31-07-2023",
    column3: " 12030 ",
    column4: " 1000 ",
    column5: "  دفع جزئي",
    column6: <VisibilityIcon />,
    column7: <SettingsIcon />,
  },
  {
    id: 3,
    column1: "#22222222",
    column2: "31-07-2023",
    column3: "  ",
    column4: "  ",
    column5: "  بانتظار تأكيد الدفع",
    column6: <VisibilityIcon />,
    column7: <SettingsIcon />,
  },
];

const BillingRow = ({ data }) => {
  const { t, i18n } = useTranslation();
  const [contractDetails, setContractDetails] = useState(false);

  const handleToggleShowContactBox = () => {
    setContractDetails(!contractDetails);
  };

  return (
    <TableRow key={data.id} style={{ backgroundColor: "white" }}>
      <TableCell
        sx={{ textAlign: "right", color: "#0f5eb3", fontWeight: "700" }}
      >
        {data.column1}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* <CalendarTodayIcon className="calenderIcon" /> */}
        {data.column2}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* <CalendarTodayIcon className="calenderIcon" /> */}
        {data.column3}
      </TableCell>
      <TableCell sx={{ textAlign: "right" }}>
        {/* <CalendarTodayIcon className="calenderIcon" /> */}
        {data.column4}
      </TableCell>
      <TableCell
        sx={{
          textAlign: "right",
          color:
            data.column5 === "  مسددة"
              ? "var(--green-color)"
              : data.column5 === "  دفع جزئي"
              ? "orange"
              : data.column5 === "  بانتظار تأكيد الدفع"
              ? "red"
              : "inherit", // fallback color
          fontWeight: "600",
        }}
      >
        {data.column5}
      </TableCell>
      <TableCell
        sx={{ textAlign: "right", color: "#0f5eb3", cursor: "pointer" }}
      >
        <Link to="/dashboard/acc/contact_details">{data.column6}</Link>
      </TableCell>
      {contractDetails && (
        <Paper
          sx={{
            position: "absolute",
            backgroundColor: "var(--green-color)",
            color: "white",
            width: "6rem",
            textAlign: "center",
            zIndex: "111",
          }}
        >
          <Link to="/dashboard/acc/contact_details">
            {" "}
            {t("dashboard.Invoices.Viewdetails")}
          </Link>
        </Paper>
      )}
      {/* <TableCell
        sx={{
          textAlign: "center",
          color: "var(--green-color)",
          cursor: "pointer",
          position: "relative",
        }}
        onClick={handleToggleShowContactBox}
      >
        <MoreVertIcon />
        {contractDetails && (
          <Paper
            sx={{
              position: "absolute",
              backgroundColor: "var(--green-color)",
              color: "white",
              width: "6rem",
              textAlign: "center",
              zIndex: "111",
            }}
          >
            <Link to="/dashboard/acc/contact_details">
              {" "}
              {t("dashboard.Invoices.Viewdetails")}
            </Link>
          </Paper>
        )}
      </TableCell> */}
    </TableRow>
  );
};

const BillingTable = () => {
  const { t, i18n } = useTranslation();
  const columns = [
    { id: "column1", label: t("dashboard.sub_page.label1") },
    { id: "column2", label: t("dashboard.Invoices.ReleaseDate") },
    { id: "column3", label: t("dashboard.Invoices.theamount") },
    { id: "column4", label: "مبلغ المتبقي" },
    { id: "column5", label: t("dashboard.incoming_orders.card3.label1") },
    { id: "column6", label: " مشاهدة" },
  ];
  return (
    <div className="mt-5">
      <TableContainer
        component={Paper}
        sx={{
          width: { xs: "600px", md: "100%" },
          margin: "auto",
          borderRadius: "1rem",
        }}
      >
        <Table aria-label="simple table">
          <TableRow sx={{ color: "gray" }}>
            {columns.map((column) => (
              <TableCell key={column.id} sx={{ textAlign: "right" }}>
                {column.label}
              </TableCell>
            ))}
          </TableRow>
          {billsContent.map((data) => (
            <BillingRow key={data.id} data={data} />
          ))}
        </Table>
      </TableContainer>
    </div>
  );
};

export default BillingTable;
