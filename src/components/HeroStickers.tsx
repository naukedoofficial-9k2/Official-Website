"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { projects } from "@/content/projects";

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
    rotate: -3.5,
    floatDuration: 4.5,
    delay: 0.1,
    bg: "white",
    textDark: true,
  },
  {
    slug: "cold-brew-beverage-launch",
    label: "Your shoot here",
    aspect: "1:1",
    rotate: 2.8,
    floatDuration: 5.2,
    delay: 0.2,
    bg: "cream",
    textDark: true,
  },
  {
    slug: "creator-brand-identity",
    label: "Your brand here",
    aspect: "9:16",
    rotate: -2.2,
    floatDuration: 4.8,
    delay: 0.3,
    bg: "ink",
  },
  {
    slug: "streetwear-digital-flagship",
    label: "Your site here",
    aspect: "1:1",
    rotate: 3.2,
    floatDuration: 5.6,
    delay: 0.4,
    bg: "surface",
    textDark: true,
  },
];

export default function HeroStickers() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full relative py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center justify-center">
        {stickerConfigs.map((item, idx) => {
          const project = projects.find((p) => p.slug === item.slug);
          const isReel = item.aspect === "9:16";
          const media = project?.media?.[0];
          const hasRealAsset = media && media.url.startsWith("/projects/");

          return (
            <motion.div
              key={idx}
              initial={
                shouldReduceMotion
                  ? undefined
                  : { opacity: 0, scale: 0.85, rotate: 0 }
              }
              animate={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      scale: 1,
                      rotate: item.rotate,
                      y: [-5, 5, -5],
                    }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : {
                      opacity: { duration: 0.4, delay: item.delay },
                      scale: {
                        type: "spring",
                        stiffness: 200,
                        damping: 18,
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
                scale: 1.05,
                rotate: 0,
                zIndex: 20,
                transition: { duration: 0.2 },
              }}
              className="relative"
            >
              <Link
                href={project ? `/work/${project.slug}` : "/work"}
                className={`group block w-full rounded-[20px] p-4 sm:p-5 border transition-shadow duration-300 shadow-card hover:shadow-card-hover select-none overflow-hidden ${
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
                  media.type === "video" ? (
                    <video
                      src={media.url}
                      poster={media.poster}
                      muted
                      autoPlay
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover rounded-[20px]"
                    />
                  ) : (
                    <Image
                      src={media.url}
                      alt={project?.title || item.label}
                      fill
                      className="object-cover rounded-[20px]"
                    />
                  )
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

                    {/* Center Typography Graphic (No fake play button!) */}
                    <div className="my-auto py-2">
                      <p className="text-xs font-mono font-bold uppercase tracking-widest text-brand-red">
                        {project?.category || "Creative"}
                      </p>
                      <h4 className="text-lg sm:text-xl font-black tracking-tight leading-tight mt-1 line-clamp-3">
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
