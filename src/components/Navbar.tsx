"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getWhatsAppUrl } from "@/content/site";
import MagneticButton from "@/components/motion/MagneticButton";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  // On home at top, header blends with full-bleed red hero
  const isRedHeader = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/work") return pathname.startsWith("/work");
    return pathname === href;
  };

  const whatsappHref = getWhatsAppUrl("Hi Nau K Do! I would love to talk about our brand and content.");

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isRedHeader
          ? scrolled
            ? "bg-brand-red/98 backdrop-blur-md text-white border-b border-white/20 py-2.5 shadow-md"
            : "bg-brand-red text-white border-b border-white/10 py-5"
          : scrolled
          ? "bg-brand-cream/98 backdrop-blur-md text-brand-ink border-b border-brand-border py-2.5 shadow-md"
          : "bg-brand-cream/95 backdrop-blur-md text-brand-ink border-b border-brand-border/80 py-4 sm:py-5 shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo - Official SVG Wordmark (Shrinks smoothly on scroll) */}
        <Link
          href="/"
          className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg"
          aria-label="Nau K Do Home"
        >
          <div
            className={`relative transition-all duration-300 group-hover:scale-[1.03] ${
              scrolled
                ? "h-9 w-[112px] sm:h-9 sm:w-[120px]"
                : "h-11 w-[128px] sm:h-12 sm:w-[140px]"
            }`}
          >
            <Image
              src={isRedHeader ? "/brand/logo-white.svg" : "/brand/logo-red.svg"}
              alt="Nau K Do"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* Desktop Navigation with Animated Sliding Pill */}
        <nav
          className={`hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border transition-colors ${
            isRedHeader
              ? "bg-white/10 border-white/20 text-white"
              : "bg-white/80 border-brand-border text-brand-warmgrey"
          }`}
        >
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${
                  active
                    ? isRedHeader
                      ? "text-brand-red"
                      : "text-white"
                    : isRedHeader
                    ? "text-white/80 hover:text-white"
                    : "text-brand-warmgrey hover:text-brand-ink"
                }`}
              >
                {active && (
                  <motion.span
                    layoutId="active-nav-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className={`absolute inset-0 rounded-full -z-10 ${
                      isRedHeader ? "bg-white shadow-sm" : "bg-brand-ink shadow-sm"
                    }`}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop WhatsApp Action */}
        <div className="hidden md:flex items-center gap-3">
          <MagneticButton>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-black px-5 py-2.5 rounded-full shadow-sticker transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none ${
                isRedHeader
                  ? "bg-white text-brand-red hover:bg-brand-cream"
                  : "bg-brand-red text-white hover:bg-brand-red-hover"
              }`}
            >
              <MessageCircle className="w-4 h-4 fill-current/20" />
              <span>Chat on WhatsApp</span>
            </a>
          </MagneticButton>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm ${
              isRedHeader
                ? "bg-white text-brand-red"
                : "bg-brand-red text-white"
            }`}
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Say hi</span>
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`p-2 rounded-xl transition-colors focus:outline-none ${
              isRedHeader
                ? "text-white hover:bg-white/10"
                : "text-brand-ink hover:bg-white"
            }`}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer with Staggered Entrance */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden border-b border-brand-border bg-brand-cream text-brand-ink px-4 pt-3 pb-6 shadow-2xl overflow-hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link, idx) => {
                const active = isActive(link.href);
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-4 py-3 rounded-[20px] text-base font-bold flex items-center justify-between transition-colors ${
                        active
                          ? "bg-brand-ink text-brand-cream"
                          : "text-brand-ink hover:bg-white"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-50" />
                    </Link>
                  </motion.div>
                );
              })}
              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 flex items-center justify-center gap-2 bg-brand-red text-white py-3.5 px-4 rounded-full font-bold text-sm shadow-sticker"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
