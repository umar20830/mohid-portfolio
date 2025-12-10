'use client';

import { useRef, useEffect, ReactNode } from 'react';
import { motion, useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Scene3DProps {
  children: ReactNode;
  className?: string;
  id?: string;
  depth?: number; // How far back the scene starts (-2000 default)
  triggerStart?: string;
  triggerEnd?: string;
  stagger?: number;
  background?: 'default' | 'muted' | 'gradient' | 'transparent';
}

export function Scene3D({
  children,
  className,
  id,
  depth = -2000,
  triggerStart = 'top 80%',
  triggerEnd = 'top 20%',
  stagger = 0,
  background = 'transparent',
}: Scene3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Calculate when this section should be "in view" (0 to 1)
  const sceneProgress = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  // Z-axis movement: starts at depth, moves to 0 (towards viewer)
  const translateZ = useTransform(
    scrollYProgress,
    [0, 0.35, 0.65, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [depth, 0, 0, depth * 0.5]
  );

  // Scale: starts smaller (further away), becomes full size
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    prefersReducedMotion ? [1, 1, 1, 1] : [0.7, 1, 1, 0.95]
  );

  // Opacity fade in/out
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  // Rotation for depth feel
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    prefersReducedMotion ? [0, 0, 0, 0] : [15, 0, 0, -5]
  );

  // Add spring physics for smoother movement
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const springZ = useSpring(translateZ, springConfig);
  const springScale = useSpring(scale, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);

  const bgClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    gradient: 'bg-gradient-to-b from-background via-muted/50 to-background',
    transparent: 'bg-transparent',
  };

  return (
    <motion.section
      ref={containerRef}
      id={id}
      className={cn(
        'relative min-h-screen w-full',
        'flex items-center justify-center',
        bgClasses[background],
        className
      )}
      style={{
        perspective: '1500px',
        perspectiveOrigin: '50% 50%',
      }}
    >
      <motion.div
        className="w-full"
        style={{
          translateZ: prefersReducedMotion ? 0 : springZ,
          scale: prefersReducedMotion ? 1 : springScale,
          rotateX: prefersReducedMotion ? 0 : springRotateX,
          opacity: prefersReducedMotion ? 1 : opacity,
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

// Floating layer component for parallax depth
interface FloatingLayerProps {
  children: ReactNode;
  depth: number; // 1 = closest (moves most), 5 = furthest (moves least)
  className?: string;
}

export function FloatingLayer({ children, depth, className }: FloatingLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Different depths move at different speeds
  const speedMultiplier = 1 / depth;
  const yOffset = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [100 * speedMultiplier, -100 * speedMultiplier]
  );

  const zOffset = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    prefersReducedMotion ? [0, 0, 0] : [-50 * depth, 0, -50 * depth]
  );

  const springY = useSpring(yOffset, { stiffness: 100, damping: 30 });
  const springZ = useSpring(zOffset, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        translateY: springY,
        translateZ: springZ,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </motion.div>
  );
}

// Reveal element that emerges from depth
interface DepthRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'center' | 'left' | 'right' | 'bottom';
}

export function DepthReveal({
  children,
  className,
  delay = 0,
  direction = 'center',
}: DepthRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 90%', 'start 40%'],
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Z-axis reveal
  const translateZ = useTransform(
    progress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-500, 0]
  );

  // Direction-based X/Y offset
  const getDirectionOffset = () => {
    switch (direction) {
      case 'left':
        return { x: [-100, 0], y: [0, 0] };
      case 'right':
        return { x: [100, 0], y: [0, 0] };
      case 'bottom':
        return { x: [0, 0], y: [50, 0] };
      default:
        return { x: [0, 0], y: [0, 0] };
    }
  };

  const { x: xRange, y: yRange } = getDirectionOffset();
  const translateX = useTransform(progress, [0, 1], prefersReducedMotion ? [0, 0] : xRange);
  const translateY = useTransform(progress, [0, 1], prefersReducedMotion ? [0, 0] : yRange);
  const opacity = useTransform(progress, [0, 0.3, 1], [0, 0.5, 1]);
  const scale = useTransform(progress, [0, 1], prefersReducedMotion ? [1, 1] : [0.8, 1]);

  const springConfig = { stiffness: 100, damping: 25 };
  const springZ = useSpring(translateZ, springConfig);
  const springX = useSpring(translateX, springConfig);
  const springY = useSpring(translateY, springConfig);
  const springScale = useSpring(scale, springConfig);

  return (
    <motion.div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        translateZ: springZ,
        translateX: springX,
        translateY: springY,
        scale: springScale,
        opacity,
        transformStyle: 'preserve-3d',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </motion.div>
  );
}
