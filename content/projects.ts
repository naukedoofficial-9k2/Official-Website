export type ProjectType = "placeholder" | "client" | "personal" | "concept";

export interface ProjectMedia {
  type: "image" | "video";
  url: string;
  poster?: string;
  alt?: string;
  aspect?: "9:16" | "1:1" | "16:9";
}

export interface Project {
  slug: string;
  title: string;
  category: "Social" | "Shoots" | "Web" | "Branding" | "Motion";
  type: ProjectType;
  overview: string;
  deliverables: string[];
  media?: ProjectMedia[];
  featured?: boolean;
  tagline?: string;
  clientIndustry?: string;
  heroColor?: "cream" | "ink" | "red";
}

export const projects: Project[] = [
  {
    slug: "heritage-jewellery-reels",
    title: "Heritage & Contemporary Jewellery",
    category: "Social",
    type: "placeholder",
    tagline: "High-contrast product lighting and organic lifestyle reels.",
    clientIndustry: "Jewellery & Accessories",
    overview:
      "A sample layout showing social-first reel production and curated feed pacing for modern jewellery brands. Combines crisp closeups with quick visual storytelling.",
    deliverables: [
      "Monthly Video Reels",
      "Studio & Lifestyle Shoots",
      "Sound Design & Editing",
      "Feed Curation & Daily Posting",
    ],
    featured: true,
    heroColor: "cream",
    media: [
      {
        type: "image",
        url: "/brand/logo-red.svg",
        alt: "Sample layout representation for Jewellery Reels",
        aspect: "9:16",
      },
    ],
  },
  {
    slug: "cold-brew-beverage-launch",
    title: "Craft Beverage & Cold Brew",
    category: "Shoots",
    type: "placeholder",
    tagline: "Energetic handheld camera motion, vibrant color, and social ads.",
    clientIndustry: "Food & Beverage",
    overview:
      "A sample layout for a beverage product launch. Features fresh pours, stop-motion unboxings, and high-energy short-form video made for modern feeds.",
    deliverables: [
      "Product Video Shoots",
      "Creator-Style Video Ads",
      "Motion Graphics & Can Reveals",
      "Social Ad Variations",
    ],
    featured: true,
    heroColor: "red",
    media: [
      {
        type: "image",
        url: "/brand/logo-white.svg",
        alt: "Sample layout representation for Beverage Launch",
        aspect: "9:16",
      },
    ],
  },
  {
    slug: "creator-brand-identity",
    title: "Lifestyle Creator Brand System",
    category: "Branding",
    type: "placeholder",
    tagline: "Bold typography, custom stickers, and social packaging.",
    clientIndustry: "Creators & Media",
    overview:
      "A sample layout for a modern creator identity. Includes an oversized wordmark, flexible marks for merchandise, video packaging, and an animated intro bumper.",
    deliverables: [
      "Custom Wordmark & Monogram",
      "Color Palette & Type System",
      "Social Sticker Kits",
      "Animated Video Bumpers",
    ],
    featured: true,
    heroColor: "ink",
    media: [
      {
        type: "image",
        url: "/brand/logo-white.svg",
        alt: "Sample layout representation for Creator Brand",
        aspect: "1:1",
      },
    ],
  },
  {
    slug: "streetwear-digital-flagship",
    title: "Streetwear Flagship Website",
    category: "Web",
    type: "placeholder",
    tagline: "Fast browsing, oversized typography, and mobile-first drops.",
    clientIndustry: "Fashion & Apparel",
    overview:
      "A sample layout for a fast, good-looking fashion storefront. Built for quick product drops with instant mobile navigation and a bold lookbook experience.",
    deliverables: [
      "Mobile-First Storefront Design",
      "Fast Responsive Pages",
      "Subtle Micro-Interactions",
      "Drop Announcement & Lookbook",
    ],
    featured: true,
    heroColor: "cream",
    media: [
      {
        type: "image",
        url: "/brand/logo-red.svg",
        alt: "Sample layout representation for Streetwear Website",
        aspect: "16:9",
      },
    ],
  },
  {
    slug: "kinetic-motion-campaign",
    title: "Kinetic Social Video Series",
    category: "Motion",
    type: "placeholder",
    tagline: "Rhythmic beat-matching, kinetic typography, and product motion.",
    clientIndustry: "Technology & Consumer",
    overview:
      "A sample layout for high-energy social motion. Uses snappy text transitions, 3D product motion, and custom sound design to grab attention instantly.",
    deliverables: [
      "Kinetic Typography Reels",
      "3D Product Mockups & Motion",
      "Sound Design & Audio Sync",
      "Multi-Ratio Video Formats",
    ],
    featured: false,
    heroColor: "ink",
    media: [
      {
        type: "image",
        url: "/brand/logo-white.svg",
        alt: "Sample layout representation for Kinetic Motion Campaign",
        aspect: "9:16",
      },
    ],
  },
  {
    slug: "skincare-ugc-performance-lab",
    title: "Clean Skincare Content Lab",
    category: "Shoots",
    type: "placeholder",
    tagline: "Real texture shots, routine walkthroughs, and social video ads.",
    clientIndustry: "Beauty & Skincare",
    overview:
      "A sample layout for clean skincare visual content. Built with real routines, rich texture closeups, and varied hooks tailored for social campaigns.",
    deliverables: [
      "Routine Shoots & Texture Closeups",
      "Varied Hook & Message Edits",
      "Clean Visual Text Styling",
      "Performance Creative Sets",
    ],
    featured: false,
    heroColor: "cream",
    media: [
      {
        type: "image",
        url: "/brand/logo-red.svg",
        alt: "Sample layout representation for Skincare UGC",
        aspect: "9:16",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
