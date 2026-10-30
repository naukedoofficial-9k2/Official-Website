"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const bandText = "Reels. Shoots. Sites. Reels. Shoots. Sites. Reels. Shoots. Sites.";

// Moves only with the page scroll, so nothing loops while people read
export default function ScrollBand() {
  const bandRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: bandRef,
    offset: ["start end", "end start"],
  });
  const forward = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const backward = useTransform(scrollYProgress, [0, 1], ["-22%", "0%"]);

  return (
    <div
      ref={bandRef}
      aria-hidden="true"
      className="bg-brand-ink overflow-hidden py-8 sm:py-14 select-none border-y border-brand-border-dark"
    >
      <motion.p style={{ x: forward }} className="band-title font-black text-white whitespace-nowrap">
        {bandText}
      </motion.p>
      <motion.p style={{ x: backward }} className="band-title band-title-outline font-black whitespace-nowrap">
        {bandText}
      </motion.p>
    </div>
  );
}
