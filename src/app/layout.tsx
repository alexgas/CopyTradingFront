"use client";

// import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <Header
        title="All your data here"
        description="Discover daily Product Hunt launches enhanced with AI-generated deck information including problem statements, solutions, TAM, and more."
        keywords="Product Hunt, AI, startup decks, market analysis, TAM, product launch"
      />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased max-h-screen`}
      >
        <SessionProvider>
          {children}
          </SessionProvider>
      </body>
    </html>
  );
}
