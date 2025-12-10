'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { Container, Button, ArrowRightIcon, TrendingUpIcon, BarChartIcon, TargetIcon } from '@/components/ui';
import { siteConfig, stats } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

const floatingElements = [
  { icon: TrendingUpIcon, label: '+620% Traffic', x: '10%', y: '20%', delay: 0 },
  { icon: BarChartIcon, label: '#1 Rankings', x: '85%', y: '15%', delay: 0.2 },
  { icon: TargetIcon, label: '500+ Projects', x: '5%', y: '70%', delay: 0.4 },
];

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, 350]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });
  const springY3 = useSpring(y3, { stiffness: 100, damping: 30 });

  useEffect(() => {
    if (prefersReducedMotion) return;

    const elements = document.querySelectorAll('.floating-element');
    elements.forEach((el, index) => {
      gsap.to(el, {
        y: '+=15',
        x: '+=5',
        duration: 3 + index * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });
  }, [prefersReducedMotion]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[60vh] md:min-h-screen flex items-center overflow-hidden bg-gradient-to-b from-background via-background to-muted"
    >
      {/* Animated Background Layers - 3D Parallax Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Layer 1 - Furthest back (slowest) */}
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReducedMotion ? 0 : springY1, opacity }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
        </motion.div>

        {/* Layer 2 - Middle depth */}
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReducedMotion ? 0 : springY2 }}
        >
          {/* Grid pattern */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </motion.div>

        {/* Layer 3 - Closest (fastest) - Floating elements */}
        <motion.div
          className="absolute inset-0"
          style={{ y: prefersReducedMotion ? 0 : springY3 }}
        >
          {floatingElements.map((el, index) => (
            <motion.div
              key={index}
              className={cn(
                'floating-element absolute hidden md:flex items-center gap-2',
                'bg-card/80 backdrop-blur-sm border border-border rounded-xl',
                'px-4 py-3 shadow-lg'
              )}
              style={{ left: el.x, top: el.y }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + el.delay, duration: 0.5 }}
            >
              <el.icon size={20} className="text-primary" />
              <span className="text-sm font-medium text-foreground">{el.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-32 h-32 border border-primary/10 rounded-full" />
        <div className="absolute bottom-32 left-16 w-24 h-24 border border-accent/10 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-primary/5 rounded-full" />
      </div>

      {/* Main Content */}
      <Container size="wide" className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          style={{ scale: prefersReducedMotion ? 1 : scale, opacity }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6"
          >
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-primary">Available for new projects</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span className="block">I Help Brands</span>
            <span className="block mt-2">
              <span className="text-gradient">Dominate Search</span>
            </span>
            <span className="block mt-2">Rankings</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mt-6 md:mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Professional SEO Specialist from {siteConfig.location}, delivering data-driven strategies
            that boost organic traffic, improve keyword rankings, and generate measurable ROI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button variant="primary" size="lg" href="/contact">
              Start Your SEO Journey
              <ArrowRightIcon size={20} />
            </Button>
            <Button variant="outline" size="lg" href="/projects">
              View Case Studies
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              >
                <div className="text-3xl md:text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <motion.div
            className="w-1.5 h-3 bg-muted-foreground/50 rounded-full mt-2"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
