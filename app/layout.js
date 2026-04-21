<<<<<<< HEAD
﻿import { Inter } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import { I18nProvider } from "@/components/I18nProvider";
import ReduxProvider from "@/components/providers/ReduxProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
      <body className="h-dvh overflow-hidden">
        <ReduxProvider>
          <I18nProvider>
            {children}
            <ToastProvider />
          </I18nProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
=======
import { Inter } from "next/font/google";
import "./globals.css"
import ToastProvider from "@/components/ToastProvider";
import { I18nProvider } from "@/components/I18nProvider";

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
      <body className="h-dvh overflow-hidden">
        <I18nProvider>
          {children}
          <ToastProvider />
        </I18nProvider>
      </body>
    </html>
  );
}
>>>>>>> 2f614ca440eee91178a05d50113f8481184eecff
