import React from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight,
  Compass,
  FileCheck2
} from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Page Header */}
      <div className="border-b border-[var(--theme-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold flex items-center gap-1.5">
          <Building2 className="w-4 h-4" /> Corporate Profile & Practice Overview
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-primary)] tracking-tight mt-2">
          Engineering Excellence & Architectural Integrity
        </h1>
        <p className="mt-3 text-sm text-[var(--theme-text-secondary)] max-w-3xl leading-relaxed">
          MENEN Engineering PLC is a Category 1 architectural and consulting engineering practice in Addis Ababa, Ethiopia. We combine European postgraduate structural research with deep domestic engineering delivery.
        </p>
      </div>

      {/* 2. Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)]">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">Category 1 Certification</h3>
          <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">
            Fully licensed and certified to undertake complex high-rise towers, multi-typology urban masterplans, and critical public infrastructure across Ethiopia.
          </p>
        </div>

        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)]">
            <Compass className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">Advanced Computational FEA</h3>
          <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">
            Equipped with non-linear finite element modeling (Tekla, Abaqus, ETABS, DIANA) for non-linear seismic analysis, lateral torsional buckling, and subterranean basement design.
          </p>
        </div>

        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)]">
            <FileCheck2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">Historic Conservation</h3>
          <p className="text-xs text-[var(--theme-text-muted)] leading-relaxed">
            Distinguished track record preserving national landmarks including the Grand National Palace Visitors Pavilion, Holy Trinity Cathedral, and regional heritage sites.
          </p>
        </div>
      </div>

      {/* 3. Company Vision & Methodology */}
      <div className="bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-3xl p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl font-bold text-[var(--theme-text-primary)]">Our Technical Standards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-[var(--theme-text-secondary)]">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
            <span>Strict compliance with Ethiopian Building Code Standards (EBCS) and Eurocodes.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
            <span>Dynamic response analysis and Tuned Mass Damper (TMD) modeling for wind & seismic actions.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
            <span>Multi-level subterranean basement design with deep contiguous and diaphragm shoring.</span>
          </div>
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
            <span>Full-cycle BIM coordination minimizing on-site contractor clashes.</span>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
          <Link
            href="/team"
            className="text-xs font-mono font-bold text-[var(--theme-accent)] uppercase tracking-wider hover:underline flex items-center gap-1.5"
          >
            Meet the Engineering Board & Leadership <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/submit-project"
            className="px-4 py-2 rounded-xl bg-[var(--theme-accent)] text-black text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition"
          >
            Submit Project Brief
          </Link>
        </div>
      </div>

    </div>
  );
}