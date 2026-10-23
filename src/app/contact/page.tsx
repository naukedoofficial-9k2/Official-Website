"use client";

import React from "react";
import { MessageCircle, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import RevealText from "@/components/motion/RevealText";
import FadeUp from "@/components/motion/FadeUp";

const nextSteps = [
  {
    step: "01",
    title: "Say hi on WhatsApp",
    description:
      "Tell us your brand name, what you want to create (reels, a studio shoot, a website, or brand identity), and your timeline. A short text or voice note is all it takes.",
  },
  {
    step: "02",
    title: "Ideas & ballpark scope",
    description:
      "We talk through initial creative angles, ballpark pricing, and next steps. If you prefer to talk face-to-face, we will share a quick video call link.",
  },
  {
    step: "03",
    title: "Kickoff",
    description:
      "Once aligned on scope and timeline, we jump straight into moodboards, shot lists, and shoot planning. Clean, direct, and zero delay.",
  },
];

export default function ContactPage() {
  const whatsappHref = getWhatsAppUrl(
    "Hi Nau K Do! I would love to talk about our brand and upcoming projects."
  );

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Bold Header Band */}
      <section className="bg-brand-ink text-brand-cream pt-14 sm:pt-20 pb-14 sm:pb-20 px-4 sm:px-5 md:px-8 border-b border-brand-border-dark">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-brand-cream/60">
              Get In Touch
            </span>
          </div>

          <RevealText
            text="Say hi on WhatsApp."
            as="h1"
            className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight"
          />

          <FadeUp delay={0.15}>
            <p className="mt-4 text-base sm:text-xl lg:text-2xl text-brand-cream/80 max-w-2xl leading-relaxed font-medium">
              We keep communication fast and direct. No 10-field contact forms that get lost in inboxes.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-12 sm:py-20 px-4 sm:px-5 md:px-8 max-w-7xl mx-auto w-full flex-1">
        
        {/* Main WhatsApp Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 22, delay: 0.1 }}
          className="rounded-[20px] bg-white border border-brand-border p-6 sm:p-10 lg:p-12 mb-14 sm:mb-20 shadow-card overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-red block">
                Primary Channel
              </span>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-ink tracking-tight">
                Start a direct conversation
              </h2>

              <p className="text-sm sm:text-base lg:text-lg text-brand-warmgrey leading-relaxed">
                Click below to launch WhatsApp with a prefilled message. Whether you have a locked brief or just a raw idea for your brand, we are here to talk.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col items-stretch gap-4 p-5 sm:p-8 rounded-[20px] bg-brand-cream border border-brand-border">
              <span className="text-xs font-mono font-bold text-brand-warmgrey">
                Direct Line
              </span>
              <div className="text-xl sm:text-2xl lg:text-3xl font-black text-brand-ink tracking-tight">
                {siteConfig.whatsappDisplay}
              </div>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-base font-black h-[52px] px-6 rounded-full shadow-sticker tap-bounce transition-transform duration-200 active:scale-95 text-center"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>
        </motion.div>

        {/* What Happens Next: 3 Simple Steps Stacked on Mobile */}
        <div className="mb-14 sm:mb-20">
          <div className="max-w-2xl mb-8 sm:mb-12">
            <span className="text-xs font-mono font-black uppercase tracking-wider text-brand-red block mb-1">
              The Flow
            </span>
            <RevealText
              text="What happens next"
              as="h2"
              className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-ink tracking-tight"
            />
          </div>

          <div className="flex flex-col md:grid md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
            {nextSteps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="bg-white rounded-[20px] p-6 sm:p-8 border border-brand-border flex flex-col justify-between shadow-sm hover:shadow-card hover:border-brand-red/30 transition-all"
              >
                <div>
                  <span className="text-xs font-mono font-black text-brand-red px-3 py-1 rounded-full bg-brand-cream border border-brand-border inline-block mb-4">
                    Step {step.step}
                  </span>

                  <h3 className="text-lg sm:text-xl font-black text-brand-ink mb-2">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm text-brand-warmgrey leading-relaxed mt-2 pt-4 border-t border-brand-border/60">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Optional Email link only if configured; Instagram strictly in footer */}
        {siteConfig.email && (
          <div className="rounded-[20px] bg-brand-cream border border-brand-border p-6 sm:p-8 mb-8">
            <h3 className="text-base sm:text-lg font-black text-brand-ink mb-3">
              Other ways to connect
            </h3>
            <div className="flex flex-wrap gap-4">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 bg-white text-brand-ink px-6 py-3 rounded-full text-sm font-bold border border-brand-border hover:border-brand-red transition-colors min-h-[44px]"
              >
                <Mail className="w-4 h-4 text-brand-red" />
                <span>{siteConfig.email}</span>
              </a>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
