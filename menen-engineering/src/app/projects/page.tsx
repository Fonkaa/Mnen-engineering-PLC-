'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Award, 
  MapPin, 
  Video, 
  Volume2, 
  ArrowRight, 
  Search, 
  X, 
  Layers, 
  Building2,
  Compass
} from 'lucide-react';

interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  associatedFirms?: string | null;
  location: string;
  category: string;
  status: string;
  scopeOfWork: string;
  awards?: string | null;
  featuredImage?: string | null;
  featuredVideo?: string | null;
  audioNarrative?: string | null;
}

// Built-in Blueprint CAD Fallback Component
function BlueprintPlaceholder({ title, category }: { title: string; category?: string }) {
  return (
    <div className="w-full h-full min-h-[220px] bg-[var(--theme-surface)] relative overflow-hidden flex flex-col items-center justify-center p-6 border-b border-[var(--theme-border)] select-none">
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--theme-accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--theme-accent) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      <div className="absolute top-2 left-2 text-[9px] font-mono text-[var(--theme-text-muted)]">
        + 09°01'48"N / 38°44'24"E
      </div>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-[var(--theme-accent)]">
        [{category || 'CAD'}]
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[var(--theme-text-muted)]">
        SCALE 1:100 / ELEVATION
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[var(--theme-text-muted)]">
        MENEN CAE PLC
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full border border-[var(--theme-accent)]/50 bg-[var(--theme-card)] flex items-center justify-center mb-3 text-[var(--theme-accent)] shadow-inner">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <p className="text-xs uppercase font-mono tracking-widest text-[var(--theme-text-primary)] font-bold">
          {title}
        </p>
        <span className="text-[10px] text-[var(--theme-text-muted)] mt-1 font-mono">
          Architectural Schematic • Media In Review
        </span>
      </div>
    </div>
  );
}

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedLocation, setSelectedLocation] = useState('ALL');
  const [onlyVideo, setOnlyVideo] = useState(false);
  const [onlyAudio, setOnlyAudio] = useState(false);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch('/api/projects');
        if (res.ok) {
          const data = await res.json();
          setProjects(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        console.error('Failed to load projects', err);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  const uniqueLocations = useMemo(() => {
    if (!projects.length) return ['ALL'];
    const locs = Array.from(new Set(projects.map((p) => (p.location ? p.location.trim() : '')))).filter(Boolean);
    return ['ALL', ...locs.sort()];
  }, [projects]);

  // Robust, fail-safe filtering
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];

    return projects.filter((project) => {
      // 1. Text Search query
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
        const pCat = (project.category || '').toUpperCase().trim();
        if (pCat !== selectedCategory.toUpperCase().trim()) return false;
      }

      // 3. Status
      if (selectedStatus !== 'ALL') {
        const pStatus = (project.status || '').toUpperCase().trim();
        if (pStatus !== selectedStatus.toUpperCase().trim()) return false;
      }

      // 4. Location
      if (selectedLocation !== 'ALL') {
        const pLoc = (project.location || '').trim();
        if (pLoc.toLowerCase() !== selectedLocation.toLowerCase().trim()) return false;
      }

      // 5. Video / Audio toggles
      if (onlyVideo && !project.featuredVideo) return false;
      if (onlyAudio && !project.audioNarrative) return false;

      return true;
    });
  }, [projects, searchQuery, selectedCategory, selectedStatus, selectedLocation, onlyVideo, onlyAudio]);

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
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Header Banner */}
      <div className="border-b border-[var(--theme-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold flex items-center gap-1.5">
          <Layers className="w-4 h-4" /> MENEN Engineering Masterworks
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-primary)] tracking-tight mt-2">
          Projects & Engineering Portfolio
        </h1>
        <p className="mt-3 text-sm text-[var(--theme-text-secondary)] max-w-3xl leading-relaxed">
          Filter and explore our complete catalog of mixed-use towers, luxury apartments, landmark hotels, real estate masterplans, and national border security infrastructure.
        </p>
      </div>

      {/* Filter Control Console */}
      <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 shadow-sm space-y-6">
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
              Showing: <strong className="text-[var(--theme-accent)]">{filteredProjects.length}</strong> / {projects.length} Works
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

        {/* Typology Pills */}
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

        {/* Secondary Filters */}
        <div className="pt-4 border-t border-[var(--theme-border)] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
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

      {/* Projects Grid */}
      {loading ? (
        <div className="text-center py-20 text-xs font-mono text-[var(--theme-text-muted)] animate-pulse">
          Loading MENEN Engineering Masterworks...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((p) => (
              <div
                key={p.id}
                className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:border-[var(--theme-accent)] transition duration-300 flex flex-col justify-between group shadow-sm"
              >
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

                  <div className="absolute bottom-3 left-3 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider text-white border border-white/15">
                    {p.status ? p.status.replace(/_/g, ' ') : ''}
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
            <div className="col-span-3 text-center py-24 bg-[var(--theme-card)] border border-dashed border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-muted)] space-y-3">
              <Building2 className="w-12 h-12 text-[var(--theme-accent)]/50 mx-auto stroke-1" />
              <p className="text-sm font-semibold text-[var(--theme-text-primary)]">
                No matching projects found
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
      )}
    </div>
  );
}