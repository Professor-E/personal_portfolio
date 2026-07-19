import type { Metadata } from "next";
import ContactPage from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  description:
    "Get in touch with Dominik Grzeszczak — MIT EECS '28.",
  alternates: { canonical: "/contact" },
};

export default function ContactRoute() {
  return <ContactPage />;
}
