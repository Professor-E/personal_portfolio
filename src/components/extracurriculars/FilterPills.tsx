"use client";

import { cn } from "@/lib/utils";

interface FilterPillsProps {
  active: string;
  onChange: (value: string) => void;
  options: string[];
}

/**
 * FilterPills — category filter row for the Extracurriculars page. Kept separate
 * from the Projects pills so each page can be styled and extended independently.
 * Colors resolve to the design-system CSS variables (--accent, --text-primary,
 * --text-secondary, --surface, --border) so light/dark mode tracks correctly.
 */
export default function FilterPills({ active, onChange, options }: FilterPillsProps) {
  return (
    <div
      className="flex flex-wrap items-center gap-2"
      role="tablist"
      aria-label="Filter extracurriculars by category"
    >
      {options.map((option) => {
        const isActive = option === active;
        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={cn(
              "whitespace-nowrap rounded-full px-3.5 py-1 text-[13px] transition-colors duration-150",
              isActive
                ? "border-0 font-medium text-white"
                : "border-[0.5px] text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
            )}
            style={
              isActive
                ? { backgroundColor: "var(--accent)" }
                : { borderColor: "var(--border-strong)" }
            }
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
