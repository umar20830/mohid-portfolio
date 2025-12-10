'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  size?: 'hero' | 'major' | 'minor' | 'auto';
  background?: 'default' | 'muted' | 'primary' | 'gradient';
  animate?: boolean;
}

export function Section({
  children,
  className,
  id,
  size = 'major',
  background = 'default',
  animate = true,
}: SectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  const sizeClasses = {
    hero: 'min-h-[60vh] md:min-h-screen',
    major: 'min-h-[40vh]',
    minor: 'min-h-[30vh]',
    auto: '',
  };

  const bgClasses = {
    default: 'bg-background',
    muted: 'bg-muted',
    primary: 'bg-primary text-primary-foreground',
    gradient: 'bg-gradient-to-b from-background to-muted',
  };

  const content = (
    <section
      ref={ref}
      id={id}
      className={cn(
        'relative py-16 md:py-20 lg:py-24',
        sizeClasses[size],
        bgClasses[background],
        className
      )}
    >
      {children}
    </section>
  );

  if (!animate || prefersReducedMotion) {
    return content;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      {content}
    </motion.div>
  );
}
