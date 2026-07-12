import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/layout/SmoothScroll";
import CursorGlow from "@/components/layout/CursorGlow";
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
  // Resolves OG/twitter image URLs (src/app/opengraph-image.tsx). Set
  // NEXT_PUBLIC_SITE_URL to the custom domain once one is attached; on
  // Vercel deploys VERCEL_URL covers preview/prod URLs automatically.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
  ),
  title: "Dominik Grzeszczak",
  description:
    "Portfolio of Dominik Grzeszczak — MIT freshman studying Electrical Engineering & Computer Science.",
  authors: [{ name: "Dominik Grzeszczak" }],
  keywords: ["MIT", "EECS", "portfolio", "engineering", "computer science"],
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
      </body>
    </html>
  );
}
