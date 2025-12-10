'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Container,
  Section,
  SectionHeading,
  Badge,
  Button,
  ArrowRightIcon,
  AwardIcon,
  TargetIcon,
  TrendingUpIcon,
  GlobeIcon,
} from '@/components/ui';
import { ExperienceTimeline, CTASection, Testimonials } from '@/components/sections';
import { siteConfig, skills, stats } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks';

const values = [
  {
    icon: TargetIcon,
    title: 'Results-Focused',
    description: 'Every strategy is designed with measurable outcomes in mind. I focus on metrics that matter to your business.',
  },
  {
    icon: TrendingUpIcon,
    title: 'Data-Driven',
    description: 'Decisions are backed by analytics, not assumptions. I use industry-leading tools to inform every recommendation.',
  },
  {
    icon: GlobeIcon,
    title: 'Transparent',
    description: 'Clear communication and regular reporting keep you informed at every step of your SEO journey.',
  },
  {
    icon: AwardIcon,
    title: 'Continuous Learning',
    description: 'SEO evolves constantly. I stay ahead of algorithm updates and industry trends to keep your strategy effective.',
  },
];

export function AboutPageContent() {
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
            <Badge variant="primary" className="mb-4">About Me</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Hi, I'm{' '}
              <span className="text-gradient">{siteConfig.name}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Professional SEO Specialist from {siteConfig.location}, passionate about helping
              businesses achieve sustainable organic growth through strategic search optimization.
            </p>
          </motion.div>
        </Container>
      </Section>

      {/* About Content */}
      <Section size="major">
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
            style={{ y: prefersReducedMotion ? 0 : y }}
          />
        </div>

        <Container size="wide" className="relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image / Visual */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0">
                {/* Decorative background */}
                <div className="absolute inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl" />
                <div className="absolute inset-0 bg-card border border-border rounded-3xl overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-muted">
                    <span className="text-9xl font-bold text-muted-foreground/10">
                      {siteConfig.name.charAt(0)}
                    </span>
                  </div>
                </div>
                {/* Floating badges */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-card border border-border rounded-xl px-4 py-2 shadow-lg"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <span className="text-sm font-medium text-foreground">SEO Expert</span>
                </motion.div>
                <motion.div
                  className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-xl px-4 py-2 shadow-lg"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                >
                  <span className="text-sm font-medium">6+ Years Experience</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                Turning Search Visibility Into Business Growth
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  With over 6 years of experience in search engine optimization, I've helped
                  businesses across various industries achieve remarkable growth in organic
                  traffic and revenue.
                </p>
                <p>
                  My approach combines technical expertise with strategic thinking. I don't just
                  chase rankings—I focus on driving qualified traffic that converts into real
                  business results.
                </p>
                <p>
                  From startups to established enterprises, I've worked with clients across
                  e-commerce, SaaS, healthcare, finance, and local businesses, delivering
                  customized SEO strategies that align with their unique goals.
                </p>
              </div>

              {/* Stats */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {stats.slice(0, 4).map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="bg-muted rounded-xl p-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                  >
                    <div className="text-2xl font-bold text-gradient">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8">
                <Button variant="primary" size="lg" href="/contact">
                  Let's Work Together
                  <ArrowRightIcon size={20} />
                </Button>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>

      {/* Skills Section */}
      <Section size="major" background="muted">
        <Container size="wide">
          <SectionHeading
            subtitle="Expertise"
            title="Skills & Specializations"
            description="A comprehensive skill set covering all aspects of modern SEO."
          />

          <motion.div
            className="flex flex-wrap justify-center gap-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                className={cn(
                  'px-5 py-3 rounded-xl text-sm font-medium',
                  'bg-card border border-border',
                  'hover:border-primary/50 hover:bg-primary/5',
                  'transition-all duration-200 cursor-default',
                  'min-h-[44px] flex items-center'
                )}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section size="major">
        <Container size="wide">
          <SectionHeading
            subtitle="My Values"
            title="How I Approach Every Project"
            description="The principles that guide my work and ensure success for every client."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className={cn(
                  'p-6 lg:p-8 rounded-2xl',
                  'bg-card border border-border',
                  'hover:border-primary/50 hover:shadow-lg',
                  'transition-all duration-300'
                )}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <value.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Experience Timeline */}
      <ExperienceTimeline />

      {/* Testimonials */}
      <Testimonials />

      <CTASection
        title="Ready to Start Your SEO Journey?"
        description="Let's discuss how I can help you achieve your organic growth goals."
      />
    </>
  );
}
