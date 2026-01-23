'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
              <ProjectCard key={study.id} study={study} index={index} />
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

function ProjectCard({ study, index }: { study: any; index: number }) {
  const [activeImage, setActiveImage] = useState(study.thumbnail || (study.images && study.images[0]));

  return (
    <motion.article
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
        <div className="relative bg-muted overflow-hidden flex flex-col px-4 lg:px-6 py-4">
          <div className="relative flex-1 min-h-[300px] flex items-center justify-center">
            {activeImage ? (
              <Image
                src={activeImage}
                alt={study.title}
                width={800}
                height={600}
                className="max-h-full w-auto object-contain transition-transform duration-500"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-8xl text-muted-foreground/10 font-bold">
                  {study.client.charAt(0)}
                </div>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 lg:to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0">
              <Badge variant="primary">{study.industry}</Badge>
            </div>
          </div>

          {/* Additional Images Gallery */}
          {study.images && study.images.length > 1 && (
            <div className="mt-4 pt-4 border-t border-border/50 relative z-10">
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {study.images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setActiveImage(img);
                    }}
                    className={cn(
                      'relative h-16 w-24 flex-shrink-0 rounded-md overflow-hidden border transition-all duration-200',
                      activeImage === img
                        ? 'border-primary ring-2 ring-primary/20 scale-95'
                        : 'border-border opacity-60 hover:opacity-100 hover:border-primary/50'
                    )}
                  >
                    <Image
                      src={img}
                      alt={`${study.title} ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
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
            <p className="text-muted-foreground mb-6 line-clamp-2 md:line-clamp-none">
              {study.description}
            </p>

            {/* Results Grid */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              {study.results.map((result: any) => (
                <div key={result.metric} className="bg-muted/50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                      <TrendingUpIcon size={14} className="text-primary" />
                    </div>
                    <span className="text-lg font-bold text-foreground">
                      {result.after}
                    </span>
                  </div>
                  <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">
                    {result.metric}
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
              <span className="absolute inset-0 z-0" aria-hidden="true" />
              <span className="relative z-10 flex items-center gap-2">
                Read Full Case Study
                <ArrowRightIcon size={18} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
