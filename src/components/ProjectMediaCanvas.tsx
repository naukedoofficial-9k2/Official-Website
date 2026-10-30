"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Project } from "@/content/projects";

interface ProjectMediaCanvasProps {
  media?: Project["media"];
  title: string;
  category: string;
  youtubeId?: string;
}

export default function ProjectMediaCanvas({
  media,
  title,
  category,
  youtubeId,
}: ProjectMediaCanvasProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const primaryMedia = media?.[0];
  const isVideo = primaryMedia?.type === "video";
  const hasRealAsset =
    primaryMedia &&
    (primaryMedia.url.startsWith("/projects/") || primaryMedia.url.startsWith("https://cdn.sanity.io/"));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isVideo || !videoRef.current) return;
    const el = videoRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play()
            .then(() => setIsPlaying(true))
            .catch(() => {});
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

  const handleVideoTap = () => {
    if (isVideo && videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="rounded-[16px] sm:rounded-[20px] bg-white border border-brand-border overflow-hidden shadow-card mb-8 sm:mb-12">
      <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-brand-cream overflow-hidden flex items-center justify-center">
        {youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0`}
            title={`${title} video`}
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 w-full h-full border-0"
          />
        ) : isVideo && primaryMedia?.url ? (
          <div className="relative w-full h-full cursor-pointer" onClick={handleVideoTap}>
            <video
              ref={videoRef}
              src={primaryMedia.url}
              poster={primaryMedia.poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            {/* Subtle tap indication badge */}
            <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
              <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-black/60 text-white backdrop-blur-sm">
                {isPlaying ? "Tap to pause" : "Tap to play"}
              </span>
            </div>
          </div>
        ) : hasRealAsset && primaryMedia?.url ? (
          <Image
            src={primaryMedia.url}
            alt={title}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover"
          />
        ) : (
          /* Clean Sample Layout Canvas */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 sm:p-14 bg-gradient-to-br from-[#FAF5EE] via-[#F4ECE1] to-[#EDE3D6] text-center relative overflow-hidden">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-brand-red bg-white px-3.5 py-1 rounded-full border border-brand-border mb-3 shadow-sm">
              {category} Showcase
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-brand-ink max-w-xl">
              {title}
            </h2>

            <p className="text-xs sm:text-sm text-brand-warmgrey max-w-md mt-2 leading-relaxed">
              Clean sample layout ready for real drops. Supports high-resolution photography and video reels.
            </p>

            <div className="mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs font-bold bg-white px-3 py-1 rounded-full border border-brand-border text-brand-warmgrey">
                Category: {category}
              </span>
              <span className="text-xs font-bold bg-white px-3 py-1 rounded-full border border-brand-border text-brand-warmgrey">
                Scope: Sample Layout
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
