"use client";

import { motion } from "framer-motion";

/**
 * Skills & Tools section — moved here from the Experience page.
 * Organized into labeled rows of pills with a staggered whileInView entrance
 * (0.08s per row, 0.025s per pill within a row) and a spring hover scale.
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
    pills: ["Oscilloscope", "DMM", "Frequency Generator", "Laser Engraver", "3D Printer", "Soldering Iron", "Arduino IDE"],
  },
  {
    label: "Software",
    pills: ["VS Code", "Figma", "Git", "Arduino IDE", "Linux"],
  },
] as const;

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

export default function SkillsSection() {
  return (
    <section className="flex flex-col gap-6 w-full" aria-label="Skills and Tools">
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-bold text-[var(--text-primary)]"
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
              variants={itemVariants}
              transition={{ delay: rowIdx * 0.08, duration: 0.4, ease: "easeOut" }}
              className="text-xs font-semibold uppercase tracking-widest text-[var(--text-secondary)] mb-2"
            >
              {label}
            </motion.p>
            <div className="flex flex-wrap gap-2">
              {pills.map((pill, pillIdx) => (
                <motion.span
                  key={`${label}-${pill}`}
                  variants={itemVariants}
                  transition={{
                    delay: rowIdx * 0.08 + pillIdx * 0.025,
                    duration: 0.35,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "rgba(59,130,246,0.12)",
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

      {/* Pill tint tokens — slightly more opaque in dark mode */}
      <style>{`
        :root {
          --skill-pill-bg: rgba(59,130,246,0.06);
          --skill-pill-border: rgba(59,130,246,0.18);
        }
        .dark {
          --skill-pill-bg: rgba(59,130,246,0.10);
          --skill-pill-border: rgba(59,130,246,0.25);
        }
      `}</style>
    </section>
  );
}
