export interface SiteConfig {
  name: string;
  tagline: string;
  shortTagline: string;
  description: string;
  whatsapp: string; // "919829396397"
  whatsappMessage: string;
  email: string | null; // Set to string (e.g., "hello@naukdo.com") to display email buttons; null hides them
  instagram: string | null; // Set to handle (e.g., "naukdo") to display Instagram links; null hides them
  url: string; // Set to production domain before launch (e.g., "https://naukdo.com")
  location: string;
  nameStory?: string | null; // Optional: real story behind the name; hidden when null or empty
}

export const siteConfig: SiteConfig = {
  name: "Nau K Do",
  tagline: "Loud, on purpose.",
  shortTagline: "Loud, on purpose.",
  description:
    "A social-first creative agency: social media management, content creation and shoots, website design and development, logo and brand identity, video editing, motion graphics.",
  whatsapp: "919829396397",
  whatsappMessage: "Hi Nau K Do! I would love to talk about our brand and content.",
  email: null,
  instagram: null,
  url: "https://naukdo.com",
  location: "India & Western Markets",
  nameStory: null,
};

export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(customMessage || siteConfig.whatsappMessage);
  return `https://wa.me/${siteConfig.whatsapp}?text=${msg}`;
}
