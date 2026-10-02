import React from 'react';
import Image from 'next/image';
import { Linkedin, Mail, Award } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  roleTitle: string;
  credentials?: string | null;
  bio: string;
  avatarUrl?: string | null;
  linkedinUrl?: string | null;
  email?: string | null;
}

export default function TeamGrid({ members }: { members: TeamMember[] }) {
  return (
    <section className="py-20 bg-slate-950 text-slate-100" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-amber-500 font-semibold tracking-wider uppercase text-sm">
            Leadership & Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-2">
            The Minds Behind MENEN Engineering
          </h2>
          <p className="text-slate-400 mt-4 leading-relaxed">
            A synergy of domestic excellence and international academic training delivering forward-thinking architectural and structural engineering solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.id}
              className="bg-slate-900/60 rounded-xl border border-slate-800 p-6 flex flex-col justify-between hover:border-amber-500/50 transition duration-300"
            >
              <div>
                <div className="relative w-full h-72 rounded-lg overflow-hidden bg-slate-800 mb-6 flex items-center justify-center">
                  {member.avatarUrl ? (
                    <Image
                      src={member.avatarUrl}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="text-slate-500 flex flex-col items-center">
                      <span className="text-xs uppercase tracking-widest text-slate-400">Photo Placeholder</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-amber-400 text-sm font-medium mt-1">{member.roleTitle}</p>

                {member.credentials && (
                  <div className="mt-3 flex items-start gap-2 text-xs text-slate-300 bg-slate-800/60 p-2 rounded border border-slate-700/50">
                    <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>{member.credentials}</span>
                  </div>
                )}

                <p className="text-slate-400 text-sm mt-4 leading-relaxed line-clamp-6 hover:line-clamp-none transition-all">
                  {member.bio}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center gap-4">
                {member.linkedinUrl && (
                  <a
                    href={member.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-[#0077b5] transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="text-slate-400 hover:text-amber-400 transition-colors"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}