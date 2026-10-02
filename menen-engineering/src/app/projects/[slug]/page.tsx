import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BlueprintPlaceholder from '@/components/projects/BlueprintPlaceholder';
import { Award, MapPin, Building2, ArrowLeft, Video, Volume2, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const revalidate = 60;

export default async function ProjectDossierPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let project = null;
  try {
    project = await prisma.project.findUnique({
      where: { slug },
    });
  } catch (error) {
    console.error('Error fetching project slug:', error);
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Back button */}
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Project Catalog
        </Link>
      </div>

      {/* Header section */}
      <div className="border-b border-[var(--theme-border)] pb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="px-2.5 py-1 rounded bg-[var(--theme-accent)] text-black font-bold font-mono text-xs">
            {project.category}
          </span>
          <span className="px-2.5 py-1 rounded border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] font-mono text-xs">
            STATUS: {project.status.replace(/_/g, ' ')}
          </span>
          {project.awards && (
            <span className="flex items-center gap-1.5 text-xs text-[var(--theme-accent)] font-semibold font-mono">
              <Award className="w-3.5 h-3.5" /> {project.awards}
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-primary)] tracking-tight">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-[var(--theme-text-secondary)]">
          Commissioned by <strong className="text-[var(--theme-text-primary)]">{project.client}</strong>
        </p>
      </div>

      {/* Media & Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Columns: Visual Media & Walkthroughs */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border border-[var(--theme-border)] overflow-hidden bg-[var(--theme-surface)] shadow-lg">
            {project.featuredImage ? (
              <img
                src={project.featuredImage}
                alt={project.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
            ) : (
              <div className="h-80 sm:h-96">
                <BlueprintPlaceholder title={project.title} category={project.category} />
              </div>
            )}
          </div>

          {/* Video Walkthrough Player (if URL provided) */}
          {project.featuredVideo && (
            <div className="p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text-primary)]">
                <Video className="w-4 h-4 text-[var(--theme-accent)]" />
                <span>3D Walkthrough / Video Presentation</span>
              </div>
              <p className="text-xs text-[var(--theme-text-muted)]">
                Stream interactive virtual reality or video render of the structure.
              </p>
              <div className="aspect-video w-full rounded-xl overflow-hidden bg-black/60 border border-[var(--theme-border)] flex items-center justify-center">
                <iframe
                  src={project.featuredVideo.replace("watch?v=", "embed/")}
                  title="Project Video Walkthrough"
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            </div>
          )}

          {/* Audio Commentary Player (if audio provided) */}
          {project.audioNarrative && (
            <div className="p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-3">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--theme-text-primary)]">
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span>Architectural Audio Narrative</span>
              </div>
              <p className="text-xs text-[var(--theme-text-muted)]">
                Listen to the lead structural and architectural design breakdown for this project.
              </p>
              <audio controls className="w-full mt-2">
                <source src={project.audioNarrative} />
                Your browser does not support the audio element.
              </audio>
            </div>
          )}

          {/* Description */}
          {project.description && (
            <div className="p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)]">
              <h3 className="text-sm font-mono uppercase tracking-widest text-[var(--theme-accent)] font-bold mb-3">
                Architectural Summary
              </h3>
              <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </div>
          )}
        </div>

        {/* Right 1 Column: Technical Dossier Specs */}
        <div className="space-y-6">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6 rounded-2xl space-y-6 shadow-sm">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-bold border-b border-[var(--theme-border)] pb-3">
              Technical Specifications
            </h3>

            <div>
              <span className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)]">Client / Developer</span>
              <p className="text-sm font-semibold text-[var(--theme-text-primary)] mt-0.5">{project.client}</p>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)]">Project Location</span>
              <p className="text-sm font-semibold text-[var(--theme-text-primary)] mt-0.5 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> {project.location}
              </p>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)]">Associated Firms</span>
              <p className="text-sm font-semibold text-[var(--theme-text-primary)] mt-0.5">{project.associatedFirms}</p>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)]">Typology Code</span>
              <p className="text-sm font-semibold text-[var(--theme-text-primary)] mt-0.5 font-mono">{project.category}</p>
            </div>

            <div>
              <span className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)]">Scope of Work</span>
              <p className="text-xs text-[var(--theme-text-secondary)] mt-1 leading-relaxed bg-[var(--theme-surface)] p-3 rounded-lg border border-[var(--theme-border)]">
                {project.scopeOfWork}
              </p>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[var(--theme-surface)] border border-[var(--theme-border)] text-center space-y-4">
            <ShieldCheck className="w-8 h-8 text-[var(--theme-accent)] mx-auto" />
            <h4 className="text-sm font-bold text-[var(--theme-text-primary)]">
              Consult on a Similar Project
            </h4>
            <p className="text-xs text-[var(--theme-text-muted)]">
              Engage MENEN Engineering PLC for structural analysis, preliminary sketches, or full permit approval.
            </p>
            <Link
              href="/submit-project"
              className="block w-full py-2.5 rounded-lg bg-[var(--theme-accent)] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition font-mono"
            >
              Submit Brief
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}