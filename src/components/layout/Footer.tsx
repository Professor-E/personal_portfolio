"use client";

/**
 * Global footer — Figma node 627:362
 *
 * Background:   var(--border, #e8e7e2)
 * Height:       214px in Figma at 1440px canvas — content-driven in practice
 * Top section:  flex items-start justify-between, px-[24px] py-[10px]
 * Left col:     Dominik Grzeszczak — Inter Bold 14px text-primary
 *               subtitle — Inter Medium 12px text-secondary
 *               icon row — gap-[10px], Github + Linkedin + Instagram + Mail
 * Center col:   w-[212px], "Navigate" Bold 14px, links Medium 12px text-secondary
 * Right col:    "Get in touch" Bold 14px, desc Medium 12px text-secondary, email accent
 * Bottom strip: px-[24px] py-[10px], copyright Medium 12px text-secondary,
 *               "Back to top" Medium 12px text-primary + ArrowUp icon
 */

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Mail, ArrowUp } from "lucide-react";

// ── Social links (Figma node 627:367) ─────────────────────────────────────────
const SOCIAL = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Professor-E",
    icon: Github,
    external: true,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/domgrzeszczak/",
    icon: Linkedin,
    external: true,
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/grzeszczak.dominik/",
    icon: Instagram,
    external: true,
  },
  {
    id: "email",
    label: "Email",
    href: "mailto:dominikgrzeszczak28@gmail.com",
    icon: Mail,
    external: false,
  },
] as const;

// ── Navigate links (Figma node 627:371) — mirrors the Navbar's full tab set ──
const NAV_LINKS = [
  { label: "Homepage",          href: "/" },
  { label: "Experience",        href: "/experience" },
  { label: "Projects",          href: "/projects" },
  { label: "Extracurriculars",  href: "/extracurriculars" },
  { label: "Hobbies",           href: "/hobbies" },
  { label: "About Me",          href: "/about" },
  { label: "Contact Me",        href: "/contact" },
] as const;

export default function Footer() {
  return (
    <footer
      className="w-full transition-colors duration-200"
      style={{ backgroundColor: "var(--border)" }}
    >
      {/* ── Top three-column section ─────────────────────────────────────── */}
      {/* Figma node 627:363: flex items-start justify-between px-[24px]   */}
      {/* pt-7 (28px) — columns sit slightly higher in the footer            */}
      <div className="max-w-[1440px] mx-auto px-6 pt-7 pb-6 flex flex-col md:flex-row items-start justify-between gap-10 md:gap-6">

        {/* ── Left column — Identity (Figma node 627:364) ──────────────── */}
        {/* h-[96px] p-[10px] justify-between in Figma */}
        <div className="flex flex-col gap-3">
          {/* Name — Figma node 627:365: Inter Bold 14px, text-primary */}
          <p
            className="font-bold leading-none"
            style={{ fontSize: "14px", color: "var(--text-primary)" }}
          >
            Dominik Grzeszczak
          </p>

          {/* Subtitle — Figma node 627:366: Inter Medium 12px, text-secondary */}
          <p
            className="font-medium leading-none"
            style={{ fontSize: "12px", color: "var(--text-secondary)" }}
          >
            Electrical Engineering &amp; Computer Science @ MIT
          </p>

          {/* Social icon row — Figma node 627:367: gap-[10px], 4 icons */}
          <div className="flex items-center" style={{ gap: "10px" }}>
            {SOCIAL.map(({ id, label, href, icon: Icon, external }) => (
              <motion.a
                key={id}
                href={href}
                aria-label={label}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                whileHover={{ color: "var(--accent)" }}
                transition={{ duration: 0.15 }}
                className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--border)]"
                style={{ color: "var(--text-secondary)" }}
              >
                <Icon size={16} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* ── Center column — Navigate (Figma node 627:371) ────────────── */}
        {/* w-[212px] h-[162px] p-[10px] justify-between in Figma */}
        <div className="flex flex-col gap-2.5 md:w-[212px]">
          {/* Heading — Figma node 627:372: Inter Bold 14px, text-primary */}
          <p
            className="font-bold leading-none"
            style={{ fontSize: "14px", color: "var(--text-primary)" }}
          >
            Navigate
          </p>
          {/* Links — Figma nodes 627:373–377: Inter Medium 12px, text-secondary */}
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-medium leading-none transition-colors duration-150 hover:text-[var(--accent)] rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--border)]"
              style={{ fontSize: "12px", color: "var(--text-secondary)" }}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* ── Right column — Get in touch (Figma node 627:378) ─────────── */}
        {/* h-[87px] p-[10px] justify-between in Figma */}
        <div className="flex flex-col gap-2.5">
          {/* Heading — Figma node 627:379: Inter Bold 14px, text-primary */}
          <p
            className="font-bold leading-none"
            style={{ fontSize: "14px", color: "var(--text-primary)" }}
          >
            Get in touch
          </p>
          {/* Description — Figma node 627:380: Inter Medium 12px, text-secondary */}
          <p
            className="font-medium leading-none"
            style={{ fontSize: "12px", color: "var(--text-secondary)" }}
          >
            Feel free to reach out!
          </p>
          {/* Email — Figma node 627:381: Inter Medium 12px, var(--accent) */}
          <a
            href="mailto:dominikgrzeszczak28@gmail.com"
            className="font-medium leading-none hover:underline transition-colors duration-150 rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--border)]"
            style={{ fontSize: "12px", color: "var(--accent)" }}
          >
            dominikgrzeszczak28@gmail.com
          </a>
        </div>
      </div>

      {/* ── Bottom strip (Figma node 627:382) ───────────────────────────── */}
      {/* px-[24px] py-[10px], flex items-center justify-between           */}
      {/* Figma shows NO divider between columns and this strip — no border */}
      <div
        className="max-w-[1440px] mx-auto px-6 py-2.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-3"
      >
        {/* Copyright — Figma node 627:383: Inter Medium 12px, text-secondary */}
        <p
          className="font-medium leading-none"
          style={{ fontSize: "12px", color: "var(--text-secondary)" }}
        >
          © 2026 Dominik Grzeszczak · Built with React, TypeScript &amp; Tailwind
        </p>

        {/* Back to top — Figma node 627:384–385: Inter Medium 12px, text-primary */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-1 font-medium leading-none transition-colors duration-150 hover:text-[var(--accent)] cursor-pointer rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--border)]"
          style={{ fontSize: "12px", color: "var(--text-primary)" }}
          aria-label="Back to top"
        >
          Back to top
          {/* Figma node 627:386: ArrowUp icon */}
          <ArrowUp size={12} />
        </button>
      </div>
    </footer>
  );
}
