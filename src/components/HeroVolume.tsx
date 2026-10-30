"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, Volume2 } from "lucide-react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
  type MotionValue,
} from "framer-motion";
import { siteConfig } from "@/content/site";
import { useHero } from "@/context/HeroContext";
import { useFullMotion } from "@/lib/useFullMotion";
import MagneticButton from "@/components/motion/MagneticButton";
import KineticText from "@/components/motion/KineticText";

const MAX_VOLUME = 11;
const LOUD_FROM = 8;

const levels = [
  {
    from: 0,
    headline: "Quiet, by accident.",
    line: "This is how most brands sound online. Nobody stops scrolling.",
    readout: "Beige mode",
    weight: "font-medium",
  },
  {
    from: 4,
    headline: "Fine, we guess.",
    line: "Nice enough. Easy to forget. Keep going.",
    readout: "Getting there",
    weight: "font-bold",
  },
  {
    from: LOUD_FROM,
    headline: siteConfig.tagline,
    line: "We create, shoot, edit and post content that makes brands feel alive online, then build the websites to match.",
    readout: "Nau K Do levels",
    weight: "font-black",
  },
];

function getLevel(volume: number) {
  return levels.reduce((current, level) => (volume >= level.from ? level : current));
}

interface HeroLayoutProps {
  level: (typeof levels)[number];
  scale: MotionValue<number>;
  tone: "quiet" | "loud";
  controls: React.ReactNode;
  action: React.ReactNode;
}

function HeroLayout({ level, scale, tone, controls, action }: HeroLayoutProps) {
  const isLoud = tone === "loud";

  return (
    <div className="flex-1 w-full max-w-[100rem] mx-auto px-4 min-[361px]:px-5 sm:px-6 lg:px-8 pt-5 sm:pt-8 pb-5 sm:pb-6 flex flex-col justify-between gap-6 sm:gap-8">
      <div className="relative">
        <span
          className={`inline-flex items-center gap-2 mb-4 sm:mb-6 text-xs sm:text-sm font-bold ${
            isLoud ? "text-white/90" : "text-brand-warmgrey"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${isLoud ? "bg-white" : "bg-brand-red"}`} />
          <span>Social-first creative agency</span>
        </span>

        <motion.div style={{ scale }} className="origin-top-left">
          <KineticText
            key={level.headline}
            text={level.headline}
            as={isLoud ? "p" : "h1"}
            ariaHidden={isLoud}
            className={`hero-volume-title ${level.weight} ${isLoud ? "text-white" : "text-brand-ink"}`}
          />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        <div className="lg:col-span-7 space-y-5">
          <p
            className={`relative text-base sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl ${
              isLoud ? "text-white/90" : "text-brand-warmgrey"
            }`}
          >
            {level.line}
          </p>
          {action}
        </div>
        {controls}
      </div>
    </div>
  );
}

