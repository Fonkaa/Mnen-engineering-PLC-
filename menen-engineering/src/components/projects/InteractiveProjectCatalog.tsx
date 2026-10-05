'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BlueprintPlaceholder from '@/components/projects/BlueprintPlaceholder';
import { 
  Search, 
  Award, 
  MapPin, 
  X, 
  Video, 
  Volume2, 
  RotateCcw,
  SlidersHorizontal,
  Layers
} from 'lucide-react';

const TYPOLOGY_OPTIONS = [
  { key: 'ALL', label: 'All Typologies' },
  { key: 'MXD', label: 'Mixed Use (MXD)' },
  { key: 'APT', label: 'Apartments (APT)' },
  { key: 'HSP', label: 'Hospitality (HSP)' },
  { key: 'RLS', label: 'Real Estate (RLS)' },
  { key: 'STR', label: 'Infrastructure & Border (STR)' },
  { key: 'INT', label: 'Interior Design (INT)' },
  { key: 'LND', label: 'Landscape (LND)' },
];

interface InteractiveProjectCatalogProps {
  initialProjects: any[];
}

export default function InteractiveProjectCatalog({ initialProjects }: InteractiveProjectCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('ALL');
  const [status, setStatus] = useState('ALL');
  const [location, setLocation] = useState('ALL');
  const [hasVideo, setHasVideo] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);

  // Extract unique cities/regions dynamically from database projects
  const availableLocations = useMemo(() => {
    const locSet = new Set<string>();
    initialProjects.forEach((p) => {
      if (p.location && p.location.trim()) {
        locSet.add(p.location.trim());
      }
    });
    return Array.from(locSet).sort();
  }, [initialProjects]);

  // Combined Multi-Criteria Filter Logic
  const filteredProjects = useMemo(() => {
    return initialProjects.filter((p) => {
      // 1. Typology Classification Filter
      const matchesCategory = category === 'ALL' || p.category === category;

      // 2. Project Status Filter
      const matchesStatus = status === 'ALL' || p.status === status;

      // 3. Location / Region Filter
      const matchesLocation = location === 'ALL' || p.location === location;

      // 4. VR / Video Walkthrough Toggle
      const matchesVideo = !hasVideo || Boolean(p.featuredVideo);

      // 5. Audio Narrative / Brief Toggle
      const matchesAudio = !hasAudio || Boolean(p.audioNarrative);

      // 6. Text Search Filter (Title, Client, Scope, Awards, Location)
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title?.toLowerCase().includes(q) ||
        p.client?.toLowerCase().includes(q) ||
        p.location?.toLowerCase().includes(q) ||
        p.scopeOfWork?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.awards?.toLowerCase().includes(q);

      return (
        matchesCategory &&
        matchesStatus &&
        matchesLocation &&
        matchesVideo &&
        matchesAudio &&
        matchesSearch
      );
    });
  }, [initialProjects, category, status, location, hasVideo, hasAudio, searchQuery]);

  const hasActiveFilters =
    category !== 'ALL' ||
    status !== 'ALL' ||
    location !== 'ALL' ||
    hasVideo ||
    hasAudio ||
    Boolean(searchQuery.trim());

  function handleResetFilters() {
    setSearchQuery('');
    setCategory('ALL');
    setStatus('ALL');
    setLocation('ALL');
    setHasVideo(false);
    setHasAudio(false);
  }

  return (
    <div className="space-y-8">
      {/* FILTER & CONTROL PANEL */}
      <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-5 sm:p-7 space-y-6 shadow-sm">
        
        {/* Top Row: Search Input + Showing Count */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="relative flex-1">
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

          <div className="flex items-center justify-between md:justify-end gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] font-mono text-xs text-[var(--theme-text-secondary)]">
              Showing: <strong className="text-[var(--theme-accent)]">{filteredProjects.length}</strong> / {initialProjects.length} Works
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleResetFilters}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-rose-500/10 text-rose-400 border border-rose-500/30 hover:bg-rose-500/20 transition cursor-pointer"
                title="Reset all search filters"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Typology Classification Filter Buttons */}
        <div className="space-y-2 pt-2 border-t border-[var(--theme-border)]">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] font-semibold flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
              Typology Classification
            </span>
            <span className="text-[10px] font-mono text-[var(--theme-accent)] font-bold">
              {TYPOLOGY_OPTIONS.find((t) => t.key === category)?.label}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {TYPOLOGY_OPTIONS.map((typology) => {
              const isSelected = category === typology.key;
              return (
                <button
                  key={typology.key}
                  type="button"
                  onClick={() => setCategory(typology.key)}
                  className={`text-xs font-mono px-3.5 py-2 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--theme-accent)] text-black border-[var(--theme-accent)] font-bold shadow-md'
                      : 'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-[var(--theme-accent)] hover:text-[var(--theme-text-primary)]'
                  }`}
                >
                  {typology.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filter Dropdowns: Project Status & Location */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--theme-border)]">
          {/* Project Status Dropdown */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
              Project Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNDER_CONSTRUCTION">Under Construction</option>
              <option value="DESIGN_PERMIT_PROCESS">Design Permit Process</option>
              <option value="COMPLETED">Completed</option>
              <option value="DESIGN_PHASE">Design Phase</option>
              <option value="LAND_ACQUISITION_PROCESS">Land Acquisition</option>
              <option value="BOQ_AND_TENDER">BoQ &amp; Tender</option>
              <option value="PROPOSAL">Proposal</option>
            </select>
          </div>

          {/* Project City / Region Dropdown */}
          <div>
            <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] mb-1.5">
              Project City / Region
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl px-3.5 py-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono cursor-pointer"
            >
              <option value="ALL">All Regions / National</option>
              {availableLocations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Multimedia Toggle Chips Row */}
        <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-[var(--theme-border)]">
          <span className="text-[11px] font-mono uppercase text-[var(--theme-text-muted)] flex items-center gap-1.5 mr-1">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Media Filter:
          </span>

          {/* With VR / Video Toggle */}
          <button
            type="button"
            onClick={() => setHasVideo(!hasVideo)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer border ${
              hasVideo
                ? 'bg-amber-500/20 text-amber-400 border-amber-500/50 font-bold shadow-sm'
                : 'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-amber-400/50'
            }`}
          >
            <Video className="w-3.5 h-3.5 text-amber-400" />
            <span>With VR / Video</span>
          </button>

          {/* With Audio Brief Toggle */}
          <button
            type="button"
            onClick={() => setHasAudio(!hasAudio)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono transition cursor-pointer border ${
              hasAudio
                ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50 font-bold shadow-sm'
                : 'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border-[var(--theme-border)] hover:border-cyan-400/50'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>With Audio Brief</span>
          </button>
        </div>
      </div>

      {/* PROJECTS GRID */}
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
                {/* Visual Thumbnail */}
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

                  <div className="absolute top-3 right-3 bg-[var(--theme-surface)]/90 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono text-[var(--theme-accent)] border border-[var(--theme-border)] font-bold">
                    {p.category}
                  </div>

                  {p.status && (
                    <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-md px-2.5 py-0.5 rounded text-[10px] font-mono text-zinc-300 border border-white/10 uppercase">
                      {p.status.replace(/_/g, ' ')}
                    </div>
                  )}
                </div>

                {/* Content Details */}
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

                    {/* Media Indicator Pills */}
                    {(p.featuredVideo || p.audioNarrative) && (
                      <div className="flex items-center gap-3 mt-3 text-[11px] font-mono">
                        {p.featuredVideo && (
                          <span className="flex items-center gap-1 text-amber-400">
                            <Video className="w-3.5 h-3.5" /> Video
                          </span>
                        )}
                        {p.audioNarrative && (
                          <span className="flex items-center gap-1 text-cyan-400">
                            <Volume2 className="w-3.5 h-3.5" /> Audio
                          </span>
                        )}
                      </div>
                    )}
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
            <p className="font-mono text-sm">No engineering projects found matching your active filter criteria.</p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="text-xs font-mono text-[var(--theme-accent)] hover:underline cursor-pointer"
            >
              Clear filters and view all works
            </button>
          </div>
        )}
      </div>
    </div>
  );
}