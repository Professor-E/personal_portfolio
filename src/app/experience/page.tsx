import type { Metadata } from "next";
import ExperiencePage from "@/components/experience/ExperiencePage";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Work experience and internships of Dominik Grzeszczak — MIT EECS '28.",
  alternates: { canonical: "/experience" },
};

export default function ExperienceRoute() {
  return <ExperiencePage />;
}
