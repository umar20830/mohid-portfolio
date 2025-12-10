'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container, SectionHeading, TrendingUpIcon, TargetIcon, ZapIcon, GlobeIcon, CheckCircleIcon, AwardIcon } from '@/components/ui';
import { Scene3D, DepthReveal } from './Scene3D';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

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

export function ImmersiveHighlights() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Cards emerge from different depths
  const card1Z = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? [0, 0] : [-800, 0]);
  const card2Z = useTransform(scrollYProgress, [0.05, 0.45], prefersReducedMotion ? [0, 0] : [-800, 0]);
  const card3Z = useTransform(scrollYProgress, [0.1, 0.5], prefersReducedMotion ? [0, 0] : [-800, 0]);
  const card4Z = useTransform(scrollYProgress, [0.15, 0.55], prefersReducedMotion ? [0, 0] : [-800, 0]);

  const springConfig = { stiffness: 80, damping: 25 };
  const springCard1Z = useSpring(card1Z, springConfig);
  const springCard2Z = useSpring(card2Z, springConfig);
  const springCard3Z = useSpring(card3Z, springConfig);
  const springCard4Z = useSpring(card4Z, springConfig);

  const cardSprings = [springCard1Z, springCard2Z, springCard3Z, springCard4Z];

  return (
    <Scene3D id="highlights" depth={-1500} background="muted">
      <div ref={containerRef} className="py-20 md:py-32">
        <Container size="wide">
          <DepthReveal>
            <SectionHeading
              subtitle="Why Choose Me"
              title="SEO Excellence That Delivers Results"
              description="Combining technical expertise with creative strategy to help your business thrive in search."
            />
          </DepthReveal>

          {/* Highlights Grid with staggered depth reveals */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
            style={{ perspective: '1500px' }}
          >
            {highlights.map((highlight, index) => (
              <motion.div
                key={highlight.title}
                className={cn(
                  'group relative p-6 lg:p-8 rounded-2xl',
                  'bg-card border border-border',
                  'hover:border-primary/50 hover:shadow-2xl',
                  'transition-all duration-500'
                )}
                style={{
                  translateZ: cardSprings[index],
                  transformStyle: 'preserve-3d',
                }}
                whileHover={prefersReducedMotion ? {} : {
                  translateZ: 50,
                  rotateY: 5,
                  scale: 1.02,
                }}
              >
                {/* Icon */}
                <motion.div
                  className={cn(
                    'w-14 h-14 rounded-xl flex items-center justify-center mb-4',
                    highlight.color === 'primary'
                      ? 'bg-primary/10 text-primary'
                      : 'bg-accent/10 text-accent'
                  )}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.1, rotateZ: 5 }}
                >
                  <highlight.icon size={28} />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {highlight.description}
                </p>

                {/* Hover gradient overlay */}
                <div
                  className={cn(
                    'absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100',
                    'transition-opacity duration-500 pointer-events-none',
                    highlight.color === 'primary'
                      ? 'bg-gradient-to-br from-primary/5 to-transparent'
                      : 'bg-gradient-to-br from-accent/5 to-transparent'
                  )}
                />
              </motion.div>
            ))}
          </div>

          {/* Achievements Row - emerges as one unit */}
          <DepthReveal delay={200} direction="bottom">
            <div className="mt-16 md:mt-24">
              <div className="bg-card border border-border rounded-2xl p-6 md:p-10 lg:p-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.label}
                      className="text-center"
                      initial={{ opacity: 0, scale: 0.8, z: -200 }}
                      whileInView={{ opacity: 1, scale: 1, z: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1 + index * 0.1,
                        type: 'spring',
                      }}
                    >
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-3">
                        <achievement.icon size={24} />
                      </div>
                      <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gradient">
                        {achievement.value}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {achievement.label}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </DepthReveal>
        </Container>
      </div>
    </Scene3D>
  );
}
