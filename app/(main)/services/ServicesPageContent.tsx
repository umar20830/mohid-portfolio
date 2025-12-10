'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Container,
  Section,
  SectionHeading,
  Badge,
  Button,
  Icon,
  CheckCircleIcon,
  ArrowRightIcon,
  type IconName,
} from '@/components/ui';
import { CTASection } from '@/components/sections';
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

const process = [
  {
    step: '01',
    title: 'Discovery & Audit',
    description: 'Comprehensive analysis of your current SEO status, competitors, and opportunities.',
  },
  {
    step: '02',
    title: 'Strategy Development',
    description: 'Custom SEO roadmap aligned with your business goals and target audience.',
  },
  {
    step: '03',
    title: 'Implementation',
    description: 'Execute technical fixes, content optimization, and link building strategies.',
  },
  {
    step: '04',
    title: 'Monitor & Optimize',
    description: 'Continuous tracking, reporting, and strategy refinement for sustained growth.',
  },
];

export function ServicesPageContent() {
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
            <Badge variant="primary" className="mb-4">Services</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              SEO Services That{' '}
              <span className="text-gradient">Drive Results</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From technical optimization to content strategy, I offer comprehensive SEO solutions
              tailored to your business needs and growth objectives.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* Services Detail */}
      <Section size="major">
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <SectionHeading
            subtitle="What I Offer"
            title="Comprehensive SEO Solutions"
            description="Each service is designed to address specific aspects of search optimization for maximum impact."
          />

          <div className="space-y-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                id={service.id}
                className={cn(
                  'group relative overflow-hidden rounded-2xl',
                  'bg-card border border-border',
                  'p-6 lg:p-8 xl:p-10',
                  'hover:border-primary/50 hover:shadow-lg',
                  'transition-all duration-300',
                  'scroll-mt-24'
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Service Header */}
                  <div className="lg:col-span-1">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <Icon
                        name={iconMap[service.icon] || 'Search'}
                        size={32}
                        className="text-primary group-hover:text-primary-foreground"
                      />
                    </div>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
                      {service.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {service.description}
                    </p>
                  </div>

                  {/* Service Features */}
                  <div className="lg:col-span-2">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      What's Included
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {service.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-start gap-3 p-3 rounded-lg bg-muted/50"
                        >
                          <CheckCircleIcon
                            size={20}
                            className="text-accent flex-shrink-0 mt-0.5"
                          />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button variant="outline" href="/contact">
                        Get Started
                        <ArrowRightIcon size={18} />
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process Section */}
      <Section size="major" background="muted">
        <Container size="wide">
          <SectionHeading
            subtitle="My Process"
            title="How I Work"
            description="A systematic approach to SEO that ensures consistent results and clear communication."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {process.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Connector line */}
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-border" />
                )}

                <div className="relative bg-card border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection
        title="Ready to Improve Your Search Rankings?"
        description="Let's discuss which services are right for your business goals."
        primaryCTA={{ text: 'Get a Free Consultation', href: '/contact' }}
        secondaryCTA={{ text: 'View Case Studies', href: '/projects' }}
      />
    </>
  );
}
