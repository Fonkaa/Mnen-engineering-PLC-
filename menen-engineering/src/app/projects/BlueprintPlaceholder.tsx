import React from 'react';
import { Building2, Layers } from 'lucide-react';

interface BlueprintPlaceholderProps {
  title?: string;
  category?: string;
  className?: string;
}

export default function BlueprintPlaceholder({
  title = 'Structural Model',
  category = 'Schematic',
  className = '',
}: BlueprintPlaceholderProps) {
  return (
    <div
      className={`relative w-full h-full min-h-[220px] bg-[var(--theme-surface)] border border-[var(--theme-border)] rounded-xl overflow-hidden flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
    >
      <div className="w-14 h-14 rounded-2xl bg-[var(--theme-card)] border border-[var(--theme-accent)]/30 flex items-center justify-center text-[var(--theme-accent)] mb-3 shadow-inner">
        <Building2 className="w-7 h-7 stroke-1" />
      </div>
      <p className="text-xs font-mono font-bold text-[var(--theme-text-primary)] max-w-[200px] truncate">
        {title}
      </p>
      <span className="text-[10px] font-mono text-[var(--theme-text-muted)] mt-1 flex items-center gap-1">
        <Layers className="w-3 h-3 text-[var(--theme-accent)]" /> Structural Package In Review
      </span>
    </div>
  );
}
