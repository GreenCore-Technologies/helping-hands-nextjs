import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Blog",

  description:
    "Explore information and resources for families from Helping Hands Home & Community Based Services.",

  alternates: {
    canonical: "/blog",
  },

  openGraph: {
    title: "Helping Hands Blog",
    description:
      "Explore information and resources for families from Helping Hands Home & Community Based Services.",
    url: "/blog",
    type: "website",
  },
};

export default function BlogLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}