'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Container,
  Section,
  SectionHeading,
  Badge,
  Button,
  TrendingUpIcon,
  ArrowUpRightIcon,
  ArrowRightIcon,
} from '@/components/ui';
import { CTASection } from '@/components/sections';
import { caseStudies } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

export function ProjectsPageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <>
      {/* Hero Section */}
      <Section size="minor" background="gradient">
        <Container size="wide">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="primary" className="mb-4">Case Studies</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Real Results for{' '}
              <span className="text-gradient">Real Businesses</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Explore detailed case studies showcasing how strategic SEO has helped
              businesses achieve remarkable growth in organic traffic and revenue.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Case Studies Grid */}
      <Section size="major">
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <div className="space-y-12">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                className={cn(
                  'group relative overflow-hidden rounded-2xl',
                  'bg-card border border-border',
                  'hover:border-primary/50 hover:shadow-xl',
                  'transition-all duration-300'
                )}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image Section */}
                  <div className="relative aspect-video lg:aspect-auto bg-muted overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl text-muted-foreground/10 font-bold">
                        {study.client.charAt(0)}
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 lg:to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge variant="primary">{study.industry}</Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-6 lg:p-8 xl:p-10 flex flex-col">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                        <span>{study.client}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>{study.duration}</span>
                      </div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                        {study.title}
                      </h2>
                      <p className="text-muted-foreground mb-6">
                        {study.description}
                      </p>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {study.results.map((result) => (
                          <div
                            key={result.metric}
                            className="bg-muted/50 rounded-lg p-4"
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <TrendingUpIcon size={16} className="text-accent" />
                              <span className="text-xl font-bold text-accent">
                                {result.change}
                              </span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {result.metric}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {result.before} → {result.after}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Testimonial Preview */}
                    {study.testimonial && (
                      <div className="pt-6 border-t border-border">
                        <p className="text-sm italic text-muted-foreground mb-2">
                          "{study.testimonial.quote}"
                        </p>
                        <p className="text-sm font-medium text-foreground">
                          — {study.testimonial.author}, {study.testimonial.role}
                        </p>
                      </div>
                    )}

                    {/* CTA */}
                    <div className="mt-6 flex items-center gap-4">
                      <Link
                        href={`/projects/${study.id}`}
                        className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                      >
                        Read Full Case Study
                        <ArrowRightIcon size={18} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Additional CTA */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg text-muted-foreground mb-6">
              Ready to become the next success story?
            </p>
            <Button variant="primary" size="lg" href="/contact">
              Start Your Project
              <ArrowUpRightIcon size={20} />
            </Button>
          </motion.div>
        </Container>
      </Section>

      <CTASection
        title="Let's Create Your Success Story"
        description="Every business has unique challenges. Let's discuss how SEO can solve yours."
      />
    </>
  );
}
