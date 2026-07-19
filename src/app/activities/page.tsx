import { permanentRedirect } from "next/navigation";

// This route was superseded by /extracurriculars, which is what the Navbar
// and Footer actually link to. Redirect so old links/bookmarks still resolve.
// 308 (not 307) so search engines consolidate signals onto /extracurriculars.
export default function ActivitiesPage() {
  permanentRedirect("/extracurriculars");
}
