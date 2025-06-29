import type { Metadata } from "next";
import localFont from "next/font/local";
import React from "react";

import "./globals.css";
import NavBar from "@/components/navigation/navbar";
import NextThemeProvider from "@/context/Theme";

const inter = localFont({
  src: "./fonts/InterVF.ttf",
  variable: "--font-inter",
  weight: "100 200 300 400 500 700 800 900",
});

const eduSA = localFont({
  src: "./fonts/EduSAHandVF.ttf",
  variable: "--font-edu-sa-hand",
  weight: "300 400 500 700",
});

export const metadata: Metadata = {
  title: "DevFlow",
  description:
    "A community-driven platform for asking and answering programming questions. Get help, share knowledge, and collaborate with developers from around the world. Explore topics in web development, mobile app development, algorithms, data structures, and more.",
  icons: {
    icon: "/images/site-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={`${inter.className} ${eduSA.variable} antialiased`}>
        <NextThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <NavBar />
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
