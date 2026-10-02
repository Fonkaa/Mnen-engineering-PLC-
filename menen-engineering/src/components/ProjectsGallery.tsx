'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Building2, MapPin, Award, Video } from 'lucide-react';

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  location: string;
  category: string;
  status: string;
  scopeOfWork: string;
  awards?: string | null;
  featuredImage?: string | null;
  featuredVideo?: string | null;
}

const CATEGORIES = [
  { label: 'All Projects', value: 'ALL' },
  { label: 'Mixed Use (MXD)', value: 'MXD' },
  { label: 'Apartments (APT)', value: 'APT' },
  { label: 'Hospitality (HSP)', value: 'HSP' },
  { label: 'Real Estate (RLS)', value: 'RLS' },
  { label: 'Interior Design (INT)', value: 'INT' },
  { label: 'Infrastructure & Institutional (STR)', value: 'STR' },
];

export default function ProjectsGallery({ initialProjects }: { initialProjects: ProjectItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  const filtered = selectedCategory === 'ALL'
    ? initialProjects
    : initialProjects.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-16 bg-slate-900 text-slate-100" id="projects">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-amber-400 text-sm font-semibold uppercase tracking-wider">Portfolio</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-1">Featured Works & Masterplans</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition ${
                  selectedCategory === cat.value
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-950 rounded-xl overflow-hidden border border-slate-800 hover:border-amber-500/60 transition flex flex-col"
            >
              {/* Media Container with Image / Placeholder / Video Tag */}
              <div className="relative aspect-[16/10] bg-slate-800/80 flex items-center justify-center overflow-hidden">
                {project.featuredImage ? (
                  <img
                    src={project.featuredImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-center text-slate-500">
                    <Building2 className="w-10 h-10 mb-2 stroke-1" />
                    <span className="text-xs uppercase font-medium tracking-widest text-slate-400">
                      Site / Blueprint Placeholder
                    </span>
                    <span className="text-[10px] text-slate-500 mt-1">Awaiting HD Media Upload</span>
                  </div>
                )}

                {project.featuredVideo && (
                  <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-[11px] font-semibold text-white flex items-center gap-1">
                    <Video className="w-3 h-3 text-amber-400" /> VR / Video
                  </div>
                )}

                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-sm border border-slate-700 px-2.5 py-1 rounded text-xs font-semibold text-amber-400">
                  {project.status.replace(/_/g, ' ')}
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  {project.awards && (
                    <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold mb-2">
                      <Award className="w-3.5 h-3.5" />
                      <span>{project.awards}</span>
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
                    {project.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-1">
                    Client: <span className="text-slate-300 font-medium">{project.client}</span>
                  </p>

                  <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-amber-500" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-xs text-slate-400 mt-3 line-clamp-2">
                    <span className="text-slate-300 font-medium">Scope:</span> {project.scopeOfWork}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-mono">Typology: {project.category}</span>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-amber-400 hover:text-amber-300 font-medium transition"
                  >
                    View Project Dossier &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}