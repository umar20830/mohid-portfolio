'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Container, Section, SectionHeading } from '@/components/ui';
import { testimonials } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

export function Testimonials() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <Section id="testimonials" size="major" background="muted">
      <div ref={containerRef} className="relative">
        {/* Parallax background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-0 right-1/4 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <SectionHeading
            subtitle="Testimonials"
            title="What Clients Say"
            description="Don't just take my word for it. Here's what my clients have to say about working with me."
          />

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                className={cn(
                  'relative p-6 lg:p-8 rounded-2xl',
                  'bg-card border border-border',
                  'hover:border-primary/30 hover:shadow-lg',
                  'transition-all duration-300'
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -3 }}
              >
                {/* Quote mark */}
                <div className="absolute top-4 right-4 text-6xl text-primary/10 font-serif leading-none">
                  "
                </div>

                {/* Quote */}
                <blockquote className="relative z-10">
                  <p className="text-foreground leading-relaxed mb-6">
                    "{testimonial.quote}"
                  </p>
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-bold text-primary">
                      {testimonial.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </div>
    </Section>
  );
}
