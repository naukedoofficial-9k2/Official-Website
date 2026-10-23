"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";

interface MarqueeProps {
  items?: string[];
  className?: string;
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
  className = "h-14 sm:h-16 flex items-center bg-brand-ink text-brand-cream border-y border-brand-border-dark",
}: MarqueeProps) {
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [singleWidth, setSingleWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 300,
  });

  useEffect(() => {
    const updateDimensions = () => {
      setIsMobile(window.innerWidth < 768);
      if (trackRef.current) {
        // Measure one set width (one of the copies)
        const total = trackRef.current.scrollWidth;
        // We render 4 repeated copies
        setSingleWidth(total / 4);
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useAnimationFrame((t, delta) => {
    if (shouldReduceMotion) return; // Keep static under reduced motion

    // 40 px/s on desktop, 30 px/s on mobile
    const baseSpeed = isMobile ? 30 : 40; // px per second
    const speedPerMs = baseSpeed / 1000;

    // Gentle scroll velocity nudge: maximum +30% boost, never changes direction
    const rawVelocity = Math.abs(smoothVelocity.get());
    const nudge = Math.min(0.3, rawVelocity / 2000);
    const effectiveSpeed = speedPerMs * (1 + nudge);

    let nextX = baseX.get() - effectiveSpeed * delta;

    if (singleWidth > 0 && nextX <= -singleWidth) {
      nextX += singleWidth;
    }

    baseX.set(nextX);
  });

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className={`overflow-hidden select-none relative ${className}`}>
      <motion.div
        ref={trackRef}
        style={{ x: baseX }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-8">
            <span className="text-base sm:text-xl font-black uppercase tracking-wider text-white">
              {item}
            </span>
            <span className="w-2.5 h-2.5 rounded-full bg-brand-red flex-shrink-0" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
