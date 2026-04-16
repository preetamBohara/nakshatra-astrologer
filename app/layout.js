import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional (for CSS usage)
  display: "swap",
});

export const metadata = {
  title: "Nakshtra.ai Astrologer",
  description: "Nakshtra.ai Astrologer App",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="h-dvh overflow-hidden">{children}</body>
    </html>
  );
}
