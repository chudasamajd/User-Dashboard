"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { ReduxProvider } from "./redux/provider";
import Navbar from "./components/Navbar";
import { SessionProvider } from "next-auth/react";
import InfoCard from "./components/InfoCard";

type Props = {
  children: ReactNode;
};

export const Wrapper = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <ReduxProvider>
          <InfoCard />
          {children}
          <Navbar />
        </ReduxProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
