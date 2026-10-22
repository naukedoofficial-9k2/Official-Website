"use client";

import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface MarqueeProps {
  items?: string[];
  className?: string;
  baseVelocity?: number;
}

const defaultItems = [
  "Social Media Management",
  "Content Creation & Shoots",
  "Website Design & Dev",
  "Logo & Brand Identity",
  "Video Editing",
  "Motion Graphics",
  "Loud, on purpose.",
];

export default function Marquee({
  items = defaultItems,
  className = "bg-brand-ink text-brand-cream py-5 border-y border-brand-border-dark",
  baseVelocity = -1.2,
}: MarqueeProps) {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isHoveredRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 3], {
    clamp: false,
  });

  useAnimationFrame((t, delta) => {
    if (shouldReduceMotion || isHoveredRef.current) return;

    let moveBy = baseVelocity * (delta / 16);
    if (velocityFactor.get() !== 0) {
      moveBy += velocityFactor.get() * baseVelocity * (delta / 16);
    }

    baseX.set(baseX.get() + moveBy);
    // Wrap around at -50%
    if (baseX.get() <= -50) {
      baseX.set(0);
    } else if (baseX.get() > 0) {
      baseX.set(-50);
    }
  });

  const xTransform = useTransform(baseX, (v) => `${v}%`);

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => (isHoveredRef.current = true)}
      onMouseLeave={() => (isHoveredRef.current = false)}
      className={`overflow-hidden select-none relative ${className}`}
    >
      <motion.div
        style={shouldReduceMotion ? undefined : { x: xTransform }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-base sm:text-xl font-black uppercase tracking-wider">
              {item}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
