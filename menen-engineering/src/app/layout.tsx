import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import SecretAdminTrigger from '@/components/layout/SecretAdminTrigger';
import { prisma } from '@/lib/prisma';
import { MapPin, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'MENEN Engineering PLC | Category One Architectural & Engineering Design Firm',
  description: "It's all about commitment! Delivering well-targeted, unique architectural, structural, and masterplan solutions in Addis Ababa and beyond.",
  verification: {
    google: 'R1TXvgqXYAIoPTKxNQkkeTNA3uT_qxwaVXIczd5UvCc',
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  // Exact Google Map URL provided
  const GOOGLE_MAPS_LOCATION_URL = 'https://maps.app.goo.gl/aZi46d5GYwmFY3BD9';

  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        data-theme={config.activeTheme} 
        className="flex flex-col min-h-screen"
        suppressHydrationWarning
      >
        {/* Top Architectural Notice Bar with Click-to-Call */}
        <div className="bg-[var(--theme-card)] border-b border-[var(--theme-border)] text-[11px] py-1.5 px-4 text-center font-mono text-[var(--theme-text-secondary)] flex justify-between items-center max-w-7xl mx-auto w-full">
          <span className="truncate">
            <strong className="text-[var(--theme-accent)]">{config.companyName}</strong> — Category One Engineering Consultants
          </span>
          <span className="hidden md:inline text-[var(--theme-text-muted)] italic">
            &ldquo;{config.motto}&rdquo;
          </span>
          <a
            href={`tel:${config.primaryPhone.replace(/\s+/g, '')}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-[var(--theme-accent)] font-semibold hover:underline"
            title="Tap to Call"
          >
            <Phone className="w-3 h-3" /> {config.primaryPhone}
          </a>
        </div>

        {/* Global Navigation Header with Dual Logo, Jambo Menu & Key-only Admin */}
        <Navbar 
          companyName={config.companyName} 
          primaryPhone={config.primaryPhone} 
        />

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
              
              {/* Exact Google Map Direct Link */}
              <a
                href={GOOGLE_MAPS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--theme-accent)] hover:underline"
              >
                <MapPin className="w-3.5 h-3.5 shrink-0" /> Open Office in Google Maps &rarr;
              </a>
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

            {/* Head Office Details with Click-to-Map, Click-to-Call, Click-to-Email */}
            <div>
              <h5 className="font-semibold text-xs text-[var(--theme-text-primary)] uppercase tracking-wider mb-3">
                Head Office
              </h5>
              <a
                href={GOOGLE_MAPS_LOCATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[11px] text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] transition leading-relaxed group"
                title="Click to open Google Maps"
              >
                <span className="group-hover:underline flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                  {config.officeAddress}
                </span>
              </a>

              <div className="mt-3 space-y-1 font-mono text-[11px]">
                <p>
                  <a
                    href={`tel:${config.primaryPhone.replace(/\s+/g, '')}`}
                    className="text-[var(--theme-accent)] hover:underline flex items-center gap-1.5"
                    title="Click to dial"
                  >
                    <Phone className="w-3 h-3" /> {config.primaryPhone}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${config.secondaryPhone.replace(/\s+/g, '')}`}
                    className="text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] flex items-center gap-1.5"
                    title="Click to dial secondary line"
                  >
                    <Phone className="w-3 h-3" /> {config.secondaryPhone}
                  </a>
                </p>
                <p className="pt-1">
                  <a
                    href={`mailto:${config.primaryEmail}`}
                    className="text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] flex items-center gap-1.5"
                    title="Click to send email"
                  >
                    <Mail className="w-3 h-3" /> {config.primaryEmail}
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto pt-6 border-t border-[var(--theme-border)] flex flex-col sm:flex-row justify-between items-center text-[10px] text-[var(--theme-text-muted)] gap-2">
            <p>© 2026 {config.companyName}. All rights reserved.</p>
            <p className="font-mono">SRS 2026 High Performance Architecture Framework</p>
          </div>
        </footer>

        {/* Discreet Trigger for Emergency Recovery */}
        {/* <SecretAdminTrigger /> */}
      </body>
    </html>
  );
}