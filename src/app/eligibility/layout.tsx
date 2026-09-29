import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Eligibility",

  description:
    "Learn about eligibility for early intervention services and how families can take the next step with Helping Hands in Southwest Alabama.",

  alternates: {
    canonical: "/eligibility",
  },

  openGraph: {
    title: "Early Intervention Eligibility",
    description:
      "Learn about eligibility for early intervention services and how families can take the next step with Helping Hands in Southwest Alabama.",
    url: "/eligibility",
    type: "website",
  },
};

export default function EligibilityLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}