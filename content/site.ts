export interface SiteConfig {
  name: string;
  tagline: string;
  shortTagline: string;
  description: string;
  whatsapp: string; // "919929946223"
  whatsappDisplay: string; // "+91 99299 46223"
  whatsappMessage: string;
  email: string | null; // Set to string (e.g., "hello@naukdo.com") to display email buttons; null hides them
  instagram: string | null; // "https://www.instagram.com/naukedo/"
  url: string; // "https://official-website-ten-ebon.vercel.app"
  location: string;
  nameStory?: string | null; // Optional: real story behind the name; hidden when null or empty
}

export const siteConfig: SiteConfig = {
  name: "Nau K Do",
  tagline: "Loud, on purpose.",
  shortTagline: "Loud, on purpose.",
  description:
    "A social-first creative agency: social media management, content creation and shoots, website design and development, logo and brand identity, video editing, motion graphics.",
  whatsapp: "919929946223",
  whatsappDisplay: "+91 99299 46223",
  whatsappMessage: "Hi Nau K Do! I would love to talk about our brand and content.",
  email: null,
  instagram: "https://www.instagram.com/naukedo/",
  url: "https://official-website-ten-ebon.vercel.app",
  location: "India & Western Markets",
  nameStory: null,
};

export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(customMessage || siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${msg}`;
}
