'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container, SectionHeading, Badge, Button, TrendingUpIcon, ArrowUpRightIcon } from '@/components/ui';
import { Scene3D, DepthReveal } from './Scene3D';
import { caseStudies } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

export function ImmersiveCaseStudies() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  return (
    <Scene3D id="case-studies" depth={-2000} background="muted">
      <div ref={containerRef} className="py-20 md:py-32">
        <Container size="wide">
          <DepthReveal>
            <SectionHeading
              subtitle="Case Studies"
              title="Real Results for Real Businesses"
              description="Explore how I've helped businesses achieve remarkable growth through strategic SEO."
            />
          </DepthReveal>

          {/* Case Studies - stacked cards emerging from depth */}
          <div className="space-y-8" style={{ perspective: '2000px' }}>
            {caseStudies.slice(0, 3).map((study, index) => {
              const cardZ = useTransform(
                scrollYProgress,
                [0.1 + index * 0.08, 0.35 + index * 0.08],
                prefersReducedMotion ? [0, 0] : [-1200, 0]
              );
              const cardRotateX = useTransform(
                scrollYProgress,
                [0.1 + index * 0.08, 0.35 + index * 0.08],
                prefersReducedMotion ? [0, 0] : [25, 0]
              );
              const cardOpacity = useTransform(
                scrollYProgress,
                [0.1 + index * 0.08, 0.25 + index * 0.08],
                [0, 1]
              );

              const springZ = useSpring(cardZ, { stiffness: 60, damping: 25 });
              const springRotateX = useSpring(cardRotateX, { stiffness: 60, damping: 25 });

              return (
                <motion.article
                  key={study.id}
                  className={cn(
                    'group relative overflow-hidden rounded-2xl',
                    'bg-card border border-border',
                    'hover:border-primary/50 hover:shadow-2xl',
                    'transition-all duration-500'
                  )}
                  style={{
                    translateZ: springZ,
                    rotateX: springRotateX,
                    opacity: cardOpacity,
                    transformStyle: 'preserve-3d',
                    transformOrigin: 'center bottom',
                  }}
                  whileHover={prefersReducedMotion ? {} : {
                    translateZ: 60,
                    scale: 1.01,
                  }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[300px]">
                    {/* Image Section */}
                    <div className="lg:col-span-2 relative bg-muted overflow-hidden">
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center"
                        whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="text-[120px] text-muted-foreground/10 font-bold">
                          {study.client.charAt(0)}
                        </div>
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-card/80 lg:to-transparent" />
                      <div className="absolute top-4 left-4 z-10">
                        <Badge variant="primary">{study.industry}</Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="lg:col-span-3 p-6 lg:p-8 xl:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-3 text-sm text-muted-foreground">
                        <span className="font-medium">{study.client}</span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                        <span>{study.duration}</span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                        {study.title}
                      </h3>

                      <p className="text-muted-foreground mb-6 line-clamp-2">
                        {study.description}
                      </p>

                      {/* Results Grid */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {study.results.map((result, resultIndex) => (
                          <motion.div
                            key={result.metric}
                            className="bg-muted/50 rounded-lg p-4 flex flex-col items-center justify-center text-center min-h-[90px]"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 * resultIndex }}
                          >
                            <div className="flex items-center justify-center gap-2 mb-2">
                              <div className="w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                                <TrendingUpIcon size={14} className="text-primary" />
                              </div>
                              <span className="text-lg font-bold text-foreground">
                                {result.after}
                              </span>
                            </div>
                            <div className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground whitespace-nowrap">
                              {result.metric}
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Testimonial */}
                      {study.testimonial && (
                        <div className="pt-4 border-t border-border">
                          <p className="text-sm italic text-muted-foreground line-clamp-2">
                            "{study.testimonial.quote}"
                          </p>
                          <p className="text-sm font-medium text-foreground mt-2">
                            — {study.testimonial.author}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* CTA */}
          <DepthReveal delay={400} direction="bottom">
            <div className="mt-12 text-center">
              <Button variant="outline" size="lg" href="#contact">
                Become the Next Success Story
                <ArrowUpRightIcon size={20} />
              </Button>
            </div>
          </DepthReveal>
        </Container>
      </div>
    </Scene3D>
  );
}
