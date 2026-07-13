"use client";

import Image from "next/image";
import { ArrowUpRight, Globe, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Live-site deep links (user request, July 2026): the Jam It! marketing site
 * (jamit-ios.com) is a staple of the work and must be visible and clickable
 * at the surface of the Experience and Projects sections — no digging.
 *
 * Three treatments, all real <a target="_blank"> links:
 *
 * - `LiveSitePreview variant="window"` (default) — a mini browser-window
 *   mockup: traffic-light dots + URL pill + external-link arrow over a
 *   screenshot of the deployed site (project lightbox).
 * - `LiveSitePreview variant="bar"` — the chrome bar ONLY: dots + URL pill +
 *   a persistent "Visit ↗" hint. Fixed-height row for layouts where the full
 *   screenshot is too tall (Experience card — user request: keep the cards'
 *   uniform rhythm).
 * - `LiveSiteChip` — a compact accent pill (host + arrow) for tight spots
 *   like the project grid cards.
 *
 * All stop click/keydown propagation so they can sit inside clickable cards
 * (project cards open their lightbox on click/Enter) without triggering them.
 * Hover motion is pure CSS transitions, honoring the global reduced-motion
 * kill switch in globals.css.
 */

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const stop = (e: React.SyntheticEvent) => e.stopPropagation();

// ── Shared chrome pieces ──────────────────────────────────────────────────────

// macOS traffic lights — deliberately hardcoded hexes (OS-chrome mimicry has
// no token equivalent), the same documented exception class as the marquee
// brand colors.
function TrafficLights() {
  return (
    <span className="flex shrink-0 gap-1.5" aria-hidden="true">
      <span className="h-[9px] w-[9px] rounded-full" style={{ backgroundColor: "#FF5F57" }} />
      <span className="h-[9px] w-[9px] rounded-full" style={{ backgroundColor: "#FEBC2E" }} />
      <span className="h-[9px] w-[9px] rounded-full" style={{ backgroundColor: "#28C840" }} />
    </span>
  );
}

function UrlPill({ host }: { host: string }) {
  return (
    <span className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1">
      <Lock size={10} className="shrink-0 text-[var(--text-secondary)]" aria-hidden="true" />
      <span
        className="truncate font-medium text-[var(--text-secondary)]"
        style={{ fontSize: "12px" }}
      >
        {host}
      </span>
    </span>
  );
}

// ── Compact pill — project grid cards ─────────────────────────────────────────

export function LiveSiteChip({ url, className }: { url: string; className?: string }) {
  const host = hostOf(url);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={stop}
      onKeyDown={stop}
      aria-label={`Visit ${host} (opens in a new tab)`}
      className={cn(
        "inline-flex items-center gap-1 self-start rounded-full px-2.5 py-1 font-semibold leading-none",
        "bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] text-[var(--accent)]",
        "transition-colors duration-200 hover:bg-[var(--accent)] hover:text-white",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
        className
      )}
      style={{ fontSize: "11px" }}
    >
      <Globe size={11} aria-hidden="true" />
      {host}
      <ArrowUpRight size={11} aria-hidden="true" />
    </a>
  );
}

// ── Browser-chrome preview — window (lightbox) or bar (Experience card) ──────

interface LiveSitePreviewProps {
  /** Full https URL of the deployed site. */
  url: string;
  /** Screenshot of the site (public/, 16:10). Required for "window"; unused by "bar". */
  image?: string;
  /** Human name of the destination for the accessible label, e.g. "the Jam It! website". */
  label: string;
  /** Brand color tinting the hover border, arrow, and the bar's "Visit" hint. Defaults to the site accent. */
  accentColor?: string;
  /** "window": chrome + screenshot. "bar": chrome bar only (falls back to "bar" if no image). */
  variant?: "window" | "bar";
  /** next/image responsive hint for the window screenshot. */
  sizes?: string;
  className?: string;
}

export default function LiveSitePreview({
  url,
  image,
  label,
  accentColor,
  variant = "window",
  sizes = "(max-width: 768px) 90vw, 620px",
  className,
}: LiveSitePreviewProps) {
  const host = hostOf(url);
  const accentVar = { ["--live-accent" as string]: accentColor ?? "var(--accent)" };
  const linkProps = {
    href: url,
    target: "_blank",
    rel: "noopener noreferrer",
    onClick: stop,
    onKeyDown: stop,
    "aria-label": `Visit ${label} at ${host} (opens in a new tab)`,
  } as const;

  // ── Bar — chrome strip only, with an explicit "Visit ↗" affordance ────────
  if (variant === "bar" || !image) {
    return (
      <a
        {...linkProps}
        className={cn(
          "group/live flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-3.5 py-2.5",
          "shadow-[var(--shadow-sm)] transition-[transform,border-color,box-shadow] duration-200",
          "hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--live-accent)_60%,var(--border))] hover:shadow-[var(--shadow-md)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--surface)]",
          className
        )}
        style={accentVar}
      >
        <TrafficLights />
        <UrlPill host={host} />
        {/* Persistent hint that the bar is a link — brand-colored, matching
            the card's existing role/stat accent usage. */}
        <span
          className="flex shrink-0 items-center gap-1 font-semibold leading-none"
          style={{ fontSize: "12px", color: "var(--live-accent)" }}
        >
          Visit
          <ArrowUpRight
            size={13}
            className="transition-transform duration-200 group-hover/live:-translate-y-0.5 group-hover/live:translate-x-0.5"
            aria-hidden="true"
          />
        </span>
      </a>
    );
  }

  // ── Window — chrome bar + live screenshot ─────────────────────────────────
  return (
    <a
      {...linkProps}
      className={cn(
        "group/live block overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]",
        "shadow-[var(--shadow-md)] transition-[transform,border-color,box-shadow] duration-200",
        "hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--live-accent)_60%,var(--border))] hover:shadow-[var(--shadow-lg)]",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]",
        className
      )}
      style={accentVar}
    >
      {/* Browser chrome bar */}
      <span className="flex items-center gap-3 border-b border-[var(--border)] px-3.5 py-2.5">
        <TrafficLights />
        <UrlPill host={host} />
        <ArrowUpRight
          size={15}
          className="shrink-0 text-[var(--text-secondary)] transition-colors duration-200 group-hover/live:text-[var(--live-accent)]"
          aria-hidden="true"
        />
      </span>

      {/* Site screenshot */}
      <span className="relative block w-full overflow-hidden" style={{ aspectRatio: "16 / 10" }}>
        <Image
          src={image}
          alt=""
          fill
          sizes={sizes}
          className="object-cover object-top transition-transform duration-700 ease-out group-hover/live:scale-[1.04]"
        />
        {/* Hover hint — floats up from the bottom edge */}
        <span
          className="pointer-events-none absolute inset-x-0 bottom-3 flex translate-y-1.5 justify-center opacity-0 transition-all duration-300 group-hover/live:translate-y-0 group-hover/live:opacity-100"
          aria-hidden="true"
        >
          <span
            className="rounded-full bg-black/55 px-3.5 py-1.5 font-semibold text-white backdrop-blur-md"
            style={{ fontSize: "12px" }}
          >
            Visit live site ↗
          </span>
        </span>
      </span>
    </a>
  );
}
