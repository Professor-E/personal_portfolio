import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CursorGlow from "@/components/layout/CursorGlow";
import {
  SITE_URL,
  SITE_NAME,
  SITE_DESCRIPTION,
  SOCIAL_PROFILES,
  PUBLIC_EMAIL,
} from "@/lib/seo";
import "./globals.css";

// ── Fonts — Inter (from Figma tokens: --font-inter) ───────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display face for headings and wordmarks — see `--font-display` in tokens.css.
// Manrope: smooth, professional grotesque that reads properly heavy at
// semibold/bold (replaced Space Grotesk, whose clipped terminals read
// "8-bit" to the user). Variable font: all weights ship in one file.
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  // Canonical origin lives in src/lib/seo.ts (NEXT_PUBLIC_SITE_URL → Vercel
  // production URL → localhost). Also resolves OG/twitter image URLs
  // (src/app/opengraph-image.tsx) and relative `alternates.canonical` paths.
  metadataBase: new URL(SITE_URL),
  // Browser-tab title: just the name, on every page (user request — the longer
  // "— MIT EECS Student & Engineer" form gets truncated in narrow tabs).
  // OG/twitter titles below keep the descriptive form for link shares.
  title: "Dominik Grzeszczak",
  description: SITE_DESCRIPTION,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Dominik Grzeszczak",
    "MIT",
    "EECS",
    "portfolio",
    "engineering",
    "computer science",
    "software engineer",
  ],
  openGraph: {
    type: "website",
    url: "/home",
    siteName: SITE_NAME,
    locale: "en_US",
    title: "Dominik Grzeszczak — MIT EECS Student & Engineer",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dominik Grzeszczak — MIT EECS Student & Engineer",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

// Structured data so Google can connect the name search to this site and its
// profiles (LinkedIn/GitHub/Instagram) — rendered once, site-wide.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: `${SITE_URL}/home`,
  image: `${SITE_URL}/images/headshot.png`,
  email: `mailto:${PUBLIC_EMAIL}`,
  jobTitle: "Electrical Engineering & Computer Science Student",
  affiliation: {
    "@type": "CollegeOrUniversity",
    name: "Massachusetts Institute of Technology",
    sameAs: "https://www.mit.edu",
  },
  knowsAbout: [
    "Electrical Engineering",
    "Computer Science",
    "Software Engineering",
  ],
  sameAs: SOCIAL_PROFILES,
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
};

// Pre-paint script: on a *cold* open of the home page (fresh session, before the
// typewriter intro has played) flag <html> so the gray intro splash paints
// immediately — preventing the tan page background from flashing before the
// React intro overlay (which is loaded client-only) has a chance to mount.
// Skipped on reloads (sessionStorage persists) and on every non-home route.
const introSplashScript = `(function(){try{var p=location.pathname;if((p==="/home"||p==="/home/"||p==="/")&&!sessionStorage.getItem("intro_played")){document.documentElement.classList.add("intro-pending");}}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script dangerouslySetInnerHTML={{ __html: introSplashScript }} />
        {/* Cold-open intro splash — hidden unless `html.intro-pending` is set by
            the script above. Removed by IntroAnimation once it mounts. */}
        <div id="intro-splash" aria-hidden="true" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <SmoothScroll>
            <CursorGlow />
            {/* Sitewide film grain — see .grain-overlay in globals.css */}
            <div className="grain-overlay" aria-hidden="true" />
            <Navbar />
            {/* pt-[70px] matches exact navbar height from Figma node 627:340 */}
            <main className="pt-[70px]">{children}</main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
        {/* Vercel visitor analytics + Core Web Vitals — no-ops in `next dev` */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
