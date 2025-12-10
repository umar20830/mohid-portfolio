'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Button, ArrowRightIcon } from '@/components/ui';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

export function CTASection({
  title = "Ready to Dominate Search Rankings?",
  description = "Let's work together to create an SEO strategy that drives real results for your business.",
  primaryCTA = {
    text: "Get Started",
    href: "/contact",
  },
  secondaryCTA = {
    text: "View Case Studies",
    href: "/projects",
  },
}: CTASectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const y2 = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={containerRef} className="relative py-16 md:py-24 overflow-hidden">
      {/* Background with parallax */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80" />

      {/* Parallax decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
          style={{ y: prefersReducedMotion ? 0 : y1 }}
        />
        <motion.div
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-black/10 rounded-full blur-3xl"
          style={{ y: prefersReducedMotion ? 0 : y2 }}
        />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05]">
          <defs>
            <pattern id="cta-grid" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#cta-grid)" />
        </svg>
      </div>

      <Container size="content" className="relative z-10">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight text-balance max-w-3xl mx-auto">
            {title}
          </h2>
          <p className="mt-6 text-lg text-white/80 max-w-2xl mx-auto">
            {description}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="lg"
              href={primaryCTA.href}
              className="bg-white text-primary hover:bg-white/90"
            >
              {primaryCTA.text}
              <ArrowRightIcon size={20} />
            </Button>
            <Button
              variant="outline"
              size="lg"
              href={secondaryCTA.href}
              className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
            >
              {secondaryCTA.text}
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
