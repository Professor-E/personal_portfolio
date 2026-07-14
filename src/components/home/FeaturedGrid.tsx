"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Lightbox from "@/components/common/Lightbox";
import { fadeUp } from "@/lib/motion";

/**
 * Recent work grid — Figma node 616:516
 * 3×4 layout: Experience (row 1), Projects (row 2), Extracurriculars (row 3),
 * Hobbies (row 4)
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
  category: "Experience" | "Project" | "Extracurricular" | "Hobby";
  brandColor: string;
  description: string;
  link: string;
  /** Logo/cover art rendered on a white tile, object-contain (no cropping). */
  logo?: string;
  /** Real photo — fills the image block, object-cover (may crop). */
  image?: string;
  /** Override the default white-tile padding around `logo` (e.g. to show a
   *  book cover larger than a wide company wordmark). */
  logoPadding?: string;
}

const CATEGORY_EXPLORE_LABEL: Record<FeaturedItem["category"], string> = {
  Experience: "experience",
  Project: "projects",
  Extracurricular: "extracurriculars",
  Hobby: "hobbies",
};

// Row order + labels for the section dividers that replace the old per-card badge.
const CATEGORY_ORDER: FeaturedItem["category"][] = [
  "Experience",
  "Project",
  "Extracurricular",
  "Hobby",
];

const CATEGORY_LABEL: Record<FeaturedItem["category"], string> = {
  Experience: "Experience",
  Project: "Projects",
  Extracurricular: "Extracurriculars",
  Hobby: "Hobbies",
};

// Row 1 — Experience (most recent)
// Row 2 — Projects (most recent)
// Row 3 — Extracurriculars
// Row 4 — Hobbies
const FEATURED_ITEMS: FeaturedItem[] = [
  // ── Experience ────────────────────────────────────────────────────────────
  {
    id: "akamai",
    title: "Akamai Technologies",
    category: "Experience",
    brandColor: "#009BDE",
    logo: "/images/logos/akamai.svg",
    description:
      "Built a TypeScript CLI tool that streamlined SDK integration for Akamai's Bot & Abuse Protection platform across five mobile frameworks.",
    link: "/experience",
  },
  {
    id: "handshake",
    title: "Handshake AI Fellowship",
    category: "Experience",
    brandColor: "#7FA000",
    logo: "/images/logos/handshake.png",
    description:
      "Served as an electrical engineering domain expert for Handshake AI, designing PCBs, circuits, and grading rubrics to train and benchmark AI models.",
    link: "/experience",
  },
  {
    id: "yc",
    title: "Y Combinator / Jam It!",
    category: "Experience",
    brandColor: "#FF6600",
    logo: "/images/logos/yc.svg",
    description:
      "Co-founded and launched Jam It! on the App Store with direct funding from Y Combinator, owning UI/UX, backend, and the marketing site.",
    link: "/experience",
  },

  // ── Projects ──────────────────────────────────────────────────────────────
  {
    id: "digital-logic-trainer",
    title: "Digital Logic Trainer",
    category: "Project",
    brandColor: "#2563EB",
    image: "/projects/digital-logic-trainer.png",
    description:
      "Custom PCB teaching tool for digital logic gates, flip-flops, and combinational circuits.",
    link: "/projects",
  },
  {
    id: "maine-east-radio",
    title: "Maine East Radio Station",
    category: "Project",
    brandColor: "#0D9488",
    image: "/projects/maine-east-radio.png",
    description:
      "Designed and built a full broadcast radio station for Maine East High School, now serving 2,340+ listeners.",
    link: "/projects",
  },
  {
    id: "tesla-coil",
    title: "Tesla Coil",
    category: "Project",
    brandColor: "#7C3AED",
    image: "/projects/tesla-coil.png",
    description:
      "Hand-wound solid-state Tesla coil (SSTC) capable of producing 12-inch plasma streamers.",
    link: "/projects",
  },

  // ── Extracurriculars ──────────────────────────────────────────────────────
  {
    id: "engineering-club",
    title: "Engineering Club",
    category: "Extracurricular",
    brandColor: "#E85D20",
    logo: "/extracurriculars/engineering-club.png",
    description:
      "Led the largest non-volunteering club of 124 members with 7 active subsets — Maker Events, MakerFaire, VEX Robotics, and more.",
    link: "/extracurriculars",
  },
  {
    id: "vex-robotics",
    title: "VEX Robotics",
    category: "Extracurricular",
    brandColor: "#2563EB",
    logo: "/extracurriculars/vex-robotics.png",
    description:
      "Team captain, hardware engineer, and programmer. Led a team of 7, placed 5th in State, and automated drivetrain code for a 60% efficiency gain.",
    link: "/extracurriculars",
  },
  {
    id: "science-olympiad",
    title: "Science Olympiad",
    category: "Extracurricular",
    brandColor: "#0D9488",
    logo: "/extracurriculars/science-olympiad.png",
    description:
      "Led and managed a team of 30. Placed 2nd at Regionals and 9th in State, improving team placement by 6 positions.",
    link: "/extracurriculars",
  },

  // ── Hobbies ───────────────────────────────────────────────────────────────
  {
    id: "learning",
    title: "Learning",
    category: "Hobby",
    brandColor: "#4338CA",
    // Book cover — white tile + object-contain (like the logo cards) reads
    // better than a full-bleed crop would for a portrait cover. Smaller
    // padding than the default logo tiles so the cover reads larger.
    logo: "/hobbies/learning.png",
    logoPadding: "clamp(10px, 2vw, 18px)",
    description:
      "Self-directed habit of building understanding from the ground up — online courses, side projects, and chasing curiosity.",
    link: "/hobbies",
  },
  {
    id: "dj",
    title: "DJing",
    category: "Hobby",
    brandColor: "#7C3AED",
    image: "/hobbies/dj.png",
    description:
      "Pioneer DDJ-FLX4 — mixing house and techno, using Rekordbox for track management and set preparation.",
    link: "/hobbies",
  },
  {
    id: "skiing",
    title: "Skiing",
    category: "Hobby",
    brandColor: "#0369A1",
    image: "/hobbies/skiing.png",
    description:
      "Black diamonds and long runs — chasing the combination of speed, precision, and reading the mountain.",
    link: "/hobbies",
  },
];

