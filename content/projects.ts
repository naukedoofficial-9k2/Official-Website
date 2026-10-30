export type ProjectType = "placeholder" | "client" | "personal" | "concept";

export interface ProjectMedia {
  type: "image" | "video";
  url: string;
  poster?: string;
  alt?: string;
  aspect?: "9:16" | "1:1" | "16:9" | "4:3";
}

export interface Project {
  slug: string;
  title: string;
  category: "Social" | "Shoots" | "Web" | "Branding" | "Motion";
  type: ProjectType;
  overview: string;
  deliverables: string[];
  media: ProjectMedia[];
  client?: string;
  anonymous?: boolean; // When true, client name is kept hidden
  instagramUrl?: string; // Optional direct Instagram reel/post link
  youtubeId?: string; // Plays at the top of the project page
  body?: string; // Longer case-study text
  featured?: boolean; // Controls appearance on Home page Bento grid
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
    client: "Heritage Gems & Co.",
    anonymous: false,
    overview:
      "A sample layout showing social-first reel production and curated feed pacing for modern jewellery brands. Combines crisp closeups with quick visual storytelling.",
    body: "From moodboards to shoot days, we developed high-contrast studio macro lighting to capture metallic reflections and fine gemstone cuts, edited alongside handheld creator pacing for Instagram and TikTok.",
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
        url: "/projects/candle_lifestyle_study.webp",
        alt: "Sample layout representation for Jewellery Reels",
        aspect: "16:9",
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
    client: "Kold Craft Brews",
    anonymous: false,
    overview:
      "A sample layout for a beverage product launch. Features fresh pours, stop-motion unboxings, and high-energy short-form video made for modern feeds.",
    body: "Created handheld video variations focusing on the tactile sounds of cracking cold cans, pouring over ice, and vibrant color palettes designed to break through feed clutter.",
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
        url: "/projects/cake_shop_showcase.webp",
        alt: "Sample layout representation for Beverage Launch",
        aspect: "16:9",
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
    client: "Studio Nomad",
    anonymous: false,
    overview:
      "A sample layout for a modern creator identity. Includes an oversized wordmark, flexible marks for merchandise, video packaging, and an animated intro bumper.",
    body: "A complete visual identity system engineered for high readability on small mobile screens, sticker lockups for packaging, and kinetic intro/outro bumpers for YouTube and Reels.",
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
        url: "/projects/branding_stationery_set.webp",
        alt: "Sample layout representation for Creator Brand",
        aspect: "16:9",
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
    client: "Elysium Collective",
    anonymous: false,
    overview:
      "A sample layout for a fast, good-looking fashion storefront. Built for quick product drops with instant mobile navigation and a bold lookbook experience.",
    body: "Designed with oversized typography, seamless product lookbooks, and sub-second page transitions, ensuring social traffic converts smoothly without lag or friction.",
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
        url: "/projects/elysium_architecture.webp",
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
    client: "Kinetics Lab",
    anonymous: false,
    overview:
      "A sample layout for high-energy social motion. Uses snappy text transitions, 3D product motion, and custom sound design to grab attention instantly.",
    body: "A series of high-energy motion cuts synced strictly to percussive beats, with kinetic text animations and 3D product turns that retain viewer engagement past the first 3 seconds.",
    deliverables: [
      "Kinetic Typography Reels",
      "3D Product Mockups & Motion",
      "Sound Design & Audio Sync",
      "Multi-Ratio Video Formats",
    ],
    featured: true,
    heroColor: "ink",
    media: [
      {
        type: "image",
        url: "/projects/motion_reel.webp",
        alt: "Sample layout representation for Kinetic Motion Campaign",
        aspect: "16:9",
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
    client: "Lumora Botanicals",
    anonymous: false,
    overview:
      "A sample layout for clean skincare visual content. Built with real routines, rich texture closeups, and varied hooks tailored for social campaigns.",
    body: "Focused on real skin textures, macro droplet closeups, and natural bathroom morning light routines. Engineered across 4 unique hook variations to test performance in paid and organic channels.",
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
        url: "/projects/lumora_beauty_salon.webp",
        alt: "Sample layout representation for Skincare UGC",
        aspect: "16:9",
      },
    ],
  },
];
