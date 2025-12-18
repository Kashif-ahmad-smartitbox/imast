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
import { NavigationProvider } from "./context/NavigationContext";
import { Suspense } from "react";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://www.imast.in";

// This metadata is for the entire site
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Integrated SaaS Platform for Loyalty & Supply Chain | IMAST",
    template: "%s | IMAST",
  },
  description:
    "India's leading Integrated SaaS platform offering Loyalty & Supply Chain solutions. Empowering 100+ clients with innovative tools to drive growth.",
  openGraph: {
    type: "website",
    siteName: "IMAST",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    site: "@Imastopl",
    creator: "@Imastopl",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgJson = organizationSchema({
    name: "IMAST",
    url: `${SITE_URL}/`,
    logo: "https://res.cloudinary.com/diefvxqdv/image/upload/v1760952010/imast/media/logo.svg",
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
        email: "sales@imast.in",
        areaServed: "IN",
        availableLanguage: ["en", "hi"],
      },
    ],
  });

  return (
    <html lang="en">
      <head>
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
        <Suspense fallback={null}>
          <NavigationProvider>
            <ClientTopLoader />
            <AuthProvider>
              <GlobalModalProvider>
                <AlertProvider>{children}</AlertProvider>
              </GlobalModalProvider>
            </AuthProvider>
          </NavigationProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
