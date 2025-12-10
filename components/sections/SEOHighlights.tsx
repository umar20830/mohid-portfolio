'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Section, SectionHeading, TrendingUpIcon, TargetIcon, ZapIcon, GlobeIcon, CheckCircleIcon, AwardIcon } from '@/components/ui';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

const highlights = [
  {
    icon: TrendingUpIcon,
    title: 'Data-Driven Strategy',
    description: 'Every decision backed by analytics and industry-leading SEO tools for maximum impact.',
    color: 'primary',
  },
  {
    icon: TargetIcon,
    title: 'Targeted Growth',
    description: 'Precision keyword targeting and content optimization for your ideal audience.',
    color: 'accent',
  },
  {
    icon: ZapIcon,
    title: 'Fast Results',
    description: 'Quick wins combined with long-term sustainable growth strategies.',
    color: 'primary',
  },
  {
    icon: GlobeIcon,
    title: 'Global Reach',
    description: 'International SEO expertise for businesses targeting multiple markets.',
    color: 'accent',
  },
];

const achievements = [
  { value: '10M+', label: 'Keywords Ranked', icon: CheckCircleIcon },
  { value: '500+', label: 'Projects Completed', icon: AwardIcon },
  { value: '150M+', label: 'Organic Impressions', icon: TrendingUpIcon },
  { value: '98%', label: 'Client Retention', icon: TargetIcon },
];

export function SEOHighlights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <Section id="highlights" size="major" background="muted">
      <div ref={containerRef} className="relative">
        {/* Background parallax elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute -top-20 -right-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y1 }}
          />
          <motion.div
            className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y2 }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <SectionHeading
            subtitle="Why Choose Me"
            title="SEO Excellence That Delivers Results"
            description="Combining technical expertise with creative strategy to help your business thrive in search."
          />

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className={cn(
                  'group relative p-6 lg:p-8 rounded-2xl',
                  'bg-card border border-border',
                  'hover:border-primary/50 hover:shadow-xl',
                  'transition-all duration-300'
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
                    highlight.color === 'primary'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-accent/10 text-accent'
                  )}
                >
                  <highlight.icon size={28} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {highlight.description}
                </p>

                {/* Hover gradient */}
                <div
                  className={cn(
                    'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-300 pointer-events-none',
                    highlight.color === 'primary'
                      ? 'bg-gradient-to-br from-primary/5 to-transparent'
                      : 'bg-gradient-to-br from-accent/5 to-transparent'
                  )}
                />
              </motion.div>
            ))}
          </div>

          {/* Achievements Row */}
          <motion.div
            className="mt-16 md:mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 lg:p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.label}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  >
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                      <achievement.icon size={24} />
                    </div>
                    <div className="text-2xl md:text-3xl font-bold text-gradient">
                      {achievement.value}
                    </div>
                    <div className="mt-1 text-sm text-muted-foreground">
                      {achievement.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
