'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import BlueprintPlaceholder from './BlueprintPlaceholder';
import { 
  Award, 
  MapPin, 
  Video, 
  Volume2, 
  ArrowRight, 
  Search, 
  X, 
  Layers, 
  Building2 
} from 'lucide-react';

const CATEGORIES = [
  { label: 'All Typologies', value: 'ALL' },
  { label: 'Mixed Use (MXD)', value: 'MXD' },
  { label: 'Apartments (APT)', value: 'APT' },
  { label: 'Hospitality (HSP)', value: 'HSP' },
  { label: 'Real Estate (RLS)', value: 'RLS' },
  { label: 'Infrastructure & Border (STR)', value: 'STR' },
  { label: 'Interior Design (INT)', value: 'INT' },
  { label: 'Landscape (LND)', value: 'LND' },
];

const STATUSES = [
  { label: 'All Statuses', value: 'ALL' },
  { label: 'Under Construction', value: 'UNDER_CONSTRUCTION' },
  { label: 'Design Permit Process', value: 'DESIGN_PERMIT_PROCESS' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'Design Phase', value: 'DESIGN_PHASE' },
  { label: 'Land Acquisition', value: 'LAND_ACQUISITION_PROCESS' },
  { label: 'BoQ & Tender', value: 'BOQ_AND_TENDER' },
  { label: 'Proposal', value: 'PROPOSAL' },
];

