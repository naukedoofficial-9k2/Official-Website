"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export default function FooterLogo() {
  const shouldReduceMotion = useReducedMotion();
  const logoRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: logoRef,
    offset: ["start end", "end end"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);

  return (
    <div ref={logoRef} className="overflow-hidden">
      <motion.div
        style={shouldReduceMotion ? undefined : { y }}
        className="js-reveal relative w-full aspect-[752/266]"
      >
        <Image src="/brand/logo-white.svg" alt="Nau K Do" fill sizes="100vw" className="object-contain object-bottom" />
      </motion.div>
    </div>
  );
}
