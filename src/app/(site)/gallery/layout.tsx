import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Gallery",

  description:
    "Explore the Helping Hands gallery and learn more about our early intervention services and commitment to families in Southwest Alabama.",

  alternates: {
    canonical: "/gallery",
  },

  openGraph: {
    title: "Helping Hands Gallery",
    description:
      "Explore the Helping Hands gallery and learn more about our early intervention services and commitment to families in Southwest Alabama.",
    url: "/gallery",
    type: "website",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}