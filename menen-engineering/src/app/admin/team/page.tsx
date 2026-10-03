'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageUploader from '@/components/ImageUploader';
import { 
  Users, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Edit3, 
  UserCheck, 
  UserX, 
  Briefcase, 
  GraduationCap, 
  Loader2, 
  Save, 
  X,
  User as UserIcon 
} from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials?: string | null;
  bio?: string | null;
  image?: string | null;
  order?: number;
  active: boolean;
}

export default function AdminTeamPage() {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    credentials: '',
    bio: '',
    image: '',
    order: 0,
    active: true,
  });

  const fetchTeam = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/team');
      if (res.ok) {
        const data = await res.json();
        setTeam(data);
      }
    } catch (err) {
      console.error('Failed to load team:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.role.trim()) return;

    setSaving(true);
    try {
      const url = editingMember ? `/api/admin/team/${editingMember.id}` : '/api/admin/team';
      const method = editingMember ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setFormData({
          name: '',
          role: '',
          credentials: '',
          bio: '',
          image: '',
          order: 0,
          active: true,
        });
        setEditingMember(null);
        await fetchTeam();
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to save team member');
      }
    } catch (err: any) {
      alert(err.message || 'Error saving team member');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role,
      credentials: member.credentials || '',
      bio: member.bio || '',
      image: member.image || '',
      order: member.order || 0,
      active: member.active,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this team member?')) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTeam((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  const toggleActive = async (member: TeamMember) => {
    try {
      const res = await fetch('/api/admin/team', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: member.id, active: !member.active }),
      });
      if (res.ok) {
        setTeam((prev) =>
          prev.map((m) => (m.id === member.id ? { ...m, active: !m.active } : m))
        );
      }
    } catch (err) {
      console.error('Toggle failed:', err);
    }
  };

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--theme-border)] pb-6">
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--theme-accent)] hover:underline mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-primary)]">
            Engineering Leadership & Team
          </h1>
          <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] font-mono mt-1">
            Manage practicing consultants, licensed partners, and structural engineering staff.
          </p>
        </div>
        <div className="text-xs font-mono text-[var(--theme-text-muted)] bg-[var(--theme-surface)] px-3 py-1.5 rounded-lg border border-[var(--theme-border)]">
          Total Members: {team.length}
        </div>
      </div>

      {/* Main Grid: Form + Team List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Member Form Card */}
        <div className="lg:col-span-1 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 h-fit space-y-6">
          <div className="flex items-center justify-between border-b border-[var(--theme-border)] pb-3">
            <h2 className="text-sm font-bold font-mono uppercase tracking-wider text-[var(--theme-text-primary)] flex items-center gap-2">
              {editingMember ? <Edit3 className="w-4 h-4 text-[var(--theme-accent)]" /> : <Plus className="w-4 h-4 text-[var(--theme-accent)]" />}
              {editingMember ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            {editingMember && (
              <button
                type="button"
                onClick={() => {
                  setEditingMember(null);
                  setFormData({ name: '', role: '', credentials: '', bio: '', image: '', order: 0, active: true });
                }}
                className="text-xs font-mono text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" /> Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Direct Device/Cloudinary Image Uploader */}
            <ImageUploader
              label="Staff Portrait (Phone or Computer)"
              aspectRatio="square"
              value={formData.image}
              onChange={(url) => setFormData((prev) => ({ ...prev, image: url }))}
            />

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Dr. Yohannes Berhanu"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl focus:outline-none focus:border-[var(--theme-accent)] text-[var(--theme-text-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                Title / Position *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Principal Structural Consultant"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl focus:outline-none focus:border-[var(--theme-accent)] text-[var(--theme-text-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                Credentials & Degrees
              </label>
              <input
                type="text"
                placeholder="e.g. PhD Structural Eng (Milan), PE"
                value={formData.credentials}
                onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl focus:outline-none focus:border-[var(--theme-accent)] text-[var(--theme-text-primary)]"
              />
            </div>

            <div>
              <label className="block text-xs font-mono font-semibold uppercase text-[var(--theme-text-secondary)] mb-1">
                Biography & Specialization
              </label>
              <textarea
                rows={3}
                placeholder="Specialist in seismic design, finite element modeling, and high-rise core foundations."
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                className="w-full px-3 py-2 text-sm bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl focus:outline-none focus:border-[var(--theme-accent)] text-[var(--theme-text-primary)] resize-none"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-[var(--theme-text-primary)]">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="rounded border-[var(--theme-border)] text-[var(--theme-accent)] focus:ring-0"
                />
                Active on Website
              </label>

              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-[var(--theme-accent)] text-black font-mono font-bold text-xs uppercase tracking-wider rounded-xl hover:opacity-90 disabled:opacity-50 flex items-center gap-2 transition"
              >
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                {editingMember ? 'Update Member' : 'Save Member'}
              </button>
            </div>
          </form>
        </div>

        {/* Existing Team Grid */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--theme-text-muted)]">
            Active Directory ({team.length})
          </h2>

          {loading ? (
            <div className="py-20 flex justify-center text-[var(--theme-accent)]">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
          ) : team.length === 0 ? (
            <div className="p-8 text-center bg-[var(--theme-card)] border border-dashed border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-muted)] text-sm font-mono">
              No staff members registered. Use the form on the left to add team members.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {team.map((member) => (
                <div
                  key={member.id}
                  className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-4 flex flex-col justify-between space-y-4 hover:border-[var(--theme-accent)]/50 transition"
                >
                  <div className="flex items-start gap-4">
                    {/* Render Image or Avatar Fallback */}
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[var(--theme-surface)] border border-[var(--theme-border)] shrink-0">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-[var(--theme-text-muted)]">
                          <UserIcon className="w-7 h-7" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-bold text-[var(--theme-text-primary)] truncate">
                        {member.name}
                      </h3>
                      <p className="text-xs font-mono text-[var(--theme-accent)] truncate">
                        {member.role}
                      </p>
                      {member.credentials && (
                        <span className="text-[11px] font-mono text-[var(--theme-text-muted)] flex items-center gap-1 mt-0.5 truncate">
                          <GraduationCap className="w-3 h-3 shrink-0" /> {member.credentials}
                        </span>
                      )}
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-[var(--theme-text-secondary)] line-clamp-2">
                      {member.bio}
                    </p>
                  )}

                  {/* Actions Row */}
                  <div className="flex items-center justify-between pt-3 border-t border-[var(--theme-border)] text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => toggleActive(member)}
                      className={`flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-semibold ${
                        member.active
                          ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}
                    >
                      {member.active ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                      {member.active ? 'Published' : 'Hidden'}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleEdit(member)}
                        className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:text-[var(--theme-accent)] transition"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(member.id)}
                        className="p-1.5 rounded-lg bg-[var(--theme-surface)] hover:text-red-500 transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
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