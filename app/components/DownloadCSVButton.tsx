import React from "react";
import { fetchDataAndConvertToCSV } from "../utils/fetchData";
import { Button } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";

const styles = {
  menuContainer: {
    width: "680px",
    backdropFilter: "blur(30px)",
    backgroundColor: "primary.main",
    border: "1px solid rgba(255, 255, 255, 0.05)",
    position: "fixed",
    bottom: "30px",
    left: "50%",
    transform: "translate(-50%,-50%)",
    borderRadius: "1rem",
  },
  innerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    padding: "12px 12px",
  },
  fillFormBtn: {
    borderRadius: "0.5rem",
    backgroundColor: "primary.main",
    padding: "10px 12px",
    boxShadow: "none",
    "&:hover": { backgroundColor: "transparent", boxShadow: "none" },
    color: "white",
    backgroundImage: "linear-gradient(to bottom right, #7D76C6, #ACAAE1)",
    filter: "hue-rotate(32deg)",
  },
};

const DownloadCSVButton: React.FC = () => {
  const handleDownload = async () => {
    try {
      const csvData = await fetchDataAndConvertToCSV();
      const blob = new Blob([csvData], { type: "text/csv" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "emails.csv");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      console.error("Error downloading CSV:", error);
    }
  };

  return (
    <Button
      variant="contained"
      startIcon={<CasinoIcon />}
      sx={styles.fillFormBtn}
      onClick={handleDownload}
    >
      Download CSV
    </Button>
  );
};

export default DownloadCSVButton;
