'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Container, SectionHeading, Button, Icon, ArrowRightIcon, type IconName } from '@/components/ui';
import { Scene3D, DepthReveal } from './Scene3D';
import { services } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

const iconMap: Record<string, IconName> = {
  Code: 'Code',
  FileText: 'FileText',
  Link: 'Link',
  MapPin: 'MapPin',
  ShoppingCart: 'ShoppingCart',
  Search: 'Search',
};

export function ImmersiveServices() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Staggered depth emergence for each service card
  const getCardZ = (index: number) => {
    const start = 0.05 * index;
    const end = 0.3 + 0.05 * index;
    return useTransform(
      scrollYProgress,
      [start, end],
      prefersReducedMotion ? [0, 0] : [-1000, 0]
    );
  };

  return (
    <Scene3D id="services" depth={-1800} background="default">
      <div ref={containerRef} className="py-20 md:py-32">
        <Container size="wide">
          <DepthReveal>
            <SectionHeading
              subtitle="Services"
              title="Comprehensive SEO Solutions"
              description="From technical audits to content strategy, I offer end-to-end SEO services tailored to your business goals."
            />
          </DepthReveal>

          {/* Services Grid - each card emerges from depth */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            style={{ perspective: '2000px' }}
          >
            {services.map((service, index) => {
              const cardZ = getCardZ(index);
              const springZ = useSpring(cardZ, { stiffness: 80, damping: 25 });

              return (
                <motion.div
                  key={service.id}
                  className={cn(
                    'group h-full p-6 lg:p-8 rounded-2xl',
                    'bg-card border border-border',
                    'hover:border-primary/50 hover:shadow-2xl',
                    'transition-all duration-500',
                    'cursor-pointer'
                  )}
                  style={{
                    translateZ: springZ,
                    transformStyle: 'preserve-3d',
                  }}
                  whileHover={prefersReducedMotion ? {} : {
                    translateZ: 80,
                    rotateX: -2,
                    rotateY: 3,
                    scale: 1.02,
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  {/* Icon with 3D effect on hover */}
                  <motion.div
                    className={cn(
                      'w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5',
                      'group-hover:bg-primary transition-colors duration-300'
                    )}
                    whileHover={prefersReducedMotion ? {} : { rotateY: 180 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon
                      name={iconMap[service.icon] || 'Search'}
                      size={28}
                      className="text-primary group-hover:text-primary-foreground transition-colors"
                    />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.description}
                  </p>

                  {/* Features preview */}
                  <ul className="space-y-2 mb-5">
                    {service.features.slice(0, 3).map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover CTA */}
                  <motion.div
                    className="flex items-center gap-2 text-primary font-medium text-sm"
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    Learn more
                    <ArrowRightIcon size={16} />
                  </motion.div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <DepthReveal delay={300} direction="bottom">
            <div className="mt-12 text-center">
              <Button variant="primary" size="lg" href="#contact">
                Discuss Your Project
                <ArrowRightIcon size={20} />
              </Button>
            </div>
          </DepthReveal>
        </Container>
      </div>
    </Scene3D>
  );
}
