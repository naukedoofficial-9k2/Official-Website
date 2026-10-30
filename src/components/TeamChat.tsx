"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import RevealText from "@/components/motion/RevealText";

const MESSAGE_GAP_MS = 1100;

const team = [
  {
    name: "Ayush Tiwari",
    role: "Founder",
    message: "Okay team, this brand needs to get louder.",
  },
  {
    name: "Aditi Thaphliyal",
    role: "Co-founder",
    message: "Already on it. Ideas, shoots, reels, all planned.",
    isOwn: true,
  },
  {
    name: "Bhavesh Khatri",
    role: "Technical head",
    message: "And I'll make the website fly.",
  },
];

export default function TeamChat() {
  const shouldReduceMotion = useReducedMotion();
  const chatRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(chatRef, { once: true, amount: 0.3 });
  const [sentCount, setSentCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setSentCount(team.length + 1);
      return;
    }

    const timer = setInterval(() => {
      setSentCount((count) => {
        if (count > team.length) clearInterval(timer);
        return Math.min(count + 1, team.length + 1);
      });
    }, MESSAGE_GAP_MS);

    return () => clearInterval(timer);
  }, [isInView, shouldReduceMotion]);

  return (
    <section className="bg-white px-4 min-[361px]:px-5 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        <div className="pin-tall lg:col-span-5">
          <RevealText text="The group chat." as="h2" className="service-band-title font-black text-brand-ink" />
          <p className="mt-4 text-lg sm:text-2xl text-brand-warmgrey font-medium leading-relaxed max-w-md">
            Three people. One very loud chat. This is where your brand gets made.
          </p>
        </div>

        <div ref={chatRef} className="lg:col-span-7 bg-brand-ink rounded-[20px] overflow-hidden">
          <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-white/10">
            <span className="w-10 h-10 rounded-full bg-brand-red text-white text-sm font-black flex items-center justify-center flex-shrink-0">
              NK
            </span>
            <div className="min-w-0">
              <p className="text-base font-black text-white leading-tight">Nau K Do team</p>
              <p className="text-sm text-brand-cream/70 truncate">Ayush, Aditi, Bhavesh</p>
            </div>
          </div>

          <ul className="p-4 sm:p-6 space-y-4 sm:space-y-5">
            {team.map((member, idx) => {
              const isSent = sentCount > idx;
              const isTyping = isInView && sentCount === idx;

              return (
                <li key={member.name} className={`relative flex ${member.isOwn ? "justify-end" : "justify-start"}`}>
                  {isTyping && !shouldReduceMotion && (
                    <span
                      aria-hidden="true"
                      className={`chat-typing absolute top-0 ${member.isOwn ? "right-0" : "left-0"}`}
                    >
                      <span />
                      <span />
                      <span />
                    </span>
                  )}

                  {/* Stays in the layout before it pops in, so the page never jumps */}
                  <motion.div
                    initial={shouldReduceMotion ? undefined : { opacity: 0, y: 20, scale: 0.9 }}
                    animate={isSent ? { opacity: 1, y: 0, scale: 1 } : undefined}
                    transition={{ type: "spring", stiffness: 380, damping: 24 }}
                    className={`js-reveal max-w-[92%] sm:max-w-[85%] rounded-[20px] p-4 sm:p-5 bg-white text-brand-ink ${
                      member.isOwn ? "rounded-br-md origin-bottom-right" : "rounded-bl-md origin-bottom-left"
                    }`}
                  >
                    <p className="team-name font-black">{member.name}</p>
                    <p className="text-sm font-bold text-brand-red mt-0.5">{member.role}</p>
                    <p className="mt-2 sm:mt-3 text-base sm:text-xl font-medium leading-snug">{member.message}</p>
                  </motion.div>
                </li>
              );
            })}

            <li className="flex justify-center pt-1">
              <motion.div
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 12 }}
                animate={sentCount > team.length ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.4 }}
                className="js-reveal"
              >
                <Link
                  href="/contact"
                  className="min-h-[44px] inline-flex items-center gap-2 px-5 rounded-full bg-brand-red hover:bg-brand-red-hover text-white text-sm sm:text-base font-black tap-bounce active:scale-95 transition-colors"
                >
                  <span>You&apos;re next. Say hi</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
