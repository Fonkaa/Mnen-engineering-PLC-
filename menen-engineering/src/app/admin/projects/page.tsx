'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageUploader from '@/components/ImageUploader';
import { 
  Building2, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  EyeOff, 
  MapPin, 
  Layers, 
  CheckCircle2, 
  Loader2, 
  Save, 
  X,
  FileCode 
} from 'lucide-react';

interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  location: string;
  year?: string | null;
  status: string;
  client?: string | null;
  featured: boolean;
  image?: string | null;
  description?: string | null;
  structuralTypology?: string | null;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'High-Rise Commercial',
    location: 'Addis Ababa, Ethiopia',
    year: '2026',
    status: 'COMPLETED',
    client: '',
    featured: false,
    image: '',
    description: '',
    structuralTypology: 'Dual RC Core & Post-Tensioned Slabs',
  });

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/projects');
      if (res.ok) {
        const data = await res.json();
        setProjects(data);
      }
    } catch (err) {
      console.error('Failed to load projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setSaving(true);
    try {
      const url = editingProject ? `/api/admin/projects/${editingProject.id}` : '/api/admin/projects';
      const method = editingProject ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          title: '',
          category: 'High-Rise Commercial',
          location: 'Addis Ababa, Ethiopia',
          year: '2026',
          status: 'COMPLETED',
          client: '',
          featured: false,
          image: '',
          description: '',
          structuralTypology: 'Dual RC Core & Post-Tensioned Slabs',
        });
        setEditingProject(null);
        await fetchProjects();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save project');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving project');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      location: project.location,
      year: project.year || '',
      status: project.status,
      client: project.client || '',
      featured: project.featured,
      image: project.image || '',
      description: project.description || '',
      structuralTypology: project.structuralTypology || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this engineering dossier?')) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--theme-border)] pb-6">
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--theme-accent)] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-primary)]">
            Project Dossiers & Portfolio
          </h1>
          <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] font-mono mt-1">
            Publish completed structures, ongoing construction supervisions, and computational models.
          </p>
        </div>
        <div className="text-xs font-mono text-[var(--theme-text-muted)] bg-[var(--theme-surface)] px-3 py-1.5 rounded-lg border border-[var(--theme-border)]">
          Total Dossiers: {projects.length}
        </div>
      </div>

      {/* Main Grid: Form + List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Project Form */}
        <div className="lg:col-span-1 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-[var(--theme-text-primary)] flex items-center gap-2">
              {editingProject ? <Edit3 className="w-4 h-4 text-[var(--theme-accent)]" /> : <Plus className="w-4 h-4 text-[var(--theme-accent)]" />}
              {editingProject ? 'Edit Engineering Dossier' : 'New Project Record'}
            </h2>
            {editingProject && (
              <button
                type="button"
                onClick={() => {
                  setEditingProject(null);
                  setFormData({
                    title: '',
                    category: 'High-Rise Commercial',
                    location: 'Addis Ababa, Ethiopia',
                    year: '2026',
                    status: 'COMPLETED',
                    client: '',
                    featured: false,
                    image: '',
                    description: '',
                    structuralTypology: 'Dual RC Core & Post-Tensioned Slabs',
                  });
                }}
                className="text-xs font-mono text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Project Image / Schematic Upload */}
            <ImageUploader
              label="Site Photograph or Blueprint (Phone/PC)"
              aspectRatio="video"
              value={formData.image}
              onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
            />

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Zemen Bank Headquarters"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl focus:outline-none focus:border-[var(--theme-accent)] text-[var(--theme-text-primary)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                  Typology / Sector
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none"
                >
                  <option value="High-Rise Commercial">High-Rise Commercial</option>
                  <option value="Mixed-Use Infrastructure">Mixed-Use Infrastructure</option>
                  <option value="Historic Heritage Conservation">Historic Conservation</option>
                  <option value="Institutional & Public">Institutional & Public</option>
                  <option value="Industrial Logistics">Industrial Logistics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none"
                >
                  <option value="COMPLETED">Completed</option>
                  <option value="UNDER_CONSTRUCTION">Under Construction</option>
                  <option value="DESIGN_PHASE">Design & Modeling</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Addis Ababa"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                  Year
                </label>
                <input
                  type="text"
                  placeholder="e.g. 2026"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                Structural System & Modeling
              </label>
              <input
                type="text"
                placeholder="e.g. Dual RC Core with Diaphragm Wall Shoring"
                value={formData.structuralTypology}
                onChange={(e) => setFormData({ ...formData, structuralTypology: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl text-[var(--theme-text-primary)] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                Engineering Summary
              </label>
              <textarea
                rows={3}
                placeholder="Detailed scope covering seismic action modeling, EBCS-8 compliance, basement level excavations, and material quantities."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl focus:outline-none focus:border-[var(--theme-accent)] text-[var(--theme-text-primary)] resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[var(--theme-text-primary)]">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="rounded border-[var(--theme-border)] text-[var(--theme-accent)] focus:ring-0"
                />
                Feature on Homepage
              </label>

              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[var(--theme-accent)] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {editingProject ? 'Update Dossier' : 'Save Dossier'}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
            Verified Engineering Portfolio ({projects.length})
          </h2>

          {loading ? (
            <div className="py-20 flex justify-center text-[var(--theme-accent)]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="p-8 text-center bg-[var(--theme-card)] border border-dashed border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-muted)] text-sm font-mono">
              No project records published yet. Create one with the form on the left.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-5 flex flex-col sm:flex-row gap-5 hover:border-[var(--theme-accent)]/50 transition"
                >
                  {/* Photo or Fallback Box */}
                  <div className="relative w-full sm:w-48 h-36 rounded-xl overflow-hidden bg-[var(--theme-surface)] border border-[var(--theme-border)] shrink-0">
                    {proj.image ? (
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, 200px"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-3 text-center text-[var(--theme-text-muted)]">
                        <Building2 className="w-8 h-8 mb-1 stroke-1" />
                        <span className="text-[10px] font-mono">Schematic Pending</span>
                      </div>
                    )}
                  </div>

                  {/* Information Details */}
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] font-semibold border border-[var(--theme-accent)]/30">
                          {proj.category}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-muted)] border border-[var(--theme-border)]">
                          {proj.status}
                        </span>
                        {proj.featured && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/15 text-amber-400 border border-amber-500/30">
                            ★ Featured
                          </span>
                        )}
                      </div>

                      <h3 className="text-base font-bold text-[var(--theme-text-primary)] mt-1.5">
                        {proj.title}
                      </h3>

                      <p className="text-xs text-[var(--theme-text-muted)] font-mono flex items-center gap-3 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[var(--theme-accent)]" /> {proj.location}
                        </span>
                        {proj.structuralTypology && (
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3 text-[var(--theme-accent)]" /> {proj.structuralTypology}
                          </span>
                        )}
                      </p>
                    </div>

                    {proj.description && (
                      <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2">
                        {proj.description}
                      </p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--theme-border)]">
                      <button
                        type="button"
                        onClick={() => handleEdit(proj)}
                        className="px-3 py-1 rounded-lg bg-[var(--theme-surface)] hover:text-[var(--theme-accent)] text-xs font-mono flex items-center gap-1 border border-[var(--theme-border)] transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(proj.id)}
                        className="px-3 py-1 rounded-lg bg-[var(--theme-surface)] hover:text-red-500 text-xs font-mono flex items-center gap-1 border border-[var(--theme-border)] transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}