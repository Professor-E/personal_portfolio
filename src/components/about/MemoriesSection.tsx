"use client";

import { motion } from "framer-motion";

/**
 * Memories section — Figma node 616:699 (content verbatim).
 *
 * Heading (616:700): "Memories"
 * Photos (616:701):  empty frame in Figma — rendered as an empty frame
 *                    ready to receive photos later.
 */
export default function MemoriesSection() {
  return (
    <section className="flex flex-col gap-6 w-full" aria-label="Memories">
      {/* Heading — Figma node 616:700, verbatim */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-bold text-[var(--text-primary)]"
        style={{ fontSize: "32px", lineHeight: "normal" }}
      >
        Memories
      </motion.h2>

      {/* Photos frame — empty in Figma. TODO: add memory photos here. */}
      <div aria-hidden="true" className="w-full h-[240px] md:h-[480px]" />
    </section>
  );
}
