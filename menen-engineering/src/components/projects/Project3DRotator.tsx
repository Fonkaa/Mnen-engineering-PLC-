'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import BlueprintPlaceholder from '@/components/projects/BlueprintPlaceholder';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project3DRotatorProps {
  title: string;
  category: string;
  featuredImage?: string | null;
  galleryImages?: string[] | null;
}

export default function Project3DRotator({
  title,
  category,
  featuredImage,
  galleryImages = [],
}: Project3DRotatorProps) {
  // Collect all valid URLs
  const allImages = React.useMemo(() => {
    const list: string[] = [];
    if (featuredImage && !featuredImage.startsWith('/uploads/') && !featuredImage.includes('/placeholders/')) {
      list.push(featuredImage.trim());
    }
    if (Array.isArray(galleryImages)) {
      galleryImages.forEach((img) => {
        if (img && typeof img === 'string' && img.trim() && !list.includes(img.trim()) && !img.startsWith('/uploads/')) {
          list.push(img.trim());
        }
      });
    }
    return list;
  }, [featuredImage, galleryImages]);

  const count = allImages.length;
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);

  // Each angle slice on the circular orbit
  const stepAngle = count > 0 ? 360 / count : 0;
  
  // Mathematical circular depth radius to keep proportions natural
  const radius = count <= 2 ? 190 : Math.max(220, Math.round(260 / (2 * Math.tan(Math.PI / count))));

  // Continuous auto-orbit loop every 3.5s
  useEffect(() => {
    if (count <= 1 || isHovered || isDragging) return;

    const interval = setInterval(() => {
      setRotationAngle((prev) => prev - stepAngle);
    }, 3500);

    return () => clearInterval(interval);
  }, [count, stepAngle, isHovered, isDragging]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setRotationAngle((prev) => prev - stepAngle);
  }, [stepAngle]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setRotationAngle((prev) => prev + stepAngle);
  }, [stepAngle]);

  // Drag / Touch Handlers
  const onPointerDown = (clientX: number) => {
    if (count <= 1) return;
    setIsDragging(true);
    setStartX(clientX);
    setDragOffset(0);
  };

  const onPointerMove = (clientX: number) => {
    if (!isDragging) return;
    setDragOffset(clientX - startX);
  };

  const onPointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const angleDelta = (dragOffset / 180) * stepAngle;
    const targetAngle = rotationAngle + angleDelta;
    const snappedAngle = Math.round(targetAngle / stepAngle) * stepAngle;
    setRotationAngle(snappedAngle);
    setDragOffset(0);
  };

  // Fallback if no images
  if (count === 0) {
    return <BlueprintPlaceholder title={title} category={category} />;
  }

  // Single photo view (no rotation or controls needed)
  if (count === 1) {
    return (
      <div className="relative w-full h-full overflow-hidden group">
        <img
          src={allImages[0]}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />
      </div>
    );
  }

  const currentDisplayAngle = rotationAngle + (isDragging ? (dragOffset / 180) * stepAngle : 0);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden select-none bg-[var(--theme-surface)] group cursor-grab active:cursor-grabbing"
      style={{ perspective: '1200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isDragging) onPointerUp();
      }}
      onMouseDown={(e) => onPointerDown(e.clientX)}
      onMouseMove={(e) => onPointerMove(e.clientX)}
      onMouseUp={onPointerUp}
      onTouchStart={(e) => onPointerDown(e.touches[0].clientX)}
      onTouchMove={(e) => onPointerMove(e.touches[0].clientX)}
      onTouchEnd={onPointerUp}
    >
      {/* 360° Clean Architectural Circular Stage */}
      <div
        className={`relative w-full h-full ${
          isDragging ? 'transition-none' : 'transition-transform duration-1000 ease-[cubic-bezier(0.2,0.85,0.25,1)]'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `translateZ(-${radius}px) rotateY(${currentDisplayAngle}deg)`,
        }}
      >
        {allImages.map((src, idx) => {
          const itemAngle = idx * stepAngle;

          return (
            <div
              key={idx}
              className="absolute inset-0 w-full h-full overflow-hidden"
              style={{
                transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              {/* Pure, 100% bright, crisp image with no text or dark shading */}
              <img
                src={src}
                alt={`${title} - Angle ${idx + 1}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </div>

      {/* Subtle Hover-Only Side Arrows (Optional manual navigation) */}
      <button
        type="button"
        aria-label="Previous Perspective"
        onClick={handlePrev}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-[var(--theme-accent)] hover:text-black text-white/90 border border-white/15 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        type="button"
        aria-label="Next Perspective"
        onClick={handleNext}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/40 hover:bg-[var(--theme-accent)] hover:text-black text-white/90 border border-white/15 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}