// ── Fade-in container for the grid rows ───────────────────────────────────────
// Cards in a row cascade left→right with a small stagger — same choreography
// rhythm as the Projects grid's per-column reveal.
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

// Canonical site-wide fade + rise entrance (see src/lib/motion.ts).
const cardVariants = fadeUp;

// ── Single Pillbox card ────────────────────────────────────────────────────────
function PillboxCard({ item, onOpen }: { item: FeaturedItem; onOpen: () => void }) {
  return (
    <motion.div
      // Shared layout id — the lightbox box grows out of this exact card.
      layoutId={`featured-${item.id}`}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      className="group relative flex cursor-pointer flex-col justify-between overflow-hidden rounded-[20px] border border-[var(--border)] bg-[var(--surface)] shadow-[shadow:var(--shadow-md)] transition-[border-color,box-shadow] duration-200 hover:border-[var(--border-strong)] hover:shadow-[shadow:var(--shadow-lg)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
      style={{
        padding: "24px 28px",
        // On mobile/tablet use natural height; capped lower than the original
        // Figma 647px so the cards read lighter and less bulky.
        minHeight: "clamp(440px, 40vw, 580px)",
      }}
      aria-label={`See more about ${item.title}`}
    >
      {/* ── Image block — logo tile / photo / brand-color placeholder ──────
          Category is now conveyed by the row's section divider, so no
          per-card badge is rendered here. */}
      <div className="flex flex-col gap-6 flex-1">
        <div
          className="relative w-full rounded-[20px] shrink-0 flex items-center justify-center overflow-hidden"
          style={{
            backgroundColor: item.logo ? "#ffffff" : item.image ? "transparent" : item.brandColor,
            border: item.logo ? `1px solid ${item.brandColor}33` : undefined,
            height: "clamp(180px, 25vw, 301px)",
          }}
        >
          {item.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.logo}
              alt={`${item.title} logo`}
              className="w-full h-full object-contain select-none"
              style={{ padding: item.logoPadding ?? "clamp(28px, 6vw, 48px)" }}
              draggable={false}
            />
          ) : item.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover select-none"
              draggable={false}
            />
          ) : null}
        </div>

        {/* ── Description block ─────────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {/* Title — Inter Medium, capped at 28px to balance the lighter card */}
          <p
            className="font-medium text-[var(--text-primary)] w-full"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)", lineHeight: 1.15 }}
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

      {/* ── "See more →" footer (Figma node 616:524) ─────────────────────── */}
      <span
        className="mt-4 block font-bold text-[var(--text-primary)] text-right text-[16px] group-hover:text-[var(--accent)] transition-colors leading-none"
      >
        See more →
      </span>
    </motion.div>
  );
}

// ── Row divider — labels each category row instead of the old per-card badge ──
// Eyebrow treatment mirrors the inner pages' page-header eyebrows for a
// consistent sitewide rhythm.
function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h3
        className="font-semibold uppercase tracking-widest whitespace-nowrap"
        style={{ fontSize: "13px", color: "var(--text-secondary)" }}
      >
        {label}
      </h3>
      <div
        className="h-px flex-1"
        style={{ backgroundColor: "var(--border)" }}
        aria-hidden="true"
      />
    </div>
  );
}

