'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BlueprintPlaceholder from '@/components/projects/BlueprintPlaceholder';
import { Search, Award, MapPin, X } from 'lucide-react';

const CATEGORIES = [
  { key: 'ALL', label: 'All Typologies' },
  { key: 'MXD', label: 'Mixed Use (MXD)' },
  { key: 'APT', label: 'Apartment (APT)' },
  { key: 'HSP', label: 'Hospitality (HSP)' },
  { key: 'RLS', label: 'Real Estate (RLS)' },
  { key: 'RES', label: 'Residence (RES)' },
  { key: 'STR', label: 'Infrastructure (STR)' },
  { key: 'INT', label: 'Interior (INT)' },
  { key: 'LND', label: 'Landscape (LND)' },
];

interface InteractiveProjectCatalogProps {
  initialProjects: any[];
}

export default function InteractiveProjectCatalog({ initialProjects }: InteractiveProjectCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter projects by both search query and typology category
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      const matchesCategory = selectedCategory === 'ALL' || p.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.client?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.scopeOfWork?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.awards?.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Bar & Typology Filters */}
      <div className="p-4 sm:p-6 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] space-y-4 shadow-sm">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by title, client, city, awards, or scope..."
            className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl pl-10 pr-10 py-2.5 text-xs sm:text-sm text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)] transition font-sans"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.key;
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`text-xs font-mono px-3 py-1.5 rounded-lg border transition cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--theme-accent)] text-black border-[var(--theme-accent)] font-bold shadow-sm'
                    : 'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text-primary)]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          {(selectedCategory !== 'ALL' || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="text-xs font-mono px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-rose-500/30 transition cursor-pointer ml-auto"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Live Counter */}
        <div className="flex justify-between items-center text-[11px] font-mono text-[var(--theme-text-muted)] pt-1">
          <span>
            Showing <strong className="text-[var(--theme-accent)]">{filteredProjects.length}</strong> of{' '}
            {initialProjects.length} landmark records
          </span>
          {selectedCategory !== 'ALL' && <span>Filter: {selectedCategory}</span>}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => {
            const validImage =
              p.featuredImage &&
              !p.featuredImage.startsWith('/uploads/') &&
              !p.featuredImage.includes('/images/projects/placeholders/')
                ? p.featuredImage
                : null;

            return (
              <div
                key={p.id}
                className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:border-[var(--theme-accent)] transition flex flex-col justify-between group shadow-sm"
              >
                <div className="relative aspect-[16/10] bg-[var(--theme-surface)] overflow-hidden">
                  {validImage ? (
                    <img
                      src={validImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <BlueprintPlaceholder title={p.title} category={p.category} />
                  )}

                  <div className="absolute top-3 right-3 bg-[var(--theme-surface)]/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-[var(--theme-accent)] border border-[var(--theme-border)] font-bold">
                    {p.category}
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

                  <div className="mt-5 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--theme-text-muted)] flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> {p.location}
                    </span>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="text-[var(--theme-accent)] font-semibold hover:underline"
                    >
                      Dossier &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16 text-sm text-[var(--theme-text-muted)] border border-dashed border-[var(--theme-border)] rounded-2xl space-y-2">
            <p className="font-mono text-sm">No engineering projects found matching your search query.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('ALL');
                setSearchQuery('');
              }}
              className="text-xs font-mono text-[var(--theme-accent)] hover:underline cursor-pointer"
            >
              Clear filters and view all projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
}