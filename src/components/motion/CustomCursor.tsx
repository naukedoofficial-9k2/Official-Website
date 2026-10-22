"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState("");
  const [isFinePointer, setIsFinePointer] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 300 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const media = window.matchMedia("(pointer: fine)");
    setIsFinePointer(media.matches);

    if (!media.matches) return;

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest("[data-cursor]");

      if (cursorTarget) {
        setIsVisible(true);
        setCursorText(cursorTarget.getAttribute("data-cursor") || "View");
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, [mouseX, mouseY]);

  if (!isFinePointer || !isVisible) return null;

  return (
    <motion.div
      style={{
        left: cursorX,
        top: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed pointer-events-none z-[9999] flex items-center justify-center w-16 h-16 rounded-full bg-brand-red text-white font-black text-xs uppercase tracking-wider shadow-sticker"
    >
      {cursorText}
    </motion.div>
  );
}
