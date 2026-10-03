import React from 'react';
import Link from 'next/link';
import { prisma } from '@/lib/prisma';
import BlueprintPlaceholder from '@/components/projects/BlueprintPlaceholder';
import FloatingCeoDossier from '@/components/team/FloatingCeoDossier';
import { 
  Building2, 
  Award, 
  MapPin, 
  Layers, 
  Compass, 
  FileCheck, 
  Eye, 
  CheckCircle2,
  Linkedin,
  Users
} from 'lucide-react';

// Force dynamic fetch to ensure real-time Cloudinary and database updates
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  let dynamicContentMap: Record<string, string> = {};
  let featuredProjects: any[] = [];
  let leadershipTeam: any[] = [];

  try {
    const contents = await prisma.dynamicContent.findMany();

    // Query 9 projects at once for a complete 3x3 portfolio showcase
    const projects = await prisma.project.findMany({
      orderBy: [{ isFeatured: 'desc' }, { order: 'asc' }],
      take: 9,
    });

    const team = await prisma.teamMember.findMany({
      orderBy: [{ isExecutive: 'desc' }, { order: 'asc' }],
      take: 6,
    });

    dynamicContentMap = contents.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {} as Record<string, string>);

    featuredProjects = projects;
    leadershipTeam = team;
  } catch (error) {
    console.warn('Database query fallback triggered on landing page:', error);
  }

  const txt = (key: string, fallback: string) => dynamicContentMap[key] || fallback;

  const coreServices = [
    { title: "Preliminary & Working Designs", desc: "Architectural, structural, sanitary, electrical, and mechanical design services.", icon: Compass },
    { title: "3D Rendering, Animation & VR", desc: "Interactive Virtual Reality presentations and realistic architectural animations.", icon: Eye },
    { title: "Structural Analysis & Conservation", desc: "Historic restoration and high-rise structural stability modeling.", icon: Building2 },
    { title: "Technical Specifications & BOQ", desc: "Comprehensive Bill of Quantities, cost estimation, and tender preparation.", icon: FileCheck },
    { title: "Contract Administration & Supervision", desc: "Full-scale construction supervision, inspection, and interim/final payments.", icon: CheckCircle2 },
    { title: "Design Review & Permit Approvals", desc: "Regulatory code verification and seamless municipal permit navigation.", icon: Layers },
  ];

  return (
    <div className="space-y-24 pb-20 selection:bg-[var(--theme-accent)] selection:text-black">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div 
          className="absolute inset-0 pointer-events-none opacity-5 -z-10"
          style={{
            backgroundImage: `radial-gradient(var(--theme-accent) 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-accent)] text-xs font-mono uppercase tracking-wider mb-6 shadow-sm">
          <Award className="w-3.5 h-3.5 shrink-0" />
          <span>{txt('hero_badge', 'Category One Architectural & Engineering Firm — Addis Ababa')}</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--theme-text-primary)] leading-[1.1] max-w-5xl mx-auto">
          {txt('hero_title', 'Architectural Excellence & Resilient Structural Engineering')}
        </h1>

        <p className="mt-6 text-base sm:text-xl text-[var(--theme-text-secondary)] max-w-3xl mx-auto leading-relaxed">
          {txt('hero_lead', 'MENEN Engineering PLC is set to deploy experienced professionals delivering well-targeted, unique design solutions to our clients in particular and the recipient public at large.')}
        </p>

        <div className="mt-4 text-base sm:text-lg font-serif italic text-[var(--theme-accent)] font-semibold tracking-wide">
          &ldquo;{txt('hero_motto', "It's all about commitment!")}&rdquo;
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center items-center gap-4">
          <Link
            href="/projects"
            className="px-7 py-3.5 rounded-lg bg-[var(--theme-accent)] text-black font-bold text-sm tracking-wide hover:opacity-95 transition flex items-center gap-2 shadow-lg"
          >
            Explore Portfolio &rarr;
          </Link>
          <Link
            href="/submit-project"
            className="px-7 py-3.5 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] hover:border-[var(--theme-accent)] text-[var(--theme-text-primary)] font-medium text-sm transition shadow-sm"
          >
            Submit Project Brief
          </Link>
          <Link
            href="/team"
            className="px-7 py-3.5 rounded-lg text-xs font-mono text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition"
          >
            View Specialists &rarr;
          </Link>
        </div>

        {/* Statistical Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-8 border-t border-[var(--theme-border)]">
          <div className="p-4 rounded-lg bg-[var(--theme-surface)]/40 border border-[var(--theme-border)]">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[var(--theme-accent)] font-mono">Cat 1</span>
            <span className="text-[11px] uppercase tracking-wider text-[var(--theme-text-muted)] font-mono">Certified Practice</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--theme-surface)]/40 border border-[var(--theme-border)]">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-primary)] font-mono">100k+ m²</span>
            <span className="text-[11px] uppercase tracking-wider text-[var(--theme-text-muted)] font-mono">Plot Range Masterplans</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--theme-surface)]/40 border border-[var(--theme-border)]">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[var(--theme-accent)] font-mono">37+</span>
            <span className="text-[11px] uppercase tracking-wider text-[var(--theme-text-muted)] font-mono">National Border Sites</span>
          </div>
          <div className="p-4 rounded-lg bg-[var(--theme-surface)]/40 border border-[var(--theme-border)]">
            <span className="block text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-primary)] font-mono">2021</span>
            <span className="text-[11px] uppercase tracking-wider text-[var(--theme-text-muted)] font-mono">Established in Addis</span>
          </div>
        </div>
      </section>

      {/* 2. CORPORATE PURPOSE: MISSION, VISION & ETHOS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-8 rounded-2xl relative flex flex-col justify-between hover:border-[var(--theme-accent)]/50 transition">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
                Vision
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mt-2">
                Unconditional Modernity
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                {txt('vision_statement', 'To provide best professional services with state-of-the-art solutions irrespective of project size or profitability. We believe in adaptability as an unconditional ability of this time of great changes, among all the conditions of new modernity.')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--theme-border)] text-[10px] font-mono text-[var(--theme-text-muted)]">
              ADAPTABILITY &bull; INNOVATION
            </div>
          </div>

          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-8 rounded-2xl relative flex flex-col justify-between hover:border-[var(--theme-accent)]/50 transition">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
                Mission
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mt-2">
                Integrity & Opportunity
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                {txt('mission_statement', 'MENEN Engineering is committed to consistent improvement of its professional services through high level of professional integrity and commitment by creating opportunities for young and competitive professionals to apply their knowledge towards development and service of society.')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--theme-border)] text-[10px] font-mono text-[var(--theme-text-muted)]">
              SOCIETAL VALUE &bull; YOUTH EMPOWERMENT
            </div>
          </div>

          <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-8 rounded-2xl relative flex flex-col justify-between hover:border-[var(--theme-accent)]/50 transition">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
                Values
              </span>
              <h3 className="text-xl font-bold text-[var(--theme-text-primary)] mt-2">
                Partnership & Privacy
              </h3>
              <p className="mt-4 text-xs sm:text-sm text-[var(--theme-text-secondary)] leading-relaxed">
                {txt('values_statement', 'Carry out our responsibilities in a spirit of partnership with our clients and commit ourselves to consulting services characterized by quality, honesty, and uncompromising client privacy.')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[var(--theme-border)] text-[10px] font-mono text-[var(--theme-text-muted)]">
              HONESTY &bull; CLIENT CONFIDENTIALITY
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE PROPOSED EXPERTISE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
            Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-primary)] mt-2">
            Scope of Architectural & Engineering Services
          </h2>
          <p className="mt-3 text-sm text-[var(--theme-text-secondary)]">
            Covering full life-cycle infrastructure design, from 75 m² bespoke residences to 100,000 m² developments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]/60 transition group"
              >
                <div className="w-10 h-10 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] flex items-center justify-center text-[var(--theme-accent)] mb-4 group-hover:scale-105 transition">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-[var(--theme-text-primary)]">
                  {service.title}
                </h3>
                <p className="text-xs text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
                  {service.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED LANDMARK PROJECTS (9 PROJECTS GRID) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
              Masterworks Portfolio
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-primary)] mt-1">
              Selected Landmark Projects ({featuredProjects.length})
            </h2>
            <p className="text-xs text-[var(--theme-text-secondary)] mt-1">
              Schematic prize winners, high-rises, hotels, and national infrastructure across Ethiopia.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-bold font-mono text-[var(--theme-accent)] hover:underline"
          >
            All 19+ Projects Dossier &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.length > 0 ? (
            featuredProjects.map((p) => {
              // Valid Cloudinary CDN check
              const validImage = p.featuredImage && 
                !p.featuredImage.startsWith('/uploads/') && 
                !p.featuredImage.includes('/images/projects/placeholders/') 
                ? p.featuredImage 
                : null;

              return (
                <div
                  key={p.id}
                  className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-2xl overflow-hidden hover:border-[var(--theme-accent)] transition flex flex-col justify-between group shadow-sm"
                >
                  <div className="relative aspect-[16/10] bg-[var(--theme-surface)] overflow-hidden">
                    {validImage ? (
                      <img
                        src={validImage}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <BlueprintPlaceholder title={p.title} category={p.category} />
                    )}

                    <div className="absolute top-3 right-3 bg-[var(--theme-surface)]/90 backdrop-blur-md px-2 py-1 rounded text-[10px] font-mono text-[var(--theme-accent)] border border-[var(--theme-border)] font-bold">
                      {p.category}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {p.awards && (
                        <div className="flex items-center gap-1.5 text-[11px] text-[var(--theme-accent)] font-semibold mb-2 font-mono">
                          <Award className="w-3.5 h-3.5 shrink-0" />
                          <span className="truncate">{p.awards}</span>
                        </div>
                      )}

                      <h3 className="text-lg font-bold text-[var(--theme-text-primary)] group-hover:text-[var(--theme-accent)] transition">
                        {p.title}
                      </h3>

                      <p className="text-xs text-[var(--theme-text-secondary)] mt-1.5">
                        Client: <span className="font-semibold text-[var(--theme-text-primary)]">{p.client}</span>
                      </p>

                      <p className="text-xs text-[var(--theme-text-muted)] mt-2.5 line-clamp-2 leading-relaxed">
                        {p.scopeOfWork}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between text-xs font-mono">
                      <span className="text-[var(--theme-text-muted)] flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[var(--theme-accent)]" /> {p.location}
                      </span>
                      <Link
                        href={`/projects/${p.slug}`}
                        className="text-[var(--theme-accent)] font-semibold hover:underline"
                      >
                        Dossier &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-3 text-center py-12 text-sm text-[var(--theme-text-muted)] border border-dashed border-[var(--theme-border)] rounded-2xl">
              Projects catalog is loading or syncing with database.
            </div>
          )}
        </div>
      </section>

      {/* 5. LEADERSHIP & SPECIALISTS HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
            Founders & Directors
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--theme-text-primary)] mt-2">
            Engineering & Design Leadership
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[var(--theme-text-secondary)]">
            A combination of international postgraduate training and extensive domestic practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadershipTeam.map((leader) => {
            const validAvatar = leader.avatarUrl && !leader.avatarUrl.startsWith('/uploads/') ? leader.avatarUrl : null;
            return (
              <div
                key={leader.id}
                className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-6 rounded-2xl flex flex-col justify-between hover:border-[var(--theme-accent)]/60 transition group shadow-sm"
              >
                <div>
                  <div className="w-full h-56 rounded-xl bg-[var(--theme-surface)] border border-[var(--theme-border)] mb-5 overflow-hidden flex items-center justify-center relative">
                    {validAvatar ? (
                      <img src={validAvatar} alt={leader.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-4">
                        <div className="w-12 h-12 rounded-full border border-[var(--theme-accent)]/40 bg-[var(--theme-card)] flex items-center justify-center mx-auto mb-2 text-[var(--theme-accent)]">
                          <Users className="w-6 h-6 stroke-1" />
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--theme-text-muted)]">
                          Profile Verified
                        </span>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-[var(--theme-text-primary)]">
                    {leader.name}
                  </h3>
                  <p className="text-xs font-mono text-[var(--theme-accent)] mt-0.5">
                    {leader.roleTitle}
                  </p>

                  <div className="mt-3 p-2 rounded bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[11px] text-[var(--theme-text-muted)] font-mono">
                    {leader.credentials}
                  </div>

                  <p className="mt-4 text-xs text-[var(--theme-text-secondary)] line-clamp-4 leading-relaxed">
                    {leader.bio}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[var(--theme-border)] flex items-center justify-between">
                  <Link
                    href="/team"
                    className="text-xs text-[var(--theme-text-primary)] font-semibold hover:text-[var(--theme-accent)] transition"
                  >
                    Full Bio & Portfolio &rarr;
                  </Link>

                  {leader.linkedinUrl && (
                    <a
                      href={leader.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded bg-[var(--theme-surface)] text-[var(--theme-text-muted)] hover:text-[#0077b5] border border-[var(--theme-border)] transition"
                      title="Verified LinkedIn"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] p-8 sm:p-12 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--theme-accent)] font-semibold">
              Ready to Build?
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--theme-text-primary)] mt-1">
              Have an Architectural or Structural Project in Mind?
            </h2>
            <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] mt-2 leading-relaxed">
              Submit your project brief with specifications, site dimensions, or multimedia walkthroughs. Eng. Habtamu Getu and our engineering board will review and furnish an analysis.
            </p>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row gap-3">
            <Link
              href="/submit-project"
              className="px-6 py-3 rounded-lg bg-[var(--theme-accent)] text-black font-bold text-xs uppercase tracking-wider hover:opacity-90 transition text-center shadow-lg"
            >
              Submit Project Brief
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-lg border border-[var(--theme-border)] bg-[var(--theme-surface)] text-[var(--theme-text-primary)] font-semibold text-xs uppercase tracking-wider hover:border-[var(--theme-accent)] transition text-center"
            >
              Contact Office
            </Link>
          </div>
          {/* Eng. Habtamu Getu Executive Dossier (Bottom Right) */}
      <FloatingCeoDossier />
        </div>
      </section>

    </div>
  );
}