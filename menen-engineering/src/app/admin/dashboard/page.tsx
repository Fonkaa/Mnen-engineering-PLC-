'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  Settings, 
  Key, 
  FileText, 
  Inbox, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  ExternalLink, 
  LogOut, 
  CheckCircle2,
  Video,
  Volume2,
  Image as ImageIcon,
  Upload,
  Loader2,
  Mail,
  GraduationCap,
  Briefcase
} from 'lucide-react';

export default function MasterAdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'projects' | 'team' | 'config' | 'cms' | 'security' | 'inquiries'>('projects');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Core Database States
  const [projects, setProjects] = useState<any[]>([]);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [siteConfig, setSiteConfig] = useState<any>({});
  const [cmsContent, setCmsContent] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Modal & Selection States
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [isNewProjectModal, setIsNewProjectModal] = useState(false);
  const [isNewMemberModal, setIsNewMemberModal] = useState(false);

  // Local Upload State Handlers
  const [projectImageUrl, setProjectImageUrl] = useState('');
  const [memberImageUrl, setMemberImageUrl] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Security Credentials State
  const [securityEmail, setSecurityEmail] = useState('');
  const [securityPassword, setSecurityPassword] = useState('');

  useEffect(() => {
    const isAuth = localStorage.getItem('menen_admin_auth');
    if (!isAuth) {
      router.push('/admin/login');
      return;
    }
    loadAllData();
  }, [router]);

  function triggerToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  // Load all records with strict cache-busting
  async function loadAllData() {
    setLoading(true);
    try {
      const fetchOpts: RequestInit = {
        cache: 'no-store',
        headers: { 'Pragma': 'no-cache', 'Cache-Control': 'no-cache' }
      };

      const [projRes, teamRes, configRes, cmsRes, inqRes] = await Promise.all([
        fetch('/api/admin/projects', fetchOpts),
        fetch('/api/admin/team', fetchOpts),
        fetch('/api/admin/config', fetchOpts),
        fetch('/api/admin/content', fetchOpts),
        fetch('/api/inquiries', fetchOpts),
      ]);

      if (projRes.ok) setProjects(await projRes.json());
      if (teamRes.ok) setTeamMembers(await teamRes.json());
      if (configRes.ok) {
        const conf = await configRes.json();
        setSiteConfig(conf || {});
      }
      if (cmsRes.ok) setCmsContent(await cmsRes.json());
      if (inqRes.ok) setInquiries(await inqRes.json());
    } catch (e) {
      console.error('Error synchronizing admin data:', e);
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem('menen_admin_auth');
    router.push('/');
  }

  // Universal Device Upload Handler (Phone / PC to Cloudinary CDN)
  async function uploadFileToServer(file: File): Promise<string | null> {
    if (!file) return null;

    if (file.size > 20 * 1024 * 1024) {
      alert('The selected file exceeds 20MB. Please choose a smaller photo.');
      return null;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || 'Server rejected file upload.';
        console.error('Upload API rejection:', errorMsg);
        alert(`Upload error: ${errorMsg}`);
        return null;
      }

      // Read Cloudinary permanent CDN URL
      const cdnUrl = data.url || data.secure_url;
      if (!cdnUrl) {
        alert('Server succeeded but did not return a valid CDN link.');
        return null;
      }

      triggerToast('Photo successfully stored on Cloud CDN!');
      return cdnUrl;
    } catch (err: any) {
      console.error('Upload connection error:', err);
      alert('Network failure connecting to media server. Check connection.');
      return null;
    } finally {
      setUploadingImage(false);
    }
  }

  // -------------------------------------------------------------
  // PROJECT ACTIONS
  // -------------------------------------------------------------
  async function handleSaveProject(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const isEditing = Boolean(editingProject?.id);

    // Filter out old dead local /uploads/ paths
    let finalFeaturedImage = projectImageUrl.trim() || (form.get('featuredImage') as string)?.trim() || null;
    if (finalFeaturedImage && finalFeaturedImage.startsWith('/uploads/')) {
      finalFeaturedImage = null;
    }

    const payload = {
      id: editingProject?.id,
      title: form.get('title'),
      client: form.get('client'),
      category: form.get('category'),
      status: form.get('status'),
      location: form.get('location'),
      scopeOfWork: form.get('scopeOfWork'),
      awards: form.get('awards'),
      featuredImage: finalFeaturedImage,
      featuredVideo: form.get('featuredVideo') || null,
      audioNarrative: form.get('audioNarrative') || null,
      isFeatured: form.get('isFeatured') === 'on',
      order: editingProject?.order ?? 0,
    };

    try {
      const res = await fetch('/api/admin/projects', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const savedProject = await res.json();
        setProjects((prev) => {
          if (isEditing) {
            return prev.map((p) => (p.id === savedProject.id ? savedProject : p));
          } else {
            return [savedProject, ...prev];
          }
        });

        triggerToast(isEditing ? 'Project details updated!' : 'New project published!');
        setEditingProject(null);
        setIsNewProjectModal(false);
        setProjectImageUrl('');
        loadAllData();
      } else {
        const err = await res.json();
        alert(`Failed to save project: ${err.error || 'Server error'}`);
      }
    } catch (error) {
      console.error('Project save error:', error);
      alert('Network error while saving project.');
    }
  }

  async function handleDeleteProject(id: string, title: string) {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/projects?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerToast('Project removed.');
        setProjects((prev) => prev.filter((p) => p.id !== id));
      }
    } catch (e) {
      console.error('Error deleting project:', e);
    }
  }

  // -------------------------------------------------------------
  // TEAM ACTIONS
  // -------------------------------------------------------------
  async function handleSaveMember(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const isEditing = Boolean(editingMember?.id);

    // Filter out old dead local /uploads/ paths
    let finalAvatarUrl = memberImageUrl.trim() || (form.get('avatarUrl') as string)?.trim() || null;
    if (finalAvatarUrl && finalAvatarUrl.startsWith('/uploads/')) {
      finalAvatarUrl = null;
    }

    const payload = {
      id: editingMember?.id,
      name: form.get('name'),
      roleTitle: form.get('roleTitle'),
      department: form.get('department'),
      credentials: form.get('credentials'),
      bio: form.get('bio'),
      avatarUrl: finalAvatarUrl,
      linkedinUrl: form.get('linkedinUrl') || null,
      email: form.get('email') || null,
      phone: form.get('phone') || null,
      isExecutive: form.get('isExecutive') === 'on',
      order: editingMember?.order ?? 0,
    };

    try {
      const res = await fetch('/api/admin/team', {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const savedMember = await res.json();
        setTeamMembers((prev) => {
          if (isEditing) {
            return prev.map((m) => (m.id === savedMember.id ? savedMember : m));
          } else {
            return [savedMember, ...prev];
          }
        });

        triggerToast(isEditing ? 'Specialist profile updated!' : 'New specialist registered!');
        setEditingMember(null);
        setIsNewMemberModal(false);
        setMemberImageUrl('');
        loadAllData();
      } else {
        const err = await res.json();
        alert(`Failed to save specialist: ${err.error || 'Server error'}`);
      }
    } catch (error) {
      console.error('Team save error:', error);
      alert('Network error while saving specialist profile.');
    }
  }

  async function handleDeleteMember(id: string, name: string) {
    if (!confirm(`Are you sure you want to delete profile for ${name}?`)) return;
    try {
      const res = await fetch(`/api/admin/team?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        triggerToast('Profile deleted.');
        setTeamMembers((prev) => prev.filter((m) => m.id !== id));
      }
    } catch (e) {
      console.error('Error deleting member:', e);
    }
  }

  // -------------------------------------------------------------
  // DYNAMIC SITE CONFIGURATION & NOTIFICATION ROUTING
  // -------------------------------------------------------------
  async function handleSaveConfig(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = {
      companyName: form.get('companyName'),
      legalCategory: form.get('legalCategory'),
      motto: form.get('motto'),
      primaryPhone: form.get('primaryPhone'),
      secondaryPhone: form.get('secondaryPhone'),
      primaryEmail: form.get('primaryEmail'),
      officeAddress: form.get('officeAddress'),
    };

    try {
      const res = await fetch('/api/admin/config', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const updatedConfig = await res.json();
        setSiteConfig(updatedConfig);
        triggerToast('Notification target & corporate contact info saved!');
        loadAllData();
      }
    } catch (e) {
      console.error('Config save error:', e);
      alert('Failed to save configuration settings.');
    }
  }

  // -------------------------------------------------------------
  // CMS DYNAMIC TEXTS
  // -------------------------------------------------------------
  async function handleSaveCmsText(key: string, value: string, label: string) {
    try {
      const res = await fetch('/api/admin/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value, label }),
      });
      if (res.ok) {
        triggerToast(`Updated "${label}"!`);
        loadAllData();
      }
    } catch (e) {
      console.error('CMS save error:', e);
    }
  }

  // -------------------------------------------------------------
  // SECURITY (ADMIN PASSKEY)
  // -------------------------------------------------------------
  async function handleSaveSecurity(e: React.FormEvent) {
    e.preventDefault();
    if (!securityEmail || !securityPassword) {
      alert('Please enter both a new email and new password');
      return;
    }
    try {
      const res = await fetch('/api/admin/auth/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          newEmail: securityEmail,
          newPassword: securityPassword,
        }),
      });
      if (res.ok) {
        triggerToast('Admin credentials securely updated!');
        setSecurityPassword('');
      } else {
        alert('Failed to update administrative credentials');
      }
    } catch (e) {
      console.error('Security update error:', e);
    }
  }

  // -------------------------------------------------------------
  // INQUIRY / INTERNSHIP DECISION DISPATCH
  // -------------------------------------------------------------
  async function handleInquiryDecision(inquiryId: string, applicantEmail: string, newStatus: 'APPROVED' | 'REJECTED') {
    const actionLabel = newStatus === 'APPROVED' ? 'Approve' : 'Reject';
    const note = prompt(`Optional remarks or interview scheduling note to include in the ${actionLabel} email to ${applicantEmail}:`);

    try {
      const res = await fetch('/api/admin/inquiries/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryId,
          newStatus,
          feedbackNote: note || '',
        }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((item) => (item.id === inquiryId ? { ...item, status: newStatus } : item))
        );
        triggerToast(`Marked as ${newStatus} & decision email sent!`);
      } else {
        const err = await res.json();
        alert(err.error || 'Failed to dispatch decision.');
      }
    } catch (e) {
      console.error('Decision dispatch error:', e);
      alert('Network failure sending decision email.');
    }
  }

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed top-5 right-5 z-[9999] bg-[var(--theme-accent)] text-black px-4 py-2.5 rounded-xl font-mono text-xs font-bold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-[var(--theme-border)] pb-6 gap-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
            MENEN Engineering PLC &bull; Category 1
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-primary)]">
            Master Dynamic Administration Engine
          </h1>
          <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-mono">
            Direct Database Synced &bull; Cloudinary Media & Email Dispatch Active
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-3.5 py-1.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xs font-mono text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition"
          >
            Live Site &rarr;
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xs font-mono text-rose-400 hover:border-rose-500 transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--theme-border)] pb-3">
        {[
          { id: 'projects', label: `Projects & Media (${projects.length})`, icon: Building2 },
          { id: 'team', label: `Team & Profiles (${teamMembers.length})`, icon: Users },
          { id: 'config', label: 'Office & Notification Settings', icon: Settings },
          { id: 'cms', label: 'Live Text CMS', icon: FileText },
          { id: 'security', label: 'Admin Security & Login', icon: Key },
          { id: 'inquiries', label: `Briefs & Applications (${inquiries.length})`, icon: Inbox },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono transition cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-[var(--theme-accent)] text-black font-bold shadow-md'
                  : 'bg-[var(--theme-surface)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
              }`}
            >
              <Icon className="w-3.5 h-3.5" /> {tab.label}
            </button>
          );
        })}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* TAB 1: PROJECTS & PORTFOLIO CRUD */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'projects' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[var(--theme-card)] p-4 rounded-xl border border-[var(--theme-border)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">
                Landmark Projects Directory ({projects.length})
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                Add, edit, or delete projects with Cloudinary CDN file uploads, video walkthroughs, and audio narratives.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingProject(null);
                setProjectImageUrl('');
                setIsNewProjectModal(true);
              }}
              className="px-4 py-2 rounded-lg bg-[var(--theme-accent)] text-black font-mono font-bold text-xs uppercase flex items-center gap-1.5 hover:opacity-90 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Project
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => {
              const displayImage = p.featuredImage && !p.featuredImage.startsWith('/uploads/') ? p.featuredImage : null;
              return (
                <div
                  key={p.id}
                  className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[var(--theme-accent)] transition"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface)] text-[var(--theme-accent)] border border-[var(--theme-border)] font-bold">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">
                        {p.status ? p.status.replace(/_/g, ' ') : ''}
                      </span>
                    </div>

                    <div className="mt-3 aspect-video rounded-lg overflow-hidden bg-[var(--theme-surface)] border border-[var(--theme-border)] flex items-center justify-center">
                      {displayImage ? (
                        <img src={displayImage} alt={p.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-[var(--theme-text-muted)] p-4 text-center">
                          <Building2 className="w-8 h-8 opacity-40 mb-1" />
                          <span className="text-[10px] font-mono">No Image Uploaded</span>
                        </div>
                      )}
                    </div>

                    <h4 className="text-base font-bold text-[var(--theme-text-primary)] mt-3">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
                      Client: <strong className="text-[var(--theme-text-primary)]">{p.client}</strong>
                    </p>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-2 line-clamp-2 leading-relaxed">
                      {p.scopeOfWork}
                    </p>

                    <div className="mt-3 flex items-center gap-3 text-xs font-mono text-[var(--theme-text-muted)]">
                      {displayImage && (
                        <span className="flex items-center gap-1 text-emerald-400" title="Image Configured">
                          <ImageIcon className="w-3.5 h-3.5" /> CDN Img
                        </span>
                      )}
                      {p.featuredVideo && (
                        <span className="flex items-center gap-1 text-amber-400" title="Video Configured">
                          <Video className="w-3.5 h-3.5" /> Video
                        </span>
                      )}
                      {p.audioNarrative && (
                        <span className="flex items-center gap-1 text-cyan-400" title="Audio Configured">
                          <Volume2 className="w-3.5 h-3.5" /> Audio
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingProject(p);
                          setProjectImageUrl(displayImage || '');
                          setIsNewProjectModal(true);
                        }}
                        className="px-2.5 py-1.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(p.id, p.title)}
                        className="px-2.5 py-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>

                    <Link
                      href={`/projects/${p.slug}`}
                      target="_blank"
                      className="text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition"
                      title="Preview Dossier"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* PROJECT CREATE / EDIT MODAL */}
          {isNewProjectModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-2xl bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
                <div className="flex justify-between items-center border-b border-[var(--theme-border)] pb-4">
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">
                    {editingProject ? 'Edit Project Details' : 'Add New Engineering Project'}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingProject(null);
                      setIsNewProjectModal(false);
                      setProjectImageUrl('');
                    }}
                    className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveProject} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                        Project Title *
                      </label>
                      <input
                        required
                        name="title"
                        defaultValue={editingProject?.title || ''}
                        placeholder="e.g. 4B+G+M+23 MXD Tower"
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                        Client / Commissioning Developer *
                      </label>
                      <input
                        required
                        name="client"
                        defaultValue={editingProject?.client || ''}
                        placeholder="e.g. KK PLC / KANMAX"
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                        Typology *
                      </label>
                      <select
                        name="category"
                        defaultValue={editingProject?.category || 'MXD'}
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                      >
                        <option value="MXD">MXD (Mixed Use)</option>
                        <option value="APT">APT (Apartment)</option>
                        <option value="HSP">HSP (Hospitality)</option>
                        <option value="RLS">RLS (Real Estate)</option>
                        <option value="STR">STR (Infrastructure)</option>
                        <option value="INT">INT (Interior)</option>
                        <option value="LND">LND (Landscape)</option>
                        <option value="RES">RES (Residence)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                        Status *
                      </label>
                      <select
                        name="status"
                        defaultValue={editingProject?.status || 'UNDER_CONSTRUCTION'}
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                      >
                        <option value="UNDER_CONSTRUCTION">Under Construction</option>
                        <option value="DESIGN_PERMIT_PROCESS">Design Permit Process</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="DESIGN_PHASE">Design Phase</option>
                        <option value="LAND_ACQUISITION_PROCESS">Land Acquisition</option>
                        <option value="BOQ_AND_TENDER">BoQ & Tender</option>
                        <option value="PROPOSAL">Proposal</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                        Location / City
                      </label>
                      <input
                        name="location"
                        defaultValue={editingProject?.location || 'Addis Ababa'}
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                      Scope of Work *
                    </label>
                    <textarea
                      required
                      name="scopeOfWork"
                      defaultValue={editingProject?.scopeOfWork || ''}
                      rows={2}
                      placeholder="e.g. 1st Prize Awarded Schematic Design & Complete Structural Services"
                      className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  {/* Device Direct File Upload (Phone & Computer) */}
                  <div className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] space-y-3">
                    <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-primary)] font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[var(--theme-accent)]" /> Project Image (Cloudinary CDN Upload)
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <label className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-accent)]/60 text-xs font-mono text-[var(--theme-accent)] hover:bg-[var(--theme-accent)] hover:text-black transition cursor-pointer flex items-center justify-center gap-2 shrink-0">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Uploading to CDN...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" /> Pick from Phone / Computer
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const uploadedUrl = await uploadFileToServer(file);
                              if (uploadedUrl) setProjectImageUrl(uploadedUrl);
                            }
                          }}
                        />
                      </label>

                      <span className="text-xs font-mono text-[var(--theme-text-muted)]">OR</span>

                      <input
                        name="featuredImage"
                        value={projectImageUrl}
                        onChange={(e) => setProjectImageUrl(e.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        className="flex-1 w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                      />
                    </div>

                    {projectImageUrl && !projectImageUrl.startsWith('/uploads/') && (
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-16 h-12 rounded border border-[var(--theme-border)] overflow-hidden bg-black/40 shrink-0">
                          <img src={projectImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 truncate max-w-sm">
                          Active CDN: {projectImageUrl}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1 flex items-center gap-1">
                        <Video className="w-3.5 h-3.5 text-amber-400" /> Walkthrough Video URL
                      </label>
                      <input
                        name="featuredVideo"
                        defaultValue={editingProject?.featuredVideo || ''}
                        placeholder="YouTube / Vimeo link"
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1 flex items-center gap-1">
                        <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Audio Narrative URL
                      </label>
                      <input
                        name="audioNarrative"
                        defaultValue={editingProject?.audioNarrative || ''}
                        placeholder="Audio / Podcast link"
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                      Awards / Recognition
                    </label>
                    <input
                      name="awards"
                      defaultValue={editingProject?.awards || ''}
                      placeholder="e.g. 1st Prize Awarded Schematic Design Project"
                      className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="checkbox"
                      id="isFeatured"
                      name="isFeatured"
                      defaultChecked={editingProject?.isFeatured || false}
                      className="w-4 h-4 rounded text-[var(--theme-accent)]"
                    />
                    <label htmlFor="isFeatured" className="text-xs font-mono text-[var(--theme-text-secondary)]">
                      Feature on Homepage Showcase
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition mt-4 cursor-pointer"
                  >
                    Save Project to Database
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 2: TEAM & PROFILES CRUD */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'team' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-[var(--theme-card)] p-4 rounded-xl border border-[var(--theme-border)]">
            <div>
              <h3 className="text-sm font-bold text-[var(--theme-text-primary)]">
                Team Specialists & Founders ({teamMembers.length})
              </h3>
              <p className="text-xs text-[var(--theme-text-muted)] mt-0.5">
                Manage executive leadership, upload photos directly to Cloudinary, and update bios.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingMember(null);
                setMemberImageUrl('');
                setIsNewMemberModal(true);
              }}
              className="px-4 py-2 rounded-lg bg-[var(--theme-accent)] text-black font-mono font-bold text-xs uppercase flex items-center gap-1.5 hover:opacity-90 transition cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Specialist
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teamMembers.map((m) => {
              const displayAvatar = m.avatarUrl && !m.avatarUrl.startsWith('/uploads/') ? m.avatarUrl : null;
              return (
                <div
                  key={m.id}
                  className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-5 flex flex-col justify-between space-y-4 hover:border-[var(--theme-accent)] transition"
                >
                  <div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--theme-surface)] text-[var(--theme-accent)] border border-[var(--theme-border)]">
                      {m.department}
                    </span>

                    <div className="mt-3 w-16 h-16 rounded-full overflow-hidden bg-[var(--theme-surface)] border border-[var(--theme-border)] flex items-center justify-center">
                      {displayAvatar ? (
                        <img src={displayAvatar} alt={m.name} className="w-full h-full object-cover" />
                      ) : (
                        <Users className="w-7 h-7 text-[var(--theme-text-muted)] opacity-50" />
                      )}
                    </div>

                    <h4 className="text-base font-bold text-[var(--theme-text-primary)] mt-2">
                      {m.name}
                    </h4>
                    <p className="text-xs font-mono text-[var(--theme-accent)] mt-0.5">{m.roleTitle}</p>
                    <p className="text-xs text-[var(--theme-text-muted)] mt-2 line-clamp-3 leading-relaxed">
                      {m.bio}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--theme-border)] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingMember(m);
                          setMemberImageUrl(displayAvatar || '');
                          setIsNewMemberModal(true);
                        }}
                        className="px-2.5 py-1.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteMember(m.id, m.name)}
                        className="px-2.5 py-1.5 rounded bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30 text-xs font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* MEMBER MODAL */}
          {isNewMemberModal && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
              <div className="w-full max-w-xl bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl my-8">
                <div className="flex justify-between items-center border-b border-[var(--theme-border)] pb-4">
                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">
                    {editingMember ? 'Edit Profile' : 'Add Team Specialist'}
                  </h3>
                  <button
                    onClick={() => {
                      setEditingMember(null);
                      setIsNewMemberModal(false);
                      setMemberImageUrl('');
                    }}
                    className="text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleSaveMember} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                        Full Name & Title *
                      </label>
                      <input
                        required
                        name="name"
                        defaultValue={editingMember?.name || ''}
                        placeholder="e.g. Eng. Habtamu Getu"
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                        Role Title *
                      </label>
                      <input
                        required
                        name="roleTitle"
                        defaultValue={editingMember?.roleTitle || ''}
                        placeholder="e.g. CEO & Lead Structural Engineer"
                        className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                      Academic & Professional Credentials *
                    </label>
                    <input
                      required
                      name="credentials"
                      defaultValue={editingMember?.credentials || ''}
                      placeholder="e.g. MSc Chalmers University (Sweden), MSc AAiT, BSc Bahir Dar"
                      className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                      Detailed Biography *
                    </label>
                    <textarea
                      required
                      name="bio"
                      defaultValue={editingMember?.bio || ''}
                      rows={3}
                      placeholder="Full summary of work on landmark conservation, high rises, and international practice..."
                      className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  {/* Direct Mobile/PC Photo Upload for Team Member */}
                  <div className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] space-y-3">
                    <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-primary)] font-bold flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-[var(--theme-accent)]" /> Profile Photo (Cloudinary CDN Upload)
                    </label>

                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <label className="w-full sm:w-auto px-4 py-2.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-accent)]/60 text-xs font-mono text-[var(--theme-accent)] hover:bg-[var(--theme-accent)] hover:text-black transition cursor-pointer flex items-center justify-center gap-2 shrink-0">
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" /> Uploading to CDN...
                          </>
                        ) : (
                          <>
                            <Upload className="w-4 h-4" /> Pick from Phone / Computer
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          disabled={uploadingImage}
                          onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const uploadedUrl = await uploadFileToServer(file);
                              if (uploadedUrl) setMemberImageUrl(uploadedUrl);
                            }
                          }}
                        />
                      </label>

                      <span className="text-xs font-mono text-[var(--theme-text-muted)]">OR</span>

                      <input
                        name="avatarUrl"
                        value={memberImageUrl}
                        onChange={(e) => setMemberImageUrl(e.target.value)}
                        placeholder="https://res.cloudinary.com/..."
                        className="flex-1 w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                      />
                    </div>

                    {memberImageUrl && !memberImageUrl.startsWith('/uploads/') && (
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-12 h-12 rounded-full border border-[var(--theme-border)] overflow-hidden bg-black/40 shrink-0">
                          <img src={memberImageUrl} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                        <span className="text-[11px] font-mono text-emerald-400 truncate max-w-sm">
                          Active CDN: {memberImageUrl}
                        </span>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                      LinkedIn Profile URL
                    </label>
                    <input
                      name="linkedinUrl"
                      defaultValue={editingMember?.linkedinUrl || ''}
                      placeholder="https://linkedin.com/in/..."
                      className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition mt-4 cursor-pointer"
                  >
                    Save Specialist Profile
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 3: CONTACT, OFFICE & NOTIFICATION EMAIL CONFIGURATION */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'config' && (
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
              Corporate Office & Notification Dispatch Engine
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-mono">
              The email address entered below is where all inbound project briefs and internship applications are routed.
            </p>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-5">
            <div className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-accent)]/50 space-y-2">
              <label className="text-xs font-mono uppercase text-[var(--theme-accent)] font-bold flex items-center gap-1.5">
                <Mail className="w-4 h-4" /> Admin Notification Recipient Email (Dynamic Inbox Target) *
              </label>
              <input
                required
                type="email"
                name="primaryEmail"
                defaultValue={siteConfig.primaryEmail || 'habtamuengr@gmail.com'}
                placeholder="Where should alerts be sent? e.g. director@menenplc.com"
                className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
              />
              <p className="text-[11px] text-[var(--theme-text-muted)] font-mono">
                When candidates or clients submit a brief, an automated HTML dispatch will be delivered to this address.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                  Company Legal Entity Name
                </label>
                <input
                  name="companyName"
                  defaultValue={siteConfig.companyName || 'MENEN Engineering PLC'}
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                  Legal Category / License Classification
                </label>
                <input
                  name="legalCategory"
                  defaultValue={siteConfig.legalCategory || 'Category One Architectural & Engineering Firm'}
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                  Primary Public Hotline / Telephone
                </label>
                <input
                  name="primaryPhone"
                  defaultValue={siteConfig.primaryPhone || '+251 920 517 606'}
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                  Secondary Phone / Mobile
                </label>
                <input
                  name="secondaryPhone"
                  defaultValue={siteConfig.secondaryPhone || '+251 913 034 623'}
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                Office Physical Address (Shown on Contact Page, Footer & Decision Letters)
              </label>
              <textarea
                name="officeAddress"
                defaultValue={siteConfig.officeAddress || 'Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office @ Menen Engineering PLC, Addis Ababa, Ethiopia'}
                rows={2}
                className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-sans"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                Corporate Slogan / Motto
              </label>
              <input
                name="motto"
                defaultValue={siteConfig.motto || "It's all about commitment!"}
                className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Save className="w-4 h-4" /> Save Office Settings & Notification Email
            </button>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 4: LIVE DYNAMIC TEXTS CMS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'cms' && (
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
              Live Site Content CMS
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-mono">
              Edit taglines, vision, mission statements, and core values. Saved live to database.
            </p>
          </div>

          <div className="space-y-4">
            {cmsContent.length > 0 ? (
              cmsContent.map((item) => (
                <div key={item.key} className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono font-bold text-[var(--theme-accent)]">{item.label}</span>
                    <span className="text-[10px] font-mono text-[var(--theme-text-muted)]">{item.key}</span>
                  </div>
                  <textarea
                    id={`cms_${item.key}`}
                    defaultValue={item.value}
                    rows={2}
                    className="w-full bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-lg p-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-sans"
                  />
                  <button
                    onClick={() => {
                      const el = document.getElementById(`cms_${item.key}`) as HTMLTextAreaElement;
                      if (el) handleSaveCmsText(item.key, el.value, item.label);
                    }}
                    className="px-3 py-1.5 rounded bg-[var(--theme-accent)] text-black font-bold font-mono text-[11px] hover:opacity-90 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" /> Save Changes
                  </button>
                </div>
              ))
            ) : (
              <p className="text-xs text-[var(--theme-text-muted)] font-mono">No CMS items found. Seed the database with `npx prisma db seed`.</p>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 5: ADMIN SECURITY CREDENTIALS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'security' && (
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-8 space-y-6 max-w-xl">
          <div>
            <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
              Admin Authentication & Passkey
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-mono">
              Change the login email and password used to access this console.
            </p>
          </div>

          <form onSubmit={handleSaveSecurity} className="space-y-4">
            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                New Authorized Email *
              </label>
              <input
                type="email"
                required
                value={securityEmail}
                onChange={(e) => setSecurityEmail(e.target.value)}
                placeholder="e.g. habtamuengr@gmail.com"
                className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-[var(--theme-text-muted)] mb-1">
                New Secret Password *
              </label>
              <input
                type="password"
                required
                value={securityPassword}
                onChange={(e) => setSecurityPassword(e.target.value)}
                placeholder="Enter new strong passkey"
                className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2.5 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
              />
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Key className="w-4 h-4" /> Update Master Credentials
            </button>
          </form>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TAB 6: INCOMING CLIENT BRIEFS & STUDENT APPLICATIONS */}
      {/* ------------------------------------------------------------- */}
      {activeTab === 'inquiries' && (
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 sm:p-8 space-y-6">
          <div>
            <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
              Inbound Client Briefs & Student Applications ({inquiries.length})
            </h3>
            <p className="text-xs text-[var(--theme-text-muted)] mt-1 font-mono">
              Review submissions. Approving or rejecting automatically dispatches an official decision letter to the applicant's email address.
            </p>
          </div>

          <div className="space-y-6">
            {inquiries.length > 0 ? (
              inquiries.map((inq) => {
                const isInternship = inq.projectType?.includes('INTERNSHIP') || inq.scope?.includes('[STUDENT INTERNSHIP');
                
                return (
                  <div key={inq.id} className="p-5 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ${
                            isInternship 
                              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          }`}>
                            {isInternship ? (
                              <span className="flex items-center gap-1">
                                <GraduationCap className="w-3 h-3" /> Internship Candidate
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                <Briefcase className="w-3 h-3" /> Project Brief
                              </span>
                            )}
                          </span>
                          <h4 className="text-base font-bold text-[var(--theme-text-primary)]">
                            {inq.fullName} {inq.organization ? `(${inq.organization})` : ''}
                          </h4>
                        </div>
                        <p className="text-xs font-mono text-[var(--theme-accent)] mt-1">
                          Phone: {inq.phone} &bull; Email: <a href={`mailto:${inq.email}`} className="underline">{inq.email}</a>
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold uppercase ${
                          inq.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          inq.status === 'REJECTED' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40' :
                          'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                        }`}>
                          {inq.status || 'PENDING'}
                        </span>
                      </div>
                    </div>

                    <div className="text-xs text-[var(--theme-text-secondary)] bg-[var(--theme-card)] p-4 rounded-xl border border-[var(--theme-border)] leading-relaxed whitespace-pre-line font-sans">
                      {inq.scope}
                    </div>

                    {(inq.referenceVideo || inq.referenceAudio) && (
                      <div className="flex flex-wrap gap-4 text-xs font-mono pt-1">
                        {inq.referenceVideo && (
                          <a href={inq.referenceVideo} target="_blank" rel="noopener noreferrer" className="text-amber-400 flex items-center gap-1 hover:underline">
                            <Video className="w-3.5 h-3.5" /> Video / Portfolio URL
                          </a>
                        )}
                        {inq.referenceAudio && (
                          <a href={inq.referenceAudio} target="_blank" rel="noopener noreferrer" className="text-cyan-400 flex items-center gap-1 hover:underline">
                            <Volume2 className="w-3.5 h-3.5" /> Audio Note Link
                          </a>
                        )}
                      </div>
                    )}

                    <div className="pt-3 border-t border-[var(--theme-border)] flex flex-wrap items-center justify-between gap-3">
                      <div className="text-[11px] font-mono text-[var(--theme-text-muted)]">
                        Target Applicant: <strong className="text-[var(--theme-text-primary)]">{inq.email}</strong>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleInquiryDecision(inq.id, inq.email, 'APPROVED')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition"
                        >
                          ✓ Approve & Send Decision Email
                        </button>

                        <button
                          onClick={() => handleInquiryDecision(inq.id, inq.email, 'REJECTED')}
                          className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 border border-rose-500/40 text-xs font-mono font-bold flex items-center gap-1 cursor-pointer transition"
                        >
                          ✕ Reject & Send Decision Email
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-[var(--theme-text-muted)] font-mono">No submissions received yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}