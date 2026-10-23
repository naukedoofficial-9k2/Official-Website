"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { projects } from "@/content/projects";
import { getWhatsAppUrl } from "@/content/site";
import ProjectCard from "@/components/ProjectCard";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";

const categories = ["All", "Social", "Shoots", "Web", "Branding", "Motion"] as const;

export default function WorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const whatsappHref = getWhatsAppUrl(
    "Hi Nau K Do! I am browsing your sample work and would love to chat about a project."
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Bold Header Band */}
      <section className="bg-brand-ink text-brand-cream pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-brand-border-dark">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-cream/60">
              Portfolio
            </span>
          </div>

          <RevealText
            text="Work"
            as="h1"
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight"
          />

          <FadeUp delay={0.2}>
            <p className="mt-4 text-lg sm:text-xl text-brand-cream/80 max-w-2xl leading-relaxed">
              A peek at the kind of work we make. Real projects land here soon.
            </p>
          </FadeUp>

          {/* Simple One-line Note */}
          <FadeUp delay={0.3}>
            <div className="mt-6 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs text-brand-cream/80 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              <span>Sample layouts. Real projects coming soon.</span>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Main Content & Bento Masonry Grid */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* Short Category Filter Pills with smooth motion */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 no-scrollbar">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
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

        {/* Bento / Masonry Grid with Smooth AnimatePresence Reshuffle (No Orphan Tiles, Full Width Rows) */}
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
                // If odd number, span the final card full width so no tile is left alone in a row
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
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={`col-span-1 ${colSpan} flex flex-col`}
                >
                  <ProjectCard project={project} priority={idx === 0} isLarge={isLarge} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Friendly WhatsApp CTA Band */}
        <div className="mt-24 p-8 sm:p-14 rounded-[20px] bg-white border border-brand-border flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-card">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-black text-brand-red uppercase tracking-wider block">
              Have an idea?
            </span>
            <h3 className="text-3xl sm:text-4xl font-black text-brand-ink">
              Want something made for your brand?
            </h3>
            <p className="text-sm text-brand-warmgrey leading-relaxed">
              Tell us what you are building. We love talking through new concepts, shoot ideas, and fresh visual angles.
            </p>
          </div>

          <MagneticButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-black px-8 py-4 rounded-full shadow-sticker transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
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