export default function HeroVolume() {
  const shouldReduceMotion = useReducedMotion();
  const fullMotion = useFullMotion();
  const { setHeroLoud } = useHero();
  const sectionRef = useRef<HTMLElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const introRef = useRef<AnimationPlaybackControls | null>(null);
  const [volume, setVolume] = useState(MAX_VOLUME);

  const level = getLevel(volume);
  const isLoud = level.from === LOUD_FROM;

  const rawVolume = useMotionValue(MAX_VOLUME);
  const smoothVolume = useSpring(rawVolume, { stiffness: 220, damping: 30, mass: 0.6 });
  const originX = useMotionValue(0);
  const originY = useMotionValue(0);
  const maxRadius = useMotionValue(0);

  const scale = useTransform(smoothVolume, [0, MAX_VOLUME], [0.55, 1]);
  const clipPath = useTransform(
    [smoothVolume, originX, originY, maxRadius] as MotionValue<number>[],
    ([value, x, y, radius]: number[]) =>
      value >= MAX_VOLUME - 0.02
        ? "none"
        : `circle(${Math.pow(value / MAX_VOLUME, 1.5) * radius}px at ${x}px ${y}px)`
  );
  // Repainting a huge clip every frame is heavy on phones, so touch devices crossfade instead
  const floodOpacity = useTransform(smoothVolume, [4, 9], [0, 1]);

  useEffect(() => rawVolume.on("change", (value) => setVolume(Math.round(value * 10) / 10)), [rawVolume]);

  useEffect(() => {
    setHeroLoud(isLoud);
  }, [isLoud, setHeroLoud]);

  useEffect(() => () => setHeroLoud(true), [setHeroLoud]);

  // The red flood grows out of the slider, so its origin follows the layout
  useEffect(() => {
    const measure = () => {
      const section = sectionRef.current?.getBoundingClientRect();
      const slider = sliderRef.current?.getBoundingClientRect();
      if (!section || !slider) return;

      const x = slider.left + slider.width / 2 - section.left;
      const y = slider.top + slider.height / 2 - section.top;
      originX.set(x);
      originY.set(y);
      maxRadius.set(Math.hypot(Math.max(x, section.width - x), Math.max(y, section.height - y)));
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [originX, originY, maxRadius]);

  // One short dip shows visitors the page reacts to the slider
  useEffect(() => {
    if (shouldReduceMotion || !fullMotion) return;

    introRef.current = animate(rawVolume, [MAX_VOLUME, 8.4, MAX_VOLUME], {
      delay: 1.5,
      duration: 1.5,
      ease: "easeInOut",
    });

    return () => introRef.current?.stop();
  }, [rawVolume, shouldReduceMotion, fullMotion]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    introRef.current?.stop();
    rawVolume.set(Number(e.target.value));
  };

  const renderAction = (isHidden: boolean) => (
    <div className={`relative z-20 ${isHidden ? "invisible" : ""}`}>
      <MagneticButton className="w-full sm:w-auto">
        <Link
          href="/work"
          className="h-[52px] w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-brand-ink hover:bg-black text-white text-base font-black px-8 rounded-full shadow-lg tap-bounce active:scale-[0.98] transition-all"
        >
          <span>See the work</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </MagneticButton>
    </div>
  );

  const renderControls = (isHidden: boolean) => (
    <div className={`relative z-20 lg:col-span-5 lg:justify-self-end w-full lg:max-w-md ${isHidden ? "invisible" : ""}`}>
      <div className="bg-white text-brand-ink rounded-[20px] p-4 sm:p-5 shadow-card-hover">
        <div className="flex items-end justify-between gap-4 mb-3">
          <div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-brand-warmgrey">
              <Volume2 className="w-4 h-4 text-brand-red" />
              <span>Brand volume</span>
            </span>
            <span className="block text-sm sm:text-base font-black mt-0.5">{level.readout}</span>
          </div>
          <span className="text-4xl sm:text-5xl font-black leading-none tabular-nums text-brand-red">
            {Math.round(volume)}
          </span>
        </div>

        <input
          ref={isHidden ? undefined : sliderRef}
          type="range"
          min={0}
          max={MAX_VOLUME}
          step={0.1}
          value={volume}
          onChange={handleVolumeChange}
          aria-label="Brand volume"
          aria-valuetext={`${Math.round(volume)} of ${MAX_VOLUME}, ${level.readout}`}
          tabIndex={isHidden ? -1 : undefined}
          className="volume-slider"
          style={{ "--volume-fill": `${(volume / MAX_VOLUME) * 100}%` } as React.CSSProperties}
        />

        <p className="hero-note mt-2 text-xs font-medium text-brand-warmgrey">
          {isLoud ? "Go on, turn it down. We dare you." : "Better turn that back up."}
        </p>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden bg-brand-cream flex flex-col min-h-[calc(100svh-61px)]"
    >
      <HeroLayout
        level={level}
        scale={scale}
        tone="quiet"
        action={renderAction(false)}
        controls={renderControls(false)}
      />

      {/* Same layout in loud colors, revealed by the flood so text inverts exactly at its edge */}
      <motion.div
        aria-hidden="true"
        style={fullMotion ? { clipPath } : { opacity: floodOpacity }}
        className="absolute inset-0 z-10 bg-brand-red flex flex-col pointer-events-none"
      >
        <HeroLayout
          level={level}
          scale={scale}
          tone="loud"
          action={renderAction(true)}
          controls={renderControls(true)}
        />
      </motion.div>
    </section>
  );
}
