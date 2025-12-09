import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import ClientTopLoader from "./components/ClientTopLoader";
import { AuthProvider } from "@/services/context/AuthContext";
import { AlertProvider } from "@/components/alerts/AlertProvider";
import { GoogleTags, GoogleTagsNoscript } from "./components/GoogleTags";
import { GlobalModalProvider } from "@/components/global/GlobalModalProvider";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "IMAST - Integrated Multi-Channel Advanced Sales Technology",
  description:
    "IMAST is a unified ecosystem that integrates intelligent automation and next-gen technology to transform your business operations, enhance customer experiences, and drive extensive ROI.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <GoogleTags />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <GoogleTagsNoscript />

        <ClientTopLoader />

        <AuthProvider>
          <GlobalModalProvider>
            <AlertProvider>{children}</AlertProvider>
          </GlobalModalProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
}
