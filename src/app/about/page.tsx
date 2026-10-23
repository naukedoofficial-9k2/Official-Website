"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles, Heart, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";
import StrikethroughText from "@/components/motion/StrikethroughText";
import MagneticButton from "@/components/motion/MagneticButton";

const principles = [
  {
    title: "Playful",
    tagline: "Light on our feet, never childish.",
    description: "We make people smile before they scroll on. Social feeds are loud; bland corporate content is invisible. We bring charm and energy to every frame.",
    icon: <Sparkles className="w-5 h-5 text-brand-red" />,
  },
  {
    title: "Warm",
    tagline: "Human, friendly, easy to talk to.",
    description: "Clients feel looked after. We talk like friends who happen to be great at what we do. Say hi first, always.",
    icon: <Heart className="w-5 h-5 text-brand-red" />,
  },
  {
    title: "Polished",
    tagline: "Fun on the surface, sharp underneath.",
    description: "Careful typography, clean color grading, fast-loading pages, and deliberate sound design. The craft underneath is razor-sharp.",
    icon: <ShieldCheck className="w-5 h-5 text-brand-red" />,
  },
];

const sayings = [
  {
    weSay: "Let's make something people stop for.",
    theySay: "We deliver synergistic digital solutions.",
  },
  {
    weSay: "Tell us about your brand. We'll take it from here.",
    theySay: "Industry-leading, award-winning multi-stakeholder excellence.",
  },
  {
    weSay: "Reels, shoots, sites. All under one roof.",
    theySay: "Submit your inquiry form for committee consideration.",
  },
];

export default function AboutPage() {
  const whatsappHref = getWhatsAppUrl("Hi Nau K Do! I loved reading about your studio and would love to chat.");

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Bold Header Band */}
      <section className="bg-brand-red text-white pt-10 sm:pt-20 pb-12 sm:pb-24 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-2 sm:mb-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/80">
              Who We Are
            </span>
          </div>

          <RevealText
            text="About Nau K Do"
            as="h1"
            className="section-fluid-heading sm:text-7xl lg:text-8xl font-black text-white tracking-tight"
          />

          <FadeUp delay={0.2}>
            <p className="mt-3 sm:mt-4 text-sm min-[360px]:text-base sm:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
              A social-first creative agency for brands of every kind across India and Western markets.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-12 sm:py-24 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* Brand Mark Card: Logo shown large and centered, text below on mobile */}
        <div className="rounded-[16px] sm:rounded-[20px] bg-white border border-brand-border p-6 min-[360px]:p-8 sm:p-12 mb-12 sm:mb-16 shadow-card">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 items-center">
            
            {/* Wordmark Logo Artwork: Large and centered on mobile */}
            <div className="w-full lg:col-span-5 lg:order-2 flex flex-col items-center justify-center p-6 min-[360px]:p-8 sm:p-12 rounded-[16px] sm:rounded-[20px] bg-brand-cream border border-brand-border">
              <div className="relative h-14 w-44 min-[360px]:h-16 min-[360px]:w-52">
                <Image
                  src="/brand/logo-red.svg"
                  alt="Nau K Do official logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Text Below Logo on mobile, left on desktop */}
            <div className="w-full lg:col-span-7 lg:order-1 space-y-3 sm:space-y-4">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-red block">
                The Brand Mark
              </span>
              <h2 className="text-2xl min-[360px]:text-3xl sm:text-4xl font-black text-brand-ink tracking-tight">
                Bold, friendly, a little cheeky.
              </h2>
              <p className="text-sm sm:text-base text-brand-warmgrey leading-relaxed">
                Our name and wordmark bring together English, Hindi, and Urdu lettering in a distinct visual lockup. It echoes the energy of modern multilingual culture—unapologetic, vibrant, and built never to blend into the background.
              </p>

              {siteConfig.nameStory && (
                <p className="text-sm text-brand-ink font-medium leading-relaxed pt-2">
                  {siteConfig.nameStory}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Personality Pillars: Playful, Warm, Polished (Stacked cards, nothing clipped) */}
        <div className="mb-14 sm:mb-20">
          <div className="max-w-xl mb-8 sm:mb-10">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-red block mb-1">
              Personality
            </span>
            <RevealText
              text="How we work every day."
              as="h2"
              className="section-fluid-heading sm:text-5xl font-black text-brand-ink tracking-tight pb-1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {principles.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 border border-brand-border flex flex-col justify-between shadow-sm transition-all hover:shadow-card hover:border-brand-red/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <span className="text-xs font-mono font-black text-brand-red px-3 py-1 rounded-full bg-brand-cream border border-brand-border">
                      0{idx + 1}
                    </span>
                    <div className="p-2.5 rounded-full bg-brand-cream">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-brand-ink mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-brand-red mb-3 sm:mb-4 leading-normal">
                    {item.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-brand-warmgrey leading-relaxed mt-2 pt-3 sm:pt-4 border-t border-brand-border/60">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* We Say / Not This Block: Each pair stacked vertically (We say above Not this) */}
        <div className="rounded-[16px] sm:rounded-[20px] bg-white border border-brand-border p-6 min-[360px]:p-8 sm:p-12 mb-14 sm:mb-20 shadow-sm">
          <div className="max-w-2xl mb-6 sm:mb-8">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-red block mb-1">
              Voice &amp; Tone
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-brand-ink">
              How we talk (and what we avoid).
            </h2>
          </div>

          <div className="space-y-4">
            {sayings.map((pair, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 sm:p-5 rounded-[16px] sm:rounded-[20px] bg-brand-cream border border-brand-border/70"
              >
                {/* We say - Stacked above */}
                <div className="flex items-start gap-2.5 sm:gap-3">
                  <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-brand-red text-white flex-shrink-0 mt-0.5 shadow-sm">
                    We say
                  </span>
                  <p className="text-sm sm:text-base font-bold text-brand-ink leading-snug">
                    &ldquo;{pair.weSay}&rdquo;
                  </p>
                </div>

                {/* Not this - Stacked below */}
                <div className="flex items-start gap-2.5 sm:gap-3 pt-2.5 border-t border-brand-border/50">
                  <span className="text-xs font-bold uppercase px-2.5 py-0.5 rounded-full bg-brand-warmgrey/20 text-brand-ink flex-shrink-0 mt-0.5">
                    Not this
                  </span>
                  <StrikethroughText delay={0.2 + idx * 0.1} className="text-xs sm:text-sm font-medium text-brand-warmgrey">
                    &ldquo;{pair.theySay}&rdquo;
                  </StrikethroughText>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Panel (Ink) */}
        <div className="rounded-[16px] sm:rounded-[20px] bg-brand-ink text-brand-cream p-6 min-[360px]:p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8 border border-brand-border-dark shadow-xl">
          <div className="space-y-2 sm:space-y-3 max-w-xl">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-brand-red">
              India &amp; Western Markets
            </span>
            <h3 className="text-2xl min-[360px]:text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to make something people stop for?
            </h3>
            <p className="text-sm sm:text-base text-brand-cream/80 leading-relaxed">
              Say hi on WhatsApp to discuss your next shoot, reel drop, or website launch.
            </p>
          </div>

          <MagneticButton className="w-full md:w-auto">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="h-[52px] w-full md:w-auto inline-flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-sm sm:text-base font-black px-8 rounded-full shadow-sticker tap-bounce active:scale-[0.98] transition-all whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5 fill-white/20" />
              <span>Chat on WhatsApp</span>
            </a>
          </MagneticButton>
        </div>

      </div>

    </div>
  );
}
