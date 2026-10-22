"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, ArrowRight, ArrowUpRight } from "lucide-react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import { getFeaturedProjects } from "@/content/projects";
import Marquee from "@/components/Marquee";
import HeroStickers from "@/components/HeroStickers";
import ProjectCard from "@/components/ProjectCard";
import ProcessCards from "@/components/ProcessCards";
import MagneticButton from "@/components/motion/MagneticButton";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";

export default function HomePage() {
  const featuredProjects = getFeaturedProjects();
  const heroRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);

  const whatsappHref = getWhatsAppUrl("Hi Nau K Do! I want to talk about our brand and content.");

  const headlineWords = siteConfig.tagline.split(" ");

  const services = [
    {
      title: "Social Media Management",
      badge: "REELS & POSTING",
      description: "Feed strategy, viral-format reels, story engagement, and daily posting that keeps people checking in.",
      deliverables: ["Content Calendar", "Monthly Reels & Carousels", "Story Sequences", "Community Engagement"],
      href: "/services#social-media",
    },
    {
      title: "Content Creation & Shoots",
      badge: "STUDIO & LOCATION",
      description: "Real-camera studio lighting, macro product closeups, and handheld lifestyle shoots. No bland stock imagery.",
      deliverables: ["Studio Lighting", "Lifestyle Shoots", "UGC Creator Content", "Color-Graded Footage"],
      href: "/services#shoots",
    },
    {
      title: "Website Design & Development",
      badge: "FAST WEBSITES",
      description: "Fast, good-looking digital storefronts and landing pages built to translate social hype into real orders.",
      deliverables: ["Custom Storefronts", "Mobile-First Design", "Subtle Micro-Interactions", "SEO & OpenGraph"],
      href: "/services#websites",
    },
    {
      title: "Logo & Brand Identity",
      badge: "DISTINCTIVE MARKS",
      description: "Bold multilingual wordmarks, typography rules, color pairings, and sticker systems built for digital screens.",
      deliverables: ["Wordmark & Monogram", "Color & Typography Tokens", "Social Sticker Kits", "Brand Guidelines"],
      href: "/services#branding",
    },
    {
      title: "Video Editing & Motion Graphics",
      badge: "HIGH RETENTION",
      description: "Fast-paced kinetic typography, sound-designed beat cuts, and 3D product motion engineered to grab attention.",
      deliverables: ["Kinetic Typography", "Sound Design & SFX", "Multi-Ratio Cuts", "Drop Bumper Animations"],
      href: "/services#motion",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 01 / HERO SECTION (FULL-BLEED SIGNATURE RED) */}
      <section
        ref={heroRef}
        className="relative bg-brand-red text-white pt-8 sm:pt-14 pb-20 sm:pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden"
      >
        <motion.div
          style={shouldReduceMotion ? undefined : { y: heroY, opacity: heroOpacity }}
          className="max-w-7xl mx-auto w-full relative z-10"
        >
          {/* Top Pill Accent */}
          <div className="flex items-center gap-2 mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs font-black text-white shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>Social-First Creative Agency</span>
              <span className="opacity-60">•</span>
              <span>India &amp; Western Markets</span>
            </span>
          </div>

          {/* Huge Tagline (Words slide up one by one with stagger & overshoot) */}
          <div className="max-w-5xl mb-8">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black text-white tracking-tight leading-[0.98]">
              {headlineWords.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                  <motion.span
                    initial={shouldReduceMotion ? undefined : { y: "110%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      type: "spring",
                      damping: 16,
                      stiffness: 120,
                      delay: 0.1 + idx * 0.12,
                    }}
                    className="inline-block"
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
          </div>

          {/* Supporting line */}
          <FadeUp delay={0.45}>
            <p className="text-lg sm:text-2xl text-white/90 max-w-2xl font-medium leading-relaxed mb-10">
              We create, shoot, edit and post content that makes brands feel alive online — and we build the fast websites that go with it.
            </p>
          </FadeUp>

          {/* Primary Action Buttons */}
          <FadeUp delay={0.55}>
            <div className="flex flex-wrap items-center gap-4 mb-14">
              <MagneticButton>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-white text-brand-red hover:bg-brand-cream text-base font-black px-8 py-4 rounded-full shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <MessageCircle className="w-5 h-5 fill-brand-red" />
                  <span>Chat on WhatsApp</span>
                </a>
              </MagneticButton>

              <MagneticButton>
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/10 text-white text-base font-bold px-7 py-4 rounded-full border-2 border-white/40 transition-all duration-200"
                >
                  <span>See our work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </MagneticButton>
            </div>
          </FadeUp>

          {/* Overlapping Floating Sticker Tiles (No fake play buttons) */}
          <div className="pt-4 border-t border-white/15">
            <HeroStickers />
          </div>
        </motion.div>

        {/* Subtle decorative background ring */}
        <div className="absolute right-0 top-0 translate-x-1/3 -translate-y-1/3 w-[600px] h-[600px] rounded-full border border-white/10 pointer-events-none" />
      </section>

      {/* 02 / VELOCITY MARQUEE (INK BAND) */}
      <Marquee className="bg-brand-ink text-brand-cream py-5 border-y border-brand-border-dark" />

      {/* 03 / FEATURED WORK (BENTO GRID ON CREAM) */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-warmgrey">
                Selected Projects
              </span>
            </div>
            <RevealText
              text="Featured Work"
              as="h2"
              className="text-4xl sm:text-6xl font-black text-brand-ink tracking-tight"
            />
            <p className="text-sm text-brand-warmgrey mt-2">
              Sample layouts. Real projects coming soon.
            </p>
          </div>

          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-ink hover:text-brand-red transition-colors group"
          >
            <span>Browse all work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid: 1 large card + 3 smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.slice(0, 4).map((project, idx) => (
            <ProjectCard
              key={project.slug}
              project={project}
              priority={idx === 0}
              isLarge={idx === 0}
            />
          ))}
        </div>
      </section>

      {/* 04 / SERVICES OVERVIEW (WHITE / CREAM WITH INK FEATURE TILE) */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white border-y border-brand-border w-full">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl mb-16">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-brand-red" />
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-warmgrey">
                What We Make
              </span>
            </div>
            <RevealText
              text="Reels, shoots, sites. All under one roof."
              as="h2"
              className="text-4xl sm:text-6xl font-black text-brand-ink tracking-tight leading-tight"
            />
            <p className="text-base text-brand-warmgrey mt-3 leading-relaxed">
              We shoot the content and build the websites that match. One clear visual voice across every screen.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-brand-cream rounded-[20px] p-7 border border-brand-border flex flex-col justify-between transition-shadow hover:shadow-card hover:border-brand-red/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-brand-red text-white">
                      {item.badge}
                    </span>
                    <span className="text-xs font-mono text-brand-warmgrey font-semibold">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-ink mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-warmgrey leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-brand-border/60">
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {item.deliverables.map((del, dIdx) => (
                      <span
                        key={dIdx}
                        className="text-[10px] font-semibold bg-white text-brand-ink px-2.5 py-0.5 rounded-full border border-brand-border"
                      >
                        {del}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red hover:underline"
                  >
                    <span>View deliverables</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            ))}

            {/* Feature Ink Retainer Tile */}
            <motion.div
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-brand-ink text-brand-cream rounded-[20px] p-7 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-white/20 text-white">
                  FULL SCOPE
                </span>
                <h3 className="text-xl font-bold text-white mt-4 mb-2">
                  Monthly Creative Retainer
                </h3>
                <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed">
                  A dedicated creative partnership: regular shoots, scheduled reels, and ongoing website updates.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10">
                <a
                  href={getWhatsAppUrl("Hi Nau K Do! I want to talk about a monthly creative retainer for our brand.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-xs font-black px-5 py-2.5 rounded-full transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Discuss a Retainer</span>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 05 / PROCESS SECTION WITH CONNECTING LINE */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-warmgrey">
              The Blueprint
            </span>
          </div>
          <RevealText
            text="Simple, transparent, fast."
            as="h2"
            className="text-4xl sm:text-6xl font-black text-brand-ink tracking-tight"
          />
          <p className="text-base text-brand-warmgrey mt-2">
            Five clear milestones from initial vibe to live posts.
          </p>
        </div>

        <ProcessCards />
      </section>

      {/* 06 / CLOSING CTA PANEL (INK - RED STAYS SPECIAL TO THE HERO!) */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 max-w-7xl mx-auto w-full">
        <FadeUp>
          <div className="bg-brand-ink text-brand-cream rounded-[20px] p-8 sm:p-14 lg:p-16 relative overflow-hidden border border-brand-border-dark shadow-2xl">
            <div className="max-w-3xl relative z-10 space-y-6">
              
              {/* White Logo */}
              <div className="relative h-11 w-[130px] sm:h-12 sm:w-[144px]">
                <Image
                  src="/brand/logo-white.svg"
                  alt="Nau K Do"
                  fill
                  className="object-contain object-left"
                />
              </div>

              <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.05]">
                Ready to make your brand loud?
              </h2>

              <p className="text-base sm:text-lg text-brand-cream/80 font-medium leading-relaxed max-w-2xl">
                Tell us about your brand. We will take it from here. Say hi on WhatsApp to discuss your next shoot, reel drop, or website launch.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <MagneticButton>
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-base font-black px-8 py-4 rounded-full shadow-sticker transition-all duration-200 hover:scale-105 active:scale-95"
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </MagneticButton>

                <MagneticButton>
                  <Link
                    href="/services"
                    className="inline-flex items-center gap-2 bg-transparent text-white hover:bg-white/10 text-base font-bold px-7 py-4 rounded-full border border-white/25 transition-colors"
                  >
                    <span>Explore services</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </MagneticButton>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

    </div>
  );
}
