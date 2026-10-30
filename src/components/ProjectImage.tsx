import React from "react";
import Image from "next/image";

const SANITY_WIDTHS = [480, 800, 1200, 1600];

interface ProjectImageProps {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

// Sanity resizes on its CDN, so phones download a small file instead of the 1600px one
export default function ProjectImage({ src, alt, sizes, priority = false, className = "" }: ProjectImageProps) {
  if (!src.startsWith("https://cdn.sanity.io/")) {
    return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} />;
  }

  const baseUrl = src.split("?")[0];
  const getUrl = (width: number) => `${baseUrl}?w=${width}&fit=max&auto=format`;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={getUrl(1200)}
      srcSet={SANITY_WIDTHS.map((width) => `${getUrl(width)} ${width}w`).join(", ")}
      sizes={sizes}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
