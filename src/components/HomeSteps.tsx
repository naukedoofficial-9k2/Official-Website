import React from "react";
import RevealText from "@/components/motion/RevealText";

const steps = [
  {
    title: "Say hi.",
    description: "Tell us about your brand on WhatsApp. A short text or voice note is all it takes.",
    theme: "bg-white text-brand-ink border border-brand-border",
    muted: "text-brand-warmgrey",
  },
  {
    title: "We make it.",
    description: "Ideas, shoots, edits and websites, all planned and made under one roof.",
    theme: "bg-brand-ink text-white",
    muted: "text-brand-cream/75",
  },
  {
    title: "You get loud.",
    description: "We post, see what people stop for, and keep tuning it.",
    theme: "bg-brand-red text-white",
    muted: "text-white/85",
  },
];

// Plain sticky cards: the stack works with no JavaScript at all
export default function HomeSteps() {
  return (
    <section className="bg-brand-cream px-4 min-[361px]:px-5 sm:px-6 lg:px-8 pt-16 sm:pt-28 pb-16 sm:pb-28">
      <div className="max-w-7xl mx-auto">
        <RevealText
          text="Three steps. Zero fuss."
          as="h2"
          className="section-fluid-heading sm:text-6xl font-black text-brand-ink mb-8 sm:mb-14"
        />

        <div className="flex flex-col gap-5 sm:gap-6">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              style={{ "--stack-top": `${76 + idx * 16}px` } as React.CSSProperties}
              className={`stack-card rounded-[20px] p-6 sm:p-10 lg:p-14 min-h-[44svh] sm:min-h-[58svh] flex flex-col justify-between gap-6 sm:gap-10 shadow-card-hover ${step.theme}`}
            >
              <span className={`text-lg sm:text-2xl font-black ${step.muted}`}>0{idx + 1}</span>

              <div>
                <h3 className="step-title font-black">{step.title}</h3>
                <p className={`mt-3 sm:mt-5 text-base sm:text-xl lg:text-2xl font-medium leading-relaxed max-w-2xl ${step.muted}`}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
