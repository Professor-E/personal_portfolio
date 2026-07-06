import { redirect } from "next/navigation";

// This route was superseded by /extracurriculars, which is what the Navbar
// and Footer actually link to. Redirect so old links/bookmarks still resolve.
export default function ActivitiesPage() {
  redirect("/extracurriculars");
}
