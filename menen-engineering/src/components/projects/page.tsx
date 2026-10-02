import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BlueprintPlaceholder from '@/components/projects/BlueprintPlaceholder';
import { Award, MapPin, Video, Volume2, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default async function ProjectsPage() {
  let projects: any[] = [];

  try {
    projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
  } catch (error) {
    console.warn('Projects query error:', error);
  }

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-[var(--theme-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
          MENEN Engineering Masterworks
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-primary)] tracking-tight mt-2">
          Projects & Engineering Portfolio
        </h1>
        <p className="mt-3 text-sm text-[var(--theme-text-secondary)] max-w-3xl leading-relaxed">
          From multi-story high-rise mixed-use landmarks in Addis Ababa and lakeside towers in Bahir Dar, to national historic conservation and 37 border post prototypes for the Ethiopian Immigration and Citizenship Service.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length > 0 ? (
          projects.map((p) => (
            <div
              key={p.id}
              className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:border-[var(--theme-accent)] transition duration-300 flex flex-col justify-between group shadow-sm"
            >
              <div className="relative aspect-[16/10] bg-[var(--theme-surface)] overflow-hidden">
                {p.featuredImage ? (
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <BlueprintPlaceholder title={p.title} category={p.category} />
                )}

                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {p.featuredVideo && (
                    <span className="p-1 rounded bg-black/70 backdrop-blur-md text-amber-400 border border-white/10" title="Includes Video Walkthrough">
                      <Video className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {p.audioNarrative && (
                    <span className="p-1 rounded bg-black/70 backdrop-blur-md text-cyan-400 border border-white/10" title="Includes Audio Narrative">
                      <Volume2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-[var(--theme-surface)]/90 backdrop-blur-md text-[10px] font-mono text-[var(--theme-accent)] border border-[var(--theme-border)]">
                    {p.category}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-white border border-white/15">
                  {p.status.replace(/_/g, ' ')}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {p.awards && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[var(--theme-accent)] font-semibold mb-2 font-mono">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span className="truncate">{p.awards}</span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition">
                    {p.title}
                  </h3>

                  <p className="text-xs text-[var(--theme-text-secondary)] mt-1.5">
                    Client: <span className="font-semibold text-[var(--theme-text-primary)]">{p.client}</span>
                  </p>

                  <p className="text-xs text-[var(--theme-text-muted)] mt-2.5 line-clamp-2 leading-relaxed">
                    {p.scopeOfWork}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--theme-text-muted)] flex items-center gap-1 truncate max-w-[170px]">
                    <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0" /> {p.location}
                  </span>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-[var(--theme-accent)] font-semibold hover:underline flex items-center gap-1 shrink-0"
                  >
                    Dossier <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20 bg-[var(--theme-card)] border border-dashed border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-muted)]">
            No projects found. Seed the database with <code className="text-amber-400">npx prisma db seed</code>.
          </div>
        )}
      </div>
    </div>
  );
}