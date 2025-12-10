'use client';

import { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Container,
  Section,
  SectionHeading,
  Button,
  ArrowRightIcon,
  Icon,
  type IconName,
} from '@/components/ui';
import { services } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

const iconMap: Record<string, IconName> = {
  Code: 'Code',
  FileText: 'FileText',
  Link: 'Link',
  MapPin: 'MapPin',
  ShoppingCart: 'ShoppingCart',
  Search: 'Search',
};

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <Section id="services" size="major">
      <div ref={containerRef} className="relative">
        {/* Parallax background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <SectionHeading
            subtitle="Services"
            title="Comprehensive SEO Solutions"
            description="From technical audits to content strategy, I offer end-to-end SEO services tailored to your business goals."
          />

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/services#${service.id}`} className="block h-full">
                  <motion.div
                    className={cn(
                      'group h-full p-6 lg:p-8 rounded-2xl',
                      'bg-card border border-border',
                      'hover:border-primary/50 hover:shadow-xl',
                      'transition-all duration-300'
                    )}
                    whileHover={{ y: -5 }}
                  >
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon name={iconMap[service.icon] || 'Search'} size={28} className="text-primary group-hover:text-primary-foreground" />
                    </div>

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

                    {/* Learn more link */}
                    <div className="flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                      Learn more
                      <ArrowRightIcon size={16} />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Button variant="primary" size="lg" href="/services">
              View All Services
              <ArrowRightIcon size={20} />
            </Button>
          </motion.div>
        </Container>
      </div>
    </Section>
  );
}
