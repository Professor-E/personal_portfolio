// ── Experience ────────────────────────────────────────────────────────────────
// The Experience data (src/lib/constants.ts → EXPERIENCE) is the one dataset
// with a hand-written interface; Projects, Hobbies, and Extracurriculars derive
// their types straight from their `as const` arrays (`Project`, `Hobby`,
// `Extracurricular`) so the shape can never drift from the data.
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
  /** Path to the company/institution logo (public/). When omitted, a
   *  brand-colored monogram (first letter) is shown as a fallback. */
  logo?: string;
}
