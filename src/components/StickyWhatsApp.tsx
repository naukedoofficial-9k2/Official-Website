"use client";

import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { getWhatsAppUrl } from "@/content/site";

export default function StickyWhatsApp() {
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const whatsappHref = getWhatsAppUrl("Hi Nau K Do! I would love to talk about our brand and content.");

  return (
    <div className="fixed bottom-5 right-5 z-40 sm:bottom-6 sm:right-6">
      <div className="relative">
        {/* Soft pulse ring - stops on hover and disabled for reduced motion */}
        {!isHovered && !shouldReduceMotion && (
          <motion.span
            animate={{
              scale: [1, 1.45, 1],
              opacity: [0.6, 0, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-1 rounded-full bg-brand-red pointer-events-none"
          />
        )}

        <motion.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="relative flex items-center gap-2 bg-brand-red text-white py-3 px-4 sm:px-4.5 rounded-full shadow-sticker border border-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle className="w-5 h-5 fill-white/20" />
          <span className="text-xs font-black tracking-wide hidden xs:inline sm:inline">
            WhatsApp
          </span>
        </motion.a>
      </div>
    </div>
  );
}
