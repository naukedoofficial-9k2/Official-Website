"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Project } from "@/content/projects";
import HeroVolume from "@/components/HeroVolume";
import ScrollStatement from "@/components/ScrollStatement";
import ScrollBand from "@/components/ScrollBand";
import ServiceRows from "@/components/ServiceRows";
import HomeSteps from "@/components/HomeSteps";
import BriefBuilder from "@/components/BriefBuilder";
import ProjectCard from "@/components/ProjectCard";
import RevealText from "@/components/motion/RevealText";

interface HomePageClientProps {
  featuredProjects: Project[];
  isSampleData: boolean;
}

export default function HomePageClient({ featuredProjects, isSampleData }: HomePageClientProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col min-h-screen">

      {/* 01 / HERO: THE VOLUME SLIDER FLOODS THE PAGE RED */}
      <HeroVolume />

      {/* 02 / PINNED STATEMENT THAT FILLS IN WORD BY WORD */}
      <ScrollStatement />

      {/* 03 / SCROLL-LINKED TYPE BAND (INK) */}
      <ScrollBand />

      {/* 04 / FEATURED WORK (SINGLE COLUMN ON MOBILE, BENTO ON DESKTOP) */}
      <section className="bg-brand-ink text-brand-cream py-16 sm:py-28 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-10 sm:mb-16">
            <div>
              <RevealText text="The work." as="h2" className="work-title font-black text-white" />
              {isSampleData && (
                <p className="text-sm text-brand-cream/70 mt-3">
                  Sample layouts. Real projects coming soon.
                </p>
              )}
            </div>

            <Link
              href="/work"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-cream/70 transition-colors group pb-3 whitespace-nowrap"
            >
              <span>Browse all work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Bento Grid: 1 col on mobile, 6 col bento on desktop (2 large + 3 medium) */}
          <div className="grid grid-cols-1 md:grid-cols-6 gap-6 sm:gap-8">
            {featuredProjects.slice(0, 5).map((project, idx) => {
              const isLarge = idx < 2;
              return (
                <motion.div
                  key={project.slug}
                  initial={shouldReduceMotion ? undefined : { opacity: 0, y: 72 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.7, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`js-reveal ${isLarge ? "col-span-1 md:col-span-3" : "col-span-1 md:col-span-2"}`}
                >
                  <ProjectCard
                    project={project}
                    priority={idx === 0}
                    isLarge={isLarge}
                  />
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Full-Width "Browse all work" Button */}
          <div className="mt-8 sm:hidden">
            <Link
              href="/work"
              className="h-[52px] w-full flex items-center justify-center gap-2 bg-white text-brand-ink font-black text-sm rounded-full shadow-sm tap-bounce active:scale-[0.98]"
            >
              <span>Browse all work</span>
              <ArrowRight className="w-4 h-4 text-brand-red" />
            </Link>
          </div>
        </div>
      </section>

      {/* 05 / SERVICES AS HUGE SCROLL-DRIVEN ROWS */}
      <ServiceRows />

      {/* 06 / THREE STACKING STEPS */}
      <HomeSteps />

      {/* 07 / BRIEF BUILDER: WRITES THE WHATSAPP MESSAGE */}
      <BriefBuilder />

    </div>
  );
}
