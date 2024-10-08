import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NavBar from "./components/navbar/navbar";

import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Squash WA",
  description: "Generated by my lit code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
