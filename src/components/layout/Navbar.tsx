"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/ui/ThemeToggle";

/**
 * Navbar — Figma node 627:340, elevated to a frosted liquid-glass bar.
 *
 * Height:      70px
 * Background:  translucent var(--background) + backdrop blur (frosted glass)
 * Border:      hairline var(--border) bottom edge — fades in after ~8px scroll
 * Logo:        "Dominik Grzeszczak" — Inter SemiBold 18px, var(--text-primary)
 * Tabs:        Inter Medium 16px — default var(--text-secondary), active var(--accent)
 * Tab gap:     24px
 * Padding:     px-24px (left and right)
 * Active style: accent color only — no underline, no dot
 */

// Tab labels are exactly as shown in Figma node 627:343
const NAV_ITEMS = [
  { label: "Homepage",        href: "/" },
  { label: "Experience",      href: "/experience" },
  { label: "Projects",        href: "/projects" },
  { label: "Extracurriculars", href: "/extracurriculars" },
  { label: "Hobbies",         href: "/hobbies" },
  { label: "About Me",        href: "/about" },
  { label: "Contact Me",      href: "/contact" },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hairline bottom border appears only once the page is scrolled, so the bar
  // reads as part of the page at rest and as a frosted layer once content
  // slides beneath it.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActive(href: string) {
    if (href === "/") return pathname === "/" || pathname === "/home";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      {/* ── Fixed navbar bar — frosted glass over the scrolling page ──────── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 h-[70px] backdrop-blur-md transition-[border-color] duration-300"
        style={{
          backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
          borderBottom: "1px solid",
          borderBottomColor: scrolled ? "var(--border)" : "transparent",
        }}
      >
        <div className="flex items-center justify-between h-full px-6 max-w-[1440px] mx-auto">

          {/* Logo — Figma node 627:342: SemiBold 18px, text-primary */}
          {/* id used by IntroAnimation to measure this element as the corner-
              transition landing target — do not remove. font-display MUST stay
              in sync with IntroAnimation's name span: the intro's traveling
              name scales down to land pixel-exact on this element, which only
              works when both share a font family. */}
          <Link
            id="nav-logo-name"
            href="/"
            className="font-display font-semibold text-[18px] leading-none whitespace-nowrap shrink-0"
            style={{ color: "var(--text-primary)" }}
          >
            Dominik Grzeszczak
          </Link>

          {/* ── Desktop tabs (md+) ───────────────────────────────────────── */}
          {/* Figma node 627:343: gap-[24px], py-[10px], h-full             */}
          <div className="hidden md:flex items-center gap-6 h-full py-[10px]">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "text-[16px] font-medium leading-none whitespace-nowrap transition-colors duration-150",
                  "link-underline",
                  "rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                  isActive(item.href)
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                {item.label}
              </Link>
            ))}
            {/* Figma node 627:358 — Moon icon in 28px circle */}
            <ThemeToggle />
          </div>

          {/* ── Mobile controls (< md) ──────────────────────────────────── */}
          <div className="flex md:hidden items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              className="flex items-center justify-center w-9 h-9 rounded-md transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
              style={{
                color: menuOpen ? "var(--text-primary)" : "var(--text-secondary)",
              }}
            >
              {/* Hamburger ⇄ X morph: outer lines rotate about the icon center
                  while the middle line fades — one continuous motion both ways. */}
              <span className="relative block w-5 h-5" aria-hidden="true">
                {/* Lines sit at top 3px / 9px / 15px; open state slides the
                    outer pair onto the middle line and rotates them ±45°. */}
                <motion.span
                  className="absolute left-0 top-[3px] block h-[2px] w-5 rounded-full bg-current"
                  animate={menuOpen ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.span
                  className="absolute left-0 top-[9px] block h-[2px] w-5 rounded-full bg-current"
                  animate={menuOpen ? { opacity: 0, scaleX: 0.6 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                />
                <motion.span
                  className="absolute left-0 top-[15px] block h-[2px] w-5 rounded-full bg-current"
                  animate={menuOpen ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile slide-down drawer ──────────────────────────────────────── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[70px] left-0 right-0 z-40 md:hidden shadow-md"
            style={{ backgroundColor: "var(--background)" }}
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "py-3 text-[16px] font-medium transition-colors duration-150",
                    "border-b last:border-0",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
                    isActive(item.href)
                      ? "text-[var(--accent)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  )}
                  style={{ borderColor: "var(--border)" }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
