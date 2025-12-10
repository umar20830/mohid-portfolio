'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Container,
  Section,
  SectionHeading,
  Button,
  Badge,
  ArrowUpRightIcon,
  TrendingUpIcon,
} from '@/components/ui';
import { caseStudies } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

interface CaseStudyCardProps {
  study: (typeof caseStudies)[0];
  index: number;
  featured?: boolean;
}

function CaseStudyCard({ study, index, featured = false }: CaseStudyCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={cn(featured && 'md:col-span-2')}
    >
      <Link href={`/projects/${study.id}`} className="block group">
        <motion.article
          className={cn(
            'relative overflow-hidden rounded-2xl',
            'bg-card border border-border',
            'hover:border-primary/50 hover:shadow-xl',
            'transition-all duration-300 h-full'
          )}
          whileHover={{ y: -5 }}
        >
          {/* Image placeholder */}
          <div
            className={cn(
              'relative bg-muted aspect-video overflow-hidden',
              featured && 'md:aspect-[21/9]'
            )}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10" />

            {/* Placeholder pattern */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-6xl text-muted-foreground/20 font-bold">
                {study.client.charAt(0)}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-4 left-4 z-20">
              <Badge variant="primary">{study.industry}</Badge>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <div className="flex items-start justify-between gap-4 mb-3">
              <h3 className="text-xl lg:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                {study.title}
              </h3>
              <ArrowUpRightIcon
                size={24}
                className="flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors"
              />
            </div>
            <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
              {study.description}
            </p>

            {/* Results preview */}
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              {study.results.slice(0, 2).map((result) => (
                <div key={result.metric}>
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUpIcon size={16} className="text-accent" />
                    <span className="text-lg font-bold text-accent">{result.change}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{result.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.article>
      </Link>
    </motion.div>
  );
}

export function CaseStudyGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <Section id="case-studies" size="major" background="muted">
      <div ref={containerRef} className="relative">
        {/* Parallax background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <SectionHeading
            subtitle="Case Studies"
            title="Real Results for Real Businesses"
            description="Explore how I've helped businesses achieve remarkable growth through strategic SEO."
          />

          {/* Case Studies Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {caseStudies.slice(0, 4).map((study, index) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={index}
                featured={index === 0}
              />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button variant="outline" size="lg" href="/projects">
              View All Case Studies
              <ArrowUpRightIcon size={20} />
            </Button>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}

export { CaseStudyCard };
