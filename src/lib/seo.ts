// ── Shared SEO source of truth ────────────────────────────────────────────────
// Single place for the canonical site URL and identity facts used by
// layout.tsx (metadata + JSON-LD), sitemap.ts, and robots.ts.

// Canonical origin resolution:
// 1. NEXT_PUBLIC_SITE_URL — set this in Vercel once a custom domain exists.
// 2. VERCEL_PROJECT_PRODUCTION_URL — the production hostname Vercel injects on
//    every deploy (previews included), so canonicals/sitemap always point at
//    production rather than a throwaway preview URL.
// 3. localhost for `next dev`.
const raw =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const SITE_URL = raw.replace(/\/+$/, "");

export const SITE_NAME = "Dominik Grzeszczak";

export const SITE_DESCRIPTION =
  "Dominik Grzeszczak is an MIT Electrical Engineering & Computer Science ('28) student — engineer, builder, and problem solver. Explore his experience, projects, and ways to get in touch.";

// Keep in sync with src/components/contact/SocialLinks.tsx.
export const SOCIAL_PROFILES = [
  "https://www.linkedin.com/in/domgrzeszczak/",
  "https://github.com/Professor-E",
  "https://www.instagram.com/grzeszczak.dominik/",
];

export const PUBLIC_EMAIL = "dominikgrzeszczak28@gmail.com";
