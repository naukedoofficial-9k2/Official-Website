import React from "react";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Say hi on WhatsApp. Tell us about your brand and what you want to make, and we will take it from there.",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
