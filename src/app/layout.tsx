import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// ── Fonts — Inter (from Figma tokens: --font-inter) ───────────────────────────
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
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
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: introSplashScript }} />
        {/* Cold-open intro splash — hidden unless `html.intro-pending` is set by
            the script above. Removed by IntroAnimation once it mounts. */}
        <div id="intro-splash" aria-hidden="true" />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <Navbar />
          {/* pt-[70px] matches exact navbar height from Figma node 627:340 */}
          <main className="pt-[70px]">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
