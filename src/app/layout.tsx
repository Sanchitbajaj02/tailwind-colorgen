import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tailwind Colorgen",
  description:
    "Tailwind Colorgen is a web-based tool for generating and customizing color palettes for Tailwind CSS projects. It allows users to create, preview, and export color configurations seamlessly.",
  keywords: ["colorgen", "tailwind color", "color palettes", "color generator", "color theme", "css generator"],
  authors: [
    {
      name: "Sanchitbajaj02",
      url: "https://sanchit.is-a.dev",
    },
  ],
  appleWebApp: {
    title: "Tailwind Colorgen",
    statusBarStyle: "default",
    capable: true,
  },
};

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: "device-width",
  viewportFit: "cover",
  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#DF6026",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#ffffff",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
