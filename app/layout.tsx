import "./globals.css";
import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import { Wrapper } from "./Wrapper";

const rajdhani = Rajdhani({
  subsets: ["latin-ext"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Metasky",
  description: "Metasky user dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${rajdhani.className}`}>
        <Wrapper>{children}</Wrapper>
      </body>
    </html>
  );
}
