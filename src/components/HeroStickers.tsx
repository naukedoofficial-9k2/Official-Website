"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/content/projects";
import { useIntro } from "@/context/IntroContext";

interface StickerConfig {
  slug: string;
  label: string;
  aspect: "9:16" | "1:1";
  rotate: number;
  floatDuration: number;
  delay: number;
  bg: "white" | "ink" | "cream" | "surface";
  textDark?: boolean;
}

const stickerConfigs: StickerConfig[] = [
  {
    slug: "heritage-jewellery-reels",
    label: "Your reel here",
    aspect: "9:16",
    rotate: -3,
    floatDuration: 4.8,
    delay: 0.1,
    bg: "white",
    textDark: true,
  },
  {
    slug: "cold-brew-beverage-launch",
    label: "Your shoot here",
    aspect: "1:1",
    rotate: 2.5,
    floatDuration: 5.4,
    delay: 0.2,
    bg: "cream",
    textDark: true,
  },
  {
    slug: "creator-brand-identity",
    label: "Your brand here",
    aspect: "9:16",
    rotate: -2,
    floatDuration: 4.6,
    delay: 0.3,
    bg: "ink",
  },
  {
    slug: "streetwear-digital-flagship",
    label: "Your site here",
    aspect: "1:1",
    rotate: 3,
    floatDuration: 5.8,
    delay: 0.4,
    bg: "surface",
    textDark: true,
  },
];

export default function HeroStickers() {
  const shouldReduceMotion = useReducedMotion();
  const { isIntroComplete } = useIntro();

  return (
    <div className="w-full relative py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-center">
        {stickerConfigs.map((item, idx) => {
          const project = projects.find((p) => p.slug === item.slug);
          const isReel = item.aspect === "9:16";
          const media = project?.media?.[0];
          const hasRealAsset = media && (media.url.startsWith("/projects/") || media.url.startsWith("/brand/"));

          return (
            <motion.div
              key={idx}
              initial={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, scale: 0.9, rotate: 0 }
              }
              animate={
                shouldReduceMotion
                  ? undefined
                  : isIntroComplete
                  ? {
                      opacity: 1,
                      scale: 1,
                      rotate: item.rotate,
                      y: [-4, 4, -4],
                    }
                  : { opacity: 0, scale: 0.9, rotate: 0 }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: { duration: 0.4, delay: item.delay },
                      scale: {
                        type: "spring",
                        stiffness: 180,
                        damping: 20,
                        delay: item.delay,
                      },
                      rotate: { duration: 0.5, delay: item.delay },
                      y: {
                        duration: item.floatDuration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        repeatType: "mirror",
                      },
                    }
              }
              whileHover={{
                scale: 1.04,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.2 },
              }}
              className="relative"
            >
              <Link
                href={project ? `/work/${project.slug}` : "/work"}
                className={`group block w-full rounded-[20px] p-4 sm:p-5 border transition-shadow duration-300 shadow-card hover:shadow-card-hover select-none overflow-hidden relative ${
                  isReel ? "aspect-[9/16]" : "aspect-square"
                } ${
                  item.bg === "ink"
                    ? "bg-brand-ink text-brand-cream border-white/10"
                    : item.bg === "cream"
                    ? "bg-brand-cream text-brand-ink border-brand-border"
                    : item.bg === "surface"
                    ? "bg-brand-surface text-brand-ink border-brand-border"
                    : "bg-white text-brand-ink border-brand-border"
                }`}
              >
                {hasRealAsset && media ? (
                  <div className="absolute inset-0 w-full h-full">
                    {media.type === "video" ? (
                      <video
                        src={media.url}
                        poster={media.poster}
                        muted
                        autoPlay
                        loop
                        playsInline
                        className="w-full h-full object-cover rounded-[20px]"
                      />
                    ) : (
                      <Image
                        src={media.url}
                        alt={project?.title || item.label}
                        fill
                        className="object-cover rounded-[20px]"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25 rounded-[20px]" />
                    <div className="absolute top-3 left-3 z-10">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-brand-red text-white shadow-sticker">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{item.label}</span>
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs font-bold">
                      <span className="truncate pr-2">{project?.title || "Project"}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 flex-shrink-0" />
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex flex-col justify-between relative z-10">
                    {/* Top Sticker Pill */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-brand-red text-white shadow-sticker">
                        <Sparkles className="w-2.5 h-2.5" />
                        <span>{item.label}</span>
                      </span>

                      <span className="text-[10px] font-mono opacity-60">
                        {item.aspect}
                      </span>
                    </div>

                    {/* Center Typography Graphic (Exactly one clean title) */}
                    <div className="my-auto py-2">
                      <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
                        {project?.category || "Creative"}
                      </p>
                      <h4 className="text-base sm:text-lg font-black tracking-tight leading-snug mt-1 line-clamp-2">
                        {project?.title || "Brand Story"}
                      </h4>
                    </div>

                    {/* Footer View Link */}
                    <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] font-bold">
                      <span className="opacity-75">Sample layout</span>
                      <span className="inline-flex items-center gap-1 text-brand-red group-hover:translate-x-1 transition-transform">
                        <span>View</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                )}
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
