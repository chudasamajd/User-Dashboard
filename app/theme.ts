import { createTheme } from "@mui/material/styles";
import { Rajdhani } from "next/font/google";

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const themeConstants = {
  paper: "#F9F9F9",
  primary: {
    main: "rgba(22,22,22,1)",
    dark: "#e5e5e5",
  },
  secondary: {
    main: "#1b1b1b",
    dark: "#1b1b1b",
  },
  error: {
    main: "#b22222",
    dark: "#8b0000",
  },
  fg: { main: "#fff", dark: "rgba(55, 65, 81, 1)" },
  breakpoints: {
    xs: 0,
    mb: 350,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  typography: {
    fontFamily: rajdhani.style.fontFamily,
  },
};

const theme = createTheme({
  palette: {
    primary: themeConstants.primary,
    secondary: themeConstants.secondary,
    background: { paper: themeConstants.paper },
    text: {
      primary: themeConstants.fg.main,
      secondary: themeConstants.fg.dark,
    },
    error: themeConstants.error,
  },
  breakpoints: {
    values: themeConstants.breakpoints,
  },
  typography: themeConstants.typography,
});

export default theme;
