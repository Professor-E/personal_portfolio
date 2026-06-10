"use client";

/**
 * Memories section — Figma node 616:699
 *
 * Heading (616:700): "Memories" — Inter SemiBold 24px, text-primary
 * Photos (616:701):  1392×769px frame — EMPTY in Figma, so it is rendered
 *                    as an empty frame ready to receive photos later.
 */
export default function MemoriesSection() {
  return (
    <section
      className="flex flex-col gap-[12px] items-start w-full"
      aria-label="Memories"
    >
      {/* Heading — node 616:700: Inter SemiBold 24px text-primary */}
      <p
        className="font-semibold text-[var(--text-primary)]"
        style={{ fontSize: "24px", lineHeight: "normal" }}
      >
        Memories
      </p>

      {/* Photos frame — node 616:701: empty in Figma (769px tall at 1440px
          canvas, reduced on small screens). TODO: add memory photos here. */}
      <div
        aria-hidden="true"
        className="w-full h-[320px] md:h-[769px]"
      />
    </section>
  );
}
