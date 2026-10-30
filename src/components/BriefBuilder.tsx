"use client";

import React, { useState } from "react";
import { Check, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import RevealText from "@/components/motion/RevealText";
import MagneticButton from "@/components/motion/MagneticButton";

const needs = [
  { label: "Reels & social", phrase: "reels and social media" },
  { label: "Shoots", phrase: "a shoot" },
  { label: "Website", phrase: "a website" },
  { label: "Branding", phrase: "branding" },
  { label: "Motion", phrase: "motion graphics" },
  { label: "All of it, monthly", phrase: "a monthly creative retainer" },
];

const sizes = [
  { label: "A small test", phrase: "We want to start with a small test." },
  { label: "One big project", phrase: "It's one big project." },
  { label: "Ongoing work", phrase: "We're looking for ongoing work." },
  { label: "Not sure yet", phrase: "We're not sure about the size yet." },
];

const timings = [
  { label: "This week", phrase: "We'd like to start this week." },
  { label: "This month", phrase: "We'd like to start this month." },
  { label: "Later", phrase: "We're planning for later." },
  { label: "Just exploring", phrase: "We're just exploring for now." },
];

function joinPhrases(phrases: string[]) {
  if (phrases.length < 2) return phrases[0] ?? "";
  return `${phrases.slice(0, -1).join(", ")} and ${phrases[phrases.length - 1]}`;
}

function buildMessage(brand: string, selectedNeeds: string[], size: string, timing: string) {
  const name = brand.trim();
  const parts = [name ? `Hi Nau K Do! This is ${name}.` : "Hi Nau K Do!"];

  if (selectedNeeds.length > 0) {
    parts.push(`We need ${joinPhrases(selectedNeeds)}.`);
  } else {
    parts.push("We'd love to talk about our brand.");
  }

  if (size) parts.push(size);
  if (timing) parts.push(timing);

  return parts.join(" ");
}

interface ChoiceGroupProps {
  title: string;
  options: { label: string; phrase: string }[];
  isSelected: (phrase: string) => boolean;
  onSelect: (phrase: string) => void;
}

function ChoiceGroup({ title, options, isSelected, onSelect }: ChoiceGroupProps) {
  return (
    <div role="group" aria-label={title}>
      <h3 className="text-base sm:text-lg font-black text-brand-ink mb-3">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const selected = isSelected(option.phrase);
          return (
            <motion.button
              key={option.label}
              type="button"
              aria-pressed={selected}
              onClick={() => onSelect(option.phrase)}
              whileTap={{ scale: 0.94 }}
              transition={{ type: "spring", stiffness: 500, damping: 22 }}
              className={`min-h-[44px] inline-flex items-center gap-1.5 px-4 rounded-full text-sm font-bold border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                selected
                  ? "bg-brand-ink text-white border-brand-ink"
                  : "bg-white text-brand-ink border-brand-border hover:border-brand-ink"
              }`}
            >
              {selected && <Check className="w-4 h-4" />}
              <span>{option.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

interface BriefBuilderProps {
  preselect?: string; // Label of a need to tick on load
}

export default function BriefBuilder({ preselect }: BriefBuilderProps) {
  const [brand, setBrand] = useState("");
  const [selectedNeeds, setSelectedNeeds] = useState<string[]>(() =>
    needs.filter((need) => need.label === preselect).map((need) => need.phrase)
  );
  const [size, setSize] = useState("");
  const [timing, setTiming] = useState("");

  const message = buildMessage(brand, selectedNeeds, size, timing);

  const toggleNeed = (phrase: string) => {
    setSelectedNeeds((current) =>
      current.includes(phrase) ? current.filter((need) => need !== phrase) : [...current, phrase]
    );
  };

  return (
    <section className="bg-brand-red px-4 min-[361px]:px-5 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <RevealText text="Ready to get loud?" as="h2" className="step-title font-black text-white" />
          <p className="mt-4 text-lg sm:text-2xl text-white/90 font-medium max-w-2xl leading-relaxed">
            Tap a few things. We write the message. You hit send.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
          <div className="lg:col-span-7 bg-brand-cream rounded-[20px] p-5 sm:p-8 space-y-6 sm:space-y-7">
            <ChoiceGroup
              title="What do you need?"
              options={needs}
              isSelected={(phrase) => selectedNeeds.includes(phrase)}
              onSelect={toggleNeed}
            />
            <ChoiceGroup
              title="How big is it?"
              options={sizes}
              isSelected={(phrase) => size === phrase}
              onSelect={(phrase) => setSize(size === phrase ? "" : phrase)}
            />
            <ChoiceGroup
              title="When do you want to start?"
              options={timings}
              isSelected={(phrase) => timing === phrase}
              onSelect={(phrase) => setTiming(timing === phrase ? "" : phrase)}
            />

            <div>
              <label htmlFor="brief-brand" className="block text-base sm:text-lg font-black text-brand-ink mb-3">
                Your brand name <span className="font-medium text-brand-warmgrey">(optional)</span>
              </label>
              <input
                id="brief-brand"
                type="text"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                maxLength={60}
                autoComplete="organization"
                placeholder="Your brand"
                className="w-full h-12 px-4 rounded-full bg-white border border-brand-border text-base font-medium text-brand-ink placeholder:text-brand-warmgrey focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
              />
            </div>
          </div>

          <div className="pin-tall lg:col-span-5 bg-brand-ink rounded-[20px] p-5 sm:p-8">
            <p className="text-sm font-bold text-brand-cream/75 mb-4">Your message</p>

            <motion.div
              layout
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              aria-live="polite"
              className="bg-white text-brand-ink rounded-[20px] rounded-br-md p-4 sm:p-5 text-base sm:text-lg font-medium leading-relaxed"
            >
              {message}
            </motion.div>

            <MagneticButton className="w-full mt-5">
              <a
                href={getWhatsAppUrl(message)}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[56px] w-full inline-flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-base font-black px-6 rounded-full shadow-sticker tap-bounce active:scale-[0.98] transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-white/20" />
                <span>Send on WhatsApp</span>
              </a>
            </MagneticButton>

            <p className="mt-4 text-center text-sm text-brand-cream/75">
              Or message us on {siteConfig.whatsappDisplay}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
