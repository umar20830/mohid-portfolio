'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Section, SectionHeading, Badge } from '@/components/ui';
import { experience, tools } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

export function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ['0%', '100%']);

  return (
    <Section id="experience" size="major">
      <div ref={containerRef} className="relative">
        {/* Parallax background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/3 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Timeline */}
            <div>
              <SectionHeading
                subtitle="Experience"
                title="My Professional Journey"
                align="left"
              />

              <div className="relative mt-8">
                {/* Animated line */}
                <div className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-border">
                  <motion.div
                    className="absolute top-0 left-0 w-full bg-primary origin-top"
                    style={{ height: prefersReducedMotion ? '100%' : lineHeight }}
                  />
                </div>

                {/* Timeline items */}
                <div className="space-y-8">
                  {experience.map((item, index) => (
                    <motion.div
                      key={item.year}
                      className="relative pl-12"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.15 }}
                    >
                      {/* Dot */}
                      <div
                        className={cn(
                          'absolute left-0 top-1 w-9 h-9 rounded-full',
                          'bg-card border-2 border-primary',
                          'flex items-center justify-center',
                          'z-10'
                        )}
                      >
                        <span className="text-xs font-bold text-primary">
                          {item.year.slice(-2)}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/50 transition-colors">
                        <div className="flex items-center gap-3 mb-2">
                          <Badge variant="outline">{item.year}</Badge>
                          <span className="text-sm text-muted-foreground">
                            {item.company}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tools & Skills */}
            <div>
              <SectionHeading
                subtitle="Tools & Technologies"
                title="My SEO Toolkit"
                align="left"
              />

              <div className="mt-8 space-y-6">
                {/* Group tools by category */}
                {['Analytics', 'SEO Tools', 'Technical', 'Performance', 'Content', 'Local SEO'].map(
                  (category, catIndex) => {
                    const categoryTools = tools.filter((t) => t.category === category);
                    if (categoryTools.length === 0) return null;

                    return (
                      <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                      >
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                          {category}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {categoryTools.map((tool) => (
                            <motion.span
                              key={tool.name}
                              className={cn(
                                'px-4 py-2 rounded-lg text-sm font-medium',
                                'bg-card border border-border',
                                'hover:border-primary/50 hover:bg-primary/5',
                                'transition-all duration-200 cursor-default',
                                'min-h-[44px] flex items-center'
                              )}
                              whileHover={{ scale: 1.02 }}
                            >
                              {tool.name}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
