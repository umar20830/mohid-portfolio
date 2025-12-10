'use client';

import { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface ZAxisScrollProps {
  children: ReactNode[];
  sectionLabels?: string[];
}

export function ZAxisScroll({ children, sectionLabels = [] }: ZAxisScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const totalSections = children.length;

  // Navigate to a specific section
  const goToSection = useCallback((index: number) => {
    if (index < 0 || index >= totalSections || isAnimating) return;
    if (index === currentSection) return;

    setIsAnimating(true);
    setCurrentSection(index);

    // Short animation lock
    setTimeout(() => setIsAnimating(false), 400);
  }, [totalSections, isAnimating, currentSection]);

  // Handle wheel scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let lastScrollTime = 0;
    const SCROLL_COOLDOWN = 400;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastScrollTime < SCROLL_COOLDOWN) return;
      if (isAnimating) return;

      if (Math.abs(e.deltaY) > 30) {
        lastScrollTime = now;
        if (e.deltaY > 0 && currentSection < totalSections - 1) {
          goToSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
    };

    // Touch handling
    let touchStartY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating) return;

      const diff = touchStartY - e.changedTouches[0].clientY;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < totalSections - 1) {
          goToSection(currentSection + 1);
        } else if (diff < 0 && currentSection > 0) {
          goToSection(currentSection - 1);
        }
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, totalSections, isAnimating, goToSection]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        goToSection(currentSection + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        e.preventDefault();
        goToSection(currentSection - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, goToSection]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen overflow-hidden bg-background"
    >
      {/* Simple CSS-only transitions - no JS animation */}
      <div className="relative w-full h-full">
        {children.map((child, index) => (
          <div
            key={index}
            className={cn(
              'absolute inset-0 w-full h-full transition-all duration-500 ease-out',
              'will-change-transform'
            )}
            style={{
              transform: index === currentSection
                ? 'scale(1) translateZ(0)'
                : index < currentSection
                  ? 'scale(1.1) translateZ(100px)'
                  : 'scale(0.9) translateZ(-100px)',
              opacity: index === currentSection ? 1 : 0,
              pointerEvents: index === currentSection ? 'auto' : 'none',
              zIndex: index === currentSection ? 10 : 0,
            }}
          >
            {child}
          </div>
        ))}
      </div>

      {/* Navigation Dots */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-3">
        {Array.from({ length: totalSections }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
            className={cn(
              'group relative w-3 h-3 rounded-full border-2 transition-all duration-200',
              'hover:scale-150',
              currentSection === index
                ? 'bg-primary border-primary scale-125'
                : 'bg-transparent border-muted-foreground/40 hover:border-primary'
            )}
            aria-label={sectionLabels[index] || `Section ${index + 1}`}
          >
            {sectionLabels[index] && (
              <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {sectionLabels[index]}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted/50 z-50">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${((currentSection + 1) / totalSections) * 100}%` }}
        />
      </div>

      {/* Scroll Hint */}
      {currentSection === 0 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-muted-foreground">Scroll to explore</span>
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}
