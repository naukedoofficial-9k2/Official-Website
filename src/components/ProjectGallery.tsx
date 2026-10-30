import React from "react";
import { Project } from "@/content/projects";
import ProjectImage from "@/components/ProjectImage";

interface ProjectGalleryProps {
  media: Project["media"];
  title: string;
}

export default function ProjectGallery({ media, title }: ProjectGalleryProps) {
  if (media.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8 sm:mb-12">
      {media.map((item, idx) => (
        <div
          key={item.url}
          className="relative aspect-[4/3] rounded-[16px] sm:rounded-[20px] bg-brand-cream border border-brand-border overflow-hidden shadow-card"
        >
          <ProjectImage
            src={item.url}
            alt={item.alt || `${title} image ${idx + 1}`}
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}
