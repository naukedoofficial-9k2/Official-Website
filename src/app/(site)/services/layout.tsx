import React from "react";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata({
  path: "/services",
  title: "Services",
  description:
    "Social media management, content shoots, website design, brand identity, video editing and motion graphics. All under one roof.",
});

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
