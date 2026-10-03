'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, 
  Video, 
  Volume2, 
  ShieldCheck, 
  Send, 
  Loader2, 
  GraduationCap, 
  Briefcase,
  FileText,
  Upload,
  X,
  FileCheck2
} from 'lucide-react';

export default function SubmitProjectPage() {
  const [submissionType, setSubmissionType] = useState<'PROJECT' | 'INTERNSHIP'>('PROJECT');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // PDF Document Upload State
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [pdfName, setPdfName] = useState<string>('');
  const [uploadingPdf, setUploadingPdf] = useState(false);

  async function handleFileUpload(file: File) {
    if (!file) return;

    if (file.size > 25 * 1024 * 1024) {
      alert('Document exceeds 25MB limit. Please upload a compressed PDF or file.');
      return;
    }

    setUploadingPdf(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || 'Failed to upload document.');
        return;
      }

      const uploadedUrl = data.url || data.secure_url;
      setPdfUrl(uploadedUrl);
      setPdfName(file.name);
    } catch (err: any) {
      alert('Error uploading document: ' + err.message);
    } finally {
      setUploadingPdf(false);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (uploadingPdf) {
      alert('Please wait until your document finishes uploading.');
      return;
    }

    setLoading(true);
    const form = new FormData(e.currentTarget);
    const isInternship = submissionType === 'INTERNSHIP';

    const payload = {
      type: submissionType,
      fullName: form.get('fullName'),
      email: form.get('email'),
      phone: form.get('phone'),
      organization: form.get('organization') || form.get('university') || null,
      projectType: isInternship ? `INTERNSHIP_${form.get('academicDepartment')}` : form.get('projectType'),
      location: form.get('location') || null,
      plotSize: form.get('plotSize') || null,
      scope: isInternship 
        ? `[STUDENT INTERNSHIP APPLICATION]\nUniversity: ${form.get('university')}\nDepartment: ${form.get('academicDepartment')}\nYear of Study: ${form.get('yearOfStudy')}\nCGPA: ${form.get('cgpa')}\nPortfolio/CV Link: ${form.get('portfolioUrl') || 'N/A'}\nAttached Document: ${pdfUrl ? `${pdfName} (${pdfUrl})` : 'None'}\n\nStatement of Purpose:\n${form.get('scope')}`
        : form.get('scope'),
      referenceVideo: form.get('referenceVideo') || null,
      referenceAudio: form.get('referenceAudio') || null,
      documentPdfUrl: pdfUrl || null,
      documentPdfName: pdfName || null,
    };

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const err = await res.json();
        alert(err.error || 'Submission failed. Please try again or contact the office directly.');
      }
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-24 px-4 max-w-lg mx-auto text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[var(--theme-accent)]/20 border border-[var(--theme-accent)] flex items-center justify-center mx-auto text-[var(--theme-accent)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl font-extrabold text-[var(--theme-text-primary)]">
          {submissionType === 'INTERNSHIP' ? 'Application Transmitted' : 'Project Brief Transmitted'}
        </h2>
        <p className="text-sm text-[var(--theme-text-secondary)] leading-relaxed">
          {submissionType === 'INTERNSHIP'
            ? 'Your internship application profile and attached documents have been received by the review panel. You will receive an official decision letter via email.'
            : 'Thank you for submitting your architectural & engineering brief. Eng. Habtamu Getu and our lead engineers have received your dossier, PDF specifications, and details.'}
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-2.5 rounded-lg bg-[var(--theme-accent)] text-black font-bold text-xs uppercase font-mono tracking-wider hover:opacity-90 transition"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
      {/* Page Header */}
      <div className="border-b border-[var(--theme-border)] pb-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4" /> Official Intake Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-primary)] tracking-tight mt-1">
          {submissionType === 'INTERNSHIP' 
            ? 'Student Internship & Apprenticeship Application' 
            : 'Submit Project Brief & Engineering Requirements'}
        </h1>
        <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-2">
          {submissionType === 'INTERNSHIP'
            ? 'Apply for practical internships and mentorship under Category 1 structural engineers and architects at MENEN Engineering PLC.'
            : 'From schematic concept and municipal permit navigation to complete structural analysis, tender BOQs, and 3D architectural animation.'}
        </p>
      </div>

      {/* Switcher Tab */}
      <div className="flex rounded-xl bg-[var(--theme-surface)] p-1.5 border border-[var(--theme-border)] gap-2">
        <button
          type="button"
          onClick={() => {
            setSubmissionType('PROJECT');
            setPdfUrl('');
            setPdfName('');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
            submissionType === 'PROJECT'
              ? 'bg-[var(--theme-accent)] text-black shadow-md'
              : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Commercial Project Brief
        </button>
        <button
          type="button"
          onClick={() => {
            setSubmissionType('INTERNSHIP');
            setPdfUrl('');
            setPdfName('');
          }}
          className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-mono font-semibold flex items-center justify-center gap-2 transition cursor-pointer ${
            submissionType === 'INTERNSHIP'
              ? 'bg-[var(--theme-accent)] text-black shadow-md'
              : 'text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)]'
          }`}
        >
          <GraduationCap className="w-4 h-4" /> Student Internship Application
        </button>
      </div>

      {/* Main Intake Form */}
      <form onSubmit={handleSubmit} className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6 sm:p-8 rounded-2xl space-y-6 shadow-sm">
        
        {/* Basic Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
              Full Name *
            </label>
            <input
              required
              name="fullName"
              placeholder={submissionType === 'INTERNSHIP' ? 'e.g. Sara Tesfaye' : 'e.g. Ato Bekele / Developer'}
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
              {submissionType === 'INTERNSHIP' ? 'University / Institute *' : 'Company / Organization Name'}
            </label>
            <input
              required={submissionType === 'INTERNSHIP'}
              name={submissionType === 'INTERNSHIP' ? 'university' : 'organization'}
              placeholder={submissionType === 'INTERNSHIP' ? 'e.g. AAiT, ASTU, Bahir Dar University' : 'e.g. KK PLC, KANMAX'}
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
              Contact Email Address (For Direct Decision Letters) *
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="applicant@domain.com"
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
              Active Phone Number *
            </label>
            <input
              required
              name="phone"
              placeholder="+251 9..."
              className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
            />
          </div>
        </div>

        {/* CONDITION 1: COMMERCIAL PROJECT FIELDS */}
        {submissionType === 'PROJECT' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                  Typology *
                </label>
                <select
                  name="projectType"
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                >
                  <option value="MXD">Mixed Use (MXD)</option>
                  <option value="APT">Apartment Tower (APT)</option>
                  <option value="HSP">Hospitality & Hotel (HSP)</option>
                  <option value="RLS">Real Estate Masterplan (RLS)</option>
                  <option value="RES">Private Luxury Residence (RES)</option>
                  <option value="INT">Interior Architecture (INT)</option>
                  <option value="LND">Landscape Design (LND)</option>
                  <option value="STR">Institutional / Structural (STR)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                  Site Location
                </label>
                <input
                  name="location"
                  placeholder="Addis Ababa, Hawassa..."
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                  Plot Size (m²)
                </label>
                <input
                  name="plotSize"
                  placeholder="e.g. 1,200 m²"
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                Detailed Scope of Work & Architectural Program *
              </label>
              <textarea
                required
                name="scope"
                rows={4}
                placeholder="Describe number of basements/floors (e.g., 2B+G+M+15), municipal permit status, structural systems needed..."
                className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
              />
            </div>

            {/* DEDICATED PDF & SPECIFICATION UPLOADER */}
            <div className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] space-y-3">
              <label className="block text-xs font-mono uppercase text-[var(--theme-text-primary)] font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[var(--theme-accent)]" /> 
                  Upload Project Brief / Technical Specifications (PDF / DOC)
                </span>
                <span className="text-[10px] text-[var(--theme-text-muted)] font-normal">Max 25MB</span>
              </label>

              {!pdfUrl ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--theme-border)] hover:border-[var(--theme-accent)] rounded-xl p-5 cursor-pointer bg-[var(--theme-card)]/50 transition group text-center">
                  {uploadingPdf ? (
                    <div className="flex flex-col items-center gap-2 text-xs font-mono text-[var(--theme-accent)]">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Transmitting document to secure cloud...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition mb-1" />
                      <span className="text-xs font-medium text-[var(--theme-text-primary)]">
                        Click or tap to choose PDF drawing or brief
                      </span>
                      <span className="text-[10px] text-[var(--theme-text-muted)] font-mono mt-0.5">
                        Accepts PDF, DWG, DOCX, ZIP files
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.dwg,.zip,application/pdf"
                    disabled={uploadingPdf}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/40">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-accent)] truncate">
                    <FileCheck2 className="w-4 h-4 shrink-0" />
                    <span className="font-bold truncate">{pdfName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPdfUrl('');
                      setPdfName('');
                    }}
                    className="p-1 rounded hover:bg-rose-500/20 text-rose-400 transition"
                    title="Remove attached file"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-[var(--theme-border)]">
              <div>
                <label className="text-xs font-mono uppercase text-[var(--theme-text-secondary)] flex items-center gap-1 mb-1">
                  <Video className="w-3.5 h-3.5 text-amber-400" /> Reference Video / Site Footage
                </label>
                <input
                  name="referenceVideo"
                  placeholder="YouTube / Vimeo link"
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>
              <div>
                <label className="text-xs font-mono uppercase text-[var(--theme-text-secondary)] flex items-center gap-1 mb-1">
                  <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> Audio Note / Brief Link
                </label>
                <input
                  name="referenceAudio"
                  placeholder="Voice note / Cloud audio URL"
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
                />
              </div>
            </div>
          </>
        )}

        {/* CONDITION 2: STUDENT INTERNSHIP FIELDS */}
        {submissionType === 'INTERNSHIP' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                  Field / Department *
                </label>
                <select
                  required
                  name="academicDepartment"
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                >
                  <option value="Civil_Structural_Engineering">Civil / Structural Engineering</option>
                  <option value="Architecture_Urban_Design">Architecture & Urban Planning</option>
                  <option value="Construction_Management">Construction Technology & Mgmt</option>
                  <option value="Sanitary_Electro_Mechanical">Sanitary & Mechanical (MEP)</option>
                  <option value="Software_BIM_Drafting">BIM, GIS & Technical CAD</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                  Current Year of Study *
                </label>
                <select
                  name="yearOfStudy"
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                >
                  <option value="3rd_Year">3rd Year (Junior)</option>
                  <option value="4th_Year">4th Year (Internship Semester)</option>
                  <option value="5th_Year_Graduating">5th Year (Graduating Class)</option>
                  <option value="Postgraduate_MSc">Postgraduate (MSc / MArch)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                  Cumulative GPA (CGPA) *
                </label>
                <input
                  required
                  name="cgpa"
                  placeholder="e.g. 3.75 / 4.00"
                  className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
                />
              </div>
            </div>

            {/* DEDICATED RESUME / CV PDF UPLOADER */}
            <div className="p-4 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] space-y-3">
              <label className="block text-xs font-mono uppercase text-[var(--theme-text-primary)] font-bold flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[var(--theme-accent)]" /> 
                  Upload Resume / CV / Academic Transcript (PDF)
                </span>
                <span className="text-[10px] text-[var(--theme-text-muted)] font-normal">Max 25MB</span>
              </label>

              {!pdfUrl ? (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-[var(--theme-border)] hover:border-[var(--theme-accent)] rounded-xl p-5 cursor-pointer bg-[var(--theme-card)]/50 transition group text-center">
                  {uploadingPdf ? (
                    <div className="flex flex-col items-center gap-2 text-xs font-mono text-[var(--theme-accent)]">
                      <Loader2 className="w-6 h-6 animate-spin" />
                      <span>Uploading resume to cloud...</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-6 h-6 text-[var(--theme-text-muted)] group-hover:text-[var(--theme-accent)] transition mb-1" />
                      <span className="text-xs font-medium text-[var(--theme-text-primary)]">
                        Click or tap to upload CV / Portfolio PDF
                      </span>
                      <span className="text-[10px] text-[var(--theme-text-muted)] font-mono mt-0.5">
                        Accepts PDF documents
                      </span>
                    </>
                  )}
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    disabled={uploadingPdf}
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload(file);
                    }}
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-3 rounded-lg bg-[var(--theme-accent)]/10 border border-[var(--theme-accent)]/40">
                  <div className="flex items-center gap-2 text-xs font-mono text-[var(--theme-accent)] truncate">
                    <FileCheck2 className="w-4 h-4 shrink-0" />
                    <span className="font-bold truncate">{pdfName}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPdfUrl('');
                      setPdfName('');
                    }}
                    className="p-1 rounded hover:bg-rose-500/20 text-rose-400 transition"
                    title="Remove attached PDF"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                Portfolio / GitHub / Behance Link (Optional)
              </label>
              <input
                name="portfolioUrl"
                placeholder="https://drive.google.com/... or https://behance.net/..."
                className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)] font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-[var(--theme-text-secondary)] mb-1">
                Statement of Purpose & Technical Skills *
              </label>
              <textarea
                required
                name="scope"
                rows={4}
                placeholder="Detail software proficiencies (ETABS, SAP2000, Revit, AutoCAD), desired duration, and what you aim to achieve at MENEN Engineering PLC..."
                className="w-full bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-lg px-3.5 py-2 text-xs text-[var(--theme-text-primary)] focus:outline-none focus:border-[var(--theme-accent)]"
              />
            </div>
          </>
        )}

        {/* Submit Action */}
        <button
          type="submit"
          disabled={loading || uploadingPdf}
          className="w-full py-3.5 rounded-lg bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Processing Transmission...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> 
              {submissionType === 'INTERNSHIP' 
                ? 'Transmit Internship Profile to MENEN Board' 
                : 'Transmit Project Dossier & PDF to MENEN Board'}
            </>
          )}
        </button>
      </form>
    </div>
  );
}