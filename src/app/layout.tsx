import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { defaultLocale } from "@/config/i18n.config";
import { ThemeProvider } from "@/presentation/providers/ThemeProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ángel Rodríguez | Frontend Engineer",
    template: "%s | Ángel Rodríguez",
  },
  description:
    "Portafolio de Ángel Rodríguez, desarrollador Frontend especializado en crear experiencias web escalables y de alto rendimiento con Next.js, React y TypeScript.",
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
