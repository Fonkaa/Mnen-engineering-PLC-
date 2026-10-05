'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { queryCeoKnowledge } from '@/lib/ceoKnowledgeEngine';
import { 
  Sparkles, 
  Send, 
  Linkedin, 
  Facebook, 
  PhoneCall, 
  Bot, 
  User, 
  GraduationCap,
  Building2,
  Layers,
  ShieldCheck,
  FolderOpen,
  X
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// 22 Curated Pre-set Questions grouped by domain
const PRESET_GROUPS = [
  {
    group: 'Leadership & Academics',
    icon: GraduationCap,
    items: [
      { label: '🎓 Chalmers MSc (Sweden)', query: "What are Eng. Habtamu's postgraduate degrees from Chalmers University in Sweden?" },
      { label: '🏛️ Messina Seismic Safety (Italy)', query: "What specialized seismic certification did he obtain in Messina, Italy?" },
      { label: '🔬 AAiT Steel Web Thesis', query: "What was Eng. Habtamu's Master's research at Addis Ababa Institute of Technology (AAiT)?" },
      { label: '📜 Bahir Dar Civil BSc', query: "Where did Eng. Habtamu complete his undergraduate civil engineering training?" },
      { label: '💼 Career & Fasil Giorghis', query: "What historic landmark restorations did Eng. Habtamu engineer with Fasil Giorghis Consult?" },
    ]
  },
  {
    group: 'Landmark Projects',
    icon: Building2,
    items: [
      { label: '🏆 4B+G+M+23 KK Tower', query: "What are the engineering details of the 1st-Prize 4B+G+M+23 Tower for KK PLC?" },
      { label: '🏢 3B+G+22 Bullaleas Tower', query: "How did MENEN engineer the 3B+G+22 Bullaleas Luxury Apartment Tower?" },
      { label: '🌊 8 Towers Lakeside Masterplan', query: "What is the scale of the 8 Towers Lakeside Masterplan in Bahir Dar?" },
      { label: '🏛️ National Palace Visitors Pavilion', query: "What is MENEN's role in the National Palace Visitors Reception Pavilion?" },
      { label: '🛂 37 Border Clearance Stations', query: "What is the 37 Modular Border Clearance Stations project across Ethiopia?" },
      { label: '🌉 HELVETAS Trail Bridges', query: "How did he train regional road bureaus and HELVETAS in trail bridge construction?" },
    ]
  },
  {
    group: 'Technical Modeling & FEA',
    icon: Layers,
    items: [
      { label: '💻 ETABS, Abaqus & Software', query: "What finite element and structural analysis software does Eng. Habtamu use?" },
      { label: '🏗️ Deep Basement Shoring', query: "How does MENEN handle deep subterranean basements and neighbor protection?" },
      { label: '🔧 Building Retrofit & NDT', query: "Can MENEN assess cracked, damaged, or unpermitted existing buildings for retrofitting?" },
      { label: '🌲 Mass Timber & Carbon', query: "What is Eng. Habtamu's background in Mass Timber and low-carbon engineering?" },
    ]
  },
  {
    group: 'Operations, Legal & Contact',
    icon: ShieldCheck,
    items: [
      { label: '🛡️ Category 1 Legal Scope', query: "What does MENEN Engineering’s Category 1 designation legally authorize?" },
      { label: '🏛️ Municipal Permit Approvals', query: "Does MENEN handle Addis Ababa City Hall building permit approvals?" },
      { label: '📋 Bank-Grade BOQ & Tenders', query: "What is included in MENEN’s Technical Specifications and BOQ packages?" },
      { label: '👷 Resident Site Supervision', query: "Does MENEN provide resident site supervision during construction?" },
      { label: '💰 Engineering Fees & Pricing', query: "How are consulting fees structured and how fast are proposals prepared?" },
      { label: '🎓 Student Internship Program', query: "How does MENEN select and mentor university engineering interns?" },
      { label: '📞 Direct Contact & Booking', query: "What are all verified telephone numbers, emails, and physical office coordinates?" },
    ]
  }
];

export default function FloatingCeoDossier() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeGroupIndex, setActiveGroupIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Welcome! I am the verified Executive Intelligence Dossier for Eng. Habtamu Getu Mihret, Co-founder and CEO of MENEN Engineering PLC.\n\nAsk me anything regarding his postgraduate studies at Chalmers University (Sweden), seismic dynamics in Italy, high-rise structural modeling, or corporate Category 1 consulting capabilities.',
    },
  ]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  function handleSend(queryText: string) {
    const textToSend = queryText.trim();
    if (!textToSend) return;

    // Instantly retrieve verified response from local knowledge engine
    const answer = queryCeoKnowledge(textToSend);

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: textToSend },
      { role: 'assistant', content: answer },
    ]);

    setInput('');
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pop-up Dossier Modal Window */}
      {isOpen && (
        <div className="w-[94vw] sm:w-[500px] md:w-[560px] max-h-[88vh] bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-3xl overflow-hidden shadow-2xl flex flex-col mb-4 backdrop-blur-xl animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header Banner */}
          <div className="bg-[var(--theme-surface)] border-b border-[var(--theme-border)] p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex justify-between items-start gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] font-mono text-[10px] font-bold uppercase tracking-wider border border-[var(--theme-accent)]/30">
                    <Sparkles className="w-3 h-3" /> Executive Dossier
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> 24 Verified Domains
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-extrabold text-[var(--theme-text-primary)] mt-1.5">
                  Eng. Habtamu Getu Mihret
                </h2>
                <p className="text-[11px] text-[var(--theme-text-secondary)] font-mono">
                  General Manager & Lead Structural Engineer &bull; Cat 1
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-xl border border-[var(--theme-border)] bg-[var(--theme-card)] text-[var(--theme-text-muted)] hover:text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)] transition cursor-pointer"
                aria-label="Close Dossier"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Verified Social & Booking Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://www.linkedin.com/in/habtamu-mihret"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] text-[11px] font-mono text-[var(--theme-text-primary)] hover:border-[#0a66c2] hover:text-[#0a66c2] transition shadow-sm"
              >
                <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" /> LinkedIn
              </a>
              <a
                href="https://www.facebook.com/habtamu.getu.984"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] text-[11px] font-mono text-[var(--theme-text-primary)] hover:border-[#1877f2] hover:text-[#1877f2] transition shadow-sm"
              >
                <Facebook className="w-3.5 h-3.5 text-[#1877f2]" /> Facebook
              </a>
              <Link
                href="/submit-project"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--theme-accent)] text-black text-[11px] font-mono font-bold uppercase tracking-wider hover:opacity-90 transition shadow-md ml-auto"
              >
                <PhoneCall className="w-3 h-3" /> Book Consultation
              </Link>
            </div>
          </div>

          {/* Categorized Question Selector (22 Pre-set Queries) */}
          <div className="p-3 sm:p-4 bg-[var(--theme-surface)]/60 border-b border-[var(--theme-border)] space-y-2.5 shrink-0">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-mono uppercase text-[var(--theme-text-muted)] tracking-wider font-semibold flex items-center gap-1">
                <FolderOpen className="w-3 h-3 text-[var(--theme-accent)]" /> Explore Topics (22 Verified Queries):
              </p>
              <span className="text-[10px] font-mono text-[var(--theme-accent)]">
                {activeGroupIndex + 1}/{PRESET_GROUPS.length}
              </span>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap gap-1.5 border-b border-[var(--theme-border)] pb-2">
              {PRESET_GROUPS.map((grp, idx) => {
                const Icon = grp.icon;
                const isSelected = activeGroupIndex === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveGroupIndex(idx)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-mono transition cursor-pointer ${
                      isSelected
                        ? 'bg-[var(--theme-accent)] text-black font-bold shadow-xs'
                        : 'bg-[var(--theme-card)] text-[var(--theme-text-secondary)] border border-[var(--theme-border)] hover:border-[var(--theme-accent)]'
                    }`}
                  >
                    <Icon className="w-3 h-3" />
                    <span>{grp.group}</span>
                  </button>
                );
              })}
            </div>

            {/* Chips for Active Group */}
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pt-0.5">
              {PRESET_GROUPS[activeGroupIndex].items.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSend(preset.query)}
                  className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)] transition cursor-pointer text-left shadow-xs"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat History Panel */}
          <div className="p-4 space-y-3 flex-1 overflow-y-auto max-h-[300px] text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.role === 'assistant' && (
                  <div className="w-7 h-7 rounded-full bg-[var(--theme-accent)]/20 border border-[var(--theme-accent)]/40 text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-3.5 h-3.5" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-[var(--theme-accent)] text-black font-medium shadow-md'
                      : 'bg-[var(--theme-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border)] shadow-sm'
                  }`}
                >
                  {m.content}
                </div>

                {m.role === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-3 bg-[var(--theme-surface)] border-t border-[var(--theme-border)] flex items-center gap-2 shrink-0"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Eng. Habtamu (seismic, Chalmers, KK tower, permits)..."
              className="flex-1 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl px-3 py-2 text-xs text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)] font-sans"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="px-4 py-2 rounded-xl bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition disabled:opacity-40 flex items-center gap-1 cursor-pointer shrink-0 shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Ask</span>
            </button>
          </form>
        </div>
      )}

      {/* Collapsed Floating Trigger Badge (Always docked at bottom right) */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-[var(--theme-accent)] text-black font-mono font-bold text-xs uppercase tracking-wider shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer border-2 border-black/20"
        aria-label="Eng. Habtamu Executive AI Dossier"
      >
        <div className="relative">
          <Bot className="w-5 h-5 text-black" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-black animate-pulse" />
        </div>
        <div className="flex flex-col text-left leading-tight">
          <span className="text-[11px] font-bold">Eng. Habtamu Getu</span>
          <span className="text-[9px] opacity-90 lowercase font-normal">Executive AI Dossier</span>
        </div>
      </button>
    </div>
  );
}