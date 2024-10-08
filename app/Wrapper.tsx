"use client";
import { ReactNode } from "react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";

type Props = {
  children: ReactNode;
};

export const Wrapper = ({ children }: Props) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};
