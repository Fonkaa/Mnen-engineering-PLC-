'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, Key, Phone, Home } from 'lucide-react';
import ThemeSwitcher from './ThemeSwitcher';

interface NavbarProps {
  companyName?: string;
  primaryPhone?: string;
}

// -------------------------------------------------------------
// DYNAMIC AUTO-SIZING 360° CONTINUOUS ROTATING 3D LOGO
// -------------------------------------------------------------
function Dynamic360Logo() {
  const [isHovered, setIsHovered] = useState(false);

  // Logo file source - replace with your clean file path if renamed
  const logoSrc = '/images/Screenshot_3-10-2026_95945_.jpeg';

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative flex items-center justify-center select-none cursor-pointer py-1"
      style={{ perspective: '1000px' }}
    >
      {/* 360 Continuous Orbital Turntable */}
      <div
        className={`relative h-11 sm:h-13 lg:h-15 w-auto flex items-center justify-center animate-spin-360 ${
          isHovered ? 'pause-spin' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 0.4s ease',
        }}
      >
        {/* Soft Ambient Depth Glow behind the logo */}
        <div
          className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.25)_0%,rgba(0,102,204,0.2)_45%,transparent_75%)] pointer-events-none"
          style={{ transform: 'translateZ(-10px)' }}
        />

        {/* FRONT FACE (0° - 180°) */}
        <div
          className="relative h-full w-auto flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(0deg) translateZ(1px)',
          }}
        >
          <img
            src={logoSrc}
            alt="MENEN Engineering PLC Logo Front"
            className="h-full w-auto max-h-12 sm:max-h-14 lg:max-h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          />
        </div>

        {/* BACK FACE (180° - 360°): scaleX(-1) ensures letters read forwards, not mirrored */}
        <div
          className="absolute inset-0 h-full w-auto flex items-center justify-center"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) translateZ(1px)',
          }}
        >
          <img
            src={logoSrc}
            alt="MENEN Engineering PLC Logo Back"
            className="h-full w-auto max-h-12 sm:max-h-14 lg:max-h-16 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] [transform:scaleX(-1)]"
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MAIN NAVBAR
// -------------------------------------------------------------
export default function Navbar({
  companyName = 'MENEN Engineering PLC',
  primaryPhone = '+251 920 517 606',
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[var(--theme-bg)]/95 border-b border-[var(--theme-border)]">
      <div className="max-w-7xl mx-auto px-4 h-20 sm:h-24 flex items-center justify-between gap-4">
        
        {/* Left Side: 360° Rotational Logo (Dynamic width & height) */}
        <Link href="/" className="flex items-center group shrink-0">
          <Dynamic360Logo />
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

        {/* Right Side Actions: Theme Switcher, Admin Key, Proposal CTA */}
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

          {/* Proposal CTA */}
          <Link
            href="/submit-project"
            className="hidden sm:inline-block px-4 py-2.5 rounded-xl text-xs font-bold bg-[var(--theme-accent)] text-black hover:opacity-90 transition font-mono tracking-wider uppercase shadow cursor-pointer"
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

          {/* Mobile Action Buttons */}
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