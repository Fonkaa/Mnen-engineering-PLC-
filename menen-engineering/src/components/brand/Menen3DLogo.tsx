'use client';

import React, { useRef, useState } from 'react';

export default function Menen3DLogo({ className = '' }: { className?: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x: x * 26, y: -y * 26 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  return (
    <div
      ref={frameRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none flex items-center justify-center cursor-pointer ${className}`}
      style={{ perspective: '800px' }}
    >
      {/* Dynamic 3D Stage */}
      <div
        className="relative w-full h-full flex items-center justify-center transition-transform ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `rotateY(${coords.x}deg) rotateX(${coords.y}deg) scale3d(1.06, 1.06, 1.06)`
            : 'rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)',
          transitionDuration: isHovered ? '90ms' : '650ms',
        }}
      >
        {/* Soft Ambient Depth Glow behind the logo */}
        <div
          className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.22)_0%,transparent_75%)] pointer-events-none transition-opacity duration-500"
          style={{
            transform: 'translateZ(-25px)',
            opacity: isHovered ? 1 : 0.45,
          }}
        />

        {/* Vector 3D Isometric Architectural Monogram ("M" Chevron Truss) */}
        <svg
          viewBox="0 0 160 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]"
          style={{ transform: 'translateZ(18px)' }}
        >
          <defs>
            {/* Architectural Gold Gradient Palette */}
            <linearGradient id="goldTrussPrimary" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF2B2" />
              <stop offset="35%" stopColor="#D4AF37" />
              <stop offset="70%" stopColor="#AA820A" />
              <stop offset="100%" stopColor="#684E03" />
            </linearGradient>

            <linearGradient id="goldTrussSecondary" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F9E27D" />
              <stop offset="50%" stopColor="#C59B27" />
              <stop offset="100%" stopColor="#4A3802" />
            </linearGradient>

            <linearGradient id="deepStructuralEdge" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2A2415" />
              <stop offset="100%" stopColor="#0B0905" />
            </linearGradient>

            {/* Traveling Light Sheen Beam */}
            <linearGradient id="specularGlint" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.85)" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>

            {/* CAD Grid Pattern */}
            <pattern id="cadGrid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(212,175,55,0.12)" strokeWidth="0.5" />
            </pattern>
          </defs>

          {/* Background Technical Grid Circle */}
          <circle cx="80" cy="70" r="58" fill="url(#cadGrid)" stroke="rgba(212,175,55,0.25)" strokeWidth="1" strokeDasharray="3 3" />

          {/* Left Wing Cantilever Truss */}
          <path
            d="M 28 112 L 28 36 L 56 64 L 56 112 Z"
            fill="url(#deepStructuralEdge)"
            stroke="url(#goldTrussPrimary)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M 28 36 L 56 64 L 80 40 L 52 16 Z"
            fill="url(#goldTrussPrimary)"
          />

          {/* Center Vault Keystone & Core Spire */}
          <path
            d="M 52 16 L 80 40 L 108 16 L 80 2 Z"
            fill="#FFF5C2"
            stroke="#D4AF37"
            strokeWidth="1"
          />

          {/* Right Wing Cantilever Truss */}
          <path
            d="M 132 112 L 132 36 L 104 64 L 104 112 Z"
            fill="url(#deepStructuralEdge)"
            stroke="url(#goldTrussSecondary)"
            strokeWidth="1.75"
            strokeLinejoin="round"
          />
          <path
            d="M 132 36 L 104 64 L 80 40 L 108 16 Z"
            fill="url(#goldTrussSecondary)"
          />

          {/* Central Interior Tension Struts (Structural "V") */}
          <path
            d="M 56 64 L 80 96 L 104 64 L 80 40 Z"
            fill="url(#goldTrussPrimary)"
            opacity="0.95"
          />
          <path
            d="M 68 112 L 80 96 L 92 112 Z"
            fill="url(#goldTrussSecondary)"
          />

          {/* CAD Structural Coordinate Nodes (Pulsing Pinpoints) */}
          <circle cx="80" cy="2" r="2.5" fill="#FFFFFF" className="animate-ping" style={{ transformOrigin: '80px 2px', animationDuration: '3s' }} />
          <circle cx="80" cy="2" r="2" fill="#D4AF37" />
          <circle cx="28" cy="36" r="2" fill="#D4AF37" />
          <circle cx="132" cy="36" r="2" fill="#D4AF37" />
          <circle cx="80" cy="96" r="2.5" fill="#FFFFFF" />
          <circle cx="28" cy="112" r="2" fill="#D4AF37" />
          <circle cx="132" cy="112" r="2" fill="#D4AF37" />

          {/* Horizontal Level Foundation Tie-Beam */}
          <line x1="22" y1="116" x2="138" y2="116" stroke="url(#goldTrussPrimary)" strokeWidth="2" strokeDasharray="120" className="opacity-75" />
          <line x1="38" y1="120" x2="122" y2="120" stroke="rgba(212,175,55,0.4)" strokeWidth="1" />
        </svg>

        {/* Diagonal Light Sheen Beam Animation */}
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl"
          style={{ transform: 'translateZ(24px)' }}
        >
          <div className="w-[180%] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -rotate-45 translate-x-[-120%] animate-[shimmer_4s_infinite]" />
        </div>
      </div>
    </div>
  );
}