import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import CeoInteractiveDossier from '@/components/team/CeoInteractiveDossier';
import { 
  Users, 
  Building2, 
  Linkedin, 
  Facebook,
  Mail, 
  Phone, 
  GraduationCap, 
  Award,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function TeamPage() {
  let teamMembers: any[] = [];

  try {
    teamMembers = await prisma.teamMember.findMany({
      orderBy: [{ isExecutive: 'desc' }, { order: 'asc' }],
    });
  } catch (error) {
    console.error('Failed to load team from database:', error);
  }

  return (
    <div className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* 1. Header Banner */}
      <div className="border-b border-[var(--theme-border)] pb-8">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold flex items-center gap-1.5">
          <Users className="w-4 h-4" /> Technical Leadership & Consultative Board
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--theme-text-primary)] tracking-tight mt-2">
          Specialists, Engineers & Architects
        </h1>
        <p className="mt-3 text-sm text-[var(--theme-text-secondary)] max-w-3xl leading-relaxed">
          MENEN Engineering PLC deploys a multi-disciplinary team combining advanced postgraduate research from Chalmers University of Technology (Sweden), Università degli Studi di Messina (Italy), and Addis Ababa Institute of Technology with extensive domestic and international engineering practice.
        </p>
      </div>

      {/* 2. Flagship Interactive Executive AI Dossier (Eng. Habtamu Getu) */}
      <section id="ceo-dossier" className="scroll-mt-24">
        <CeoInteractiveDossier />
      </section>

      {/* 3. Section Title for Full Team Directory */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--theme-border)] pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
            Personnel Directory
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-primary)] mt-1">
            Registered Specialists & Executives
          </h2>
        </div>
        <p className="text-xs font-mono text-[var(--theme-text-muted)]">
          Category 1 Certified Board & Technical Leads
        </p>
      </div>

      {/* 4. Team Profiles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.length > 0 ? (
          teamMembers.map((member) => {
            const isCeo = member.name?.toLowerCase().includes('habtamu');

            return (
              <div
                key={member.id}
                className={`bg-[var(--theme-card)] border rounded-2xl p-6 flex flex-col justify-between transition group shadow-sm ${
                  isCeo 
                    ? 'border-[var(--theme-accent)]/80 ring-1 ring-[var(--theme-accent)]/40 hover:border-[var(--theme-accent)]' 
                    : 'border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60'
                }`}
              >
                <div>
                  {/* Photo / CAD Avatar Container */}
                  <div className="w-full h-64 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] mb-5 overflow-hidden flex items-center justify-center relative">
                    {member.avatarUrl ? (
                      <img
                        src={member.avatarUrl}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="text-center p-6 select-none">
                        <div className="w-14 h-14 rounded-full border border-[var(--theme-accent)]/40 bg-[var(--theme-card)] flex items-center justify-center mx-auto mb-2 text-[var(--theme-accent)] shadow-inner">
                          <Building2 className="w-7 h-7 stroke-1" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)]">
                          Certified Practice Profile
                        </span>
                      </div>
                    )}

                    <div className="absolute top-3 right-3 bg-[var(--theme-surface)]/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-mono text-[var(--theme-accent)] border border-[var(--theme-border)] font-bold">
                      {isCeo ? 'General Manager / CEO' : (member.department || 'Executive')}
                    </div>
                  </div>

                  {/* Identity & Role */}
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition">
                      {member.name}
                    </h3>
                    {isCeo && (
                      <span className="text-[10px] font-mono uppercase bg-[var(--theme-accent)] text-black px-1.5 py-0.5 rounded font-extrabold" title="Verified General Manager">
                        CEO
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-mono text-[var(--theme-accent)] font-semibold mt-1">
                    {member.roleTitle}
                  </p>

                  {/* Academic Qualifications */}
                  <div className="mt-3 p-2.5 rounded-lg bg-[var(--theme-surface)] border border-[var(--theme-border)] text-xs text-[var(--theme-text-secondary)] font-mono flex items-start gap-2">
                    <GraduationCap className="w-4 h-4 text-[var(--theme-accent)] shrink-0 mt-0.5" />
                    <span className="leading-snug">{member.credentials}</span>
                  </div>

                  {/* Narrative Bio */}
                  <p className="mt-4 text-xs text-[var(--theme-text-muted)] leading-relaxed whitespace-pre-line">
                    {member.bio}
                  </p>
                </div>

                {/* Footer Toolbar: Contacts, Social & AI Assistant Trigger */}
                <div className="mt-6 pt-4 border-t border-[var(--theme-border)] space-y-3">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      {/* LinkedIn */}
                      {member.linkedinUrl && (
                        <a
                          href={member.linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:text-[#0a66c2] border border-[var(--theme-border)] transition"
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {/* Facebook (For CEO) */}
                      {isCeo && (
                        <a
                          href="https://www.facebook.com/habtamu.getu.984"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:text-[#1877f2] border border-[var(--theme-border)] transition"
                          title="Personal Facebook"
                        >
                          <Facebook className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {/* Email */}
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="p-1.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] transition"
                          title={member.email}
                        >
                          <Mail className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {/* Phone */}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="p-1.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:text-[var(--theme-accent)] border border-[var(--theme-border)] transition"
                          title={member.phone}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <Link
                      href="/submit-project"
                      className="text-[var(--theme-accent)] hover:underline flex items-center gap-1 font-semibold"
                    >
                      Consult <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Interactive AI Shortcut for CEO */}
                  {isCeo && (
                    <a
                      href="#ceo-dossier"
                      className="block w-full text-center py-2 rounded-lg bg-[var(--theme-surface)] hover:bg-[var(--theme-accent)]/15 border border-[var(--theme-accent)]/40 text-[var(--theme-accent)] font-mono text-[11px] font-bold uppercase transition"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" /> Consult Executive AI Dossier &uarr;
                      </span>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-3 text-center py-24 bg-[var(--theme-card)] border border-dashed border-[var(--theme-border)] rounded-2xl text-[var(--theme-text-muted)] space-y-3">
            <Award className="w-12 h-12 text-[var(--theme-accent)]/50 mx-auto stroke-1" />
            <p className="text-sm font-semibold text-[var(--theme-text-primary)]">
              No team profiles found in database.
            </p>
            <p className="text-xs font-mono">
              Add personnel from the Admin Portal or run database seeds.
            </p>
          </div>
        )}
      </div>

    </div>
  );
}