// ── Detail content shown inside the enlarged lightbox ───────────────────────────
function FeaturedDetail({ item }: { item: FeaturedItem }) {
  return (
    <div className="flex flex-col">
      {/* Color header — matches the card's color block for a seamless enlarge */}
      <div
        className="relative flex items-end px-6 py-10 sm:px-12 sm:py-16"
        style={{ backgroundColor: item.brandColor, minHeight: "200px" }}
      >
        <span className="text-white text-[14px] font-bold px-3 py-1 rounded-full bg-black/25">
          {item.category}
        </span>
      </div>

      <div className="flex flex-col gap-5 px-6 py-8 sm:px-12 sm:py-10">
        <h2
          className="font-semibold leading-tight text-[var(--text-primary)]"
          style={{ fontSize: "clamp(26px, 4vw, 42px)" }}
        >
          {item.title}
        </h2>

        <div
          className="h-[2px] w-16 rounded-full"
          style={{ backgroundColor: `${item.brandColor}99` }}
          aria-hidden="true"
        />

        <p
          className="font-normal text-[var(--text-secondary)]"
          style={{ fontSize: "clamp(15px, 1.6vw, 19px)", lineHeight: 1.7 }}
        >
          {item.description}
        </p>

        {/* Explore CTA — interactive per item: fills with the item's brand
            color on hover (with a small lift + arrow nudge) and compresses on
            press. The brand color rides a CSS var so Tailwind's hover/active
            classes stay static while each item keeps its own accent. */}
        <Link
          href={item.link}
          className="group/cta mt-2 inline-flex w-fit items-center gap-2 rounded-[12px] border-2 border-[var(--cta)] px-6 py-3 font-bold text-[var(--cta)] transition-[background-color,color,transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[var(--cta)] hover:text-white hover:shadow-[shadow:var(--shadow-md)] active:translate-y-0 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]"
          style={{ ["--cta" as string]: item.brandColor }}
        >
          Explore {CATEGORY_EXPLORE_LABEL[item.category]}
          <span
            aria-hidden="true"
            className="transition-transform duration-200 group-hover/cta:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

// ── Grid export ───────────────────────────────────────────────────────────────
export default function FeaturedGrid() {
  const [activeId, setActiveId] = useState<string | null>(null);
  // Open state is tracked separately from the active item: on close we only
  // flip this flag and KEEP `activeId`, so the lightbox content stays mounted
  // and stable while the exit/morph-back animation plays. Nulling the id
  // mid-exit swapped the content and left the overlay stuck on screen.
  const [isOpen, setIsOpen] = useState(false);
  const [direction, setDirection] = useState<number>(0);

  const activeIndex = FEATURED_ITEMS.findIndex((it) => it.id === activeId);
  const activeItem = activeIndex >= 0 ? FEATURED_ITEMS[activeIndex] : null;
  const len = FEATURED_ITEMS.length;

  function navigate(step: number) {
    if (activeIndex < 0) return;
    const nextIndex = (activeIndex + step + len) % len;
    setDirection(step);
    setActiveId(FEATURED_ITEMS[nextIndex].id);
  }

  return (
    <section
      id="recent-work"
      className="w-full px-8 md:px-16 lg:px-24 py-2.5"
      aria-label="Recent work"
    >
      {/* Section heading — medium weight + display tracking, matching the
          inner pages' title treatment */}
      <h2
        className="font-semibold text-[var(--text-primary)] mb-8"
        style={{
          fontSize: "clamp(28px, 3.4vw, 40px)",
          letterSpacing: "var(--tracking-display)",
        }}
      >
        Recent Work
      </h2>

      {/* One 3-col desktop / 2-col tablet / 1-col mobile grid per category,
          each preceded by a labeled divider instead of a per-card badge. */}
      <div className="flex flex-col gap-12">
        {CATEGORY_ORDER.map((category) => {
          const items = FEATURED_ITEMS.filter((item) => item.category === category);
          if (items.length === 0) return null;
          return (
            <div key={category}>
              <SectionDivider label={CATEGORY_LABEL[category]} />
              {/* Each category row fades in together the moment any part of it
                  is on screen — `amount: "some"` means a row that's already
                  partially visible when the page loads fades in right away,
                  and rows further down fade in (all at once, no stagger) as
                  they're scrolled into view. `once: true` stops it from
                  re-triggering if the user scrolls back up past it. */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: "some" }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {items.map((item) => (
                  <PillboxCard
                    key={item.id}
                    item={item}
                    onOpen={() => {
                      setDirection(0);
                      setActiveId(item.id);
                      setIsOpen(true);
                    }}
                  />
                ))}
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* ── Enlarged detail lightbox ──────────────────────────────────────── */}
      <Lightbox
        isOpen={isOpen && activeItem !== null}
        layoutId={`featured-${activeId}`}
        contentKey={activeId ?? ""}
        accentColor={activeItem?.brandColor}
        direction={direction}
        showArrows={len > 1}
        prevLabel={
          activeIndex >= 0 ? FEATURED_ITEMS[(activeIndex - 1 + len) % len].title : undefined
        }
        nextLabel={
          activeIndex >= 0 ? FEATURED_ITEMS[(activeIndex + 1) % len].title : undefined
        }
        onClose={() => setIsOpen(false)}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
      >
        {activeItem && <FeaturedDetail item={activeItem} />}
      </Lightbox>
    </section>
  );
}
