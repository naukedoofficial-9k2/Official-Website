import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { getProjects } from "@/sanity/projects";
import { getPageMetadata } from "@/lib/metadata";
import BriefBuilder from "@/components/BriefBuilder";
import ProjectMediaCanvas from "@/components/ProjectMediaCanvas";
import ProjectGallery from "@/components/ProjectGallery";
import FadeUp from "@/components/motion/FadeUp";
import KineticText from "@/components/motion/KineticText";
import type { Project } from "@/content/projects";

const builderNeedByCategory: Record<Project["category"], string> = {
  Social: "Reels & social",
  Shoots: "Shoots",
  Web: "Website",
  Branding: "Branding",
  Motion: "Motion",
};

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();

  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return getPageMetadata({
    path: `/work/${project.slug}`,
    title: project.title,
    description: project.overview,
    image: project.media[0]?.url,
  });
}

interface ProjectLinkRowProps {
  href: string;
  label: string;
  title: string;
  isLarge?: boolean;
}

function ProjectLinkRow({ href, label, title, isLarge = false }: ProjectLinkRowProps) {
  return (
    <Link href={href} className="group relative block overflow-hidden border-t border-white/15 focus:outline-none">
      <span className="absolute inset-0 bg-brand-red origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:scale-y-100 group-focus-visible:scale-y-100" />
      <div className="relative max-w-7xl mx-auto px-4 min-[361px]:px-5 sm:px-6 lg:px-8 py-6 sm:py-8 flex items-center justify-between gap-4">
        <div className="min-w-0">
          <span className="block text-sm font-bold text-brand-cream/70 md:group-hover:text-white/85 group-focus-visible:text-white/85">
            {label}
          </span>
          <span className={`block font-black text-white ${isLarge ? "project-title mt-1" : "text-xl sm:text-3xl tracking-tight mt-0.5"}`}>
            {title}
          </span>
        </div>
        <ArrowUpRight className={`flex-shrink-0 text-white transition-transform duration-300 md:group-hover:translate-x-1 md:group-hover:-translate-y-1 ${isLarge ? "w-8 h-8 sm:w-12 sm:h-12" : "w-6 h-6"}`} />
      </div>
    </Link>
  );
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];
  const hasOtherProjects = projects.length > 1;
  const showClient = project.client && !project.anonymous;

  return (
    <article className="w-full flex-1">

      {/* 1. Ink Header with Giant Title */}
      <header className="bg-brand-ink text-white pt-6 sm:pt-10 pb-24 sm:pb-40 px-4 min-[361px]:px-5 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <Link
            href="/work"
            className="h-11 inline-flex items-center gap-2 text-sm font-bold text-brand-cream/75 hover:text-white transition-colors group tap-bounce active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>All projects</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2 mt-4 sm:mt-6 mb-5 sm:mb-7">
            <span className="text-sm font-bold px-3.5 py-1 rounded-full bg-brand-red text-white whitespace-nowrap">
              {project.category}
            </span>
            {project.type === "placeholder" && (
              <span className="text-sm font-bold px-3.5 py-1 rounded-full bg-white/10 text-white whitespace-nowrap">
                Sample layout
              </span>
            )}
          </div>

          <KineticText text={project.title} className="project-title font-black text-white" />

          {project.tagline && (
            <FadeUp delay={0.4}>
              <p className="mt-5 sm:mt-7 text-xl sm:text-3xl font-medium text-brand-cream/80 leading-snug max-w-3xl">
                {project.tagline}
              </p>
            </FadeUp>
          )}
        </div>
      </header>

      {/* 2. Media Overlaps the Header (Aspect ratio reserved to avoid layout shift) */}
      <div className="relative z-10 -mt-14 sm:-mt-24 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <FadeUp yOffset={64} duration={0.7}>
          <ProjectMediaCanvas
            media={project.media}
            title={project.title}
            category={project.category}
            youtubeId={project.youtubeId}
          />
        </FadeUp>
      </div>

      {/* 3. Story and Project Facts */}
      <section className="px-4 min-[361px]:px-5 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-12 sm:pb-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div className="lg:col-span-8 space-y-6 sm:space-y-8">
            <p className="text-2xl sm:text-4xl font-bold text-brand-ink leading-snug tracking-tight">
              {project.overview}
            </p>

            {project.body && (
              <div>
                <h2 className="text-base sm:text-lg font-black text-brand-red mb-2">The approach</h2>
                <p className="text-base sm:text-lg text-brand-warmgrey leading-relaxed">{project.body}</p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-4 bg-white rounded-[20px] border border-brand-border p-6 shadow-card space-y-5">
            {showClient && (
              <div>
                <h2 className="text-sm font-bold text-brand-warmgrey">Client</h2>
                <p className="text-lg font-black text-brand-ink">{project.client}</p>
              </div>
            )}
            {project.clientIndustry && (
              <div>
                <h2 className="text-sm font-bold text-brand-warmgrey">Industry</h2>
                <p className="text-lg font-black text-brand-ink">{project.clientIndustry}</p>
              </div>
            )}
            <div>
              <h2 className="text-sm font-bold text-brand-warmgrey mb-2">What was delivered</h2>
              <ul className="space-y-2.5">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm text-brand-ink">
                    <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                    <span className="font-semibold leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Extra images. The first media item is already shown above unless a video replaces it */}
        <div className="mt-10 sm:mt-16">
          <ProjectGallery
            media={project.youtubeId ? project.media : project.media.slice(1)}
            title={project.title}
          />
        </div>
      </section>

      {/* 4. Previous / Next as Full-Width Rows */}
      {hasOtherProjects && (
        <nav aria-label="More projects" className="bg-brand-ink">
          <ProjectLinkRow href={`/work/${nextProject.slug}`} label="Next project" title={nextProject.title} isLarge />
          <ProjectLinkRow href={`/work/${prevProject.slug}`} label="Previous project" title={prevProject.title} />
        </nav>
      )}

      {/* 5. Brief Builder, Already Set to This Project's Service */}
      <BriefBuilder preselect={builderNeedByCategory[project.category]} />

    </article>
  );
}
