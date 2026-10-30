"use client";

import React from "react";
import Image from "next/image";
import { siteConfig } from "@/content/site";
import BriefBuilder from "@/components/BriefBuilder";
import TeamChat from "@/components/TeamChat";
import KineticText from "@/components/motion/KineticText";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";
import StrikethroughText from "@/components/motion/StrikethroughText";

const principles = [
  {
    title: "Playful",
    tagline: "Light on our feet, never childish.",
    description: "We make people smile before they scroll on. Social feeds are loud; bland corporate content is invisible. We bring charm and energy to every frame.",
  },
  {
    title: "Warm",
    tagline: "Human, friendly, easy to talk to.",
    description: "Clients feel looked after. We talk like friends who happen to be great at what we do. Say hi first, always.",
  },
  {
    title: "Polished",
    tagline: "Fun on the surface, sharp underneath.",
    description: "Careful typography, clean color grading, fast-loading pages, and deliberate sound design. The craft underneath is razor-sharp.",
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
  return (
    <div className="flex flex-col min-h-screen">

      {/* Giant Header */}
      <section className="bg-brand-cream pt-10 sm:pt-16 pb-12 sm:pb-20 px-4 min-[361px]:px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <KineticText text="We're the loud ones." className="step-title font-black text-brand-ink" />

          <FadeUp delay={0.45}>
            <p className="mt-4 sm:mt-6 text-lg sm:text-2xl text-brand-warmgrey max-w-2xl leading-relaxed font-medium">
              A social-first creative agency for brands of every kind across India and Western markets.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Brand Mark: Full Red Panel */}
      <section className="bg-brand-red text-white py-14 sm:py-24 px-4 min-[361px]:px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <FadeUp yOffset={48} duration={0.7} className="lg:col-span-7">
            <div className="relative w-full aspect-[752/266]">
              <Image
                src="/brand/logo-white.svg"
                alt="Nau K Do official logo"
                fill
                priority
                className="object-contain object-left"
              />
            </div>
          </FadeUp>

          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              Bold, friendly, a little cheeky.
            </h2>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed">
              Our name and wordmark bring together English, Hindi, and Urdu lettering in a distinct visual lockup. It echoes the energy of modern multilingual culture: unapologetic, vibrant, and built never to blend into the background.
            </p>

            {siteConfig.nameStory && (
              <p className="text-base font-medium text-white leading-relaxed pt-2">
                {siteConfig.nameStory}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* The Team as a Group Chat */}
      <TeamChat />

      {/* Personality Pillars: Playful, Warm, Polished */}
      <section className="bg-brand-cream pt-16 sm:pt-28 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto px-4 min-[361px]:px-5 sm:px-6 lg:px-8 mb-8 sm:mb-14">
          <RevealText
            text="How we work every day."
            as="h2"
            className="service-band-title font-black text-brand-ink"
          />
        </div>

        <div className="border-t border-brand-ink/15">
          {principles.map((item, idx) => (
            <div key={item.title} className="touch-rise border-b border-brand-ink/15">
              <div className="max-w-7xl mx-auto px-4 min-[361px]:px-5 sm:px-6 lg:px-8 py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-6 items-center">
                <span className="md:col-span-1 text-sm font-bold text-brand-warmgrey">0{idx + 1}</span>
                <RevealText text={item.title} as="h3" className="md:col-span-5 service-band-title font-black text-brand-ink" />
                <div className="md:col-span-6 space-y-1.5">
                  <p className="text-lg sm:text-xl font-bold text-brand-ink leading-snug">{item.tagline}</p>
                  <p className="text-sm sm:text-base text-brand-warmgrey leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* We Say / Not This */}
      <section className="bg-brand-ink text-white mt-8 sm:mt-12 py-16 sm:py-28 px-4 min-[361px]:px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <RevealText
            text="How we talk."
            as="h2"
            className="service-band-title font-black text-white mb-8 sm:mb-14"
          />

          <div>
            {sayings.map((pair, idx) => (
              <div key={idx} className="py-6 sm:py-8 border-t border-white/15 space-y-2 sm:space-y-3">
                <p className="text-2xl sm:text-5xl font-black tracking-tight leading-tight">
                  {pair.weSay}
                </p>
                <StrikethroughText delay={0.2 + idx * 0.1} className="text-sm sm:text-lg font-medium text-brand-cream">
                  {pair.theySay}
                </StrikethroughText>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BriefBuilder />

    </div>
  );
}
