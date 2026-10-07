'use client';

import React, { useEffect, useState } from 'react';

export default function ScrollBoundPyramidBackground() {
  const [isVisible, setIsVisible] = useState(true);
  const logoPath = '/images/menen-pyramid-hq.jpg';

  useEffect(() => {
    const handleScroll = () => {
      const projectSection = document.getElementById('projects-catalog');
      if (projectSection) {
        const rect = projectSection.getBoundingClientRect();
        // Fade out as soon as the projects section nears the upper viewport
        if (rect.top <= 200) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none -z-10 overflow-hidden flex items-center justify-center select-none transition-all duration-700 ease-in-out ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
      }`}
    >
      {/* 1. Dynamic 4-Color Ambient Radial Flare Shift */}
      <div className="absolute inset-0 animate-four-colors opacity-85 transition-all duration-1000" />

      {/* 2. Technical Blueprint Coordinate Grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--theme-border) 1px, transparent 1px), linear-gradient(to bottom, var(--theme-border) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* 3. True 360° Rotational Space-Frame Pyramid Stage */}
      <div
        className="relative w-[340px] sm:w-[620px] md:w-[780px] lg:w-[1050px] aspect-video flex items-center justify-center"
        style={{ perspective: '1400px' }}
      >
        <div
          className="relative w-full h-full flex items-center justify-center animate-monument-spin opacity-30 dark:opacity-45"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT FACE (0° - 180°) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg) translateZ(8px)',
            }}
          >
            <img
              src={logoPath}
              alt=""
              className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(0,102,204,0.45)]"
            />
          </div>

          {/* BACK FACE (180° - 360°) */}
          <div
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg) translateZ(8px)',
            }}
          >
            <img
              src={logoPath}
              alt=""
              className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(16,185,129,0.45)] [transform:scaleX(-1)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}