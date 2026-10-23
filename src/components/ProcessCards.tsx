"use client";

import React, { useRef } from "react";
import { Compass, Calendar, Camera, Send, BarChart3 } from "lucide-react";
import { motion, useScroll, useSpring } from "framer-motion";
import DrawLine from "@/components/motion/DrawLine";

interface Step {
  step: string;
  name: string;
  headline: string;
  description: string;
  icon: React.ReactNode;
}

const steps: Step[] = [
  {
    step: "01",
    name: "Discover",
    headline: "Understand the vibe.",
    description: "We learn about your brand, what you love, and who you want to reach. No endless decks—just what works.",
    icon: <Compass className="w-5 h-5 text-brand-red" />,
  },
  {
    step: "02",
    name: "Plan",
    headline: "Hooks & moodboards locked.",
    description: "We map out the shoot days, reel ideas, story pacing, and page layouts before rolling camera.",
    icon: <Calendar className="w-5 h-5 text-brand-red" />,
  },
  {
    step: "03",
    name: "Create",
    headline: "Real cameras, real shoots.",
    description: "Studio lighting, handheld footage, bold motion, and clean sound designed to stop scrollers in their tracks.",
    icon: <Camera className="w-5 h-5 text-brand-red" />,
  },
  {
    step: "04",
    name: "Post",
    headline: "Live on your feeds.",
    description: "Consistent posting, clean captions, and fast, good-looking websites that feel effortless on mobile.",
    icon: <Send className="w-5 h-5 text-brand-red" />,
  },
  {
    step: "05",
    name: "Refine",
    headline: "Double down on what works.",
    description: "We see what caught attention, drop what didn't, and keep tuning the content week after week.",
    icon: <BarChart3 className="w-5 h-5 text-brand-red" />,
  },
];

export default function ProcessCards() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative w-full">
      {/* MOBILE / TABLET: Vertical Timeline with Downward Scroll-Drawn Line */}
      <div className="lg:hidden relative pl-6 min-[380px]:pl-8 sm:pl-10 space-y-4 sm:space-y-6">
        {/* Background Vertical Line Track */}
        <div className="absolute left-2 min-[380px]:left-3 sm:left-3.5 top-3 bottom-6 w-0.5 bg-brand-border/70 overflow-hidden">
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="w-full h-full bg-brand-red"
          />
        </div>

        {steps.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ delay: idx * 0.06, duration: 0.4 }}
            className="relative bg-white rounded-[20px] p-5 min-[360px]:p-6 border border-brand-border shadow-sm tap-bounce active:scale-[0.98]"
          >
            {/* Step marker node on the timeline */}
            <div className="absolute -left-6 min-[380px]:-left-8 sm:-left-10 top-5 w-4 h-4 min-[380px]:w-6 min-[380px]:h-6 rounded-full bg-white border-2 border-brand-red flex items-center justify-center text-[10px] font-mono font-black text-brand-red shadow-sm z-10 -translate-x-1/2">
              <span className="hidden min-[380px]:inline">{item.step}</span>
              <span className="min-[380px]:hidden w-1.5 h-1.5 rounded-full bg-brand-red" />
            </div>

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-brand-red bg-brand-cream px-2.5 py-0.5 rounded-full border border-brand-border">
                  Step {item.step}
                </span>
                <h3 className="text-base min-[360px]:text-lg font-black text-brand-ink">
                  {item.name}
                </h3>
              </div>
              <div className="p-2 rounded-full bg-brand-cream">
                {item.icon}
              </div>
            </div>

            <p className="text-xs font-bold text-brand-red mb-2">
              {item.headline}
            </p>

            <p className="text-xs sm:text-sm text-brand-warmgrey leading-relaxed pt-2 border-t border-brand-border/60">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* DESKTOP: Horizontal 5-Column Grid with Horizontal Connecting Line */}
      <div className="hidden lg:block">
        <div className="mb-8 px-8">
          <DrawLine targetRef={containerRef} />
        </div>

        <div className="grid grid-cols-5 gap-6">
          {steps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: idx * 0.08, duration: 0.45 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-white rounded-[20px] p-6 border border-brand-border flex flex-col justify-between transition-shadow hover:shadow-card hover:border-brand-red/30 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono font-black text-brand-red bg-brand-cream px-3 py-1 rounded-full border border-brand-border">
                    {item.step}
                  </span>
                  <div className="p-2 rounded-full bg-brand-cream group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                </div>

                <h3 className="text-xl font-black text-brand-ink mb-1">
                  {item.name}
                </h3>
                <p className="text-xs font-bold text-brand-red mb-3">
                  {item.headline}
                </p>
              </div>

              <p className="text-xs text-brand-warmgrey leading-relaxed mt-2 pt-3 border-t border-brand-border/60">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
