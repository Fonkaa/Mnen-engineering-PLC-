'use client';

import React, { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

const THEMES = [
  { id: 'OBSIDIAN_GOLD', name: 'Obsidian Gold', colorDot: 'bg-[#D4AF37]' },
  { id: 'BRUTALIST_TITANIUM', name: 'Brutalist Titanium', colorDot: 'bg-[#E4E4E7]' },
 { id: 'DRAFTING_VELLUM_GOLD', label: 'Parchment & 300% Gold', color: '#f59e0b' },
  { id: 'TECHNICAL_NAVY', name: 'Technical Blueprint', colorDot: 'bg-[#38BDF8]' },
];

export default function ThemeSwitcher() {
  const [currentTheme, setCurrentTheme] = useState('OBSIDIAN_GOLD');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('menen_theme') || 'OBSIDIAN_GOLD';
    setCurrentTheme(saved);
    document.body.setAttribute('data-theme', saved);
  }, []);

  const changeTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem('menen_theme', themeId);
    document.body.setAttribute('data-theme', themeId);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-[var(--theme-border)] bg-[var(--theme-surface)] text-xs text-[var(--theme-text-secondary)] hover:text-[var(--theme-accent)] transition"
        title="Switch Luxury Color Palette"
        aria-label="Palette Switcher"
      >
        <Palette className="w-3.5 h-3.5 text-[var(--theme-accent)]" />
        <span className="hidden sm:inline font-mono">Color</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-2xl border border-[var(--theme-border)] bg-[var(--theme-surface)] p-2 z-50">
          <p className="text-[10px] uppercase font-mono tracking-wider text-[var(--theme-text-muted)] px-2 py-1">
            Luxury Palettes
          </p>
          <div className="space-y-1 mt-1">
            {THEMES.map((t) => (
              <button
                key={t.id}
                onClick={() => changeTheme(t.id)}
                className={`w-full flex items-center justify-between px-2 py-1.5 text-xs rounded transition text-left ${
                  currentTheme === t.id
                    ? 'bg-[var(--theme-card)] text-[var(--theme-accent)] font-semibold'
                    : 'text-[var(--theme-text-secondary)] hover:bg-[var(--theme-card)]'
                }`}
              >
                <span>{t.name}</span>
                <span className={`w-2.5 h-2.5 rounded-full ${t.colorDot} border border-white/20`} />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}