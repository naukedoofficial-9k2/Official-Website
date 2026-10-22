export type MainCategory = "video-shoots" | "design-digital";

export type SubCategory =
  | "weddings"
  | "events"
  | "fitness"
  | "commercial"
  | "other-shoots"
  | "social-media"
  | "branding"
  | "websites"
  | "motion"
  | "other-design";

export interface ProjectMediaItem {
  url: string;
  caption?: string;
  aspectRatio?: "landscape" | "portrait" | "square";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  mainCategory: MainCategory;
  subcategory: SubCategory;
  categoryLabel: string;
  tagline: string;
  coverImage: string;
  videoPoster?: string;
  videoSrc?: string;
  shortDescription: string;
  overview: string;
  approach?: string;
  client?: string;
  projectType: "Client Project" | "Studio Concept" | "Commissioned Work";
  year: string;
  mediaGallery: ProjectMediaItem[];
  services: string[];
  featured?: boolean;
  displayOrder: number;
}
