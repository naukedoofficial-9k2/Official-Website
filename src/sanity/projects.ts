import { createClient } from "next-sanity";
import createImageUrlBuilder from "@sanity/image-url";
import { projects as sampleProjects, type Project } from "@/content/projects";
import { apiVersion, dataset, isSanityConfigured, projectId } from "./env";
import { getYouTubeId } from "./youtube";

export const PROJECTS_TAG = "project";

// A fallback only: the webhook refreshes pages as soon as content is published
const REVALIDATE_SECONDS = 3600;

const CARD_IMAGE_WIDTH = 1200;
const HERO_IMAGE_WIDTH = 1600;

const PROJECTS_QUERY = `*[_type == "project" && defined(slug.current)] | order(_createdAt desc) {
  "slug": slug.current,
  title,
  category,
  client,
  hideClient,
  clientIndustry,
  tagline,
  overview,
  body,
  coverImage,
  gallery,
  youtubeUrl,
  deliverables,
  featured
}`;

interface SanityImage {
  asset?: { _ref: string };
  alt?: string;
}

interface SanityProject {
  slug: string;
  title: string;
  category: Project["category"];
  client?: string;
  hideClient?: boolean;
  clientIndustry?: string;
  tagline?: string;
  overview?: string;
  body?: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  youtubeUrl?: string;
  deliverables?: string[];
  featured?: boolean;
}

const client = createClient({
  projectId: projectId || "unconfigured",
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "published",
});

const imageBuilder = createImageUrlBuilder({ projectId: projectId || "unconfigured", dataset });

function toMedia(image: SanityImage, width: number, fallbackAlt: string): Project["media"][number] {
  return {
    type: "image",
    url: imageBuilder.image(image).width(width).fit("max").auto("format").url(),
    alt: image.alt || fallbackAlt,
  };
}

function toProject(doc: SanityProject): Project {
  const gallery = (doc.gallery ?? []).filter((image) => image.asset);

  return {
    slug: doc.slug,
    title: doc.title,
    category: doc.category,
    type: "client",
    overview: doc.overview ?? "",
    deliverables: doc.deliverables ?? [],
    media: [
      ...(doc.coverImage?.asset ? [toMedia(doc.coverImage, HERO_IMAGE_WIDTH, doc.title)] : []),
      ...gallery.map((image) => toMedia(image, CARD_IMAGE_WIDTH, doc.title)),
    ],
    client: doc.client,
    anonymous: doc.hideClient,
    body: doc.body,
    featured: doc.featured,
    tagline: doc.tagline,
    clientIndustry: doc.clientIndustry,
    youtubeId: getYouTubeId(doc.youtubeUrl),
  };
}

// Samples show only until the first project is published. A failed request
// throws on purpose, so Next.js keeps serving the last good page.
export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return sampleProjects;

  const docs = await client.fetch<SanityProject[]>(
    PROJECTS_QUERY,
    {},
    { next: { revalidate: REVALIDATE_SECONDS, tags: [PROJECTS_TAG] } }
  );

  return docs.length > 0 ? docs.map(toProject) : sampleProjects;
}
