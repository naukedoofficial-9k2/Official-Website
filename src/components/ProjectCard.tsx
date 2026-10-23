"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(false);
  const primaryMedia = project.media?.[0];
  const isVideo = primaryMedia?.type === "video";
  const hasRealAsset = primaryMedia && (primaryMedia.url.startsWith("/projects/") || primaryMedia.url.startsWith("/brand/"));

  // Mobile in-view autoplay and out-of-view pause
  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const el = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().then(() => setIsPlaying(true)).catch(() => {});
        } else {
          el.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVideo]);

  const handleMouseEnter = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleVideoTap = (e: React.MouseEvent) => {
    if (isVideo && videoRef.current) {
      // Toggle play/pause on tap
      if (videoRef.current.paused) {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const clientLabel =
    project.client && !project.anonymous
      ? project.client
      : project.clientIndustry || project.category;

  return (
    <div className="h-full flex flex-col">
      <Link
        href={`/work/${project.slug}`}
        data-cursor="View"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group flex flex-col h-full bg-white rounded-[16px] sm:rounded-[20px] border border-brand-border overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:border-brand-red/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red tap-bounce active:scale-[0.98]"
      >
        {/* Media or Visual Slot: 4:3 on phones for tall cinematic presence, 16:10 or 16:9 on desktop */}
        <div
          className={`relative bg-brand-cream overflow-hidden border-b border-brand-border flex items-center justify-center ${
            isLarge
              ? "aspect-[4/3] sm:aspect-[16/9]"
              : "aspect-[4/3] sm:aspect-[16/10]"
          }`}
        >
          <motion.div
            initial={shouldReduceMotion ? undefined : { clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full relative"
          >
            {isVideo && primaryMedia?.url ? (
              <video
                ref={videoRef}
                src={primaryMedia.url}
                poster={primaryMedia.poster}
                muted
                loop
                playsInline
                preload="metadata"
                onClick={handleVideoTap}
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
              /* Clean Branded Graphic Slot - Shows Category, NOT duplicate title, NO faint watermark */
              <div className="w-full h-full flex flex-col justify-between p-5 min-[360px]:p-6 sm:p-8 bg-gradient-to-br from-brand-cream via-[#F5ECE0] to-[#EFE2D2] relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 z-10">
                  <span className="text-xs font-black uppercase tracking-wider text-brand-red bg-white px-3 py-1 rounded-full border border-brand-border shadow-sm whitespace-nowrap">
                    {project.category}
                  </span>
                  <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-brand-red text-white shadow-sm whitespace-nowrap">
                    Sample layout
                  </span>
                </div>

                <div className="my-auto py-3 z-10">
                  <p className="text-sm sm:text-base font-semibold text-brand-warmgrey line-clamp-2">
                    {project.tagline || clientLabel}
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs font-bold text-brand-ink z-10 pt-2 border-t border-brand-border/60">
                  <span className="text-brand-warmgrey">{clientLabel}</span>
                  <span className="flex items-center gap-1 text-brand-red group-hover:translate-x-1 transition-transform">
                    <span>Explore Scope</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            )}
          </motion.div>

          {/* Floating badge if real media present */}
          {(isVideo || (hasRealAsset && primaryMedia?.url)) && (
            <div className="absolute top-3 right-3 z-10">
              <span className="text-xs font-black uppercase px-2.5 py-1 rounded-full bg-brand-red text-white shadow-sm whitespace-nowrap">
                Sample layout
              </span>
            </div>
          )}
        </div>

        {/* Card Content: Title shown ONCE here, flex-1 ensures equal card heights */}
        <div className="p-5 min-[360px]:p-6 sm:p-7 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-black text-brand-red uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-xs text-brand-warmgrey font-medium line-clamp-1">
                {clientLabel}
              </span>
            </div>

            {/* Exactly one clean title */}
            <h3 className="text-xl sm:text-2xl font-black text-brand-ink group-hover:text-brand-red transition-colors leading-snug">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-brand-warmgrey mt-2 line-clamp-2 leading-relaxed">
              {project.overview}
            </p>
          </div>

          {/* Deliverables tags */}
          <div className="mt-4 sm:mt-5 pt-3 sm:pt-4 border-t border-brand-border flex flex-wrap gap-1.5">
            {project.deliverables.slice(0, 3).map((item, idx) => (
              <span
                key={idx}
                className="text-xs font-semibold bg-brand-cream text-brand-ink px-2.5 py-1 rounded-full border border-brand-border/70"
              >
                {item}
              </span>
            ))}
            {project.deliverables.length > 3 && (
              <span className="text-xs font-bold text-brand-warmgrey px-1.5 py-1">
                +{project.deliverables.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
