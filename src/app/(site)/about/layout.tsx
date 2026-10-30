import React from "react";
import { getPageMetadata } from "@/lib/metadata";

export const metadata = getPageMetadata({
  path: "/about",
  title: "About",
  description:
    "Nau K Do is a social-first creative agency for brands of every kind across India and Western markets.",
});

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
