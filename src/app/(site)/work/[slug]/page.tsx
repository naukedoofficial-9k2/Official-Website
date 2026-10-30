import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { getProjects } from "@/sanity/projects";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import ProjectMediaCanvas from "@/components/ProjectMediaCanvas";
import ProjectGallery from "@/components/ProjectGallery";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";

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

  return {
    title: project.title,
    description: project.overview,
    openGraph: {
      title: `${project.title} | ${siteConfig.name}`,
      description: project.overview,
      images: project.media[0] ? [project.media[0].url] : undefined,
    },
  };
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

  // WhatsApp message explicitly mentioning the project category
  const whatsappHref = getWhatsAppUrl(
    `Hi Nau K Do! I saw your ${project.category} work for "${project.title}" and would love to chat about a similar project.`
  );

  return (
    <article className="py-8 sm:py-16 px-4 min-[361px]:px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
      
      {/* Back to Work Link */}
      <div className="mb-6 sm:mb-8">
        <Link
          href="/work"
          className="h-11 inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-warmgrey hover:text-brand-ink transition-colors group tap-bounce active:scale-95"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* 1. Media Full Width at the Top (Aspect ratio reserved to avoid layout shift) */}
      <ProjectMediaCanvas
        media={project.media}
        title={project.title}
        category={project.category}
        youtubeId={project.youtubeId}
      />

      {/* Extra images. The first media item is already shown above unless a video replaces it */}
      <ProjectGallery
        media={project.youtubeId ? project.media : project.media.slice(1)}
        title={project.title}
      />

      {/* 2. Title, Category, Tagline & Overview */}
      <div className="space-y-4 sm:space-y-6 max-w-4xl mb-8 sm:mb-12">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-brand-red text-white shadow-sm whitespace-nowrap">
            {project.category}
          </span>
          {project.type === "placeholder" && (
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white text-brand-ink border border-brand-border whitespace-nowrap">
              Sample layout
            </span>
          )}
          {project.client && !project.anonymous && (
            <span className="text-xs font-mono font-bold text-brand-ink px-3 py-1 rounded-full bg-brand-cream border border-brand-border">
              Client: {project.client}
            </span>
          )}
          {project.clientIndustry && (
            <span className="text-xs text-brand-warmgrey font-bold">
              • {project.clientIndustry}
            </span>
          )}
        </div>

        <h1 className="section-fluid-heading sm:text-6xl lg:text-7xl font-black text-brand-ink tracking-tight">
          {project.title}
        </h1>

        {project.tagline && (
          <p className="text-lg sm:text-2xl font-bold text-brand-red leading-snug">
            {project.tagline}
          </p>
        )}

        <p className="text-base sm:text-lg text-brand-warmgrey leading-relaxed">
          {project.overview}
        </p>

        {project.body && (
          <div className="p-5 sm:p-6 rounded-[16px] sm:rounded-[20px] bg-brand-cream border border-brand-border/80">
            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-brand-red mb-2">
              The Approach
            </h3>
            <p className="text-sm sm:text-base text-brand-ink leading-relaxed">
              {project.body}
            </p>
          </div>
        )}
      </div>

      {/* 3. Deliverables as a Clean List & WhatsApp Action */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 mb-12 sm:mb-16">
        <div className="md:col-span-7 bg-white rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 border border-brand-border shadow-sm">
          <h2 className="text-xl sm:text-2xl font-black text-brand-ink mb-4 sm:mb-6 flex items-center gap-2">
            <span>What was delivered</span>
            <span className="text-xs font-mono font-normal text-brand-warmgrey">
              ({project.deliverables.length} items)
            </span>
          </h2>
          <ul className="space-y-3 sm:space-y-3.5">
            {project.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-brand-ink">
                <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <span className="font-semibold leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 bg-brand-ink text-brand-cream rounded-[16px] sm:rounded-[20px] p-6 sm:p-8 border border-white/10 flex flex-col justify-between">
          <div className="space-y-3 sm:space-y-4">
            <span className="text-xs font-mono font-black uppercase tracking-widest text-brand-red block">
              Start A Project
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              Want this for your brand?
            </h3>
            <p className="text-xs sm:text-sm text-brand-cream/80 leading-relaxed">
              We handle the shoots, the editing, and the digital build. Say hi on WhatsApp to discuss ideas and timelines.
            </p>
          </div>

          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
            <MagneticButton className="w-full">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="h-[52px] w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-black px-6 rounded-full shadow-sticker tap-bounce active:scale-[0.98] transition-all text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Chat About {project.category}</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* 4. Previous / Next as Two Large Tappable Cards Stacked on Mobile */}
      <div className="pt-6 sm:pt-8 border-t border-brand-border flex flex-col sm:flex-row gap-3 sm:gap-4">
        <Link
          href={`/work/${prevProject.slug}`}
          className="flex-1 p-4 min-[360px]:p-5 rounded-[16px] sm:rounded-[20px] bg-white border border-brand-border flex items-center justify-between tap-bounce active:scale-[0.98] group shadow-sm"
        >
          <div className="flex items-center gap-3">
            <ArrowLeft className="w-5 h-5 text-brand-red group-hover:-translate-x-1 transition-transform" />
            <div>
              <span className="text-xs font-mono font-bold text-brand-warmgrey block">Previous</span>
              <span className="text-sm font-black text-brand-ink line-clamp-1">{prevProject.title}</span>
            </div>
          </div>
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="flex-1 p-4 min-[360px]:p-5 rounded-[16px] sm:rounded-[20px] bg-brand-red text-white flex items-center justify-between tap-bounce active:scale-[0.98] group shadow-sm"
        >
          <div>
            <span className="text-xs font-mono font-bold text-white/80 block">Next Project</span>
            <span className="text-sm font-black text-white line-clamp-1">{nextProject.title}</span>
          </div>
          <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </article>
  );
}
