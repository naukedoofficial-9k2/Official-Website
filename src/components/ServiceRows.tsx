"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useFullMotion } from "@/lib/useFullMotion";
import RevealText from "@/components/motion/RevealText";

const services = [
  {
    title: "Social",
    description: "Feed strategy, reels, stories and daily posting that keeps people checking in.",
    href: "/services#social-media",
  },
  {
    title: "Shoots",
    description: "Real cameras, studio lighting and lifestyle shoots. No bland stock.",
    href: "/services#shoots",
  },
  {
    title: "Websites",
    description: "Fast, good-looking storefronts and landing pages that match your content.",
    href: "/services#websites",
  },
  {
    title: "Branding",
    description: "Bold wordmarks, color and type rules, and sticker systems made for screens.",
    href: "/services#branding",
  },
  {
    title: "Motion",
    description: "Kinetic type, beat-matched cuts and hooks that hold attention.",
    href: "/services#motion",
  },
];

const OFFSET = 96;

interface ServiceRowProps {
  service: (typeof services)[number];
  index: number;
}

function ServiceRow({ service, index }: ServiceRowProps) {
  const shouldReduceMotion = useReducedMotion();
  const fullMotion = useFullMotion();
  const rowRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start 100%", "start 55%"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -OFFSET : OFFSET, 0]);

  return (
    <Link
      ref={rowRef}
      href={service.href}
      className="touch-rise group relative block overflow-hidden border-b border-brand-ink/15 focus:outline-none"
    >
      {/* Red fill rises on hover or keyboard focus */}
      <span className="absolute inset-0 bg-brand-red origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-y-100 group-focus-visible:scale-y-100" />

      <div className="relative max-w-7xl mx-auto px-4 min-[361px]:px-5 sm:px-6 lg:px-8 py-5 sm:py-7 grid grid-cols-12 gap-x-4 gap-y-2 items-center">
        <span className="col-span-2 md:col-span-1 text-sm font-bold text-brand-warmgrey transition-colors md:group-hover:text-white/80 group-focus-visible:text-white/80">
          0{index + 1}
        </span>

        <motion.span
          style={shouldReduceMotion || !fullMotion ? undefined : { x }}
          className="js-reveal col-span-8 md:col-span-6 service-title font-black text-brand-ink transition-colors md:group-hover:text-white group-focus-visible:text-white"
        >
          {service.title}
        </motion.span>

        <ArrowUpRight className="col-span-2 md:col-start-12 md:row-start-1 justify-self-end w-7 h-7 sm:w-9 sm:h-9 text-brand-red transition-all duration-300 md:group-hover:text-white md:group-hover:translate-x-1 md:group-hover:-translate-y-1 group-focus-visible:text-white" />

        <p className="col-span-12 md:col-span-4 md:col-start-8 md:row-start-1 text-sm sm:text-base text-brand-warmgrey leading-relaxed transition-colors md:group-hover:text-white/90 group-focus-visible:text-white/90">
          {service.description}
        </p>
      </div>
    </Link>
  );
}

export default function ServiceRows() {
  return (
    <section className="bg-brand-cream pt-16 sm:pt-28 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 min-[361px]:px-5 sm:px-6 lg:px-8 mb-8 sm:mb-14">
        <RevealText text="What we make." as="h2" className="work-title font-black text-brand-ink" />
      </div>

      <div className="border-t border-brand-ink/15">
        {services.map((service, idx) => (
          <ServiceRow key={service.title} service={service} index={idx} />
        ))}
      </div>
    </section>
  );
}
