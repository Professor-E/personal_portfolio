"use client";

import Image from "next/image";
import { motion } from "framer-motion";

/**
 * Academics section — Figma node 616:680
 *
 * Heading (616:681): "Academics" — Inter SemiBold 24px, text-primary
 * Cards row (616:682): flex items-start justify-between, w-full
 *
 * Each card = photo + text panel side by side (NO gradient overlay in Figma):
 *   – Image: 422×442px, object-cover (nodes 616:684 / 616:692)
 *   – Panel: bg surface, w-264px, p-10px, flex-col gap-28px (616:685 / 616:693)
 *       Title:    Inter Bold 16px, text-primary
 *       Subtitle: Inter SemiBold 14px, text-secondary (two lines)
 *       Body:     Inter SemiBold 14px, line-height 24px, text-secondary
 *
 * Card order per Figma: High School (left), College (right).
 */

const CARDS = [
  {
    id: "high-school",
    image: "/images/gbs.jpg",
    imageAlt: "Glenbrook South High School",
    title: "High School",
    subtitleLine1: "Glenbrook South High School",
    subtitleLine2: "\u201921 - \u201825",
    body: "My time at Glenbrook South High School laid the foundation for my passion for engineering and technology. Through academics, extracurricular activities, and hands-on projects, I developed the curiosity and problem-solving mindset that ultimately led me to pursue Electrical Engineering and Computer Science at MIT.",
  },
  {
    id: "college",
    image: "/images/mit.jpg",
    imageAlt: "Massachusetts Institute of Technology",
    title: "College",
    subtitleLine1: "Massachusetts Institute of Technology",
    subtitleLine2: "\u201925 - \u201829",
    body: "As an Electrical Engineering and Computer Science student at MIT, I am constantly challenged to think critically, collaborate with talented peers, and turn ideas into reality. MIT has given me opportunities to explore hardware, software, research, and entrepreneurship while continuing to grow as both an engineer and a person.",
  },
] as const;

export default function AcademicsSection() {
  return (
    <section
      className="flex flex-col gap-[12px] items-start w-full"
      aria-label="Academics"
    >
      {/* Heading — node 616:681: Inter SemiBold 24px text-primary */}
      <p
        className="font-semibold text-[var(--text-primary)]"
        style={{ fontSize: "24px", lineHeight: "normal" }}
      >
        Academics
      </p>

      {/* Cards — node 616:682: flex items-start justify-between w-full.
          Stacks vertically below lg; inside each card the image stacks
          above the panel below sm. */}
      <div className="flex flex-col lg:flex-row items-start justify-between gap-6 w-full">
        {CARDS.map(
          ({ id, image, imageAlt, title, subtitleLine1, subtitleLine2, body }, i) => (
            <motion.div
              key={id}
              className="flex flex-col sm:flex-row items-stretch w-full lg:w-auto"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 + i * 0.1, duration: 0.5, ease: "easeOut" }}
            >
              {/* Image — 422×442px in Figma, object-cover */}
              <div className="relative w-full sm:w-[422px] h-[280px] sm:h-[442px] shrink-0">
                <Image
                  src={image}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 422px"
                />
              </div>

              {/* Text panel — bg surface, w-264px, p-10px, gap-28px */}
              <div
                className="flex flex-col gap-[28px] items-start w-full sm:w-[264px] shrink-0"
                style={{ backgroundColor: "var(--surface)", padding: "10px" }}
              >
                <div className="flex flex-col gap-[8px] items-start">
                  {/* Title — Inter Bold 16px text-primary */}
                  <p
                    className="font-bold text-[var(--text-primary)]"
                    style={{ fontSize: "16px", lineHeight: "normal" }}
                  >
                    {title}
                  </p>
                  {/* Subtitle — Inter SemiBold 14px text-secondary, two lines */}
                  <p
                    className="font-semibold text-[var(--text-secondary)]"
                    style={{ fontSize: "14px", lineHeight: "normal" }}
                  >
                    {subtitleLine1}
                    <br aria-hidden />
                    {subtitleLine2}
                  </p>
                </div>
                {/* Body — Inter SemiBold 14px lh-24px text-secondary */}
                <p
                  className="font-semibold text-[var(--text-secondary)] w-full"
                  style={{ fontSize: "14px", lineHeight: "24px" }}
                >
                  {body}
                </p>
              </div>
            </motion.div>
          )
        )}
      </div>
    </section>
  );
}
