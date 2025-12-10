'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface CinematicScrollProps {
  children: ReactNode;
}

export function CinematicScroll({ children }: CinematicScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  const { scrollYProgress } = useScroll();

  // Global camera depth (the entire page moves in Z-space)
  const cameraZ = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [0, 2000]
  );

  // Subtle global rotation
  const cameraRotateX = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [0, 2, 0]
  );

  const springConfig = { stiffness: 50, damping: 30, mass: 1 };
  const springCameraZ = useSpring(cameraZ, springConfig);
  const springCameraRotateX = useSpring(cameraRotateX, springConfig);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{
        perspective: '2000px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <motion.div
        className="relative"
        style={{
          transformStyle: 'preserve-3d',
          translateZ: prefersReducedMotion ? 0 : springCameraZ,
          rotateX: prefersReducedMotion ? 0 : springCameraRotateX,
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// Progress indicator showing scroll position
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  if (prefersReducedMotion) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      style={{ scaleX }}
    />
  );
}

// Section indicator dots
interface SectionIndicatorProps {
  sections: string[];
  activeSection: number;
}

export function SectionIndicator({ sections, activeSection }: SectionIndicatorProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4">
      {sections.map((section, index) => (
        <motion.a
          key={section}
          href={`#${section}`}
          className={cn(
            'w-3 h-3 rounded-full border-2 transition-all duration-300',
            'hover:scale-125',
            activeSection === index
              ? 'bg-primary border-primary scale-110'
              : 'bg-transparent border-muted-foreground/50 hover:border-primary'
          )}
          whileHover={prefersReducedMotion ? {} : { scale: 1.3 }}
          whileTap={prefersReducedMotion ? {} : { scale: 0.9 }}
          aria-label={`Navigate to ${section}`}
        />
      ))}
    </div>
  );
}
