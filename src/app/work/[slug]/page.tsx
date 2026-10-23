import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, MessageCircle, CheckCircle2 } from "lucide-react";
import { projects, getProjectBySlug } from "@/content/projects";
import { siteConfig, getWhatsAppUrl } from "@/content/site";
import FadeUp from "@/components/motion/FadeUp";
import MagneticButton from "@/components/motion/MagneticButton";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

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
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject =
    projects[(currentIndex - 1 + projects.length) % projects.length];

  const primaryMedia = project.media?.[0];
  const isVideo = primaryMedia?.type === "video";
  const hasRealAsset = primaryMedia && primaryMedia.url.startsWith("/projects/");

  // WhatsApp message explicitly mentioning the project category
  const whatsappHref = getWhatsAppUrl(
    `Hi Nau K Do! I saw your ${project.category} work for "${project.title}" and would love to chat about a similar project.`
  );

  return (
    <article className="py-10 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
      
      {/* Back to Work Link */}
      <div className="mb-8">
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-brand-warmgrey hover:text-brand-ink transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to all projects</span>
        </Link>
      </div>

      {/* Project Header */}
      <div className="space-y-6 max-w-4xl mb-12">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-brand-red text-white shadow-sm whitespace-nowrap">
            {project.category}
          </span>
          <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white text-brand-ink border border-brand-border whitespace-nowrap">
            {project.type === "placeholder" ? "Sample layout" : project.type}
          </span>
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

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-brand-ink tracking-tight leading-[1.05]">
          {project.title}
        </h1>

        {project.tagline && (
          <p className="text-xl sm:text-2xl font-bold text-brand-red leading-snug">
            {project.tagline}
          </p>
        )}

        <p className="text-base sm:text-lg text-brand-warmgrey leading-relaxed">
          {project.overview}
        </p>

        {project.body && (
          <div className="p-6 rounded-[20px] bg-brand-cream border border-brand-border/80">
            <h3 className="text-xs font-mono font-black uppercase tracking-wider text-brand-red mb-2">
              The Approach
            </h3>
            <p className="text-sm sm:text-base text-brand-ink leading-relaxed">
              {project.body}
            </p>
          </div>
        )}
      </div>

      {/* Media Canvas with Quick Clip-Path Reveal (Animation 3) */}
      <FadeUp>
        <div className="rounded-[20px] bg-white border border-brand-border overflow-hidden shadow-card mb-12">
          <div className="relative aspect-[16/9] bg-brand-cream overflow-hidden flex items-center justify-center">
            {isVideo && primaryMedia?.url ? (
              <video
                src={primaryMedia.url}
                poster={primaryMedia.poster}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : hasRealAsset && primaryMedia?.url ? (
              <Image
                src={primaryMedia.url}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            ) : (
              /* Clean Sample Layout Canvas (No faint N watermark, clean typography) */
              <div className="w-full h-full flex flex-col items-center justify-center p-8 sm:p-14 bg-gradient-to-br from-[#FAF5EE] via-[#F4ECE1] to-[#EDE3D6] text-center relative overflow-hidden">
                <span className="text-xs font-mono font-black uppercase tracking-widest text-brand-red bg-white px-3.5 py-1 rounded-full border border-brand-border mb-3 shadow-sm">
                  {project.category} Showcase
                </span>

                <h2 className="text-2xl sm:text-4xl font-black text-brand-ink max-w-xl">
                  {project.title}
                </h2>

                <p className="text-xs sm:text-sm text-brand-warmgrey max-w-md mt-2 leading-relaxed">
                  Clean sample layout ready for real drops. Supports high-resolution photography and video reels.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                  <span className="text-[11px] font-bold bg-white px-3 py-1 rounded-full border border-brand-border text-brand-warmgrey">
                    Category: {project.category}
                  </span>
                  <span className="text-[11px] font-bold bg-white px-3 py-1 rounded-full border border-brand-border text-brand-warmgrey">
                    Scope: Sample Layout
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </FadeUp>

      {/* Deliverables Checklist & WhatsApp Action */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-16">
        <div className="md:col-span-7 bg-white rounded-[20px] p-8 border border-brand-border shadow-sm">
          <h2 className="text-2xl font-black text-brand-ink mb-6 flex items-center gap-2">
            <span>What was delivered</span>
            <span className="text-xs font-mono font-normal text-brand-warmgrey">
              ({project.deliverables.length} items)
            </span>
          </h2>
          <ul className="space-y-3.5">
            {project.deliverables.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-brand-ink">
                <CheckCircle2 className="w-5 h-5 text-brand-red flex-shrink-0 mt-0.5" />
                <span className="font-semibold leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5 bg-brand-ink text-brand-cream rounded-[20px] p-8 border border-white/10 flex flex-col justify-between">
          <div className="space-y-4">
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

          <div className="mt-8 pt-6 border-t border-white/10">
            <MagneticButton className="w-full">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-hover text-white text-sm font-black py-4 px-6 rounded-full shadow-sticker transition-transform hover:scale-105 active:scale-95 text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Chat About {project.category}</span>
              </a>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Next / Previous Project Navigation */}
      <div className="pt-10 border-t border-brand-border flex items-center justify-between gap-4">
        <Link
          href={`/work/${prevProject.slug}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-brand-warmgrey hover:text-brand-ink transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous:</span>
          <span className="line-clamp-1">{prevProject.title}</span>
        </Link>

        <Link
          href={`/work/${nextProject.slug}`}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-brand-red hover:text-brand-red-hover transition-colors text-right"
        >
          <span className="hidden sm:inline">Next Project:</span>
          <span className="line-clamp-1">{nextProject.title}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </article>
  );
}
