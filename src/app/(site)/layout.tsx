import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/motion/CustomCursor";
import PageTransition from "@/components/motion/PageTransition";
import IntroAnimation from "@/components/motion/IntroAnimation";
import { HeroProvider } from "@/context/HeroContext";
import { siteConfig } from "@/content/site";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#D70406",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/brand/mark-n-white.png",
    shortcut: "/brand/mark-n-white.png",
    apple: "/brand/mark-n-white.png",
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/brand/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth`} suppressHydrationWarning>
      <body
        className="font-sans bg-brand-cream text-brand-ink antialiased min-h-screen flex flex-col selection:bg-brand-red selection:text-white"
        suppressHydrationWarning
      >
        {/* Scroll and reveal effects start hidden, so show everything if scripts never run */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".js-reveal{opacity:1!important;transform:none!important;clip-path:none!important}",
            }}
          />
        </noscript>
        <HeroProvider>
          <IntroAnimation />
          <PageTransition />
          <CustomCursor />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </HeroProvider>
        <Analytics />
      </body>
    </html>
  );
}
