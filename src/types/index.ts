// ── Tab Navigation ───────────────────────────────────────────────────────────
export type TabId =
  | "home"
  | "experience"
  | "projects"
  | "activities"
  | "hobbies"
  | "about"
  | "contact";

// ── Experience ────────────────────────────────────────────────────────────────
export interface ExperienceStat {
  value: string;
  label: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  location: string;
  /** One-sentence headline summarizing the most important impact (recruiter-facing). */
  summary: string;
  /** Key quantitative highlights, surfaced as metric chips on the active card. */
  stats: ExperienceStat[];
  description: string[];
  brandColor: string;
  logoPlaceholder: string;
}

// ── Projects ─────────────────────────────────────────────────────────────────
export interface ProjectEntry {
  id: string;
  title: string;
  description: string;
  tech: string[];
  startDate: string;
  endDate: string | "Present" | null;
  link: string | null;
}

// ── Activities ────────────────────────────────────────────────────────────────
export interface ActivityEntry {
  id: string;
  title: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  description: string;
  highlights: string[];
}

// ── Hobbies ───────────────────────────────────────────────────────────────────
export interface HobbyEntry {
  id: string;
  title: string;
  description: string;
  vibe: string;
}
