'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import Project3DRotator from '@/components/projects/Project3DRotator';
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
  RotateCcw
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
  galleryImages?: string[];
  featuredVideo?: string | null;
  audioNarrative?: string | null;
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

  // Normalized location extraction including regional cities (Jimma, Sekota, etc.)
  const uniqueLocations = useMemo(() => {
    const locSet = new Set<string>();
    ['Addis Ababa', 'Jimma', 'Sekota', 'Hawassa', 'Bahir Dar', 'Adama', 'Dire Dawa'].forEach((l) => locSet.add(l));

    projects.forEach((p) => {
      if (p.location && typeof p.location === 'string' && p.location.trim()) {
        const raw = p.location.trim();
        locSet.add(raw);
        if (raw.includes(',')) {
          locSet.add(raw.split(',')[0].trim());
        }
      }
    });

    return ['ALL', ...Array.from(locSet).sort()];
  }, [projects]);

  // Robust, fail-safe substring & 3D matching
  const filteredProjects = useMemo(() => {
    if (!projects.length) return [];

    return projects.filter((project) => {
      const q = searchQuery.toLowerCase().trim();

      // 1. Text Search query
      const matchesSearch =
        !q ||
        (project.title && project.title.toLowerCase().includes(q)) ||
        (project.client && project.client.toLowerCase().includes(q)) ||
        (project.location && project.location.toLowerCase().includes(q)) ||
        (project.scopeOfWork && project.scopeOfWork.toLowerCase().includes(q)) ||
        (project.category && project.category.toLowerCase().includes(q)) ||
        (project.awards && project.awards.toLowerCase().includes(q));

      // 2. Category Typology
      const matchesCategory =
        selectedCategory === 'ALL' ||
        (project.category && project.category.toUpperCase().trim() === selectedCategory.toUpperCase().trim());

      // 3. Status
      const matchesStatus =
        selectedStatus === 'ALL' ||
        (project.status && project.status.toUpperCase().trim() === selectedStatus.toUpperCase().trim());

      // 4. Substring Location Match
      const pLoc = (project.location || '').toLowerCase().trim();
      const sLoc = selectedLocation.toLowerCase().trim();
      const matchesLocation =
        selectedLocation === 'ALL' ||
        pLoc === sLoc ||
        pLoc.includes(sLoc) ||
        sLoc.includes(pLoc);

      // 5. Video / Audio toggles
      const matchesVideo = !onlyVideo || Boolean(project.featuredVideo);
      const matchesAudio = !onlyAudio || Boolean(project.audioNarrative);

      return (
        matchesSearch &&
        matchesCategory &&
        matchesStatus &&
        matchesLocation &&
        matchesVideo &&
        matchesAudio
      );
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
          Projects &amp; Engineering Portfolio
        </h1>
        <p className="mt-3 text-sm text-[var(--theme-text-secondary)] max-w-3xl leading-relaxed">
          Filter and explore our complete catalog of mixed-use towers, luxury apartments, landmark hotels, real estate masterplans, and national border security infrastructure featuring interactive 3D rotational views.
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
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] cursor-pointer"
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
                type="button"
                onClick={resetFilters}
                className="text-xs font-mono text-rose-400 hover:text-rose-300 underline flex items-center gap-1 transition cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Typology Pills */}
        <div>
          <label className="block text-[11px] font-mono uppercase tracking-wider text-[var(--theme-text-muted)] mb-2 flex items-center gap-1.5 font-semibold">
            <Layers className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> Typology Classification
          </label>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition duration-200 cursor-pointer ${
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
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono cursor-pointer"
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
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono cursor-pointer"
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
              type="button"
              onClick={() => setOnlyVideo(!onlyVideo)}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-mono transition cursor-pointer ${
                onlyVideo
                  ? 'bg-amber-500/20 border-amber-500 text-amber-400 font-semibold shadow-sm'
                  : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent)]'
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>With VR / Video</span>
            </button>
          </div>

          <div className="pt-4 sm:pt-0">
            <button
              type="button"
              onClick={() => setOnlyAudio(!onlyAudio)}
              className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg border text-xs font-mono transition cursor-pointer ${
                onlyAudio
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-400 font-semibold shadow-sm'
                  : 'bg-[var(--theme-surface)] border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:border-[var(--theme-accent)]'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>With Audio Brief</span>
            </button>
          </div>
        </div>
      </div>

      {/* Projects Grid with 3D Rotator Face */}
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
                {/* 3D Rotational Visual Face */}
                <div className="relative aspect-[16/10] bg-[var(--theme-surface)] overflow-hidden">
                  <Project3DRotator
                    title={p.title}
                    category={p.category}
                    featuredImage={p.featuredImage}
                    galleryImages={p.galleryImages}
                  />

                  <div className="absolute top-3 right-3 z-30 flex items-center gap-1.5 pointer-events-none">
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

                  {p.status && (
                    <div className="absolute bottom-3 left-3 z-30 bg-black/85 backdrop-blur-md px-2.5 py-1 rounded text-[9px] font-mono uppercase tracking-wider text-white border border-white/15 pointer-events-none">
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
                type="button"
                onClick={resetFilters}
                className="mt-2 px-4 py-2 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] text-xs font-mono text-[var(--theme-accent)] hover:border-[var(--theme-accent)] transition cursor-pointer"
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