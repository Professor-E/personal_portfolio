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
export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate: string | "Present";
  location: string;
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
