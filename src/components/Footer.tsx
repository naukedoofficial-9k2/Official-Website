import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Instagram, Mail } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/content/site";

export default function Footer() {
  const whatsappHref = getWhatsAppUrl("Hi Nau K Do! I would love to talk about our brand and content.");

  return (
    <footer className="w-full bg-brand-ink text-brand-cream py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-brand-border-dark">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        
        {/* Top Row: Logo, Tagline & Direct WhatsApp Action */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-12 border-b border-white/10">
          <div className="space-y-4 max-w-lg">
            <Link href="/" className="inline-block group focus:outline-none" aria-label="Nau K Do Home">
              <div className="relative h-11 w-[128px] transition-transform duration-200 group-hover:scale-[1.03]">
                <Image
                  src="/brand/logo-white.svg"
                  alt="Nau K Do"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {siteConfig.tagline}
            </p>
            <p className="text-sm text-brand-cream/70 leading-relaxed max-w-md">
              Social-first creative agency. Content, shoots, reels, brand identity, and fast websites for ambitious brands in India and Western markets.
            </p>
          </div>

          <div>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white font-black text-sm px-7 py-3.5 rounded-full shadow-sticker transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Chat on WhatsApp (+91 98293 96397)</span>
            </a>
          </div>
        </div>

        {/* Middle Row: Navigation Links & Connect (Removed duplicate Process column!) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-4">
              Explore
            </span>
            <ul className="space-y-2.5 text-brand-cream/80">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-4">
              Services
            </span>
            <ul className="space-y-2.5 text-brand-cream/80">
              <li>
                <Link href="/services#social-media" className="hover:text-white transition-colors">
                  Social Media &amp; Posting
                </Link>
              </li>
              <li>
                <Link href="/services#shoots" className="hover:text-white transition-colors">
                  Content Creation &amp; Shoots
                </Link>
              </li>
              <li>
                <Link href="/services#websites" className="hover:text-white transition-colors">
                  Website Design &amp; Dev
                </Link>
              </li>
              <li>
                <Link href="/services#branding" className="hover:text-white transition-colors">
                  Logo &amp; Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services#motion" className="hover:text-white transition-colors">
                  Video Editing &amp; Motion
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-4">
              Connect
            </span>
            <div className="space-y-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-brand-cream/80 hover:text-white transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-brand-red" />
                <span>WhatsApp: +91 98293 96397</span>
              </a>

              {/* Render email and instagram ONLY when configured in content/site.ts */}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 text-brand-cream/80 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-red" />
                  <span>{siteConfig.email}</span>
                </a>
              )}

              {siteConfig.instagram && (
                <a
                  href={`https://instagram.com/${siteConfig.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-brand-cream/80 hover:text-white transition-colors"
                >
                  <Instagram className="w-4 h-4 text-brand-red" />
                  <span>@{siteConfig.instagram}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-cream/60">
          <p>© {new Date().getFullYear()} Nau K Do. All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cream/80 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red animate-pulse" />
              {siteConfig.tagline}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
