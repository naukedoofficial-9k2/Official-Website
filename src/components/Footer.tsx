import React from "react";
import Link from "next/link";
import { MessageCircle, Instagram, Mail } from "lucide-react";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import FooterLogo from "@/components/FooterLogo";

export default function Footer() {
  const whatsappHref = getWhatsAppUrl("Hi Nau K Do! I would love to talk about our brand and content.");

  return (
    <footer className="w-full bg-brand-ink text-brand-cream pt-12 sm:pt-20 pb-[calc(env(safe-area-inset-bottom,0px)+1.5rem)] sm:pb-10 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 border-t border-brand-border-dark">
      <div className="max-w-7xl mx-auto flex flex-col gap-10 sm:gap-14">
        
        {/* Top Brand Identity Block */}
        <div className="space-y-4 max-w-xl pb-8 sm:pb-12 border-b border-white/10">
          <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {siteConfig.tagline}
          </p>
          <p className="text-sm text-brand-cream/70 leading-relaxed max-w-lg">
            Social-first creative agency. Content, shoots, reels, brand identity, and fast websites for ambitious brands in India and Western markets.
          </p>
        </div>

        {/* Stacked single column on mobile, 3-column grid on desktop */}
        <div className="flex flex-col md:grid md:grid-cols-3 gap-8 sm:gap-10 text-sm">
          {/* Explore Links */}
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-3 sm:mb-4">
              Explore
            </span>
            <ul className="space-y-1 text-brand-cream/80">
              <li>
                <Link href="/" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/work" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Work
                </Link>
              </li>
              <li>
                <Link href="/services" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-3 sm:mb-4">
              Services
            </span>
            <ul className="space-y-1 text-brand-cream/80">
              <li>
                <Link href="/services#social-media" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Social Media &amp; Posting
                </Link>
              </li>
              <li>
                <Link href="/services#shoots" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Content Creation &amp; Shoots
                </Link>
              </li>
              <li>
                <Link href="/services#websites" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Website Design &amp; Dev
                </Link>
              </li>
              <li>
                <Link href="/services#branding" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Logo &amp; Brand Identity
                </Link>
              </li>
              <li>
                <Link href="/services#motion" className="min-h-[44px] flex items-center hover:text-white transition-colors">
                  Video Editing &amp; Motion
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <span className="text-xs uppercase tracking-widest text-brand-red font-black block mb-3 sm:mb-4">
              Connect
            </span>
            <div className="space-y-1">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] flex items-center gap-2.5 text-brand-cream/90 hover:text-white transition-colors tap-bounce active:scale-95"
              >
                <MessageCircle className="w-4 h-4 text-brand-red flex-shrink-0" />
                <span className="font-semibold">WhatsApp: {siteConfig.whatsappDisplay}</span>
              </a>

              {/* Instagram link in footer only */}
              {siteConfig.instagram && (
                <a
                  href={siteConfig.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] flex items-center gap-2.5 text-brand-cream/90 hover:text-white transition-colors tap-bounce active:scale-95"
                >
                  <Instagram className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="font-semibold">Instagram: @naukedo</span>
                </a>
              )}

              {/* Email only if configured */}
              {siteConfig.email && (
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="min-h-[44px] flex items-center gap-2.5 text-brand-cream/90 hover:text-white transition-colors tap-bounce active:scale-95"
                >
                  <Mail className="w-4 h-4 text-brand-red flex-shrink-0" />
                  <span className="font-semibold">{siteConfig.email}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Row: Copyright */}
        <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-brand-cream/60">
          <p>© {new Date().getFullYear()} Nau K Do. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-cream/80 font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-red" />
              {siteConfig.tagline}
            </span>
          </div>
        </div>

        <FooterLogo />

      </div>
    </footer>
  );
}
