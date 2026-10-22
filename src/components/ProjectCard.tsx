"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Project } from "@/content/projects";

interface ProjectCardProps {
  project: Project;
  priority?: boolean;
  isLarge?: boolean;
}

export default function ProjectCard({
  project,
  priority = false,
  isLarge = false,
}: ProjectCardProps) {
  const primaryMedia = project.media?.[0];
  const isVideo = primaryMedia?.type === "video";
  const hasRealAsset = primaryMedia && primaryMedia.url.startsWith("/projects/");

  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`h-full ${isLarge ? "md:col-span-2 md:row-span-2" : ""}`}
    >
      <Link
        href={`/work/${project.slug}`}
        data-cursor="View"
        className="group flex flex-col h-full bg-white rounded-[20px] border border-brand-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:border-brand-red/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
      >
        {/* Media or Visual Slot */}
        <div
          className={`relative bg-brand-cream overflow-hidden border-b border-brand-border flex items-center justify-center ${
            isLarge
              ? "aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/10]"
              : "aspect-[16/10]"
          }`}
        >
          {isVideo && primaryMedia?.url ? (
            <video
              src={primaryMedia.url}
              poster={primaryMedia.poster}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : hasRealAsset && primaryMedia?.url ? (
            <Image
              src={primaryMedia.url}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            /* Clean Branded Graphic Slot - Shows Category, NOT duplicate title, NO faint N watermark */
            <div className="w-full h-full flex flex-col justify-between p-6 sm:p-8 bg-gradient-to-br from-brand-cream via-[#F5ECE0] to-[#EFE2D2] relative overflow-hidden">
              <div className="flex items-center justify-between gap-2 z-10">
                <span className="text-[11px] font-black uppercase tracking-wider text-brand-red bg-white px-3 py-1 rounded-full border border-brand-border shadow-sm whitespace-nowrap">
                  {project.category}
                </span>
                <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-full bg-brand-red text-white shadow-sm whitespace-nowrap">
                  Sample layout
                </span>
              </div>

              <div className="my-auto py-3 z-10">
                <p className="text-sm sm:text-base font-semibold text-brand-warmgrey line-clamp-2">
                  {project.tagline || project.clientIndustry}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-bold text-brand-ink z-10 pt-2 border-t border-brand-border/60">
                <span className="text-brand-warmgrey">{project.clientIndustry}</span>
                <span className="flex items-center gap-1 text-brand-red group-hover:translate-x-1 transition-transform">
                  <span>Explore Scope</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

          {/* Floating badge if real media present */}
          {(isVideo || (hasRealAsset && primaryMedia?.url)) && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-brand-red text-white shadow-sm whitespace-nowrap">
                Sample layout
              </span>
            </div>
          )}
        </div>

        {/* Card Content: Title shown ONCE here */}
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black text-brand-red uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-brand-warmgrey font-medium">
                {project.clientIndustry}
              </span>
            </div>

            {/* Exactly one clean title */}
            <h3 className="text-xl sm:text-2xl font-black text-brand-ink group-hover:text-brand-red transition-colors leading-snug">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-brand-warmgrey mt-2.5 line-clamp-2 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Deliverables tags */}
          <div className="mt-5 pt-4 border-t border-brand-border flex flex-wrap gap-1.5">
            {project.deliverables.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-[11px] font-semibold bg-brand-cream text-brand-ink px-2.5 py-1 rounded-full border border-brand-border/70"
              >
                {item}
              </span>
            ))}
            {project.deliverables.length > 3 && (
              <span className="text-[11px] font-bold text-brand-warmgrey px-1.5 py-1">
                +{project.deliverables.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
