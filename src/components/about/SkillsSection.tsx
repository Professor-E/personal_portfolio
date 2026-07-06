"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

/**
 * Skills & Tools section — moved here from the Experience page.
 * Organized into labeled rows of pills with a staggered whileInView entrance
 * (0.08s per row, 0.025s per pill within a row) and a spring hover scale.
 * Pill tint tokens (--skill-pill-*) live in src/styles/tokens.css.
 */

const ROWS = [
  {
    label: "Languages",
    pills: ["Python", "C", "C++", "TypeScript", "Swift", "R", "Java", "Assembly"],
  },
  {
    label: "Design & CAD",
    pills: ["KiCAD", "EasyEDA Pro", "Autodesk Fusion 360", "PrusaSlicer", "Bambu Studio", "MultiSIM"],
  },
  {
    label: "Frameworks",
    pills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "SwiftUI"],
  },
  {
    label: "Hardware & Tools",
    pills: ["Oscilloscope", "DMM", "Frequency Generator", "Laser Engraver", "3D Printer", "Soldering Iron"],
  },
  {
    label: "Software",
    pills: ["VS Code", "Figma", "Git", "Arduino IDE", "Linux"],
  },
] as const;

// The stagger delay lives INSIDE the `visible` variant (via `custom`) instead
// of on the component's `transition` prop — a component-level transition also
// applies to whileHover, which made the hover scale wait out the entrance
// delay (up to ~0.5s on later pills) before responding.
const labelVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.4, ease: EASE_OUT },
  }),
};

const pillVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.35, ease: EASE_OUT },
  }),
};

export default function SkillsSection() {
  return (
    <section className="flex flex-col gap-6 w-full" aria-label="Skills and Tools">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="font-semibold text-[var(--text-primary)]"
        style={{ fontSize: "32px", lineHeight: "normal" }}
      >
        Skills &amp; Tools
      </motion.h2>

      {/* Rows — staggered entrance driven by the parent's whileInView */}
      <motion.div
        className="flex flex-col gap-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {ROWS.map(({ label, pills }, rowIdx) => (
          <div key={label}>
            <motion.p
              variants={labelVariants}
              custom={rowIdx * 0.08}
              className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2"
            >
              {label}
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {pills.map((pill, pillIdx) => (
                <motion.span
                  key={`${label}-${pill}`}
                  variants={pillVariants}
                  custom={rowIdx * 0.08 + pillIdx * 0.025}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--skill-pill-hover)",
                    transition: { duration: 0.15, ease: "easeOut" },
                  }}
                  className="skill-pill inline-flex items-center text-sm font-medium text-[var(--text-primary)] cursor-default"
                  style={{
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "9999px",
                    backgroundColor: "var(--skill-pill-bg)",
                    border: "1px solid var(--skill-pill-border)",
                  }}
                >
                  {pill}
                </motion.span>
              ))}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
