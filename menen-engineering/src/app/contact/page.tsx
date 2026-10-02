import React from 'react';
import { prisma } from '@/lib/prisma';
import { MapPin, Phone, Mail, Award, Clock, Compass } from 'lucide-react';

export const revalidate = 60;

export default async function ContactPage() {
  let config = {
    companyName: 'MENEN Engineering PLC',
    primaryPhone: '+251 920 517 606',
    secondaryPhone: '+251 913 034 623',
    primaryEmail: 'habtamuengr@gmail.com',
    officeAddress: 'Wello Sefer, behind Garad Mall, GS Building, 2nd Floor Office @ Menen Engineering PLC, Addis Ababa, Ethiopia',
  };

  try {
    const dbConfig = await prisma.siteConfig.findUnique({
      where: { id: 'global_config' },
    });
    if (dbConfig) {
      config = {
        companyName: dbConfig.companyName,
        primaryPhone: dbConfig.primaryPhone,
        secondaryPhone: dbConfig.secondaryPhone,
        primaryEmail: dbConfig.primaryEmail,
        officeAddress: dbConfig.officeAddress,
      };
    }
  } catch (e) {
    console.warn('Contact page fallback:', e);
  }

  return (
    <div className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <div className="border-b border-[var(--theme-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
          Headquarters & Inquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-primary)] tracking-tight mt-2">
          Connect with MENEN Engineering PLC
        </h1>
        <p className="mt-3 text-sm text-[var(--theme-text-secondary)] max-w-2xl leading-relaxed">
          Reach out for project consultations, architectural reviews, structural design packages, or partnership opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-8 rounded-2xl space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--theme-surface)] text-[var(--theme-accent)] border border-[var(--theme-border)]">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">Head Office Address</h4>
              <p className="text-sm font-semibold text-[var(--theme-text-primary)] mt-1 leading-relaxed">
                {config.officeAddress}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--theme-surface)] text-[var(--theme-accent)] border border-[var(--theme-border)]">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">Direct Phone Lines</h4>
              <p className="text-sm font-mono text-[var(--theme-text-primary)] mt-1 font-semibold">
                {config.primaryPhone}
              </p>
              <p className="text-xs font-mono text-[var(--theme-text-secondary)] mt-0.5">
                {config.secondaryPhone}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-[var(--theme-surface)] text-[var(--theme-accent)] border border-[var(--theme-border)]">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--theme-text-muted)]">Direct Corporate Email</h4>
              <p className="text-sm font-mono text-[var(--theme-text-primary)] mt-1 font-semibold">
                {config.primaryEmail}
              </p>
              <span className="text-[11px] text-[var(--theme-text-muted)] mt-1 block">
                Contact Person: Eng. Habtamu Getu (CEO & Practicing Professional Structural Engineer)
              </span>
            </div>
          </div>
        </div>

        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-8 rounded-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">Category 1 Engineering Practice</h3>
            <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
              MENEN Engineering PLC is fully licensed to render consultancy services in design, construction supervision, and contract administration across residential, commercial, industrial, healthcare, and historic conservation sectors throughout Ethiopia.
            </p>
            <div className="mt-6 space-y-2 text-xs font-mono text-[var(--theme-text-muted)]">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[var(--theme-accent)]" /> Monday – Saturday: 8:30 AM – 5:30 PM (EAT)
              </div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[var(--theme-accent)]" /> Wello Sefer Commercial Corridor
              </div>
            </div>
          </div>

          <a
            href="/submit-project"
            className="w-full mt-6 py-3 rounded-lg bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider text-center block hover:opacity-90 transition"
          >
            Initiate Project Brief &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}