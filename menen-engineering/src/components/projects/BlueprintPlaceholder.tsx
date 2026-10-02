import React from 'react';
import { Compass } from 'lucide-react';

interface Props {
  title?: string;
  category?: string;
}

export default function BlueprintPlaceholder({ title = "Blueprint In Review", category = "CAD 2026" }: Props) {
  return (
    <div className="w-full h-full min-h-[220px] bg-[var(--theme-surface)] relative overflow-hidden flex flex-col items-center justify-center p-6 border-b border-[var(--theme-border)] select-none">
      {/* CAD Grid Background Simulation */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--theme-accent) 1px, transparent 1px),
            linear-gradient(to bottom, var(--theme-accent) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px'
        }}
      />
      
      {/* Architectural Crosshair Reticles */}
      <div className="absolute top-2 left-2 text-[9px] font-mono text-[var(--theme-text-muted)]">
        + 09°01'48"N / 38°44'24"E
      </div>
      <div className="absolute top-2 right-2 text-[9px] font-mono text-[var(--theme-accent)]">
        [{category}]
      </div>
      <div className="absolute bottom-2 left-2 text-[9px] font-mono text-[var(--theme-text-muted)]">
        SCALE 1:100 / ELEVATION
      </div>
      <div className="absolute bottom-2 right-2 text-[9px] font-mono text-[var(--theme-text-muted)]">
        MENEN CAE PLC
      </div>

      {/* Central Blueprint Geometry */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full border border-[var(--theme-accent)]/50 bg-[var(--theme-card)] flex items-center justify-center mb-3 text-[var(--theme-accent)] shadow-inner">
          <Compass className="w-6 h-6 animate-pulse" />
        </div>
        <p className="text-xs uppercase font-mono tracking-widest text-[var(--theme-text-primary)] font-bold">
          {title}
        </p>
        <span className="text-[10px] text-[var(--theme-text-muted)] mt-1 font-mono">
          Architectural Schematic • High-Res Media Pending
        </span>
      </div>
    </div>
  );
}