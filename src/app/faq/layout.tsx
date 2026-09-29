import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",

  description:
    "Find answers to common questions about Helping Hands, early intervention services, eligibility, referrals, and the process for families.",

  alternates: {
    canonical: "/faq",
  },

  openGraph: {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about Helping Hands, early intervention services, eligibility, referrals, and the process for families.",
    url: "/faq",
    type: "website",
  },
};

export default function FAQLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}