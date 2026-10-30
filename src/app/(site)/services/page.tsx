"use client";

import React from "react";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { getWhatsAppUrl } from "@/content/site";
import BriefBuilder from "@/components/BriefBuilder";
import ProcessCards from "@/components/ProcessCards";
import KineticText from "@/components/motion/KineticText";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";

const serviceBands = [
  {
    id: "social-media",
    number: "01",
    name: "Social",
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
    name: "Shoots",
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
    name: "Websites",
    title: "Website Design & Development",
    promise: "Fast, good-looking websites that feel effortless.",
    theme: "ink" as const, // ink background
    description:
      "We design and build websites that feel alive. Fast on mobile, oversized typography, mobile-first design, and tactile micro-interactions that match your content.",
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
    name: "Branding",
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
    name: "Motion",
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
  return (
    <div className="flex flex-col min-h-screen">

      {/* Giant Red Header */}
      <section className="bg-brand-red text-white pt-10 sm:pt-16 pb-10 sm:pb-16 px-4 min-[361px]:px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <KineticText text="Reels. Shoots. Sites." className="step-title font-black text-white" />

          <FadeUp delay={0.45}>
            <p className="mt-4 sm:mt-6 text-lg sm:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
              All under one roof. We build the social momentum and craft the digital storefronts to match.
            </p>
          </FadeUp>

          {/* Jump Links */}
          <FadeUp delay={0.55}>
            <nav aria-label="Services" className="mt-6 sm:mt-8 flex flex-wrap gap-2">
              {serviceBands.map((service) => (
                <a
                  key={service.id}
                  href={`#${service.id}`}
                  className="min-h-[44px] inline-flex items-center px-4 rounded-full bg-white/15 hover:bg-white hover:text-brand-red text-sm font-bold text-white transition-colors tap-bounce active:scale-95"
                >
                  {service.name}
                </a>
              ))}
            </nav>
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
              className={`py-14 sm:py-24 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 scroll-mt-16 ${
                isInk
                  ? "bg-brand-ink text-brand-cream"
                  : isWhite
                  ? "bg-white text-brand-ink"
                  : "bg-brand-cream text-brand-ink"
              }`}
            >
              <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

                {/* Left Side Stays Pinned While the List Scrolls */}
                <div className="pin-tall lg:col-span-6 space-y-4">
                  <span className={`block text-lg sm:text-2xl font-black ${isInk ? "text-brand-cream/70" : "text-brand-warmgrey"}`}>
                    {service.number}
                  </span>

                  <RevealText
                    text={service.name}
                    as="h2"
                    className={`service-band-title font-black ${isInk ? "text-white" : "text-brand-ink"}`}
                  />

                  <p className={`text-xl sm:text-3xl font-bold leading-snug tracking-tight ${isInk ? "text-white" : "text-brand-red"}`}>
                    {service.promise}
                  </p>

                  <p className={`text-base sm:text-lg leading-relaxed ${isInk ? "text-brand-cream/85" : "text-brand-warmgrey"}`}>
                    {service.description}
                  </p>

                  <a
                    href={getWhatsAppUrl(service.whatsappMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group min-h-[44px] inline-flex items-center gap-1.5 text-base font-black underline underline-offset-4 decoration-2 ${
                      isInk ? "text-white decoration-white/40" : "text-brand-ink decoration-brand-red"
                    }`}
                  >
                    <span>Ask us about {service.name.toLowerCase()}</span>
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                </div>

                {/* Right Side: Deliverables with Staggered Checkmark Ticks (High contrast, all visible) */}
                <div className="lg:col-span-6">
                  <h3 className={`text-base sm:text-lg font-black mb-2 ${isInk ? "text-white" : "text-brand-ink"}`}>
                    What you get
                  </h3>

                  <ul>
                    {service.deliverables.map((item, dIdx) => (
                      <motion.li
                        key={dIdx}
                        initial={{ opacity: 0, y: 28 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ delay: 0.05 + dIdx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className={`js-reveal flex items-start gap-3 py-4 sm:py-5 border-b text-lg sm:text-2xl font-bold tracking-tight leading-snug ${
                          isInk ? "border-white/15 text-white" : "border-brand-ink/15 text-brand-ink"
                        }`}
                      >
                        <CheckCircle2 className="w-6 h-6 text-brand-red flex-shrink-0 mt-0.5 sm:mt-1" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          );
        })}
      </section>

      {/* Short 5-Step Process (Uses Vertical Timeline on Mobile) */}
      <section className="bg-brand-cream py-16 sm:py-28 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-3xl mb-10 sm:mb-14">
            <RevealText
              text="Five clear milestones."
              as="h2"
              className="service-band-title font-black text-brand-ink"
            />
            <p className="text-base sm:text-xl text-brand-warmgrey mt-3 sm:mt-4">
              From initial creative vision to live posts and continuous tuning.
            </p>
          </div>

          <ProcessCards />
        </div>
      </section>

      <BriefBuilder />

    </div>
  );
}
