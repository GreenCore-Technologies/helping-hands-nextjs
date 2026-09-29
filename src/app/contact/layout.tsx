import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Contact Us",

  description:
    "Contact Helping Hands Home & Community Based Services to ask questions about early intervention services and family support in Southwest Alabama.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact Helping Hands",
    description:
      "Contact Helping Hands Home & Community Based Services to ask questions about early intervention services and family support in Southwest Alabama.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}