'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface CameraState {
  z: number;
  rotateX: number;
  rotateY: number;
  progress: number;
}

export function useScrollCamera() {
  const [camera, setCamera] = useState<CameraState>({
    z: 0,
    rotateX: 0,
    rotateY: 0,
    progress: 0,
  });
  const rafRef = useRef<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const updateCamera = useCallback(() => {
    if (prefersReducedMotion) {
      setCamera({ z: 0, rotateX: 0, rotateY: 0, progress: 0 });
      return;
    }

    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollY / docHeight : 0;

    // Camera moves forward (positive Z) as user scrolls
    const z = progress * 3000;

    // Subtle rotation based on scroll
    const rotateX = Math.sin(progress * Math.PI) * 2;
    const rotateY = Math.cos(progress * Math.PI * 0.5) * 1;

    setCamera({ z, rotateX, rotateY, progress });
  }, [prefersReducedMotion]);

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(updateCamera);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateCamera();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [updateCamera]);

  return camera;
}
