"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { useParallax } from "@/lib/useParallax";

/**
 * Academics section — content locked to Figma node 616:680 (text verbatim).
 * Visual redesign: full-bleed image cards with a bottom gradient overlay and
 * white text overlay. Cards are equal width and equal height (442px, Figma).
 *
 * Figma text strings (verbatim):
 *   Heading (616:681): "Academics"
 *   Card 1 (616:687/688/690): "High School" / "Glenbrook South High School" /
 *     "’21 - ‘25" / body paragraph
 *   Card 2 (616:695/696/698): "College" / "Massachusetts Institute of
 *     Technology" / "’25 - ‘29" / body paragraph
 */

const CARDS = [
  {
    id: "college",
    image: "/images/mit.jpg",
    label: "College",
    institution: "Massachusetts Institute of Technology",
    years: "\u201925 - \u201829",
    body: "As an Electrical Engineering and Computer Science student at MIT, I am constantly challenged to think critically, collaborate with talented peers, and turn ideas into reality. MIT has given me opportunities to explore hardware, software, research, and entrepreneurship while continuing to grow as both an engineer and a person.",
  },
  {
    id: "high-school",
    image: "/images/gbs.jpg",
    label: "High School",
    institution: "Glenbrook South High School",
    years: "\u201921 - \u201825",
    body: "My time at Glenbrook South High School laid the foundation for my passion for engineering and technology. Through academics, extracurricular activities, and hands-on projects, I developed the curiosity and problem-solving mindset that ultimately led me to pursue Electrical Engineering and Computer Science at MIT.",
  },
] as const;

const BASE_GRADIENT =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.72) 100%)";
const HOVER_GRADIENT =
  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.20) 40%, rgba(0,0,0,0.82) 100%)";

/** One academics card — split out so each gets its own parallax ref. */
function AcademicsCard({
  image,
  label,
  institution,
  years,
  body,
  index,
}: (typeof CARDS)[number] & { index: number }) {
  // Scroll-scrubbed drift of the photo inside the card frame. The wrapper is
  // over-scaled (1.12) so the ±26px travel never exposes the card's edges.
  const parallaxRef = useParallax<HTMLDivElement>(26);

  return (
    <motion.div
      className="flex-1 w-full min-w-0"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: EASE_OUT }}
    >
      {/* Inner wrapper: hover scale only (spring) */}
      <motion.div
        className="relative overflow-hidden rounded-2xl w-full group"
        style={{ height: "442px" }}
        whileHover={{ scale: 1.025 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {/* Parallax frame — GSAP animates `y`, preserving the scale */}
        <div
          ref={parallaxRef}
          className="absolute inset-0"
          style={{ transform: "scale(1.12)" }}
        >
          <Image
            src={image}
            alt={institution}
            fill
            className="object-cover"
            style={{ objectPosition: "center" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Base gradient overlay */}
        <div className="absolute inset-0" style={{ background: BASE_GRADIENT }} />
        {/* Deeper hover gradient — fades in over the base overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100"
          style={{
            background: HOVER_GRADIENT,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Text overlay — bottom of card, white, Figma strings verbatim */}
        <div
          className="absolute bottom-0 left-0 right-0 flex flex-col gap-1.5"
          style={{ padding: "24px" }}
        >
          <p
            className="font-semibold text-white"
            style={{ fontSize: "13px", opacity: 0.85, lineHeight: 1 }}
          >
            {label}
          </p>
          <h3
            className="font-bold text-white"
            style={{ fontSize: "24px", lineHeight: "normal" }}
          >
            {institution}
          </h3>
          <p
            className="font-medium text-white"
            style={{ fontSize: "16px", opacity: 0.85, lineHeight: 1 }}
          >
            {years}
          </p>
          <p
            className="font-medium text-white mt-2"
            style={{ fontSize: "13px", opacity: 0.8, lineHeight: "20px" }}
          >
            {body}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function AcademicsSection() {
  return (
    <section className="flex flex-col gap-6 w-full" aria-label="Academics">
      {/* Heading — Figma node 616:681, verbatim */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="font-semibold text-[var(--text-primary)]"
        style={{ fontSize: "32px", lineHeight: "normal" }}
      >
        Academics
      </motion.h2>

      {/* Cards — equal width and height, stack on mobile */}
      <div className="flex flex-col md:flex-row gap-6 w-full">
        {CARDS.map((card, i) => (
          <AcademicsCard key={card.id} {...card} index={i} />
        ))}
      </div>
    </section>
  );
}
