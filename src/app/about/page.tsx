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
      <section className="bg-brand-red text-white pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-white" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/80">
              Who We Are
            </span>
          </div>

          <RevealText
            text="About Nau K Do"
            as="h1"
            className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight"
          />

          <FadeUp delay={0.2}>
            <p className="mt-4 text-lg sm:text-2xl text-white/90 max-w-2xl leading-relaxed font-medium">
              A social-first creative agency for brands of every kind across India and Western markets.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* The Wordmark Story (Multilingual lettering) */}
        <div className="rounded-[20px] bg-white border border-brand-border p-8 sm:p-12 mb-16 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-red block">
                The Brand Mark
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-brand-ink tracking-tight">
                Bold, friendly, a little cheeky.
              </h2>
              <p className="text-base text-brand-warmgrey leading-relaxed">
                Our name and wordmark bring together English, Hindi, and Urdu lettering in a distinct visual lockup. It echoes the energy of modern multilingual culture—unapologetic, vibrant, and built never to blend into the background.
              </p>

              {/* Optional owner name story, rendered only when set */}
              {siteConfig.nameStory && (
                <p className="text-sm text-brand-ink font-medium leading-relaxed pt-2">
                  {siteConfig.nameStory}
                </p>
              )}
            </div>

            {/* Wordmark Artwork with Entrance Animation (No hex caption!) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="lg:col-span-5 flex flex-col items-center justify-center p-8 sm:p-12 rounded-[20px] bg-brand-cream border border-brand-border"
            >
              <div className="relative h-14 w-44 sm:h-16 sm:w-52">
                <Image
                  src="/brand/logo-red.svg"
                  alt="Nau K Do official logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Personality Pillars: Playful, Warm, Polished */}
        <div className="mb-20">
          <div className="max-w-xl mb-10">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-red block mb-1">
              Personality
            </span>
            <RevealText
              text="How we work every day."
              as="h2"
              className="text-3xl sm:text-5xl font-black text-brand-ink tracking-tight pb-2 leading-tight"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {principles.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-[20px] p-8 border border-brand-border flex flex-col justify-between shadow-sm transition-shadow hover:shadow-card hover:border-brand-red/30"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-black text-brand-red px-3 py-1 rounded-full bg-brand-cream border border-brand-border">
                      0{idx + 1}
                    </span>
                    <div className="p-2.5 rounded-full bg-brand-cream">
                      {item.icon}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-brand-ink mb-2.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-brand-red mb-4 leading-normal">
                    {item.tagline}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-brand-warmgrey leading-relaxed mt-2 pt-4 border-t border-brand-border/60">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated We Say vs Not This Block (Animation 16) */}
        <div className="rounded-[20px] bg-white border border-brand-border p-8 sm:p-12 mb-20 shadow-sm">
          <div className="max-w-2xl mb-8">
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
                className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5 rounded-[20px] bg-brand-cream border border-brand-border/70"
              >
                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-brand-red text-white flex-shrink-0 mt-0.5 shadow-sm">
                    We say
                  </span>
                  <p className="text-sm font-bold text-brand-ink">
                    &ldquo;{pair.weSay}&rdquo;
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-brand-warmgrey/20 text-brand-ink flex-shrink-0 mt-0.5">
                    Not this
                  </span>
                  <StrikethroughText delay={0.25 + idx * 0.1} className="text-sm font-medium text-brand-warmgrey">
                    &ldquo;{pair.theySay}&rdquo;
                  </StrikethroughText>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closing Panel (Ink) */}
        <div className="rounded-[20px] bg-brand-ink text-brand-cream p-8 sm:p-14 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-brand-border-dark shadow-xl">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-brand-red">
              India &amp; Western Markets
            </span>
            <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to make something people stop for?
            </h3>
            <p className="text-base text-brand-cream/80 leading-relaxed">
              Say hi on WhatsApp to discuss your next shoot, reel drop, or website launch.
            </p>
          </div>

          <MagneticButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-base font-black px-8 py-4 rounded-full shadow-sticker transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
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
