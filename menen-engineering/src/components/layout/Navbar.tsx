'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Key, Phone, Home } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  companyName: string;
  primaryPhone: string;
}

export default function Navbar({ companyName, primaryPhone }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--theme-bg)]/95 border-b border-[var(--theme-border)]">
      <div className="max-w-7xl mx-auto px-4 h-20 sm:h-24 flex items-center justify-between gap-4">
        
        {/* Left Side: Full Visible Logo + Title (clicking always redirects home) */}
        <Link href="/" className="flex items-center gap-3.5 group shrink-0">
          <div className="relative w-28 sm:w-36 lg:w-44 h-12 sm:h-14 lg:h-16 rounded-xl overflow-hidden bg-white p-1 border border-[var(--theme-border)] group-hover:border-[var(--theme-accent)] transition shadow-sm flex items-center justify-center">
            <Image
              src="/images/Screenshot_3-10-2026_95945_.jpeg"
              alt="MENEN Engineering Logo"
              fill
              unoptimized
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-extrabold text-base sm:text-xl tracking-wider text-[var(--theme-text-primary)]">
              MENEN <span className="text-[var(--theme-accent)] font-light">ENGINEERING</span>
            </span>
            <span className="text-[8px] sm:text-[9px] font-mono text-[var(--theme-text-muted)] tracking-widest uppercase font-semibold">
              PLC • ARCHITECTS &amp; CONSULTANTS
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-secondary)]">
          <Link 
            href="/" 
            className="flex items-center gap-1.5 hover:text-[var(--theme-accent)] transition"
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </Link>
          <Link href="/projects" className="hover:text-[var(--theme-accent)] transition">
            Projects
          </Link>
          <Link href="/team" className="hover:text-[var(--theme-accent)] transition">
            Specialists &amp; Team
          </Link>
          <Link href="/submit-project" className="hover:text-[var(--theme-accent)] transition">
            Submit Brief
          </Link>
          <Link href="/contact" className="hover:text-[var(--theme-accent)] transition">
            Contact
          </Link>
        </nav>

        {/* Right Side Actions: Theme, Key-only Admin, Mobile Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />

          {/* Key-Only Admin Button */}
          <Link
            href="/admin/login"
            aria-label="Admin Portal"
            title="Administrator Portal"
            className="p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:text-[var(--theme-accent)] hover:border-[var(--theme-accent)] text-[var(--theme-text-secondary)] transition flex items-center justify-center cursor-pointer shadow-sm"
          >
            <Key className="w-4 h-4 text-[var(--theme-accent)]" />
          </Link>

          {/* Proposal CTA (Hidden on mobile) */}
          <Link
            href="/submit-project"
            className="hidden sm:inline-block px-4 py-2.5 rounded-xl text-xs font-bold bg-[var(--theme-accent)] text-black hover:opacity-90 transition font-mono tracking-wider uppercase shadow"
          >
            Request Proposal
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)] transition cursor-pointer"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[var(--theme-accent)]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Top-Down Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--theme-border)] bg-[var(--theme-card)]/98 px-5 py-6 space-y-4 shadow-2xl backdrop-blur-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-2 text-sm font-mono uppercase tracking-wider font-semibold border-b border-[var(--theme-border)] pb-4">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[var(--theme-surface)]/60 text-[var(--theme-accent)] font-bold transition"
            >
              <Home className="w-4 h-4" />
              Home
            </Link>
            <Link
              href="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[var(--theme-surface)] text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition"
            >
              Projects
            </Link>
            <Link
              href="/team"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[var(--theme-surface)] text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition"
            >
              Specialists &amp; Team
            </Link>
            <Link
              href="/submit-project"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[var(--theme-surface)] text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition"
            >
              Submit Brief
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2.5 rounded-lg hover:bg-[var(--theme-surface)] text-[var(--theme-text-primary)] hover:text-[var(--theme-accent)] transition"
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Quick Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-1">
            <a
              href={`tel:${primaryPhone.replace(/\s+/g, '')}`}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xs font-mono text-[var(--theme-accent)] font-bold"
            >
              <Phone className="w-3.5 h-3.5" /> Direct Call: {primaryPhone}
            </a>
            <Link
              href="/submit-project"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-xl text-xs font-bold font-mono bg-[var(--theme-accent)] text-black uppercase tracking-wider"
            >
              Request Proposal / Submit Brief
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}