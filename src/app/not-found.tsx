import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center py-24 sm:py-32 px-4 text-center max-w-xl mx-auto">
      <div className="relative h-10 w-28 mb-6">
        <Image
          src="/brand/logo-red.svg"
          alt="Nau K Do"
          fill
          className="object-contain"
        />
      </div>

      <span className="font-mono text-xs uppercase tracking-widest text-brand-red font-bold px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 mb-4">
        404 / Lost in the feed
      </span>

      <h1 className="text-4xl sm:text-6xl font-black text-brand-ink tracking-tight mb-4">
        Page Not Found
      </h1>

      <p className="text-sm sm:text-base text-brand-warmgrey max-w-md mx-auto mb-8 leading-relaxed">
        This link might have moved or the reel dropped elsewhere. Let&apos;s get you back on track.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-red text-white hover:bg-brand-red-hover font-bold text-sm shadow-sticker transition-transform hover:scale-105 active:scale-95"
        >
          <Home className="w-4 h-4" />
          <span>Return Home</span>
        </Link>

        <Link
          href="/work"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-brand-surface text-brand-ink border border-brand-border text-sm font-semibold transition-transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Explore Work</span>
        </Link>
      </div>
    </div>
  );
}
