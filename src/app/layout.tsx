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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
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
