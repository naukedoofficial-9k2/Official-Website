"use client";

import React from "react";
import type { Metadata } from "next";
import { MessageCircle, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/content/site";
import ProcessCards from "@/components/ProcessCards";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";

const serviceBands = [
  {
    id: "social-media",
    number: "01",
    title: "Social Media Management & Posting",
    promise: "Make people smile before they scroll on.",
    theme: "cream" as const, // cream background
    description:
      "We plan, script, shoot, edit, and post content that gives your brand a clear pulse online. Cohesive feeds, high-energy reels, and daily story interactions that build real brand followings.",
    deliverables: [
      "Monthly Content Calendar & Creative Angles",
      "Regular Video Reels & Multi-Slide Carousels",
      "Interactive Story Sequences & Polls",
      "Community Engagement & Comment Replies",
      "Sound & Trend Adaptation",
    ],
    whatsappMsg: "Hi Nau K Do! I'm interested in Social Media Management & Posting.",
  },
  {
    id: "shoots",
    number: "02",
    title: "Content Creation & Real Shoots",
    promise: "Real cameras, macro textures, zero bland stock.",
    theme: "white" as const, // white background
    description:
      "We bring proper cameras, deliberate studio lighting, and sharp art direction to your products and spaces. High-contrast closeups, handheld lifestyle video, and authentic unboxings that look rich and unmistakably real.",
    deliverables: [
      "Studio Lighting & Macro Product Closeups",
      "Handheld Lifestyle & Creator-Style Footage",
      "Clean UGC & Visual Ad Variations",
      "Full Color-Graded Asset Library",
      "Short-Form Video Cutdowns",
    ],
    whatsappMsg: "Hi Nau K Do! I'm interested in Content Creation & Real Shoots.",
  },
  {
    id: "websites",
    number: "03",
    title: "Website Design & Development",
    promise: "Fast, good-looking websites that feel effortless.",
    theme: "ink" as const, // ink background
    description:
      "We design and build websites that feel alive. Fast on mobile, oversized typography, mobile-first design, and tactile micro-interactions with fast, good-looking websites that match your content.",
    deliverables: [
      "Custom Digital Flagship & Storefront Design",
      "Fast, Mobile-First Web Development",
      "Smooth Micro-Interactions & Tap States",
      "SEO & Social Sharing Preview Setup",
      "Simple Setup for Future Updates",
    ],
    whatsappMsg: "Hi Nau K Do! I'm interested in Website Design & Development.",
  },
  {
    id: "branding",
    number: "04",
    title: "Logo & Brand Identity",
    promise: "Bold marks that punch through a small screen.",
    theme: "cream" as const, // cream background
    description:
      "Your brand identity needs to stand out on a phone screen before anywhere else. We create memorable multilingual wordmarks, distinct icon marks, energetic sticker sets, and tight color systems with real personality.",
    deliverables: [
      "Custom Wordmark & Distinct Monogram Marks",
      "Color Palette Tokens & Contrast Rules",
      "Typography Hierarchy & Pairing Guide",
      "Social Sticker Kits & Highlight Covers",
      "Clear, 1-Page Practical Brand Guide",
    ],
    whatsappMsg: "Hi Nau K Do! I'm interested in Logo & Brand Identity.",
  },
  {
    id: "motion",
    number: "05",
    title: "Video Editing & Motion Graphics",
    promise: "Rhythmic beat-matching and punchy hooks.",
    theme: "white" as const, // white background
    description:
      "The first second decides whether someone watches or scrolls past. We combine kinetic typography, rhythmic beat matching, custom sound design, and 3D product motion to hold attention across modern feeds.",
    deliverables: [
      "Kinetic Typography & Text Overlays",
      "Sound Design, Audio Sync & SFX Mixing",
      "Animated Brand Bumpers & Video Transitions",
      "Multi-Ratio Video Adaptations",
      "Attention-Grabbing Hook Variations",
    ],
    whatsappMsg: "Hi Nau K Do! I'm interested in Video Editing & Motion Graphics.",
  },
];

export default function ServicesPage() {
  const whatsappHref = getWhatsAppUrl("Hi Nau K Do! I want to talk about your services and get a scope for our brand.");

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Bold Header Band */}
      <section className="bg-brand-red text-white pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/80">
              Agency Capabilities
            </span>
          </div>

          <RevealText
            text="Services"
            as="h1"
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight"
          />

          <FadeUp delay={0.2}>
            <p className="mt-4 text-lg sm:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
              Reels, shoots, sites. All under one roof. We build the social momentum and craft the digital storefronts to match.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Alternating Full-Width Service Bands (cream, white, ink, cream, white) */}
      <section className="w-full">
        {serviceBands.map((service) => {
          const isInk = service.theme === "ink";
          const isWhite = service.theme === "white";

          return (
            <div
              key={service.id}
              id={service.id}
              className={`py-20 sm:py-28 px-4 sm:px-6 lg:px-8 border-b scroll-mt-20 ${
                isInk
                  ? "bg-brand-ink text-brand-cream border-brand-border-dark"
                  : isWhite
                  ? "bg-white text-brand-ink border-brand-border"
                  : "bg-brand-cream text-brand-ink border-brand-border"
              }`}
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
                
                {/* Left Side: Number, Title, Promise */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-sm sm:text-base font-mono font-black px-3.5 py-1 rounded-full ${
                        isInk
                          ? "text-white bg-brand-red border border-white/20 shadow-sm"
                          : "text-brand-red bg-brand-red/10 border border-brand-red/20"
                      }`}
                    >
                      {service.number}
                    </span>
                  </div>

                  <h2 className={`text-3xl sm:text-5xl font-black tracking-tight leading-tight ${isInk ? "text-white" : "text-brand-ink"}`}>
                    {service.title}
                  </h2>

                  <p className="text-lg sm:text-xl font-bold text-brand-red leading-snug">
                    {service.promise}
                  </p>

                  <p className={`text-base leading-relaxed ${isInk ? "text-brand-cream/90" : "text-brand-warmgrey"}`}>
                    {service.description}
                  </p>

                  <div className="pt-4">
                    <MagneticButton>
                      <a
                        href={getWhatsAppUrl(service.whatsappMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-black px-7 py-3.5 rounded-full shadow-sticker transition-transform hover:scale-105 active:scale-95"
                      >
                        <MessageCircle className="w-4 h-4 fill-white/20" />
                        <span>Inquire About {service.title.split(" ")[0]}</span>
                      </a>
                    </MagneticButton>
                  </div>
                </div>

                {/* Right Side: Deliverables with Staggered Checkmark Ticks (Animation 15) */}
                <div
                  className={`lg:col-span-6 rounded-[20px] p-8 sm:p-10 border ${
                    isInk
                      ? "bg-[#1E1E1E] border-white/20 shadow-xl"
                      : "bg-brand-cream border-brand-border shadow-sm"
                  }`}
                >
                  <h3 className={`text-xs font-mono font-black uppercase tracking-wider mb-6 ${isInk ? "text-white" : "text-brand-warmgrey"}`}>
                    What You Get
                  </h3>

                  <ul className="space-y-4">
                    {service.deliverables.map((item, dIdx) => (
                      <motion.li
                        key={dIdx}
                        initial={{ opacity: 0, x: -12 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: 0.15 + dIdx * 0.08, duration: 0.35 }}
                        className="flex items-start gap-3.5 text-sm sm:text-base font-semibold"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true, amount: 0.1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 18,
                            delay: 0.2 + dIdx * 0.08,
                          }}
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                        </motion.div>
                        <span className={isInk ? "text-white" : "text-brand-ink"}>
                          {item}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Short 5-Step Process */}
      <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-brand-red" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-warmgrey">
              The Process
            </span>
          </div>
          <RevealText
            text="Five clear milestones."
            as="h2"
            className="text-4xl sm:text-5xl font-black text-brand-ink tracking-tight"
          />
          <p className="text-base text-brand-warmgrey mt-2">
            From initial creative vision to live posts and continuous tuning.
          </p>
        </div>

        <ProcessCards />
      </section>

      {/* Closing Panel (Ink) */}
      <section className="px-4 sm:px-6 lg:px-8 pb-20 sm:pb-28 max-w-7xl mx-auto w-full">
        <div className="p-8 sm:p-14 rounded-[20px] bg-brand-ink text-brand-cream border border-brand-border-dark flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-black text-brand-red uppercase tracking-wider">
              Get Started
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Let&apos;s build something people stop for.
            </h3>
            <p className="text-sm text-brand-cream/80 leading-relaxed">
              Say hi on WhatsApp with what you need. We will talk through your brand and put together a clear scope.
            </p>
          </div>

          <MagneticButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-base font-black px-8 py-4 rounded-full shadow-sticker transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Chat on WhatsApp</span>
            </a>
          </MagneticButton>
        </div>
      </section>

    </div>
  );
}
