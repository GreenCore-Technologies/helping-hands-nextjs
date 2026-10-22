import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "About Us",

  description:
    "Learn about Helping Hands Home & Community Based Services and our commitment to supporting infants, toddlers, and families in Southwest Alabama.",

  alternates: {
    canonical: "/about",
  },

  openGraph: {
    title: "About Helping Hands",
    description:
      "Learn about Helping Hands Home & Community Based Services and our commitment to supporting infants, toddlers, and families in Southwest Alabama.",
    url: "/about",
    type: "website",
  },
};

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}