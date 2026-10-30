import React from "react";

interface KineticTextProps {
  text: string;
  className?: string;
  as?: "h1" | "p";
  ariaHidden?: boolean;
}

// CSS-driven so the headline shows without waiting for JavaScript
export default function KineticText({
  text,
  className = "",
  as: Component = "h1",
  ariaHidden = false,
}: KineticTextProps) {
  let letterIndex = 0;

  return (
    <Component
      className={className}
      aria-label={ariaHidden ? undefined : text}
      aria-hidden={ariaHidden || undefined}
    >
      {text.split(" ").map((word, wordIdx) => (
        <span key={wordIdx} aria-hidden="true" className="letter-mask">
          {word.split("").map((letter, idx) => (
            <span
              key={idx}
              className="letter-rise"
              style={{ "--letter-index": letterIndex++ } as React.CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
}
