import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Make a Referral",

  description:
    "Submit a referral to Helping Hands Home & Community Based Services for early intervention services for infants and toddlers in Southwest Alabama.",

  alternates: {
    canonical: "/referral",
  },

  openGraph: {
    title: "Make a Referral",
    description:
      "Submit a referral to Helping Hands Home & Community Based Services for early intervention services for infants and toddlers in Southwest Alabama.",
    url: "/referral",
    type: "website",
  },
};

export default function ReferralLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}