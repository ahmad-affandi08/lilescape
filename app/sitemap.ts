import type { MetadataRoute } from "next";

const siteUrl = "https://lilescapecoffee.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${siteUrl}/images/hero-bg.jpg`,
        `${siteUrl}/images/hero-bg1.jpg`,
        `${siteUrl}/images/hero-bg2.jpg`,
      ],
    },
    {
      url: `${siteUrl}/menu`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/recruitment`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];
}
