import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

// Served at /sitemap.xml. Lists only real, indexable pages — `/` and
// `/activities` are permanent redirects and intentionally excluded.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: `${SITE_URL}/home`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/experience`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/projects`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.7 },
    { url: `${SITE_URL}/extracurriculars`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/hobbies`, lastModified, changeFrequency: "yearly", priority: 0.5 },
  ];
}
