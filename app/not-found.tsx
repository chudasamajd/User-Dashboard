import { Box, Button, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

const styles = {
  container: {
    backgroundImage: "url('form.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    fontWeight: 700,
    fontSize: "16rem",
    opacity: 0.08,
    position: "relative",
    bottom: -80,
    zIndex: -1,
    letterSpacing: "0px",
    textAlign: "center",
  },
  title2: {
    fontWeight: 700,
    fontSize: "8rem",
    opacity: 0.08,
    position: "relative",
    zIndex: -1,
    letterSpacing: "0px",
    textAlign: "center",
  },
  goBackBtn: {
    border: "1px solid rgba(255, 255, 255, 0.05)",
    borderRadius: "0.5rem",
    backgroundColor: "secondary.main",
    boxShadow: "none",
    "&:hover": { backgroundColor: "transparent", boxShadow: "none" },
    color: "rgba(255, 255, 255, 0.36)",
  },
};

const constants = {
  title: "404",
  title2: "Page Not Found",
  goBackBtn: "Go Back",
};

export default function PageNotFound() {
  return (
    <Box sx={styles.container}>
      <Typography component="h1" variant="h2" sx={styles.title}>
        {constants.title}
      </Typography>
      <Typography component="h1" variant="h2" sx={styles.title2}>
        {constants.title2}
      </Typography>
      <Link href="/">
        <Button variant="contained" sx={styles.goBackBtn}>
          {constants.goBackBtn}
        </Button>
      </Link>
    </Box>
  );
}
