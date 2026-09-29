import type { Metadata } from "next";

const SITE_NAME =
  "Helping Hands Home & Community Based Services";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://helpinghandsei.com";

interface PageSEOOptions {
  title: string;
  description: string;
  path: string;
}

export function createPageMetadata({
  title,
  description,
  path,
}: PageSEOOptions): Metadata {
  const url = new URL(path, SITE_URL).toString();

  return {
    title,
    description,

    alternates: {
      canonical: url,
    },

    openGraph: {
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_US",
    },

    twitter: {
      card: "summary",
      title: `${title} | ${SITE_NAME}`,
      description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}