import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import { Analytics } from "@vercel/analytics/next";
import ClientTopLoader from "./components/ClientTopLoader";
import { AuthProvider } from "@/services/context/AuthContext";
import { AlertProvider } from "@/components/alerts/AlertProvider";
import { GoogleTags, GoogleTagsNoscript } from "./components/GoogleTags";
import { GlobalModalProvider } from "@/components/global/GlobalModalProvider";

import Schema from "@/components/Schema";
import { organizationSchema } from "@/lib/schema";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.imast.in";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJson = organizationSchema({
    name: "IMAST",
    url: SITE_URL,
    logo: `${SITE_URL}/assets/images/logo.png`,
    sameAs: [
      "https://www.linkedin.com/company/imastoperationspvtltd/",
      "https://www.facebook.com/imastoperations",
      "https://x.com/Imastopl",
      "https://www.instagram.com/imast.in/",
      "https://www.youtube.com/@imastopl",
      "https://in.pinterest.com/imast360/",
    ],
    contactPoint: [
      {
        telephone: "+91-9009111156",
        contactType: "sales",
        areaServed: "IN",
      },
    ],
  });

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
        <GoogleTags />
        <Schema data={orgJson} />
      </head>
      <body className={`${outfit.variable} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-M499M7HP"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="GTM"
          />
        </noscript>

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
