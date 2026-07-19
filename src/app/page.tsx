import { permanentRedirect } from "next/navigation";

// 308 (not 307) so search engines consolidate ranking signals onto /home.
export default function RootPage() {
  permanentRedirect("/home");
}
