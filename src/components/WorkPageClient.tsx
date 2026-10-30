"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Project } from "@/content/projects";
import { getWhatsAppUrl } from "@/content/site";
import ProjectCard from "@/components/ProjectCard";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";

const categories = ["All", "Social", "Shoots", "Web", "Branding", "Motion"] as const;

interface WorkPageClientProps {
  projects: Project[];
  isSampleData: boolean;
}

export default function WorkPageClient({ projects, isSampleData }: WorkPageClientProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filters with no projects behind them would only show an empty grid
  const visibleCategories = categories.filter(
    (cat) => cat === "All" || projects.some((p) => p.category === cat)
  );

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const whatsappHref = getWhatsAppUrl(
    `Hi Nau K Do! I am browsing your ${isSampleData ? "sample " : ""}work and would love to chat about a project.`
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Bold Header Band */}
      <section className="bg-brand-ink text-brand-cream pt-10 sm:pt-20 pb-12 sm:pb-24 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 border-b border-brand-border-dark">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-cream/60">
              Portfolio
            </span>
          </div>

          <RevealText
            text="Work"
            as="h1"
            className="section-fluid-heading sm:text-7xl lg:text-8xl font-black text-white tracking-tight"
          />

          <FadeUp delay={0.2}>
            <p className="mt-3 sm:mt-4 text-base sm:text-xl text-brand-cream/80 max-w-2xl leading-relaxed">
              A peek at the kind of work we make.{isSampleData && " Real projects land here soon."}
            </p>
          </FadeUp>

          {/* Simple One-line Note without wrapping */}
          {isSampleData && (
            <FadeUp delay={0.3}>
              <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-brand-cream/80 font-semibold whitespace-nowrap">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
                <span>Sample layouts. Real projects coming soon.</span>
              </div>
            </FadeUp>
          )}
        </div>
      </section>

      {/* Main Content & Projects Grid */}
      <section className="py-8 sm:py-20 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* Sticky 44px Horizontal Filter Bar with Fade Edge Hint */}
        <div className="sticky top-[52px] sm:top-[64px] z-30 bg-brand-cream/95 backdrop-blur-md pt-3 pb-3 -mt-3 mb-8 sm:mb-12 border-b border-brand-border/60">
          <div className="relative">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar snap-x snap-mandatory -mx-4 px-4 min-[361px]:-mx-5 min-[361px]:px-5 sm:mx-0 sm:px-0">
              {visibleCategories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`h-11 px-5 rounded-full text-xs font-black uppercase tracking-wider shrink-0 snap-start flex items-center justify-center transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red tap-bounce active:scale-95 ${
                      isSelected
                        ? "bg-brand-red text-white shadow-sticker"
                        : "bg-white text-brand-warmgrey hover:text-brand-ink border border-brand-border"
                    }`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
            {/* Edge fade hint for mobile horizontal scroll */}
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-brand-cream to-transparent sm:hidden" />
          </div>
        </div>

        {/* Bento / Masonry Grid: 1 column on mobile, bento on desktop */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const total = filteredProjects.length;
              let colSpan = "md:col-span-3";
              let isLarge = false;

              if (total === 1) {
                colSpan = "md:col-span-6";
                isLarge = true;
              } else if (total === 2 || total === 4) {
                colSpan = "md:col-span-3";
                isLarge = total === 2;
              } else if (total === 3) {
                colSpan = "md:col-span-2";
              } else if (total === 5) {
                colSpan = idx < 2 ? "md:col-span-3" : "md:col-span-2";
                isLarge = idx < 2;
              } else if (total === 6) {
                if (idx < 2) {
                  colSpan = "md:col-span-3";
                  isLarge = true;
                } else if (idx < 5) {
                  colSpan = "md:col-span-2";
                } else {
                  colSpan = "md:col-span-6";
                  isLarge = true;
                }
              } else {
                if (idx === total - 1 && total % 2 !== 0) {
                  colSpan = "md:col-span-6";
                  isLarge = true;
                } else {
                  colSpan = "md:col-span-3";
                }
              }

              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className={`col-span-1 ${colSpan} flex flex-col`}
                >
                  <ProjectCard project={project} priority={idx === 0} isLarge={isLarge} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Friendly WhatsApp CTA Band */}
        <div className="mt-16 sm:mt-24 p-6 min-[360px]:p-8 sm:p-14 rounded-[20px] bg-white border border-brand-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 shadow-card">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black text-brand-red uppercase tracking-wider block">
              Have an idea?
            </span>
            <h3 className="text-2xl min-[360px]:text-3xl sm:text-4xl font-black text-brand-ink">
              Want something made for your brand?
            </h3>
            <p className="text-xs sm:text-sm text-brand-warmgrey leading-relaxed">
              Tell us what you are building. We love talking through new concepts, shoot ideas, and fresh visual angles.
            </p>
          </div>

          <MagneticButton className="w-full md:w-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[52px] w-full md:w-auto inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-black px-8 rounded-full shadow-sticker tap-bounce active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Chat on WhatsApp</span>
            </a>
          </MagneticButton>
        </div>

      </section>

    </div>
  );
}
