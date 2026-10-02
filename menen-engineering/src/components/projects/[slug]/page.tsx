import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import BlueprintPlaceholder from '@/components/projects/BlueprintPlaceholder';
import { ArrowLeft, MapPin, Award } from 'lucide-react';

export default async function ProjectSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
  });

  if (!project) notFound();

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-8">
      <Link href="/projects" className="inline-flex items-center gap-2 text-xs font-mono text-[var(--theme-accent)] hover:underline">
        <ArrowLeft className="w-4 h-4" /> Back to Project Catalog
      </Link>

      <div className="border-b border-[var(--theme-border)] pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)]">{project.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-primary)] mt-1">{project.title}</h1>
        <p className="text-sm text-[var(--theme-text-muted)] mt-1">Client: {project.client}</p>
      </div>

      <div className="rounded-2xl border border-[var(--theme-border)] overflow-hidden bg-[var(--theme-surface)]">
        {project.featuredImage ? (
          <img src={project.featuredImage} alt={project.title} className="w-full h-auto object-cover max-h-[500px]" />
        ) : (
          <div className="h-80">
            <BlueprintPlaceholder title={project.title} category={project.category} />
          </div>
        )}
      </div>

      <div className="p-6 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-4">
        <h3 className="text-sm font-mono uppercase tracking-wider text-[var(--theme-accent)] font-bold">Scope of Work</h3>
        <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">{project.scopeOfWork}</p>
        <p className="text-xs text-[var(--theme-text-muted)] font-mono">Location: {project.location}</p>
      </div>
    </div>
  );
}