import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
} from "next/font/google";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://helping-handsllc.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default:
      "Helping Hands | Early Intervention Services in Southwest Alabama",
    template:
      "%s | Helping Hands HCBS",
  },

  description:
    "Helping Hands Home & Community Based Services provides early intervention services for infants, toddlers, and families throughout Southwest Alabama.",

  applicationName:
    "Helping Hands HCBS",

  keywords: [
    "Helping Hands",
    "Helping Hands HCBS",
    "early intervention Alabama",
    "early intervention services",
    "infant services Alabama",
    "toddler services Alabama",
    "family support services",
    "Southwest Alabama",
    "Mobile County",
    "Washington County",
    "Escambia County",
    "Clarke County",
  ],

  authors: [
    {
      name:
        "Helping Hands Home & Community Based Services, LLC",
    },
  ],

  creator:
    "Helping Hands Home & Community Based Services, LLC",

  publisher:
    "Helping Hands Home & Community Based Services, LLC",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",

    locale: "en_US",

    url: siteUrl,

    siteName:
      "Helping Hands Home & Community Based Services",

    title:
      "Helping Hands | Early Intervention Services in Southwest Alabama",

    description:
      "Helping Hands Home & Community Based Services provides early intervention services for infants, toddlers, and families throughout Southwest Alabama.",
  },

  twitter: {
    card: "summary_large_image",

    title:
      "Helping Hands | Early Intervention Services in Southwest Alabama",

    description:
      "Helping Hands Home & Community Based Services provides early intervention services for infants, toddlers, and families throughout Southwest Alabama.",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        {children}
      </body>
    </html>
  );
}