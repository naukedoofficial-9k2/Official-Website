"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageCircle, Menu, X, ArrowUpRight, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import MagneticButton from "@/components/motion/MagneticButton";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  // On home at top, header blends with full-bleed red hero
  const isRedHeader = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll and handle Escape key when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setMobileMenuOpen(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [mobileMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

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
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 pt-safe ${
          isRedHeader
            ? scrolled
              ? "bg-brand-red/98 backdrop-blur-md text-white border-b border-white/20 py-2 sm:py-2.5 shadow-md"
              : "bg-brand-red text-white border-b border-white/10 py-3 sm:py-5"
            : scrolled
            ? "bg-brand-cream/98 backdrop-blur-md text-brand-ink border-b border-brand-border py-2 sm:py-2.5 shadow-md"
            : "bg-brand-cream/95 backdrop-blur-md text-brand-ink border-b border-brand-border/80 py-3 sm:py-4 shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 min-[361px]:px-5 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Brand Logo - 28 to 32px on mobile, shrinks slightly on scroll */}
          <Link
            href="/"
            className="flex items-center group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red rounded-lg"
            aria-label="Nau K Do Home"
          >
            <div
              className={`relative transition-all duration-300 group-hover:scale-[1.02] ${
                scrolled
                  ? "h-7 w-[96px] min-[360px]:h-7 min-[360px]:w-[100px] sm:h-9 sm:w-[120px]"
                  : "h-8 w-[104px] min-[360px]:h-8 min-[360px]:w-[110px] sm:h-11 sm:w-[136px]"
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

          {/* Mobile Controls: 44px tap targets, 12px spacing */}
          <div className="flex md:hidden items-center gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`h-11 min-w-[44px] px-3.5 rounded-full inline-flex items-center justify-center gap-1.5 text-xs font-black shadow-sm tap-bounce active:scale-95 transition-all ${
                isRedHeader
                  ? "bg-white text-brand-red hover:bg-brand-cream"
                  : "bg-brand-red text-white hover:bg-brand-red-hover"
              }`}
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Say hi</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`h-11 w-11 rounded-full flex items-center justify-center tap-bounce active:scale-95 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red ${
                isRedHeader
                  ? "text-white bg-white/10 hover:bg-white/20"
                  : "text-brand-ink bg-white border border-brand-border hover:bg-brand-cream"
              }`}
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Height Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={drawerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 md:hidden bg-brand-ink/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-modal="true"
            role="dialog"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
              className="absolute inset-y-0 right-0 w-full max-w-[400px] bg-brand-cream text-brand-ink shadow-2xl flex flex-col justify-between p-5 min-[360px]:p-6 pt-safe pb-safe overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-brand-border">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center"
                  aria-label="Nau K Do Home"
                >
                  <div className="relative h-8 w-28">
                    <Image
                      src="/brand/logo-red.svg"
                      alt="Nau K Do"
                      fill
                      priority
                      className="object-contain object-left"
                    />
                  </div>
                </Link>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-11 w-11 rounded-full bg-white border border-brand-border flex items-center justify-center text-brand-ink hover:text-brand-red tap-bounce active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Large Navigation Links with Stagger */}
              <nav className="my-auto py-8 flex flex-col gap-3">
                {navLinks.map((link, idx) => {
                  const active = isActive(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 + idx * 0.06, duration: 0.25 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group px-4 py-3.5 rounded-[16px] text-2xl min-[360px]:text-3xl font-black flex items-center justify-between transition-colors tap-bounce active:scale-[0.98] ${
                          active
                            ? "bg-brand-ink text-brand-cream shadow-md"
                            : "text-brand-ink hover:bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {active && (
                            <span className="w-2 h-2 rounded-full bg-brand-red animate-pulse" />
                          )}
                          <span>{link.label}</span>
                        </div>
                        <ArrowUpRight
                          className={`w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 ${
                            active ? "text-brand-cream/80" : "text-brand-warmgrey"
                          }`}
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              {/* Drawer Bottom Actions: Full-width 52px WhatsApp Button + Instagram Link */}
              <div className="pt-6 border-t border-brand-border space-y-4">
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="h-[52px] w-full flex items-center justify-center gap-2.5 bg-brand-red hover:bg-brand-red-hover text-white text-base font-black rounded-full shadow-sticker tap-bounce active:scale-[0.98] transition-transform"
                >
                  <MessageCircle className="w-5 h-5 fill-white/20" />
                  <span>Chat on WhatsApp</span>
                </a>

                {siteConfig.instagram && (
                  <div className="flex items-center justify-center pt-1">
                    <a
                      href={siteConfig.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-11 px-4 inline-flex items-center gap-2 text-xs font-bold text-brand-warmgrey hover:text-brand-ink transition-colors tap-bounce active:scale-95"
                    >
                      <Instagram className="w-4 h-4 text-brand-red" />
                      <span>Follow on Instagram</span>
                    </a>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
