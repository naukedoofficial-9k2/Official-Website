import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

interface PageMetadataOptions {
  path: string;
  title: string;
  description: string;
  image?: string;
}

export function getPageMetadata({ path, title, description, image }: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: "en_US",
      type: "website",
      images: [image ?? "/brand/og-image.png"],
    },
  };
}
