"use client";

import { cn } from "@/lib/utils";

interface FilterPillsProps {
  active: string;
  onChange: (value: string) => void;
  options: string[];
}

/**
 * FilterPills — horizontally scrollable category filter row for the Projects
 * page. All colors resolve to the Figma design-system CSS variables
 * (--accent, --text-secondary, --text-primary, --surface, --border).
 */
export default function FilterPills({ active, onChange, options }: FilterPillsProps) {
  return (
    <div
      className="flex items-center gap-2 overflow-x-auto -mx-1 px-1 pb-1"
      style={{ scrollbarWidth: "none" }}
      role="tablist"
      aria-label="Filter projects by category"
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
              "shrink-0 whitespace-nowrap rounded-full px-3.5 py-1 text-[13px] font-medium",
              "border-[0.5px] transition-colors duration-150",
              isActive
                ? "border-transparent text-white"
                : "border-[color-mix(in_srgb,var(--text-secondary)_45%,var(--border))] text-[var(--text-secondary)] hover:bg-[var(--surface)] hover:text-[var(--text-primary)]"
            )}
            style={isActive ? { backgroundColor: "var(--accent)" } : undefined}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