export default function ProjectsClientView({ initialProjects = [] }: { initialProjects: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [onlyVideo, setOnlyVideo] = useState(false);
  const [onlyAudio, setOnlyAudio] = useState(false);

  // Extract unique locations safely
  const uniqueLocations = useMemo(() => {
    if (!initialProjects || !initialProjects.length) return ['ALL'];
    const locs = Array.from(
      new Set(
        initialProjects
          .map((p) => (p && p.location ? String(p.location).trim() : ''))
          .filter(Boolean)
      )
    );
    return ['ALL', ...locs.sort()];
  }, [initialProjects]);

  // Robust, fail-safe filtering
  const filteredProjects = useMemo(() => {
    if (!initialProjects || !initialProjects.length) return [];

    return initialProjects.filter((project) => {
      if (!project) return false;

      // 1. Text Search (title, client, location, scope)
      const q = searchQuery.toLowerCase().trim();
      if (q) {
        const title = (project.title || '').toLowerCase();
        const client = (project.client || '').toLowerCase();
        const location = (project.location || '').toLowerCase();
        const scope = (project.scopeOfWork || '').toLowerCase();
        const awards = (project.awards || '').toLowerCase();

        const matches =
          title.includes(q) ||
          client.includes(q) ||
          location.includes(q) ||
          scope.includes(q) ||
          awards.includes(q);

        if (!matches) return false;
      }

      // 2. Category Typology
      if (selectedCategory !== 'ALL') {
        const cat = (project.category || '').toUpperCase().trim();
        if (cat !== selectedCategory.toUpperCase().trim()) {
          return false;
        }
      }

      // 3. Status
      if (selectedStatus !== 'ALL') {
        const st = (project.status || '').toUpperCase().trim();
        if (st !== selectedStatus.toUpperCase().trim()) {
          return false;
        }
      }

      // 4. Location
      if (selectedLocation !== 'ALL') {
        const loc = (project.location || '').trim();
        if (loc.toLowerCase() !== selectedLocation.toLowerCase().trim()) {
          return false;
        }
      }

      // 5. Multimedia Toggles
      if (onlyVideo && !project.featuredVideo) return false;
      if (onlyAudio && !project.audioNarrative) return false;

      return true;
    });
  }, [
    initialProjects,
    searchQuery,
    selectedCategory,
    selectedStatus,
    selectedLocation,
    onlyVideo,
    onlyAudio,
  ]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('ALL');
    setSelectedStatus('ALL');
    setSelectedLocation('ALL');
    setOnlyVideo(false);
    setOnlyAudio(false);
  };

  const isFiltered =
    searchQuery !== '' ||
    selectedCategory !== 'ALL' ||
    selectedStatus !== 'ALL' ||
    selectedLocation !== 'ALL' ||
    onlyVideo ||
    onlyAudio;

  return (
    <div className="space-y-8">
      {/* FILTER CONTROL CONSOLE */}
      <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 shadow-sm space-y-6">
        
        {/* Top Search Bar & Counter */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[var(--theme-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project name, client (e.g. KK PLC, KANMAX), city, or scope..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl pl-10 pr-10 py-2.5 text-xs text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)] transition shadow-inner font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                title="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs font-mono text-[var(--theme-text-muted)] px-3 py-2 bg-[var(--theme-surface)] rounded-xl border border-[var(--theme-border)]">
              Showing: <strong className="text-[var(--theme-accent)]">{filteredProjects.length}</strong> / {initialProjects.length} Works
            </span>

            {isFiltered && (
              <button
                onClick={resetFilters}
                className="text-xs font-mono text-rose-400 hover:text-rose-300 underline flex items-center gap-1 transition"
              >
                <X className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Typology Filter Pills (Primary Filter) */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Typology Classification
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition duration-200 ${
                  selectedCategory === cat.value
                    ? 'bg-[var(--theme-accent)] text-black font-bold shadow-md'
                    : 'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Secondary Filter Row: Status, Location, and Multimedia Switches */}
        <div className="pt-4 border-t border-[var(--theme-border)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
          {/* Status Dropdown */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
              Project Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
            >
              {STATUSES.map((st) => (
                <option key={st.value} value={st.value}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location Dropdown */}
          <div>
            <label className="block text-[10px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
              Project City / Region
            </label>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
            >
              <option value="ALL">All Regions / National</option>
              {uniqueLocations
                .filter((l) => l !== 'ALL')
                .map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
            </select>
          </div>

          {/* Video Toggle */}
          <div className="pt-4 sm:pt-0">
            <button
              onClick={() => setOnlyVideo(!onlyVideo)}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-mono transition ${
                onlyVideo
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-semibold'
                  : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent)]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>With VR / Video</span>
            </button>
          </div>

          {/* Audio Toggle */}
          <div className="pt-4 sm:pt-0">
            <button
              onClick={() => setOnlyAudio(!onlyAudio)}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-mono transition ${
                onlyAudio
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 font-semibold'
                  : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent)]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>With Audio Brief</span>
            </button>
          </div>
        </div>

      </div>

      {/* FILTERED PROJECTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((p) => (
            <div
              key={p.id}
              className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:border-[var(--theme-accent)] transition duration-300 flex flex-col justify-between group shadow-sm"
            >
              {/* Media Preview Box */}
              <div className="relative aspect-[16/10] bg-[var(--theme-surface)] overflow-hidden">
                {p.featuredImage && !p.featuredImage.includes('/images/projects/placeholders/') ? (
                  <img
                    src={p.featuredImage}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                ) : (
                  <BlueprintPlaceholder title={p.title} category={p.category} />
                )}

                {/* Multimedia Badges */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {p.featuredVideo && (
                    <span
                      className="p-1 rounded bg-black/75 backdrop-blur-md text-amber-400 border border-white/10"
                      title="Includes Video Walkthrough"
                    >
                      <Video className="w-3.5 h-3.5" />
                    </span>
                  )}
                  {p.audioNarrative && (
                    <span
                      className="p-1 rounded bg-black/75 backdrop-blur-md text-cyan-400 border border-white/10"
                      title="Includes Audio Narrative"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded bg-[var(--theme-surface)]/90 backdrop-blur-md text-[10px] font-mono text-[var(--theme-accent)] border border-[var(--theme-border)] font-bold">
                    {p.category}
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-white border border-white/15">
                  {p.status ? p.status.replace(/_/g, ' ') : ''}
                </div>
              </div>

              {/* Information Section */}
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
          <div className="col-span-3 text-center py-24 bg-[var(--theme-card)] border border-dashed border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-muted)] space-y-3">
            <Building2 className="w-12 h-12 text-[var(--theme-accent)]/50 mx-auto stroke-1" />
            <p className="text-sm font-semibold text-[var(--theme-text-primary)]">
              No matching architectural or structural projects found
            </p>
            <button
              onClick={resetFilters}
              className="mt-2 px-4 py-2 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] text-xs font-mono text-[var(--theme-accent)] hover:border-[var(--theme-accent)] transition"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}