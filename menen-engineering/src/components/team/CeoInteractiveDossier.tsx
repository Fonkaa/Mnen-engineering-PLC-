'use client';

import React, { useState } from 'react';
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
  Briefcase,
  GraduationCap,
  Building,
  Layers
} from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const PRESET_QUERIES = [
  {
    icon: GraduationCap,
    label: '🎓 Chalmers & European Degrees',
    query: 'What are Eng. Habtamu’s academic degrees from Chalmers University in Sweden, Italy, and AAiT?',
  },
  {
    icon: Layers,
    label: '🌉 Trail Bridges & HELVETAS',
    query: 'Tell me about his work with HELVETAS and regional road bureaus on trail bridge infrastructure.',
  },
  {
    icon: Building,
    label: '🏢 High-Rise & Seismic Modeling',
    query: 'What software (Tekla, Abaqus, ETABS) and seismic training from Italy does he apply to towers?',
  },
  {
    icon: Briefcase,
    label: '🏛️ Career & Heritage Conservation',
    query: 'Tell me about his past work with Fasil Giorghis Consult and Akademiska Hus in Sweden.',
  },
  {
    icon: PhoneCall,
    label: '📞 Book Meeting & Direct Contacts',
    query: 'How do I contact Eng. Habtamu directly or submit a project brief?',
  },
];

export default function CeoInteractiveDossier() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Welcome! I am the verified Executive Dossier Assistant for Eng. Habtamu Getu Mihret, Co-founder and CEO of MENEN Engineering PLC.\n\nAsk me anything regarding his postgraduate studies at Chalmers University (Sweden), seismic dynamics in Italy, rural trail bridge programs with HELVETAS, or ongoing landmark high-rise structures.',
    },
  ]);
  const [input, setInput] = useState('');

  function handleSend(queryText: string) {
    const textToSend = queryText.trim();
    if (!textToSend) return;

    // 1. Instantly get the answer from the local custom engine in memory
    const answer = queryCeoKnowledge(textToSend);

    // 2. Append both the question and answer immediately (0 latency, 100% reliable)
    setMessages((prev) => [
      ...prev,
      { role: 'user', content: textToSend },
      { role: 'assistant', content: answer },
    ]);

    setInput('');
  }

  return (
    <div className="bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-3xl overflow-hidden shadow-2xl space-y-0">
      
      {/* Header Banner */}
      <div className="bg-[var(--theme-surface)] border-b border-[var(--theme-border)] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--theme-accent)]/15 text-[var(--theme-accent)] font-mono text-xs font-bold uppercase tracking-wider border border-[var(--theme-accent)]/30">
              <Sparkles className="w-3.5 h-3.5" /> Executive Intelligence Dossier
            </span>
            <span className="text-xs font-mono text-[var(--theme-text-muted)]">Verified Record</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--theme-text-primary)] mt-2">
            Eng. Habtamu Getu Mihret
          </h2>
          <p className="text-xs sm:text-sm text-[var(--theme-text-secondary)] font-mono mt-0.5">
            General Manager & Lead Structural Engineer &bull; Category 1 Engineering Practice
          </p>
        </div>

        {/* Verified Social & Booking Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href="https://www.linkedin.com/in/habtamu-mihret"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs font-mono text-[var(--theme-text-primary)] hover:border-[#0a66c2] hover:text-[#0a66c2] transition shadow-sm"
          >
            <Linkedin className="w-4 h-4 text-[#0a66c2]" /> LinkedIn
          </a>
          <a
            href="https://www.facebook.com/habtamu.getu.984"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[var(--theme-card)] border border-[var(--theme-border)] text-xs font-mono text-[var(--theme-text-primary)] hover:border-[#1877f2] hover:text-[#1877f2] transition shadow-sm"
          >
            <Facebook className="w-4 h-4 text-[#1877f2]" /> Facebook
          </a>
          <Link
            href="/submit-project"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--theme-accent)] text-black text-xs font-mono font-bold uppercase tracking-wider hover:opacity-90 transition shadow-md"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Book Consultation
          </Link>
        </div>
      </div>

      {/* Suggested 1-Click Action Chips */}
      <div className="p-4 sm:p-6 bg-[var(--theme-surface)]/50 border-b border-[var(--theme-border)]">
        <p className="text-[11px] font-mono uppercase text-[var(--theme-text-muted)] tracking-wider mb-2.5 font-semibold">
          Select a verified topic or ask any custom question:
        </p>
        <div className="flex flex-wrap gap-2">
          {PRESET_QUERIES.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(preset.query)}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-[var(--theme-card)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] hover:text-[var(--theme-text-primary)] hover:border-[var(--theme-accent)] transition cursor-pointer text-left flex items-center gap-1.5"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Chat History Panel */}
      <div className="p-4 sm:p-6 space-y-4 max-h-[460px] overflow-y-auto">
        {messages.map((m, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {m.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-[var(--theme-accent)]/20 border border-[var(--theme-accent)]/40 text-[var(--theme-accent)] flex items-center justify-center shrink-0 mt-1">
                <Bot className="w-4 h-4" />
              </div>
            )}

            <div
              className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                m.role === 'user'
                  ? 'bg-[var(--theme-accent)] text-black font-medium shadow-md'
                  : 'bg-[var(--theme-surface)] text-[var(--theme-text-primary)] border border-[var(--theme-border)] shadow-sm'
              }`}
            >
              {m.content}
            </div>

            {m.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-[var(--theme-surface)] border border-[var(--theme-border)] text-[var(--theme-text-secondary)] flex items-center justify-center shrink-0 mt-1">
                <User className="w-4 h-4" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(input);
        }}
        className="p-4 sm:p-6 bg-[var(--theme-surface)] border-t border-[var(--theme-border)] flex items-center gap-3"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything about Eng. Habtamu (e.g. seismic safety, trail bridges, Chalmers MSc, high-rises)..."
          className="flex-1 bg-[var(--theme-card)] border border-[var(--theme-border)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--theme-text-primary)] placeholder-[var(--theme-text-muted)] focus:outline-none focus:border-[var(--theme-accent)] font-sans"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="px-5 py-3 rounded-xl bg-[var(--theme-accent)] text-black font-bold font-mono text-xs uppercase tracking-wider hover:opacity-90 transition disabled:opacity-40 flex items-center gap-1.5 cursor-pointer shrink-0 shadow-md"
        >
          <Send className="w-4 h-4" />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>
    </div>
  );
}