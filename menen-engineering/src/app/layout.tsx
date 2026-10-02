import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import ThemeSwitcher from '@/components/layout/ThemeSwitcher';
import SecretAdminTrigger from '@/components/layout/SecretAdminTrigger';
import { prisma } from '@/lib/prisma';

export const metadata: Metadata = {
  title: 'MENEN Engineering PLC | Category One Architectural & Engineering Design Firm',
  description: "It's all about commitment! Delivering well-targeted, unique architectural, structural, and masterplan solutions in Addis Ababa and beyond.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch primary configuration dynamically with robust fallback
  let config = {
    companyName: 'MENEN Engineering PLC',
    motto: "It's all about commitment!",
    primaryPhone: '+251 920 517 606',
    secondaryPhone: '+251 913 034 623',
    primaryEmail: 'habtamuengr@gmail.com',
    officeAddress: 'Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office @ Menen Engineering PLC, Addis Ababa, Ethiopia',
    activeTheme: 'OBSIDIAN_GOLD',
  };

  try {
    const dbConfig = await prisma.siteConfig.findUnique({
      where: { id: 'global_config' },
    });
    if (dbConfig) {
      config = {
        companyName: dbConfig.companyName || config.companyName,
        motto: dbConfig.motto || config.motto,
        primaryPhone: dbConfig.primaryPhone || config.primaryPhone,
        secondaryPhone: dbConfig.secondaryPhone || config.secondaryPhone,
        primaryEmail: dbConfig.primaryEmail || config.primaryEmail,
        officeAddress: dbConfig.officeAddress || config.officeAddress,
        activeTheme: dbConfig.activeTheme || config.activeTheme,
      };
    }
  } catch (e) {
    // Graceful fallback to static configuration if database is initializing
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        data-theme={config.activeTheme} 
        className="flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        {/* Top Architectural Notice Bar */}
        <div className="bg-[var(--theme-card)] border-b border-[var(--theme-border)] text-[11px] py-1 px-4 text-center font-mono text-[var(--theme-text-secondary)] flex justify-between items-center max-w-7xl mx-auto w-full">
          <span className="truncate">
            <strong className="text-[var(--theme-accent)]">{config.companyName}</strong> — Category One Engineering Consultants
          </span>
          <span className="hidden md:inline text-[var(--theme-text-muted)] italic">
            &ldquo;{config.motto}&rdquo;
          </span>
          <span className="hidden sm:inline text-[var(--theme-accent)] font-semibold">
            {config.primaryPhone}
          </span>
        </div>

        {/* Global Navigation Header */}
        <header className="sticky top-0 z-40 backdrop-blur-md bg-[var(--theme-bg)]/90 border-b border-[var(--theme-border)]">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
            <Link href="/" className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-wider text-[var(--theme-text-primary)]">
                MENEN <span className="text-[var(--theme-accent)] font-light">ENGINEERING</span>
              </span>
              <span className="text-[9px] font-mono text-[var(--theme-text-muted)] tracking-widest uppercase">
                PLC • ARCHITECTS &amp; CONSULTANTS
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-[var(--theme-text-secondary)]">
              <Link href="/projects" className="hover:text-[var(--theme-accent)] transition">Projects</Link>
              <Link href="/team" className="hover:text-[var(--theme-accent)] transition">Specialists &amp; Team</Link>
              <Link href="/submit-project" className="hover:text-[var(--theme-accent)] transition">Submit Brief</Link>
              <Link href="/contact" className="hover:text-[var(--theme-accent)] transition">Contact</Link>
            </nav>

            <div className="flex items-center gap-3">
              <ThemeSwitcher />
              <Link
                href="/submit-project"
                className="hidden sm:inline-block px-3.5 py-1.5 rounded text-xs font-bold bg-[var(--theme-accent)] text-black hover:opacity-90 transition font-mono"
              >
                Request Proposal
              </Link>
            </div>
          </div>
        </header>

        {/* Dynamic Route Content */}
        <main className="flex-1">
          {children}
        </main>

        {/* Corporate Architectural Footer */}
        <footer className="border-t border-[var(--theme-border)] bg-[var(--theme-surface)] py-12 px-4 text-xs text-[var(--theme-text-secondary)]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-[var(--theme-text-primary)] tracking-wide">
                {config.companyName}
              </h4>
              <p className="text-[11px] leading-relaxed text-[var(--theme-text-muted)]">
                Category One Architectural and Engineering Consultancy Firm established in 2021 by Eng. Habtamu Getu and Arch. Samiel Musolino.
              </p>
              <p className="text-[10px] font-mono text-[var(--theme-accent)]">
                Addis Ababa • Ethiopia
              </p>
            </div>

            <div>
              <h5 className="font-semibold text-xs text-[var(--theme-text-primary)] uppercase tracking-wider mb-3">
                Key Services
              </h5>
              <ul className="space-y-1.5 text-[11px] text-[var(--theme-text-muted)]">
                <li>Architectural &amp; Structural Design</li>
                <li>Design Permitting &amp; Approvals</li>
                <li>Historic &amp; Heritage Conservation</li>
                <li>BOQ &amp; Contract Administration</li>
                <li>3D Visualization, VR &amp; Animations</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-xs text-[var(--theme-text-primary)] uppercase tracking-wider mb-3">
                Typologies
              </h5>
              <ul className="space-y-1.5 text-[11px] text-[var(--theme-text-muted)]">
                <li>Mixed Use (MXD) &amp; High-Rises</li>
                <li>Apartments &amp; Real Estate (APT / RLS)</li>
                <li>Hospitality &amp; Hotels (HSP)</li>
                <li>Institutions &amp; Border Stations (STR)</li>
                <li>Interior Architecture (INT)</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold text-xs text-[var(--theme-text-primary)] uppercase tracking-wider mb-3">
                Head Office
              </h5>
              <p className="text-[11px] text-[var(--theme-text-muted)] leading-relaxed">
                {config.officeAddress}
              </p>
              <p className="mt-2 text-[11px] text-[var(--theme-accent)] font-mono">
                {config.primaryPhone} / {config.secondaryPhone}
              </p>
              <p className="text-[11px] text-[var(--theme-text-muted)] font-mono">
                {config.primaryEmail}
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 border-t border-[var(--theme-border)] flex flex-col sm:flex-row justify-between items-center text-[10px] text-[var(--theme-text-muted)] gap-2">
            <p>© 2026 {config.companyName}. All rights reserved.</p>
            <p className="font-mono">SRS 2026 High Performance Architecture Framework</p>
          </div>
        </footer>

        {/* Discreet Secret Key Trigger for Admin Portal */}
        <SecretAdminTrigger />
      </body>
    </html>
  );
}