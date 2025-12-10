'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { gsap } from 'gsap';
import { Container, Button, ArrowRightIcon, TrendingUpIcon, BarChartIcon, TargetIcon, ZapIcon } from '@/components/ui';
import { FloatingLayer, DepthReveal } from './Scene3D';
import { siteConfig, stats } from '@/lib/constants';
import { useReducedMotion } from '@/hooks';
import { cn } from '@/lib/utils';

const floatingStats = [
  { icon: TrendingUpIcon, label: '+620%', sublabel: 'Traffic Growth', x: '5%', y: '20%', depth: 1 },
  { icon: BarChartIcon, label: '#1', sublabel: 'Rankings', x: '85%', y: '15%', depth: 2 },
  { icon: TargetIcon, label: '500+', sublabel: 'Projects', x: '8%', y: '70%', depth: 3 },
  { icon: ZapIcon, label: '98%', sublabel: 'Satisfaction', x: '88%', y: '65%', depth: 2 },
];

export function ImmersiveHero() {
  const containerRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Hero elements fly outward as user scrolls
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const heroZ = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 800]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Background parallax layers
  const bgLayer1Y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const bgLayer2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const bgLayer3Y = useTransform(scrollYProgress, [0, 1], [0, 75]);

  // Spring physics
  const springConfig = { stiffness: 100, damping: 30 };
  const springHeroY = useSpring(heroY, springConfig);
  const springHeroZ = useSpring(heroZ, springConfig);
  const springBg1Y = useSpring(bgLayer1Y, springConfig);
  const springBg2Y = useSpring(bgLayer2Y, springConfig);

  // GSAP floating animation for stat cards
  useEffect(() => {
    if (prefersReducedMotion) return;

    const cards = document.querySelectorAll('.hero-float-card');
    cards.forEach((card, index) => {
      gsap.to(card, {
        y: '+=20',
        x: '+=10',
        rotateY: '+=5',
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
      id="hero"
      className="relative min-h-[150vh] overflow-hidden"
      style={{
        perspective: '2000px',
        perspectiveOrigin: '50% 30%',
      }}
    >
      {/* Deep background layer - moves slowest */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ translateY: prefersReducedMotion ? 0 : springBg1Y }}
      >
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]" />

        {/* Grid pattern */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          <defs>
            <pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>
      </motion.div>

      {/* Mid background layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ translateY: prefersReducedMotion ? 0 : springBg2Y }}
      >
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-40 h-40 border border-primary/10 rounded-full" />
        <div className="absolute bottom-40 left-16 w-32 h-32 border border-accent/10 rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-primary/5 rounded-full" />
      </motion.div>

      {/* Floating stat cards - different depths */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            className={cn(
              'hero-float-card absolute hidden md:flex items-center gap-3',
              'bg-card/90 backdrop-blur-md border border-border/50 rounded-xl',
              'px-4 py-3 shadow-2xl pointer-events-auto',
              'hover:border-primary/50 transition-colors'
            )}
            style={{
              left: stat.x,
              top: stat.y,
              transformStyle: 'preserve-3d',
            }}
            initial={{ opacity: 0, scale: 0.5, z: -500 }}
            animate={{ opacity: 1, scale: 1, z: 0 }}
            transition={{
              delay: 0.5 + index * 0.15,
              duration: 0.8,
              type: 'spring',
            }}
          >
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center',
              index % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-accent/10 text-accent'
            )}>
              <stat.icon size={20} />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">{stat.label}</div>
              <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main hero content - flies toward viewer on scroll */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center"
        style={{
          translateY: prefersReducedMotion ? 0 : springHeroY,
          translateZ: prefersReducedMotion ? 0 : springHeroZ,
          scale: prefersReducedMotion ? 1 : heroScale,
          opacity: heroOpacity,
          transformStyle: 'preserve-3d',
        }}
      >
        <Container size="wide">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <DepthReveal delay={0}>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">Available for new projects</span>
              </motion.div>
            </DepthReveal>

            {/* Main heading with staggered 3D reveal */}
            <DepthReveal delay={100}>
              <motion.h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-foreground leading-[0.9] tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.span
                  className="block"
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  I Help Brands
                </motion.span>
                <motion.span
                  className="block mt-2"
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span className="text-gradient">Dominate Search</span>
                </motion.span>
                <motion.span
                  className="block mt-2"
                  initial={{ opacity: 0, y: 50, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Rankings
                </motion.span>
              </motion.h1>
            </DepthReveal>

            {/* Description */}
            <DepthReveal delay={200}>
              <motion.p
                className="mt-8 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Professional SEO Specialist from {siteConfig.location}, delivering data-driven strategies
                that boost organic traffic, improve keyword rankings, and generate measurable ROI.
              </motion.p>
            </DepthReveal>

            {/* CTA Buttons */}
            <DepthReveal delay={300}>
              <motion.div
                className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button variant="primary" size="lg" href="#contact">
                  Start Your SEO Journey
                  <ArrowRightIcon size={20} />
                </Button>
                <Button variant="outline" size="lg" href="#case-studies">
                  View Case Studies
                </Button>
              </motion.div>
            </DepthReveal>

            {/* Stats row */}
            <DepthReveal delay={400}>
              <motion.div
                className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 30, z: -100 }}
                    animate={{ opacity: 1, y: 0, z: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.9 + index * 0.1,
                      type: 'spring',
                    }}
                  >
                    <div className="text-3xl md:text-4xl lg:text-5xl font-bold text-gradient">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-sm md:text-base text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </DepthReveal>
          </div>
        </Container>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        style={{ opacity: heroOpacity }}
      >
        <motion.div
          className="flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
            <motion.div
              className="w-1.5 h-3 bg-muted-foreground/50 rounded-full mt-2"
              animate={{ opacity: [0.5, 1, 0.5], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
