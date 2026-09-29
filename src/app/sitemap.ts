import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://helpinghandsei.com";

  const routes = [
    "",
    "/about",
    "/services",
    "/eligibility",
    "/faq",
    "/contact",
    "/referral",
    "/gallery",
    "/blog",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency:
      route === ""
        ? "weekly"
        : "monthly",
    priority:
      route === ""
        ? 1
        : route === "/services" ||
            route === "/referral"
          ? 0.9
          : 0.8,
  }));
}