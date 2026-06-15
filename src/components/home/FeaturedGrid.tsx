"use client";

import { motion } from "framer-motion";
import Link from "next/link";

/**
 * Featured work grid — Figma node 616:516
 * 3×3 layout: Experience (row 1), Projects (row 2), Activities (row 3)
 *
 * Card (Pillbox) — Figma nodes 616:518–616:560
 *   bg: var(--surface)   rounded-[20px]
 *   shadow: 2px 4px 4px 0 rgba(0,0,0,0.5)
 *   px-48px py-24px      w-432px h-647px
 *   Image: h-301px bg-[#c2c2c2] rounded-[20px]
 *   Title: Inter Medium 32px text-primary
 *   Desc:  Inter Regular 18px text-secondary  gap-12px
 *   Footer: Inter Bold 16px text-primary text-right
 */

interface FeaturedItem {
  id: string;
  title: string;
  category: "Experience" | "Project" | "Activity";
  brandColor: string;
  description: string;
  link: string;
}

// Row 1 — Experience
// Row 2 — Projects
// Row 3 — Activities
const FEATURED_ITEMS: FeaturedItem[] = [
  // ── Experience ────────────────────────────────────────────────────────────
  {
    id: "yc",
    title: "Y Combinator / Jam It!",
    category: "Experience",
    brandColor: "#FF6600",
    description:
      "Co-founded Jam It!, a social DJ platform, as part of Y Combinator's batch. Led product development and go-to-market strategy.",
    link: "/experience",
  },
  {
    id: "argonne",
    title: "Argonne National Laboratory",
    category: "Experience",
    brandColor: "#004B87",
    description:
      "Research assistant at a U.S. Department of Energy national lab — conducting experiments, collecting data, and contributing to analysis pipelines.",
    link: "/experience",
  },
  {
    id: "northwestern",
    title: "Northwestern University CTD",
    category: "Experience",
    brandColor: "#4E2A84",
    description:
      "Assistant teacher at Northwestern's Center for Talent Development, mentoring high-achieving students in advanced STEM subjects.",
    link: "/experience",
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  {
    id: "jam-it",
    title: "Jam It!",
    category: "Project",
    brandColor: "#FF6600",
    description:
      "A real-time collaborative DJ platform enabling social music experiences, built with React, Node.js, and WebSockets.",
    link: "/projects",
  },
  {
    id: "radio",
    title: "Maine East Radio Station",
    category: "Project",
    brandColor: "#C0392B",
    description:
      "Rebuilt and upgraded the broadcast infrastructure for a high school radio station — including RF systems and audio electronics.",
    link: "/projects",
  },
  {
    id: "logic-trainer",
    title: "Digital Logic Trainer",
    category: "Project",
    brandColor: "#27AE60",
    description:
      "Educational PCB board for learning combinational and sequential logic circuits, designed from scratch in KiCad.",
    link: "/projects",
  },

  // ── Activities ────────────────────────────────────────────────────────────
  {
    id: "engineering-club",
    title: "Engineering Club",
    category: "Activity",
    brandColor: "#2C3E50",
    description:
      "Active member and project leader of Glenbrook South's Engineering Club — building, mentoring, and competing.",
    link: "/activities",
  },
  {
    id: "vex",
    title: "VEX Robotics",
    category: "Activity",
    brandColor: "#E74C3C",
    description:
      "Team captain in VEX Robotics, achieving 5th place at the state competition through design, programming, and strategy.",
    link: "/activities",
  },
  {
    id: "science-olympiad",
    title: "Science Olympiad",
    category: "Activity",
    brandColor: "#3498DB",
    description:
      "Placed 2nd at Regionals and 9th at State, competing in science and engineering events across multiple disciplines.",
    link: "/activities",
  },
];

// ── Stagger container for the grid rows ───────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// ── Single Pillbox card ────────────────────────────────────────────────────────
function PillboxCard({ item, index }: { item: FeaturedItem; index: number }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.025, transition: { duration: 0.2 } }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-[20px] bg-[var(--surface)] dark:bg-[var(--surface)]"
      style={{
        boxShadow: "2px 4px 4px 0px rgba(0,0,0,0.25)",
        padding: "24px 48px",
        // On mobile/tablet use natural height; on desktop match Figma 647px
        minHeight: "clamp(480px, 45vw, 647px)",
      }}
      aria-label={item.title}
    >
      {/* ── Colored image placeholder (brand color, not #c2c2c2 per spec) ── */}
      <div className="flex flex-col gap-6 flex-1">
        <div
          className="w-full rounded-[20px] shrink-0 flex items-center justify-center"
          style={{
            backgroundColor: item.brandColor,
            height: "clamp(180px, 25vw, 301px)",
          }}
        >
          {/* Category badge */}
          <span className="text-white text-[12px] font-bold px-3 py-1 rounded-full bg-black/20">
            {item.category}
          </span>
        </div>

        {/* ── Description block ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {/* Title — Inter Medium 32px (Figma node 616:522) */}
          <p
            className="font-medium text-[var(--text-primary)] w-full"
            style={{ fontSize: "clamp(20px, 2.5vw, 32px)", lineHeight: 1 }}
          >
            {item.title}
          </p>
          {/* Description — Inter Regular 18px (Figma node 616:523) */}
          <p
            className="font-normal text-[var(--text-secondary)] w-full"
            style={{ fontSize: "clamp(14px, 1.4vw, 18px)", lineHeight: 1.5 }}
          >
            {item.description}
          </p>
        </div>
      </div>

      {/* ── "See more →" footer link (Figma node 616:524) ─────────────────── */}
      {/* Inter Bold 16px, text-primary, text-right */}
      <Link
        href={item.link}
        className="mt-4 block font-bold text-[var(--text-primary)] text-right text-[16px] hover:text-[var(--accent)] transition-colors leading-none"
        aria-label={`See more about ${item.title}`}
      >
        See more →
      </Link>

      {/* ── Hover overlay with "View More →" ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="pointer-events-none group-hover:pointer-events-auto absolute inset-0 rounded-[20px] flex flex-col items-center justify-center gap-4 px-8"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.65) 100%)",
        }}
      >
        <Link
          href={item.link}
          className="pointer-events-auto font-bold text-white text-[18px] px-6 py-3 rounded-[12px] border-2 border-white/80 hover:bg-white/10 transition-colors"
        >
          View More →
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ── Grid export ───────────────────────────────────────────────────────────────
export default function FeaturedGrid() {
  return (
    <section className="w-full px-6 md:px-12 lg:px-20 py-2.5" aria-label="Featured work">
      {/* Section heading */}
      <p
        className="font-medium text-[var(--text-secondary)] mb-6"
        style={{ fontSize: "14px" }}
      >
        Featured Work
      </p>

      {/* 3-col desktop / 2-col tablet / 1-col mobile grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {FEATURED_ITEMS.map((item, i) => (
          <PillboxCard key={item.id} item={item} index={i} />
        ))}
      </motion.div>
    </section>
  );
}
