import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Early Intervention Services",

  description:
    "Explore early intervention services provided by Helping Hands Home & Community Based Services for infants, toddlers, and families in Southwest Alabama.",

  alternates: {
    canonical: "/services",
  },

  openGraph: {
    title: "Early Intervention Services",
    description:
      "Explore early intervention services provided by Helping Hands Home & Community Based Services for infants, toddlers, and families in Southwest Alabama.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}