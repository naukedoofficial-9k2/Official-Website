"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "@/context/IntroContext";

export default function IntroAnimation() {
  const { setIntroComplete } = useIntro();
  const shouldReduceMotion = useReducedMotion();
  const [stage, setStage] = useState<"pop" | "wipe" | "done">("pop");

  useEffect(() => {
    if (shouldReduceMotion) {
      setStage("done");
      setIntroComplete();
      return;
    }

    // Stage 1: White logo pops in with a springy scale (0 to 550ms)
    const wipeTimer = setTimeout(() => {
      setStage("wipe");
    }, 550);

    // Stage 2: Red panel wipes up and away to reveal the page (~1000ms total)
    const completeTimer = setTimeout(() => {
      setStage("done");
      setIntroComplete();
    }, 1000);

    return () => {
      clearTimeout(wipeTimer);
      clearTimeout(completeTimer);
    };
  }, [shouldReduceMotion, setIntroComplete]);

  if (shouldReduceMotion || stage === "done") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[999999] pointer-events-none overflow-hidden select-none"
      aria-hidden="true"
    >
      <motion.div
        initial={{ y: "0%" }}
        animate={stage === "wipe" ? { y: "-100%" } : { y: "0%" }}
        transition={{
          duration: 0.45,
          ease: [0.76, 0, 0.24, 1],
        }}
        className="absolute inset-0 bg-brand-red flex items-center justify-center will-change-transform"
      >
        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
          }}
          className="relative h-14 w-44 sm:h-16 sm:w-52"
        >
          <Image
            src="/brand/logo-white.svg"
            alt="Nau K Do"
            fill
            priority
            className="object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
